# «متابعة اليوم» — the backend explained for a frontend developer

This walks through every backend change made for the «متابعة اليوم» cards. It follows one request from your SPA, through each layer and back, and compares each layer to things you already know from frontend work.

Branch: `feature/manager-today-follow-up-cards`

---

## The big picture: a request's journey

When your SPA calls `GET /dashboard/manager-overview/today`, the request passes through layers, each with one job:

```
SPA fetch()
  → Route          "which function handles this URL?"
  → Controller     "receive the request, call the logic, send the response"
  → FormRequest    "is the input valid?"
  → Service        "the business logic"
  → Repository     "talk to the database"
  → Database (MySQL)
  ← Resource       "shape the JSON the frontend receives"
  ← JSON response
```

Frontend analogies:

| Backend layer | Frontend equivalent |
|---|---|
| Route | Your router config (`{ path: '/x', component: X }`) |
| Controller | A page component: thin, wires things together |
| FormRequest | Form validation (like a Zod/Yup schema) |
| Service | A custom hook or store holding the logic |
| Repository | Your API client layer (`api.getStudents()`), except it talks to the DB |
| Resource | A mapper that turns raw data into the shape the UI expects |
| Model | A TypeScript type, but it can also query its own table |

The project's rule is that each layer only talks to the next one. A controller never writes SQL, and a repository never decides business rules. It's the same idea as keeping `fetch` calls out of your components.

---

## Step 1: The route — "which URL exists?"

[routes/api/v1/dashboard/dashboard.php](routes/api/v1/dashboard/dashboard.php): 4 lines were added.

```php
Route::get('manager-overview/today', [ManagerDashboardController::class, 'today']);
Route::get('manager-overview/today/students/{type}', [..., 'todayStudents']);
Route::get('manager-overview/today/sections/{type}', [..., 'todaySections']);
Route::post('manager-overview/today/reminders', [..., 'todayReminders']);
```

- `{type}` is a URL parameter, like `/students/:type` in React Router.
- The routes sit inside the `isAdmin` group, which is **middleware**: code that runs before the controller. It works like a route guard that redirects non-admins, except here it returns 403.

## Step 2: The controller — "the thin page component"

[ManagerDashboardController.php](app/Http/Controllers/Api/V1/Dashboard/ManagerDashboardController.php): 4 methods were added, one per route.

```php
public function todayStudents(TodayFollowUpStudentsRequest $request)
{
    $type = $request->type();
    $result = $this->todayFollowUpService->getStudentList($type, $request->filters(), $request->perPage());

    return $this->returnData([... 'rows' => resourceResponse(TodayFollowUpStudentResource::collection($result['rows']))]);
}
```

It does three things, all short:

1. It gets validated input. The `TodayFollowUpStudentsRequest $request` parameter makes Laravel validate before the method even runs.
2. It asks the service for the data.
3. It wraps the result in the standard envelope `{ data, message, status, code, errors }` that your SPA already handles.

**Dependency injection:** the constructor has `protected TodayFollowUpService $todayFollowUpService`. Laravel creates that object and passes it in automatically, much like React Context provides a value you never construct yourself.

## Step 3: Validation — "the form schema"

[app/Http/Requests/Api/Dashboard/](app/Http/Requests/Api/Dashboard/): three new files, `TodayFollowUpStudentsRequest`, `TodayFollowUpSectionsRequest` and `TodayFollowUpReminderRequest`.

```php
'type'     => ['required', 'string', Rule::in(['absent', 'not_recited', 'activity'])],
'per_page' => ['nullable', 'integer', 'min:1', 'max:100'],
'keep_ids' => ['nullable', 'string', 'regex:/^\d+(,\d+)*$/', ...],
```

If any rule fails, Laravel stops and returns a **422** with the `errors` object your forms already display. The controller never runs.

## Step 4: The enum — "a shared constant"

[TodayFollowUpTypeEnum.php](app/Enums/TodayFollowUpTypeEnum.php)

```php
enum TodayFollowUpTypeEnum: string {
    case ABSENT = 'absent';
    case NOT_RECITED = 'not_recited';
    case ACTIVITY = 'activity';
    case UNPREPARED = 'unprepared';
    case UNRECORDED = 'unrecorded';
}
```

It's the same as a TS union: `type FollowUpType = 'absent' | 'not_recited' | ...`. The strings are defined once and reused by validation, the URL and the database, so a typo can't creep in.

## Step 5: The service — "where the logic lives"

[TodayFollowUpService.php](app/Services/Dashboard/TodayFollowUpService.php): the heart of the feature. It has three main jobs.

### a) Figure out "the day" — the `day()` method

- Is today a working day? If not, use the last working day. This reuses `todayState()` from the existing manager dashboard ([ManagerDashboardService.php](app/Services/Dashboard/ManagerDashboardService.php)), which was made `public` so both features share one rule.
- Which halaqas can this supervisor see? That's the **scope**: a mosque supervisor only sees their mosques.
- Which of those halaqas study on this weekday and aren't on holiday?

The answer is packed into a **DTO**, [TodayFollowUpDayDTO.php](app/DTO/Dashboard/TodayFollowUpDayDTO.php). A DTO (Data Transfer Object) is just a typed object that carries data between layers, like:

```ts
interface DayContext {
  date: string;
  isToday: boolean;
  termId: number | null;
  sectionIds: number[];
  // ...
}
```

It has almost no logic. It exists so every function receives the same "day" without each one recalculating it.

### b) Build each response

`getCounts()`, `getStudentList()` and `getSectionList()`. Each one asks the repository for data and adds the extra details, such as teacher names, the halaqa's period, and today's assignment.

### c) Send reminders — `sendReminders()`

1. Refuse if the day isn't today (422).
2. Refuse halaqas outside the supervisor's scope (422).
3. Work out which halaqas actually need a reminder: still pending, not reminded today, and with at least one teacher who has an account.
4. Save a row per halaqa inside a **transaction**, then send the notifications after the save succeeds (`DB::afterCommit`).

A **transaction** is all-or-nothing: if anything fails halfway, every database change is undone. Sending notifications only after commit means no teacher gets a notification for a save that was rolled back. It's similar to only showing a success toast after the API call resolves.

## Step 6: The repository — "the database queries"

[TodayFollowUpRepository.php](app/Repositories/TodayFollowUpRepository.php): all the SQL lives here.

The key idea is **one shared base query**, `dayRows()`, that builds a virtual table like this:

| student_id | section_id | attendance today (`a`) | recitation today (`pr`) |
|---|---|---|---|
| 341 | 12 | absent | not recorded |
| 342 | 12 | (none) | graded «لم يسمع» |
| 343 | 15 | attend | not recorded |

Every card is just a **filter** on top of it, in the `condition()` method:

```php
ABSENT      => "a.type = 'absent'"
ACTIVITY    => "a.type = 'activity'"
UNPREPARED  => "a.student_id IS NULL"                 // no attendance row at all
NOT_RECITED => "pr.not_recited_id IS NOT NULL"        // submitted, every part graded 0
UNRECORDED  => "has an assignment, not absent, nothing recorded yet"
```

This is why each card's number always matches its list: both use the same base plus the same filter. In frontend terms, it's one `useQuery` with different `.filter()` calls rather than separate fetches that could drift apart.

**Pagination is done in SQL** with `->paginate(15)`. The database returns only 15 rows plus the total count, not all 5,000 students for PHP to slice. It's the backend version of server-side pagination in a table component.

**Contract (interface):** [TodayFollowUpRepositoryInterface.php](app/Repositories/Contracts/TodayFollowUpRepositoryInterface.php) lists the method signatures, like a TS `interface` that the class implements. The service depends on the interface, not the class, which makes it swappable in tests. The project wires the two together automatically by matching their names.

## Step 7: The resource — "shaping the JSON"

[TodayFollowUpStudentResource.php](app/Http/Resources/Dashboard/TodayFollowUpStudentResource.php) and [TodayFollowUpSectionResource.php](app/Http/Resources/Dashboard/TodayFollowUpSectionResource.php) turn raw data into exactly the shape your SPA expects:

```php
'attendance_status' => AttendanceStatusEnum::fromValue($row['attendance_type'])->toApi(),
// → { value: "absent", label: "غائب", tone: "danger" }
'today_assignment' => [ 'recite' => ..., 'link' => ..., 'review' => ... ],
```

The strings must match the recitation screen exactly, so its "prepare for exam" logic was moved into a shared **trait**, [ResolvesPrepareForExamInfo.php](app/Http/Resources/Concerns/ResolvesPrepareForExamInfo.php). Both [RecitationStudentResource.php](app/Http/Resources/RecitationStudentResource.php) and the new resource now use it. A trait is a reusable chunk of methods that gets copied into a class. Think of it as a shared helper or a mixin.

---

## The database parts

### Migration

[2026_10_07_000001_create_section_follow_up_reminders_table.php](database/migrations/2026_10_07_000001_create_section_follow_up_reminders_table.php)

A migration is **version control for the database structure**: a script that creates or changes a table. Everyone runs `php artisan migrate` to get the same tables. That's also why you got the `section_remote_study` 500: someone added a migration on `main` that your local DB hasn't run yet.

```php
$table->unique(['section_id', 'type', 'date']);
```

This one line enforces "one reminder per halaqa, per type, per day" at the database level. Even if two supervisors click at the same instant, MySQL refuses the second row.

### Model

[SectionFollowUpReminder.php](app/Models/SectionFollowUpReminder.php) is the PHP class representing one row of that table. `use BelongsToTenant` makes every query automatically add `WHERE tenant_id = <current mosque/school>`, so one tenant never sees another's data.

---

## The notification parts

[NotificationService.php](app/Services/Notification/NotificationService.php) gets a new `notifySectionTeachers()` method that does two things:

1. It saves a **bell notification** row, the one shown in your dashboard bell (`GET dashboard/notifications`) and the teacher's mobile list (`GET teacher/notifications`).
2. It sends a **phone push**, through the new [MobilePushNotification.php](app/Notifications/MobilePushNotification.php).

Why the second part was needed: the existing push only sent to tokens saved by the dashboard web app (the `fcm_tokens` table). The teacher mobile app saves its token in a different column (`users.fcm_token`), so teachers never got pushes on their phone.

**Two new notification types** in [NotificationTypeEnum.php](app/Enums/NotificationTypeEnum.php): `section_attendance_reminder` and `section_progress_reminder`. Your SPA can switch on these to route to the halaqa's screen. The notification's `data.subject_id` is the halaqa id.

**Texts** go in [lang/ar/notifications.php](lang/ar/notifications.php) and [lang/ar/messages.php](lang/ar/messages.php). These are translation files, the same idea as i18n JSON files on the frontend.

---

## The parent-notification fix

[StudentAttendanceObserver.php](app/Observers/StudentAttendanceObserver.php)

An **observer** runs automatically whenever a model is saved, like a `useEffect` that fires when attendance changes.

**Before:** a supervisor toggling absent → present → absent sent the parent two "your child is absent" messages.

**After:** before sending, it calls

```php
Cache::add(CacheKeys::parentAttendanceNotified($studentId, $date), true, now()->endOfDay())
```

`Cache::add` only succeeds if the key doesn't exist yet. The first send sets the key, and every later attempt that day finds it already set and skips. It works like a "sent today" flag kept in `localStorage`, but shared by the whole server. The key name comes from [CacheKeys.php](app/Constants/CacheKeys.php).

---

## Tests

The three files in [tests/Unit/Dashboard/](tests/Unit/Dashboard/):

| File | What it checks |
|---|---|
| [TodayFollowUpRequestsTest.php](tests/Unit/Dashboard/TodayFollowUpRequestsTest.php) | Validation accepts good input and rejects bad input |
| [TodayFollowUpRulesTest.php](tests/Unit/Dashboard/TodayFollowUpRulesTest.php) | Pure logic: "no reminders when the day isn't today", "a halaqa already reminded today is skipped" |
| [TodayFollowUpRepositoryTest.php](tests/Unit/Dashboard/TodayFollowUpRepositoryTest.php) | Runs the real SQL against a tiny fake database in memory, with 11 invented students, one per tricky case (archived, in two halaqas, duplicate attendance rows…). It checks each card counts exactly the right ones |

It's the same idea as component tests with mock data, but for queries. Run them with:

```bash
./vendor/bin/phpunit tests/Unit/Dashboard --filter TodayFollowUp
```

---

## One-line summary

| What you see in the SPA | Where it comes from |
|---|---|
| Card numbers | `dayCounts()` in the repository: one SQL query counts everything |
| Clicking a card opens a list | `studentRows()` / `pendingSectionRows()`: same base query plus a filter |
| Changing a student's status | The existing `POST /attendance` (unchanged), and the card updates because nothing is cached |
| Reminder button | `sendReminders()` → saves a row → notifies teachers after the save |
| "Reminded at 3:02" | Read back from the new `section_follow_up_reminders` table |

---

## Every file touched

**New files**

- [app/Enums/TodayFollowUpTypeEnum.php](app/Enums/TodayFollowUpTypeEnum.php) — the five card types
- [app/DTO/Dashboard/TodayFollowUpDayDTO.php](app/DTO/Dashboard/TodayFollowUpDayDTO.php) — the resolved day
- [app/Http/Requests/Api/Dashboard/TodayFollowUpStudentsRequest.php](app/Http/Requests/Api/Dashboard/TodayFollowUpStudentsRequest.php) — student list validation
- [app/Http/Requests/Api/Dashboard/TodayFollowUpSectionsRequest.php](app/Http/Requests/Api/Dashboard/TodayFollowUpSectionsRequest.php) — halaqa list validation
- [app/Http/Requests/Api/Dashboard/TodayFollowUpReminderRequest.php](app/Http/Requests/Api/Dashboard/TodayFollowUpReminderRequest.php) — reminder validation
- [app/Http/Resources/Concerns/ResolvesPrepareForExamInfo.php](app/Http/Resources/Concerns/ResolvesPrepareForExamInfo.php) — shared exam-prep label
- [app/Http/Resources/Dashboard/TodayFollowUpStudentResource.php](app/Http/Resources/Dashboard/TodayFollowUpStudentResource.php) — student row JSON
- [app/Http/Resources/Dashboard/TodayFollowUpSectionResource.php](app/Http/Resources/Dashboard/TodayFollowUpSectionResource.php) — halaqa row JSON
- [app/Models/SectionFollowUpReminder.php](app/Models/SectionFollowUpReminder.php) — reminder model
- [app/Notifications/MobilePushNotification.php](app/Notifications/MobilePushNotification.php) — push to the mobile app
- [app/Repositories/Contracts/TodayFollowUpRepositoryInterface.php](app/Repositories/Contracts/TodayFollowUpRepositoryInterface.php) — repository contract
- [app/Repositories/TodayFollowUpRepository.php](app/Repositories/TodayFollowUpRepository.php) — all the SQL
- [app/Services/Dashboard/TodayFollowUpService.php](app/Services/Dashboard/TodayFollowUpService.php) — the business logic
- [database/migrations/2026_10_07_000001_create_section_follow_up_reminders_table.php](database/migrations/2026_10_07_000001_create_section_follow_up_reminders_table.php) — the new table
- [tests/Unit/Dashboard/TodayFollowUpRequestsTest.php](tests/Unit/Dashboard/TodayFollowUpRequestsTest.php), [TodayFollowUpRulesTest.php](tests/Unit/Dashboard/TodayFollowUpRulesTest.php), [TodayFollowUpRepositoryTest.php](tests/Unit/Dashboard/TodayFollowUpRepositoryTest.php) — tests

**Changed files**

- [routes/api/v1/dashboard/dashboard.php](routes/api/v1/dashboard/dashboard.php) — 4 new routes
- [app/Http/Controllers/Api/V1/Dashboard/ManagerDashboardController.php](app/Http/Controllers/Api/V1/Dashboard/ManagerDashboardController.php) — 4 new methods
- [app/Services/Dashboard/ManagerDashboardService.php](app/Services/Dashboard/ManagerDashboardService.php) — `todayState()` made public
- [app/Services/Notification/NotificationService.php](app/Services/Notification/NotificationService.php) — `notifySectionTeachers()` and the mobile push
- [app/Enums/NotificationTypeEnum.php](app/Enums/NotificationTypeEnum.php) — 2 new notification types
- [app/Http/Resources/RecitationStudentResource.php](app/Http/Resources/RecitationStudentResource.php) — now uses the shared trait (same output)
- [app/Observers/StudentAttendanceObserver.php](app/Observers/StudentAttendanceObserver.php) — parent notified at most once a day
- [app/Constants/CacheKeys.php](app/Constants/CacheKeys.php) — the "parent notified today" key
- [lang/ar/messages.php](lang/ar/messages.php), [lang/ar/notifications.php](lang/ar/notifications.php) — Arabic texts

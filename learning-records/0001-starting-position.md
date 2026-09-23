# Starting position: strong frontend, near-zero backend

Ahmed has ~4 years of frontend experience — Vue (primary), React/Next, vanilla JS, jQuery,
HTML/CSS. Backend experience is close to zero: he wrote SQL "long long time ago" and has
basic Composer familiarity. He has never written server-side code that produces a response.

**Why this matters for teaching:** the usual "learn Laravel" path assumes PHP fluency and
request/response intuition. Neither can be assumed. But his frontend depth is a genuine asset
that is being actively used as scaffolding — most backend concepts have a frontend analogue he
already owns (routing ≈ Vue Router, Blade ≈ components/slots, Eloquent ≈ an API client,
middleware ≈ navigation guards, migrations ≈ schema-as-code). Teach by analogy first, then
show where the analogy breaks.

**Implications:**
- Do not skip PHP syntax, but teach only the PHP the codebase actually uses
- The request/response lifecycle is the single highest-leverage first concept — everything else
  hangs off it
- Vue-first background means Inertia is the natural bridge if the codebase uses it
- SQL needs a refresher, but through Eloquent rather than raw SQL first

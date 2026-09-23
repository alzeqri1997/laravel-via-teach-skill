/* quiz.js — reusable retrieval-practice component for all lessons.
 *
 * Two widgets:
 *   1. Multiple choice  — <div class="quiz" data-answer="b"> with .opt buttons
 *   2. Free recall      — <div class="recall"> reveal-after-attempt, self-graded
 *
 * Design notes:
 *  - Options are NOT auto-shuffled: lessons must author equal-length options so
 *    formatting leaks no clues. Shuffling would break the authored balance.
 *  - Wrong answers do not lock. Retrieval + corrective feedback beats one-shot scoring.
 *  - Free recall forces an attempt *before* revealing. Seeing the answer without
 *    trying first produces fluency, not storage strength.
 */

(function () {
  'use strict';

  function initMultipleChoice() {
    document.querySelectorAll('.quiz').forEach(function (quiz) {
      var correct = quiz.dataset.answer;
      var opts = quiz.querySelectorAll('.opt');
      var fb = quiz.querySelector('.feedback');
      if (!fb) return;

      opts.forEach(function (opt) {
        opt.addEventListener('click', function () {
          var chosen = opt.dataset.opt;
          var isRight = chosen === correct;

          opts.forEach(function (o) { o.classList.remove('chosen'); });
          opt.classList.add('chosen');

          if (isRight) {
            opt.classList.add('right');
            opt.classList.remove('wrong');
            opts.forEach(function (o) { o.disabled = true; });
            fb.className = 'feedback show right';
            fb.innerHTML = '<strong>Correct.</strong> ' + (quiz.dataset.why || '');
          } else {
            opt.classList.add('wrong');
            fb.className = 'feedback show wrong';
            var hint = quiz.dataset['hint' + chosen.toUpperCase()];
            fb.innerHTML = '<strong>Not quite.</strong> ' +
              (hint || 'Have another look at the section above, then try again.');
          }
        });
      });
    });
  }

  function initRecall() {
    document.querySelectorAll('.recall').forEach(function (card) {
      var btn = card.querySelector('.reveal-btn');
      var answer = card.querySelector('.recall-answer');
      var input = card.querySelector('textarea');
      if (!btn || !answer) return;

      btn.addEventListener('click', function () {
        // Force an attempt first — retrieval effort is the point.
        if (input && input.value.trim().length < 3) {
          input.classList.add('nudge');
          input.placeholder = 'Write something first — even a wrong guess builds the memory.';
          input.focus();
          setTimeout(function () { input.classList.remove('nudge'); }, 1200);
          return;
        }
        answer.classList.add('show');
        btn.remove();
      });
    });
  }

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    initMultipleChoice();
    initRecall();
  });
})();

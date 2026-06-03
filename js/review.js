/* review.js — build review question sets.
 *   Mixed  — pull words/sentences from every COMPLETED lesson and quiz on them.
 *   Weak   — quiz only on items you previously got wrong (the miss pile).
 * Both reuse Quiz.fromTriples so the question format/grading matches lessons.
 */
window.Review = (function () {

  function triplesOf(lesson) {
    var t = [];
    lesson.vocab.forEach(function (v) { t.push({ en: v.en, ko: v.ko, romaji: v.romaji }); });
    lesson.sentences.forEach(function (s) { t.push({ en: s.en, ko: s.ko, romaji: s.romaji }); });
    return t;
  }

  function completedLessons() {
    return (window.LESSONS || []).filter(function (l) {
      return window.Storage.getLesson(l.id).done;
    });
  }

  function buildMixed() {
    var all = [];
    completedLessons().forEach(function (l) { all = all.concat(triplesOf(l)); });
    return window.Quiz.fromTriples(all, 10);
  }

  function buildWeak() {
    var misses = window.Storage.getMisses();   // [{en, ko, romaji}]
    return window.Quiz.fromTriples(misses, Math.min(12, misses.length));
  }

  return {
    buildMixed: buildMixed,
    buildWeak: buildWeak,
    completedCount: function () { return completedLessons().length; }
  };
})();

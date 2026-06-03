/* practice.js — sentence-level practice items from a lesson's sentences.
 * Two kinds:
 *   'blank'     — show the sentence with the grammar chunk hidden; type the missing part
 *   'translate' — show the English; type the whole Korean sentence
 * Reuses Quiz.normalize for forgiving grading.
 */
window.Practice = (function () {

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function blanked(sentence) {
    // Replace the blankWord span with a blank marker.
    if (!sentence.blankWord) return sentence.ko;
    return sentence.ko.replace(sentence.blankWord, "____");
  }

  function build(lesson) {
    var items = [];

    lesson.sentences.forEach(function (s) {
      if (s.blankWord) {
        items.push({
          kind: "blank",
          display: blanked(s),       // sentence with ____
          en: s.en,
          answer: s.blankWord,       // just the missing chunk
          fullKo: s.ko,
          romaji: s.romaji
        });
      }
      items.push({
        kind: "translate",
        display: s.en,               // English prompt
        en: s.en,
        answer: s.ko,                // whole sentence
        fullKo: s.ko,
        romaji: s.romaji
      });
    });

    // Each item carries its own checker.
    items.forEach(function (it) {
      it.check = function (input) {
        return window.Quiz.normalize(input) === window.Quiz.normalize(it.answer);
      };
    });

    return shuffle(items).slice(0, Math.min(8, items.length));
  }

  return { build: build };
})();

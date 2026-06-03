/* quiz.js — build typed quiz questions from a lesson (no multiple choice).
 * Two kinds:
 *   'type'   — English prompt, learner types the 한글  (active production)
 *   'listen' — TTS speaks the 한글, learner types what they heard (ear-training)
 * Grading is forgiving exact-match: trim, collapse spaces, drop trailing . ? ! ~
 */
window.Quiz = (function () {

  function normalize(s) {
    return (s || "")
      .trim()
      .replace(/\s+/g, " ")
      .replace(/[.?!~]+$/g, "")
      .trim();
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function makeQuestion(kind, promptText, answerKo, romaji, en) {
    return {
      kind: kind,                 // 'type' | 'listen'
      promptText: promptText,     // English (type) or "" (listen)
      answer: answerKo,           // correct 한글
      romaji: romaji || "",
      en: en || promptText || "", // English meaning (kept for the weak-item pile)
      check: function (input) {
        return normalize(input) === normalize(answerKo);
      }
    };
  }

  // Build a mixed set of typed questions from {en, ko, romaji} triples.
  // Alternates type-the-Korean / listening; falls back to type if a triple
  // has no English to prompt with.
  function fromTriples(triples, count) {
    var usable = (triples || []).filter(function (t) { return t && t.ko; });
    var picked = shuffle(usable).slice(0, Math.min(count || 8, usable.length));
    var questions = picked.map(function (item, i) {
      var listen = (i % 2 === 1) || !item.en;   // need English for a 'type' prompt
      if (listen) return makeQuestion("listen", "", item.ko, item.romaji, item.en);
      return makeQuestion("type", item.en, item.ko, item.romaji, item.en);
    });
    return shuffle(questions);
  }

  // Build ~8 questions for a single lesson (vocab + sentences).
  function build(lesson) {
    var pool = [];
    lesson.vocab.forEach(function (v) { pool.push({ en: v.en, ko: v.ko, romaji: v.romaji }); });
    lesson.sentences.forEach(function (s) { pool.push({ en: s.en, ko: s.ko, romaji: s.romaji }); });
    return fromTriples(pool, 8);
  }

  return { build: build, fromTriples: fromTriples, normalize: normalize };
})();

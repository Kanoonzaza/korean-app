/* exam.js — build multiple-choice questions for checkpoint / mock-TOPIK tests.
 *
 * Authentic TOPIK-style item formats, generated from the lessons + distractors:
 *   - Reading (meaning):  see Korean → choose the English meaning
 *   - Reading (blank):    sentence with a ____ → choose the right word/ending
 *   - Listening (meaning): hear Korean (TTS) → choose the English meaning
 *
 * build(levelKey, n): levelKey = 4 | 5 (checkpoint for that level) | "all" (mock TOPIK).
 */
window.Exam = (function () {
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function sample(arr, n) { return shuffle(arr).slice(0, n); }

  function pool(levelKey) {
    var vocab = [], sentences = [];
    (window.LESSONS || []).forEach(function (l) {
      if (levelKey !== "all" && l.level !== levelKey) return;
      (l.vocab || []).forEach(function (v) { vocab.push({ en: v.en, ko: v.ko, romaji: v.romaji }); });
      (l.sentences || []).forEach(function (s) {
        if (s.blankWord) sentences.push({ en: s.en, ko: s.ko, romaji: s.romaji, blankWord: s.blankWord });
      });
    });
    return { vocab: vocab, sentences: sentences };
  }

  function allEnglish() {
    var s = {};
    (window.LESSONS || []).forEach(function (l) {
      (l.vocab || []).forEach(function (v) { s[v.en] = 1; });
      (l.sentences || []).forEach(function (x) { s[x.en] = 1; });
    });
    return Object.keys(s);
  }
  function allBlanks() {
    var s = {};
    (window.LESSONS || []).forEach(function (l) {
      (l.sentences || []).forEach(function (x) { if (x.blankWord) s[x.blankWord] = 1; });
    });
    return Object.keys(s);
  }

  function meaningQ(item, audio) {
    var distract = sample(allEnglish().filter(function (e) { return e !== item.en; }), 3);
    var options = shuffle([item.en].concat(distract));
    return {
      promptKind: audio ? "audio" : "text",
      promptText: item.ko, promptKo: item.ko, romaji: item.romaji,
      label: audio ? "🎧 Listen and choose the meaning" : "📖 Choose the meaning",
      options: options, answerIndex: options.indexOf(item.en)
    };
  }
  function blankQ(s) {
    var display = s.ko.replace(s.blankWord, "____");
    var distract = sample(allBlanks().filter(function (b) { return b !== s.blankWord; }), 3);
    var options = shuffle([s.blankWord].concat(distract));
    return {
      promptKind: "text",
      promptText: display, promptKo: s.ko, romaji: s.romaji,
      label: "📝 Choose the word for the blank",
      options: options, answerIndex: options.indexOf(s.blankWord)
    };
  }

  function build(levelKey, n) {
    n = n || 10;
    var p = pool(levelKey);
    var v = shuffle(p.vocab), s = shuffle(p.sentences);
    var qs = [], vi = 0, si = 0;
    while (qs.length < n && (vi < v.length || si < s.length)) {
      var slot = qs.length % 3;
      if (slot === 2 && si < s.length) { qs.push(blankQ(s[si++])); }
      else if (vi < v.length) { qs.push(meaningQ(v[vi++], qs.length % 2 === 1)); }
      else if (si < s.length) { qs.push(meaningQ(s[si++], qs.length % 2 === 1)); }
      else break;
    }
    return shuffle(qs);
  }

  return { build: build };
})();

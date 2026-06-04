/* srs.js — spaced-repetition scheduling (Leitner boxes).
 *
 * Cards = every vocab word + example sentence from COMPLETED lessons.
 * "Due now" = scheduled cards whose due date has passed + a capped number of
 * brand-new cards (so it never piles up). Answering a card reschedules it via
 * Storage.srsGrade (correct → longer interval, wrong → back to 1 day).
 */
window.SRS = (function () {
  var NEW_CAP = 15;       // new cards introduced per session
  var SESSION_CAP = 25;   // max questions per review session

  // ko -> {en, ko, romaji} for every item in the curriculum
  function index() {
    var m = {};
    (window.LESSONS || []).forEach(function (l) {
      (l.vocab || []).forEach(function (v) { if (!m[v.ko]) m[v.ko] = { en: v.en, ko: v.ko, romaji: v.romaji }; });
      (l.sentences || []).forEach(function (s) { if (!m[s.ko]) m[s.ko] = { en: s.en, ko: s.ko, romaji: s.romaji }; });
    });
    return m;
  }

  function completedKeys() {
    var keys = [];
    (window.LESSONS || []).forEach(function (l) {
      if (window.Storage.getLesson(l.id).done) {
        (l.vocab || []).forEach(function (v) { keys.push(v.ko); });
        (l.sentences || []).forEach(function (s) { keys.push(s.ko); });
      }
    });
    return keys;
  }

  // Items due for review right now (existing-due first, then up to NEW_CAP new).
  function dueCards() {
    var srs = window.Storage.getSrs();
    var idx = index();
    var now = Date.now();
    var out = [], seen = {};

    Object.keys(srs).forEach(function (ko) {
      if ((srs[ko].due || 0) <= now && idx[ko] && !seen[ko]) { out.push(idx[ko]); seen[ko] = 1; }
    });

    var newCount = 0;
    completedKeys().forEach(function (ko) {
      if (!srs[ko] && idx[ko] && !seen[ko] && newCount < NEW_CAP) { out.push(idx[ko]); seen[ko] = 1; newCount++; }
    });
    return out;
  }

  function count() { return dueCards().length; }

  // Build a shuffled set of quiz questions (type / listen) for the due cards.
  function buildQuestions() { return window.Quiz.fromTriples(dueCards(), SESSION_CAP); }

  return { dueCards: dueCards, count: count, buildQuestions: buildQuestions };
})();

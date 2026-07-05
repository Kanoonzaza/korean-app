/* cards.js — Anki-style flashcards over the continuation deck (WORDSNEXT).
 *
 * Every word makes TWO cards, like the user's Anki setup:
 *   KE (Korean → English, recognition) and EK (English → Korean, recall).
 * New cards are introduced in word order with the EK card lagging LAG words
 * behind its KE card (the "lag200" reorder): the queue position of KE word i
 * is i, of EK word i is i + LAG. Per-card schedule lives in Storage under
 * "__cards" keyed by "KE|word" / "EK|word"; a card with no entry is "new".
 * Grading is a simplified SM-2: learning steps (1 min → 10 min), then day
 * intervals growing by an ease factor; "Again" relearns with a shrunken
 * interval. Separate from the Leitner __srs used by Review → Today's review.
 */
window.Cards = (function () {
  var MIN = 60000, DAY = 86400000;
  var LAG = 200;                // EK card of word i unlocks at position i + LAG
  var LEARN_STEPS = [1, 10];    // minutes
  var HARD_LEARN_MIN = 5;       // "Hard" on a learning card: retry in 5 min
  var RELEARN_MIN = 10;         // relearning step
  var GRAD_IVL = 1, EASY_IVL = 4;    // graduation intervals (days)
  var DEFAULT_NEW = 20;

  var cardList = null;          // built once: [{id, dir, w, pos}] in intro order

  function deck() {
    if (cardList) return cardList;
    var words = window.WORDSNEXT || [];
    var out = [];
    words.forEach(function (w, i) {
      out.push({ id: "KE|" + w.ko, dir: "KE", w: w, pos: i * 2 });        // ties: KE first
      out.push({ id: "EK|" + w.ko, dir: "EK", w: w, pos: (i + LAG) * 2 + 1 });
    });
    out.sort(function (a, b) { return a.pos - b.pos; });
    cardList = out;
    return out;
  }

  function cardById(id) {
    var d = deck();
    for (var i = 0; i < d.length; i++) if (d[i].id === id) return d[i];
    return null;
  }

  function dayKey(t) {
    function p(x) { return (x < 10 ? "0" : "") + x; }
    return t.getFullYear() + "-" + p(t.getMonth() + 1) + "-" + p(t.getDate());
  }
  function endOfToday() {
    var d = new Date();
    d.setHours(23, 59, 59, 999);
    return d.getTime();
  }

  // Meta rolls over automatically when the calendar day changes.
  function meta() {
    var m = Storage.getCardsMeta();
    var today = dayKey(new Date());
    if (m.day !== today) m = { day: today, introduced: 0, newPerDay: m.newPerDay == null ? DEFAULT_NEW : m.newPerDay };
    if (m.newPerDay == null) m.newPerDay = DEFAULT_NEW;
    return m;
  }

  function newPerDay() { return meta().newPerDay; }
  function setNewPerDay(n) {
    var m = meta();
    m.newPerDay = Math.max(0, Math.min(100, n));
    Storage.setCardsMeta(m);
  }

  /* ----- counts (deck screen + study header) ----- */
  function counts() {
    var st = Storage.getCards();
    var eod = endOfToday();
    var learn = 0, due = 0, seen = 0;
    deck().forEach(function (c) {
      var s = st[c.id];
      if (!s) return;
      seen++;
      if ((s.due || 0) > eod) return;
      if (s.st === "rev") due++; else learn++;
    });
    var m = meta();
    var fresh = Math.max(0, m.newPerDay - m.introduced);
    var unseen = deck().length - seen;
    return {
      nw: Math.min(fresh, unseen),
      learn: learn,
      due: due,
      seen: seen,
      total: deck().length,
      words: (window.WORDSNEXT || []).length
    };
  }

  function available() {
    var c = counts();
    return c.nw + c.learn + c.due;
  }

  /* ----- queue ----- */
  // Next card to show: learning due now → reviews due today → a new card in
  // intro order (within today's allotment) → learn-ahead on the earliest
  // learning card still due today. Null when the session is finished.
  function next() {
    var st = Storage.getCards();
    var now = Date.now(), eod = endOfToday();
    var learnNow = null, revDue = null, learnToday = null, firstNew = null;

    deck().forEach(function (c) {
      var s = st[c.id];
      if (!s) { if (!firstNew) firstNew = c; return; }
      if ((s.due || 0) > eod) return;
      if (s.st === "rev") {
        if (!revDue || s.due < st[revDue.id].due) revDue = c;
      } else if (s.due <= now) {
        if (!learnNow || s.due < st[learnNow.id].due) learnNow = c;
      } else {
        if (!learnToday || s.due < st[learnToday.id].due) learnToday = c;
      }
    });
    if (learnNow) return learnNow;
    if (revDue) return revDue;
    if (firstNew && meta().introduced < meta().newPerDay) return firstNew;
    return learnToday;
  }

  /* ----- grading ----- */
  function graduate(ivl, ef) {
    return { st: "rev", ivl: ivl, ef: ef, due: Date.now() + ivl * DAY };
  }
  function learning(step, minutes, ef) {
    return { st: "learn", step: step, ef: ef, due: Date.now() + minutes * MIN };
  }

  // g: 0 = Again, 1 = Hard, 2 = Good, 3 = Easy.
  function schedule(cur, g) {
    var ef = (cur && cur.ef) || 2.5;

    if (!cur || cur.st === "learn") {
      var step = cur ? (cur.step || 0) : 0;
      if (g === 0) return learning(0, LEARN_STEPS[0], ef);
      if (g === 1) return learning(step, HARD_LEARN_MIN, ef);
      if (g === 3) return graduate(EASY_IVL, ef);
      var nxt = step + 1;
      if (nxt >= LEARN_STEPS.length) return graduate(GRAD_IVL, ef);
      return learning(nxt, LEARN_STEPS[nxt], ef);
    }

    if (cur.st === "relearn") {
      var ivl = cur.ivl || 1;
      if (g <= 1) return { st: "relearn", ivl: ivl, ef: ef, due: Date.now() + RELEARN_MIN * MIN };
      return graduate(g === 3 ? ivl + 1 : ivl, ef);
    }

    // Review card.
    var i = cur.ivl || 1;
    if (g === 0) {
      return {
        st: "relearn",
        ivl: Math.max(1, Math.floor(i * 0.25)),
        ef: Math.max(1.3, ef - 0.2),
        due: Date.now() + RELEARN_MIN * MIN
      };
    }
    if (g === 1) return graduate(Math.max(i + 1, Math.round(i * 1.2)), Math.max(1.3, ef - 0.15));
    if (g === 3) return graduate(Math.max(i + 2, Math.round(i * ef * 1.3)), ef + 0.15);
    return graduate(Math.max(i + 1, Math.round(i * ef)), ef);
  }

  function grade(id, g) {
    var st = Storage.getCards();
    var cur = st[id] || null;
    if (!cur) {                       // first time seen: counts against today's new allotment
      var m = meta();
      m.introduced++;
      Storage.setCardsMeta(m);
    }
    Storage.setCard(id, schedule(cur, g));
  }

  /* ----- interval previews shown above the grade buttons ----- */
  function fmtIvl(days) {
    if (days < 30) return days + "d";
    if (days < 365) return (Math.round(days / 3) / 10) + "mo";
    return (Math.round(days / 36.5) / 10) + "y";
  }
  function fmtSched(s) {
    if (s.st === "rev") return fmtIvl(s.ivl);
    var min = Math.round((s.due - Date.now()) / MIN);
    return "<" + Math.max(1, min) + "m";
  }
  function previews(id) {
    var cur = Storage.getCards()[id] || null;
    return [0, 1, 2, 3].map(function (g) { return fmtSched(schedule(cur, g)); });
  }

  return {
    counts: counts,
    available: available,
    next: next,
    grade: grade,
    previews: previews,
    newPerDay: newPerDay,
    setNewPerDay: setNewPerDay,
    cardById: cardById
  };
})();

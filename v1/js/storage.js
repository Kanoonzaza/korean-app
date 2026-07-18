/* storage.js — progress + scores in localStorage (namespaced under one key).
 * Shape: { "4.1": { furthestStep: 1..5, done: bool, bestScore: 0..100 }, ... }
 * Falls back to an in-memory object if localStorage is unavailable.
 */
window.Storage = (function () {
  var KEY = "koreanApp.v1";
  var memory = {};        // fallback store
  var usable = true;
  var subs = [];          // change listeners (used by cloud sync)
  var muted = false;      // suppress notifications during a remote merge

  function load() {
    if (!usable) return memory;
    try {
      var raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      usable = false;
      console.warn("localStorage unavailable — progress will not persist this session.");
      return memory;
    }
  }

  function save(data) {
    memory = data;
    if (usable) {
      try {
        localStorage.setItem(KEY, JSON.stringify(data));
      } catch (e) {
        usable = false;
        console.warn("Could not save progress (storage full or blocked).");
      }
    }
    if (!muted) subs.forEach(function (fn) { try { fn(data); } catch (e) {} });
  }

  function entry(data, id) {
    if (!data[id]) data[id] = { furthestStep: 0, done: false, bestScore: null };
    return data[id];
  }

  function dayKey(t) {
    function p(x) { return (x < 10 ? "0" : "") + x; }
    return t.getFullYear() + "-" + p(t.getMonth() + 1) + "-" + p(t.getDate());
  }

  return {
    getProgress: function () { return load(); },

    getLesson: function (id) {
      var data = load();
      return data[id] || { furthestStep: 0, done: false, bestScore: null };
    },

    // Record the furthest step (1..5) the learner has reached in a lesson.
    setStep: function (id, step) {
      var data = load();
      var e = entry(data, id);
      if (step > e.furthestStep) e.furthestStep = step;
      save(data);
    },

    setLessonDone: function (id) {
      var data = load();
      var e = entry(data, id);
      e.done = true;
      e.furthestStep = 5;
      save(data);
    },

    // Keep the best (highest) quiz score, as a 0..100 percentage.
    saveScore: function (id, pct) {
      var data = load();
      var e = entry(data, id);
      if (e.bestScore === null || pct > e.bestScore) e.bestScore = pct;
      save(data);
    },

    // Percent-complete for a lesson card (furthest step out of 5).
    percent: function (id) {
      var e = this.getLesson(id);
      if (e.done) return 100;
      return Math.round((e.furthestStep / 5) * 100);
    },

    /* ----- weak-item pile (for Review) ----- *
     * Stored under "__misses" keyed by the Korean answer, so it never collides
     * with lesson ids. Each value is a {en, ko, romaji} triple a review question
     * can be rebuilt from. Answering an item correctly anywhere clears it.
     */
    addMiss: function (item) {
      if (!item || !item.ko) return;
      var d = load();
      if (!d.__misses) d.__misses = {};
      d.__misses[item.ko] = { en: item.en || "", ko: item.ko, romaji: item.romaji || "" };
      save(d);
    },
    clearMiss: function (ko) {
      var d = load();
      if (d.__misses && d.__misses[ko]) { delete d.__misses[ko]; save(d); }
    },
    getMisses: function () {
      var m = load().__misses || {};
      return Object.keys(m).map(function (k) { return m[k]; });
    },
    missCount: function () { return this.getMisses().length; },

    /* ----- vocabulary bookmarks (⭐) ----- */
    toggleBookmark: function (ko) {
      var d = load();
      if (!d.__bookmarks) d.__bookmarks = {};
      if (d.__bookmarks[ko]) delete d.__bookmarks[ko]; else d.__bookmarks[ko] = true;
      save(d);
      return !!(load().__bookmarks || {})[ko];
    },
    isBookmarked: function (ko) { return !!(load().__bookmarks || {})[ko]; },
    bookmarkCount: function () { return Object.keys(load().__bookmarks || {}).length; },

    /* ----- per-word review counts (flashcard reveals) ----- */
    incWordView: function (ko) {
      var d = load();
      if (!d.__wordviews) d.__wordviews = {};
      d.__wordviews[ko] = (d.__wordviews[ko] || 0) + 1;
      save(d);
      return d.__wordviews[ko];
    },
    getWordView: function (ko) { return (load().__wordviews || {})[ko] || 0; },

    /* ----- spaced repetition schedule (Leitner) ----- *
     * __srs[ko] = { box: 1..6, due: <ms timestamp> }
     */
    getSrs: function () { return load().__srs || {}; },
    getBookmarks: function () { return load().__bookmarks || {}; },
    // A miss anywhere sends the card back to box 1, due immediately.
    srsMiss: function (ko) {
      var d = load();
      if (!d.__srs) d.__srs = {};
      d.__srs[ko] = { box: 1, due: Date.now() };
      save(d);
    },
    srsGrade: function (ko, correct) {
      var DAY = 86400000;
      var DAYS = { 1: 1, 2: 3, 3: 7, 4: 16, 5: 35, 6: 90 };
      var d = load();
      if (!d.__srs) d.__srs = {};
      var cur = d.__srs[ko] || { box: 0 };
      var box = correct ? Math.min((cur.box || 0) + 1, 6) : 1;
      d.__srs[ko] = { box: box, due: Date.now() + (DAYS[box] || 1) * DAY };
      save(d);
    },

    /* ----- Anki-style card schedule (Cards tab) ----- *
     * __cards[ko] = { st: "learn"|"relearn"|"rev", step, ivl, ef, due, u }
     * __cardsMeta = { day: "YYYY-MM-DD", introduced, newPerDay, u }
     * "u" = last-updated ms, used by the sync merge (most recent wins).
     */
    getCards: function () { return load().__cards || {}; },
    setCard: function (ko, state) {
      var d = load();
      if (!d.__cards) d.__cards = {};
      state.u = Date.now();
      d.__cards[ko] = state;
      save(d);
    },
    removeCard: function (id) {
      var d = load();
      if (d.__cards && d.__cards[id]) { delete d.__cards[id]; save(d); }
    },
    // One-time cleanup: cards graded before the continuation deck were keyed
    // by the bare word (no "KE|"/"EK|" prefix) and are dead entries now.
    purgeLegacyCards: function () {
      var d = load();
      if (!d.__cards) return;
      var changed = false;
      Object.keys(d.__cards).forEach(function (k) {
        if (k.indexOf("|") < 0) { delete d.__cards[k]; changed = true; }
      });
      if (changed) save(d);
    },
    getCardsMeta: function () { return load().__cardsMeta || {}; },
    setCardsMeta: function (m) {
      var d = load();
      m.u = Date.now();
      d.__cardsMeta = m;
      save(d);
    },

    /* ----- exam / checkpoint results ----- *
     * __exams[key] = { best: 0..100, passed: bool }   (key: "4", "5", "topik")
     */
    saveExam: function (key, pct) {
      var d = load();
      if (!d.__exams) d.__exams = {};
      var cur = d.__exams[key] || { best: null };
      if (cur.best == null || pct > cur.best) cur.best = pct;
      cur.passed = cur.best >= 70;
      d.__exams[key] = cur;
      save(d);
    },
    getExam: function (key) { return (load().__exams || {})[key] || null; },

    /* ----- daily answer stats (retention) ----- *
     * __stats["YYYY-MM-DD"] = { r: <right>, w: <wrong> } — every graded answer
     * anywhere (quiz, practice, review, exam, cards) increments one counter.
     */
    recordAnswer: function (ok) {
      var d = load();
      if (!d.__stats) d.__stats = {};
      var k = dayKey(new Date());
      var s = d.__stats[k] || { r: 0, w: 0 };
      if (ok) s.r++; else s.w++;
      d.__stats[k] = s;
      save(d);
    },
    getStats: function () { return load().__stats || {}; },

    /* ----- reading passages ----- *
     * __reads[id] = { best: 0..100 }
     */
    saveRead: function (id, pct) {
      var d = load();
      if (!d.__reads) d.__reads = {};
      var cur = d.__reads[id] || { best: null };
      if (cur.best == null || pct > cur.best) cur.best = pct;
      d.__reads[id] = cur;
      save(d);
    },
    getRead: function (id) { return (load().__reads || {})[id] || null; },

    /* ----- daily streak ----- *
     * __days["2026-07-03"] = 1 for every day with at least one answered question.
     */
    markActivity: function () {
      var d = load();
      if (!d.__days) d.__days = {};
      var k = dayKey(new Date());
      if (!d.__days[k]) { d.__days[k] = 1; save(d); }
    },
    streak: function () {
      var days = load().__days || {};
      var t = new Date();
      if (!days[dayKey(t)]) t.setDate(t.getDate() - 1);  // today not studied yet? count from yesterday
      var n = 0;
      while (days[dayKey(t)]) { n++; t.setDate(t.getDate() - 1); }
      return n;
    },

    /* ----- display preference (device-local) ----- */
    romajiEnabled: function () { try { return localStorage.getItem("koreanApp.romaji") !== "0"; } catch (e) { return true; } },
    setRomajiEnabled: function (on) { try { localStorage.setItem("koreanApp.romaji", on ? "1" : "0"); } catch (e) {} },

    /* ----- TTS speed preference (device-local) ----- */
    ttsRate: function () {
      try { var r = parseFloat(localStorage.getItem("koreanApp.ttsrate")); return (r >= 0.5 && r <= 1.5) ? r : 0.92; }
      catch (e) { return 0.92; }
    },
    setTtsRate: function (r) { try { localStorage.setItem("koreanApp.ttsrate", String(r)); } catch (e) {} },

    /* ----- move progress between devices ----- */
    exportData: function () { return JSON.stringify(load(), null, 2); },
    importData: function (jsonStr) {
      try {
        var d = JSON.parse(jsonStr);
        if (d && typeof d === "object") { save(d); return true; }
      } catch (e) {}
      return false;
    },

    /* ----- cloud sync support ----- */
    // Subscribe to be notified after any progress change (used to push to the cloud).
    subscribe: function (fn) { if (typeof fn === "function") subs.push(fn); },

    // Merge a remote progress object INTO local without losing anything:
    // per lesson keep the better value; union the weak-item pile. Does not re-notify.
    mergeData: function (remote) {
      var out = JSON.parse(JSON.stringify(load()));
      if (!remote || typeof remote !== "object") return out;
      Object.keys(remote).forEach(function (k) {
        if (k === "__misses") {
          out.__misses = out.__misses || {};
          var rm = remote.__misses || {};
          Object.keys(rm).forEach(function (ko) { if (!out.__misses[ko]) out.__misses[ko] = rm[ko]; });
          return;
        }
        if (k === "__bookmarks") {
          out.__bookmarks = out.__bookmarks || {};
          var rb = remote.__bookmarks || {};
          Object.keys(rb).forEach(function (ko) { out.__bookmarks[ko] = true; });
          return;
        }
        if (k === "__days") {
          out.__days = out.__days || {};
          var rd = remote.__days || {};
          Object.keys(rd).forEach(function (day) { out.__days[day] = 1; });
          return;
        }
        if (k === "__wordviews") {
          out.__wordviews = out.__wordviews || {};
          var rw = remote.__wordviews || {};
          Object.keys(rw).forEach(function (ko) {
            out.__wordviews[ko] = Math.max(out.__wordviews[ko] || 0, rw[ko] || 0);
          });
          return;
        }
        if (k === "__srs") {
          out.__srs = out.__srs || {};
          var rs = remote.__srs || {};
          Object.keys(rs).forEach(function (ko) {
            var l = out.__srs[ko], r = rs[ko];
            if (!l || (r.due || 0) > (l.due || 0)) out.__srs[ko] = r; // keep most recent schedule
          });
          return;
        }
        if (k === "__cards") {
          out.__cards = out.__cards || {};
          var rc = remote.__cards || {};
          Object.keys(rc).forEach(function (ko) {
            if (ko.indexOf("|") < 0) return;            // ignore legacy bare-word keys
            var l = out.__cards[ko], r = rc[ko];
            if (!l || (r.u || 0) > (l.u || 0)) out.__cards[ko] = r; // most recent grading wins
          });
          return;
        }
        if (k === "__cardsMeta") {
          var lm = out.__cardsMeta, rm2 = remote.__cardsMeta;
          if (!lm) { out.__cardsMeta = rm2; return; }
          if (rm2 && lm.day === rm2.day) {
            // Same study day on both devices: new cards introduced on either count.
            lm.introduced = Math.max(lm.introduced || 0, rm2.introduced || 0);
            if ((rm2.u || 0) > (lm.u || 0)) lm.newPerDay = rm2.newPerDay;
          } else if (rm2 && (rm2.u || 0) > (lm.u || 0)) {
            out.__cardsMeta = rm2;
          }
          return;
        }
        if (k === "__stats") {
          out.__stats = out.__stats || {};
          var rst = remote.__stats || {};
          Object.keys(rst).forEach(function (day) {
            var l = out.__stats[day], r = rst[day] || {};
            if (!l) { out.__stats[day] = r; return; }
            l.r = Math.max(l.r || 0, r.r || 0);   // per-device max (avoids double-counting)
            l.w = Math.max(l.w || 0, r.w || 0);
          });
          return;
        }
        if (k === "__reads") {
          out.__reads = out.__reads || {};
          var rr2 = remote.__reads || {};
          Object.keys(rr2).forEach(function (id) {
            var l = out.__reads[id], r = rr2[id];
            if (!l || (r.best || 0) > (l.best || 0)) out.__reads[id] = r;
          });
          return;
        }
        if (k === "__exams") {
          out.__exams = out.__exams || {};
          var re = remote.__exams || {};
          Object.keys(re).forEach(function (x) {
            var l = out.__exams[x], r = re[x];
            if (!l || (r.best || 0) > (l.best || 0)) out.__exams[x] = r; // keep best score
          });
          return;
        }
        if (k.charAt(0) === "_") return;           // skip meta fields
        var r = remote[k];
        if (!r || typeof r !== "object") return;
        var l = out[k];
        if (!l) { out[k] = r; return; }
        var lb = (l.bestScore == null ? -1 : l.bestScore);
        var rb = (r.bestScore == null ? -1 : r.bestScore);
        var best = Math.max(lb, rb);
        out[k] = {
          furthestStep: Math.max(l.furthestStep || 0, r.furthestStep || 0),
          done: !!(l.done || r.done),
          bestScore: best < 0 ? null : best
        };
      });
      muted = true; save(out); muted = false;     // apply without triggering a push loop
      return out;
    }
  };
})();

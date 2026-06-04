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

    /* ----- spaced repetition schedule (Leitner) ----- *
     * __srs[ko] = { box: 1..6, due: <ms timestamp> }
     */
    getSrs: function () { return load().__srs || {}; },
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
        if (k === "__srs") {
          out.__srs = out.__srs || {};
          var rs = remote.__srs || {};
          Object.keys(rs).forEach(function (ko) {
            var l = out.__srs[ko], r = rs[ko];
            if (!l || (r.due || 0) > (l.due || 0)) out.__srs[ko] = r; // keep most recent schedule
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

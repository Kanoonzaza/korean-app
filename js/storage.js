/* storage.js — progress + scores in localStorage (namespaced under one key).
 * Shape: { "4.1": { furthestStep: 1..5, done: bool, bestScore: 0..100 }, ... }
 * Falls back to an in-memory object if localStorage is unavailable.
 */
window.Storage = (function () {
  var KEY = "koreanApp.v1";
  var memory = {};        // fallback store
  var usable = true;

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
    if (!usable) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
    } catch (e) {
      usable = false;
      console.warn("Could not save progress (storage full or blocked).");
    }
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

    /* ----- move progress between devices ----- */
    exportData: function () { return JSON.stringify(load(), null, 2); },
    importData: function (jsonStr) {
      try {
        var d = JSON.parse(jsonStr);
        if (d && typeof d === "object") { save(d); return true; }
      } catch (e) {}
      return false;
    }
  };
})();

/* glossary.js — "Words" flashcard list.
 * Words are grouped by level (collapsible). Each row shows only the 한글 first;
 * tap 🔊 to hear it and reveal the meaning, which also bumps that word's review
 * count. Search filters across all words; ⭐ filters to bookmarks.
 */
window.Glossary = (function () {
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function all() {
    var seen = {}, out = [];
    (window.LESSONS || []).forEach(function (l) {
      (l.vocab || []).forEach(function (v) {
        if (seen[v.ko]) return;
        seen[v.ko] = 1;
        out.push({ ko: v.ko, en: v.en, romaji: v.romaji, pos: v.pos || "", lesson: l.id, level: l.level, title: l.title });
      });
    });
    return out;
  }

  function match(it, term) {
    if (!term) return true;
    var t = term.trim().toLowerCase();
    if (!t) return true;
    return it.ko.indexOf(term.trim()) > -1 ||
      (it.en || "").toLowerCase().indexOf(t) > -1 ||
      (it.romaji || "").toLowerCase().indexOf(t) > -1;
  }

  /* ----- Core 5k frequency words (window.WORDS5K) ----- */
  var BAND = 100;   // words per collapsible band

  function fiveK() { return window.WORDS5K || []; }

  function row5kHTML(w) {
    var bm = window.Storage.isBookmarked(w.ko);
    var n = window.Storage.getWordView(w.ko);
    var r = window.RR ? window.RR(w.ko) : "";
    var sentence = w.sko
      ? '<div class="w5k-sent"><span class="ko-s">' + esc(w.sko) + "</span> " +
          '<button class="spk" data-speak="' + esc(w.sko) + '" title="Listen" aria-label="Listen">🔊</button>' +
          '<div class="muted small">' + esc(w.sen) + "</div></div>"
      : "";
    return (
      '<div class="word-row" data-ko="' + esc(w.ko) + '">' +
        '<div class="word-head">' +
          '<span class="ko">' + esc(w.ko) + "</span>" +
          '<div class="word-actions">' +
            '<span class="wrank muted small">#' + w.r + "</span>" +
            '<button class="spk" data-action="word-reveal" data-ko="' + esc(w.ko) + '" title="Hear &amp; reveal">🔊</button>' +
            '<span class="wcount" title="times you\'ve revealed this">×' + n + "</span>" +
            '<button class="bm' + (bm ? " on" : "") + '" data-action="bm" data-ko="' + esc(w.ko) + '" title="Bookmark — bookmarked words join your daily review">' +
              (bm ? "★" : "☆") + "</button>" +
          "</div>" +
        "</div>" +
        '<div class="word-meaning w5k">' +
          '<div><span class="en">' + esc(w.en) + "</span>" +
            (r ? ' <span class="romaji">' + esc(r) + "</span>" : "") + sentence + "</div>" +
          '<button class="hide-btn" data-action="word-hide" title="Hide to test again">↺</button>' +
        "</div>" +
      "</div>"
    );
  }

  // Body of one frequency band (rendered lazily when the band is opened).
  function bandHTML(i) {
    var words = fiveK().slice(i * BAND, (i + 1) * BAND);
    return '<div class="word-list">' + words.map(row5kHTML).join("") + "</div>";
  }

  function fiveKSectionHTML() {
    var all5k = fiveK();
    if (!all5k.length) return "";
    var nBands = Math.ceil(all5k.length / BAND);
    var bands = "";
    for (var i = 0; i < nBands; i++) {
      var from = all5k[i * BAND], to = all5k[Math.min((i + 1) * BAND, all5k.length) - 1];
      bands +=
        '<details class="lesson-group w5k-band" data-band="' + i + '">' +
          '<summary data-action="band" data-band="' + i + '">Words ' + (i * BAND + 1) + "–" +
            Math.min((i + 1) * BAND, all5k.length) +
            ' <span class="muted">(frequency #' + from.r + "–" + to.r + ")</span></summary>" +
          '<div class="band-body"></div>' +
        "</details>";
    }
    return (
      '<details class="lvl-group">' +
        "<summary>Core vocabulary · " + all5k.length + ' intermediate words <span class="muted">· by frequency</span></summary>' +
        '<div class="lvl-body">' +
          '<p class="muted small">The intermediate half of the Korean Core 5k deck, most-frequent first. ' +
          "Tap 🔊 to reveal; ★ a word to add it to your daily review.</p>" + bands +
        "</div>" +
      "</details>"
    );
  }

  function rowHTML(it) {
    var bm = window.Storage.isBookmarked(it.ko);
    var n = window.Storage.getWordView(it.ko);
    var r = window.RR ? window.RR(it.ko) : it.romaji;
    return (
      '<div class="word-row" data-ko="' + esc(it.ko) + '">' +
        '<div class="word-head">' +
          '<span class="ko">' + esc(it.ko) + "</span>" +
          '<div class="word-actions">' +
            '<button class="spk" data-action="word-reveal" data-ko="' + esc(it.ko) + '" title="Hear &amp; reveal">🔊</button>' +
            '<span class="wcount" title="times you\'ve revealed this">×' + n + "</span>" +
            '<button class="bm' + (bm ? " on" : "") + '" data-action="bm" data-ko="' + esc(it.ko) + '" title="Bookmark">' +
              (bm ? "★" : "☆") + "</button>" +
          "</div>" +
        "</div>" +
        '<div class="word-meaning">' +
          '<span class="en">' + esc(it.en) + "</span>" +
          '<span class="romaji">' + (r ? esc(r) + " · " : "") + "L" + esc(it.lesson) + "</span>" +
          '<button class="hide-btn" data-action="word-hide" title="Hide to test again">↺</button>' +
        "</div>" +
      "</div>"
    );
  }

  function listHTML(term, bookmarkedOnly) {
    var items = all().filter(function (it) {
      if (bookmarkedOnly && !window.Storage.isBookmarked(it.ko)) return false;
      return match(it, term || "");
    });

    // 5k words: shown as flat rows when searching / filtering bookmarks,
    // as collapsed frequency bands otherwise.
    var searching = !!(term && term.trim()) || bookmarkedOnly;
    var fiveKHTML = "";
    if (searching) {
      var hits = fiveK().filter(function (w) {
        if (bookmarkedOnly && !window.Storage.isBookmarked(w.ko)) return false;
        return match(w, term || "");
      });
      var capped = hits.length > 150;
      if (hits.length) {
        fiveKHTML =
          '<h3 class="syl-h">Core 5k (' + hits.length + (capped ? ", first 150 shown" : "") + ")</h3>" +
          '<div class="word-list">' + hits.slice(0, 150).map(row5kHTML).join("") + "</div>";
      }
    } else {
      fiveKHTML = fiveKSectionHTML();
    }

    if (!items.length && !fiveKHTML) {
      return '<p class="muted">' +
        (bookmarkedOnly ? "No bookmarked words yet — tap ☆ on a word." : "No words match your search.") + "</p>";
    }
    if (!items.length) return fiveKHTML;
    // Group by level, then by lesson — preserving curriculum order.
    var levels = [], levelMap = {};
    items.forEach(function (it) {
      var lg = levelMap[it.level];
      if (!lg) { lg = { level: it.level, lessons: [], lessonMap: {} }; levelMap[it.level] = lg; levels.push(lg); }
      var ls = lg.lessonMap[it.lesson];
      if (!ls) { ls = { lesson: it.lesson, title: it.title, words: [] }; lg.lessonMap[it.lesson] = ls; lg.lessons.push(ls); }
      ls.words.push(it);
    });

    var openAll = searching;
    return levels.map(function (lg, idx) {
      var levelOpen = openAll || idx === 0;
      var total = 0;
      var lessonsHTML = lg.lessons.map(function (ls) {
        total += ls.words.length;
        return (
          '<details class="lesson-group"' + (openAll ? " open" : "") + ">" +
            "<summary>" + esc(ls.lesson) + " · " + esc(ls.title) +
              ' <span class="muted">(' + ls.words.length + ")</span></summary>" +
            '<div class="word-list">' + ls.words.map(rowHTML).join("") + "</div>" +
          "</details>"
        );
      }).join("");
      return (
        '<details class="lvl-group"' + (levelOpen ? " open" : "") + ">" +
          "<summary>Level " + esc(lg.level) + ' <span class="muted">· ' + total + " words</span></summary>" +
          '<div class="lvl-body">' + lessonsHTML + "</div>" +
        "</details>"
      );
    }).join("") + fiveKHTML;
  }

  function render(bookmarkedOnly) {
    var count = all().length + fiveK().length;
    var bmCount = window.Storage.bookmarkCount();
    return (
      '<section class="view">' +
        '<h2>Words <span class="muted" style="font-size:.9rem">(' + count + ")</span></h2>" +
        '<p class="muted small">Flashcard mode — read the 한글, guess the meaning, then tap 🔊 to hear it and reveal the answer.</p>' +
        '<div class="gloss-controls">' +
          '<input id="glossSearch" class="ko-input" type="text" autocomplete="off" placeholder="Search 한글, English, or romaji…" />' +
          '<button class="btn ghost' + (bookmarkedOnly ? " active" : "") + '" data-action="bm-filter">⭐ ' +
            (bmCount ? bmCount : "") + "</button>" +
        "</div>" +
        '<div id="glossList">' + listHTML("", bookmarkedOnly) + "</div>" +
      "</section>"
    );
  }

  return { render: render, listHTML: listHTML, all: all, bandHTML: bandHTML, fiveK: fiveK };
})();

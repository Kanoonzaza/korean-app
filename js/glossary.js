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
        out.push({ ko: v.ko, en: v.en, romaji: v.romaji, pos: v.pos || "", lesson: l.id, level: l.level });
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
    if (!items.length) {
      return '<p class="muted">' +
        (bookmarkedOnly ? "No bookmarked words yet — tap ☆ on a word." : "No words match your search.") + "</p>";
    }
    var groups = {};
    items.forEach(function (it) { (groups[it.level] = groups[it.level] || []).push(it); });
    var levels = Object.keys(groups).sort();
    var openAll = !!(term && term.trim()) || bookmarkedOnly;
    return levels.map(function (lv, idx) {
      var rows = groups[lv].map(rowHTML).join("");
      var open = openAll || idx === 0;
      var n = groups[lv].length;
      return (
        '<details class="lvl-group"' + (open ? " open" : "") + ">" +
          "<summary>Level " + esc(lv) + ' <span class="muted">· ' + n + " word" + (n > 1 ? "s" : "") + "</span></summary>" +
          '<div class="word-list">' + rows + "</div>" +
        "</details>"
      );
    }).join("");
  }

  function render(bookmarkedOnly) {
    var count = all().length;
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

  return { render: render, listHTML: listHTML, all: all };
})();

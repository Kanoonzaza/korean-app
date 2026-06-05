/* glossary.js — a searchable list of every vocabulary word across all lessons,
 * with audio (🔊) and a ⭐ bookmark toggle. Reads window.LESSONS; bookmarks live
 * in Storage (and sync across devices).
 */
window.Glossary = (function () {
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  // Unique words across all lessons (first occurrence wins, keeps its lesson tag).
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

  function listHTML(term, bookmarkedOnly) {
    var items = all().filter(function (it) {
      if (bookmarkedOnly && !window.Storage.isBookmarked(it.ko)) return false;
      return match(it, term || "");
    });
    if (!items.length) {
      return '<p class="muted">' +
        (bookmarkedOnly ? "No bookmarked words yet — tap ☆ on any word." : "No words match your search.") +
        "</p>";
    }
    return items.map(function (it) {
      var bm = window.Storage.isBookmarked(it.ko);
      var r = window.RR ? window.RR(it.ko) : it.romaji;
      return (
        '<div class="gloss-row">' +
          '<div class="ko-cell">' +
            '<span class="ko">' + esc(it.ko) + "</span>" +
            '<button class="spk" data-speak="' + esc(it.ko) + '" title="Listen">🔊</button>' +
            '<button class="bm' + (bm ? " on" : "") + '" data-action="bm" data-ko="' + esc(it.ko) +
              '" title="Bookmark">' + (bm ? "★" : "☆") + "</button>" +
          "</div>" +
          '<div class="meaning">' +
            '<span class="en">' + esc(it.en) + "</span>" +
            '<span class="romaji">' + (r ? esc(r) + " · " : "") + "L" + esc(it.lesson) + "</span>" +
          "</div>" +
        "</div>"
      );
    }).join("");
  }

  function render(bookmarkedOnly) {
    var count = all().length;
    var bmCount = window.Storage.bookmarkCount();
    return (
      '<section class="view">' +
        '<h2>Words <span class="muted" style="font-size:.9rem">(' + count + ")</span></h2>" +
        '<div class="gloss-controls">' +
          '<input id="glossSearch" class="ko-input" type="text" autocomplete="off" ' +
            'placeholder="Search 한글, English, or romaji…" />' +
          '<button class="btn ghost' + (bookmarkedOnly ? " active" : "") + '" data-action="bm-filter">⭐ ' +
            (bmCount ? bmCount : "") + "</button>" +
        "</div>" +
        '<div id="glossList" class="gloss-list">' + listHTML("", bookmarkedOnly) + "</div>" +
      "</section>"
    );
  }

  return { render: render, listHTML: listHTML, all: all };
})();

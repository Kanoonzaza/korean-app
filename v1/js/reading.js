/* reading.js — graded reading passages (window.READINGS) with tap-to-gloss
 * words and TOPIK-style comprehension questions.
 *
 * Self-contained view module: App routes "#/reading[/:id]" here and forwards
 * every "read-*" click via Reading.handle(action, el); App re-renders after.
 * Passage state (question index, score, open gloss) lives here.
 */
window.Reading = (function () {
  var state = null;   // { id, i, correct, phase: "q"|"feedback"|"done", last, gloss }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function byId(id) {
    return (window.READINGS || []).filter(function (r) { return r.id === id; })[0] || null;
  }

  /* ----- list view ----- */
  function listHTML() {
    var byLevel = {};
    (window.READINGS || []).forEach(function (r) {
      (byLevel[r.level] = byLevel[r.level] || []).push(r);
    });
    var sections = Object.keys(byLevel).sort().map(function (lv) {
      var rows = byLevel[lv].map(function (r) {
        var e = window.Storage.getRead(r.id);
        var status = e && e.best != null
          ? '<span class="exam-stat' + (e.best >= 70 ? " pass" : "") + '">' + (e.best >= 70 ? "✅ " : "") + e.best + "%</span>"
          : '<span class="exam-stat muted">New</span>';
        return '<a class="exam-row" href="#/reading/' + esc(r.id) + '"><div><strong>' + esc(r.title) + "</strong>" +
          '<div class="muted small">' + esc(r.blurb || "") + "</div></div>" + status + "</a>";
      }).join("");
      return '<h3 class="syl-h">Level ' + esc(lv) + "</h3>" + '<div class="exam-list">' + rows + "</div>";
    }).join("");

    return (
      '<section class="view">' +
        "<h2>Reading</h2>" +
        '<p class="muted">Short graded passages using the grammar you\'ve learned. ' +
          "Tap a <span class=\"gw\">dotted</span> word for its meaning, listen with 🔊, then answer the questions.</p>" +
        sections +
      "</section>"
    );
  }

  /* ----- passage view ----- */
  // Wrap the first occurrence of each glossary word in a tappable span.
  function glossedText(r) {
    var html = esc(r.text).replace(/\n/g, "</p><p>");
    Object.keys(r.glossary || {}).forEach(function (w) {
      var i = html.indexOf(esc(w));
      if (i < 0) return;
      html = html.slice(0, i) +
        '<span class="gw" data-action="read-gloss" data-w="' + esc(w) + '">' + esc(w) + "</span>" +
        html.slice(i + esc(w).length);
    });
    return "<p>" + html + "</p>";
  }

  function questionHTML(r) {
    var s = state, total = r.questions.length;

    if (s.phase === "done") {
      var pct = Math.round((s.correct / total) * 100);
      window.Storage.saveRead(r.id, pct);
      return (
        '<div class="card score-card"><div class="big-score">' + pct + "%</div>" +
          "<p>" + s.correct + " / " + total + " correct</p>" +
          '<button class="btn ghost" data-action="read-retry">Try again</button>' +
        "</div>"
      );
    }

    var q = r.questions[s.i];
    var opts = q.options.map(function (o, idx) {
      var cls = "opt";
      if (s.phase === "feedback") {
        if (idx === q.answer) cls += " correct";
        else if (s.last && idx === s.last.chosen) cls += " wrong";
        else cls += " dim";
      }
      return '<button class="' + cls + '" data-action="read-opt" data-i="' + idx + '"' +
        (s.phase === "feedback" ? " disabled" : "") + ">" + esc(o) + "</button>";
    }).join("");

    var foot = s.phase === "feedback"
      ? '<div class="nav-row"><span class="' + (s.last.ok ? "fb-ok" : "fb-bad") + '">' +
          (s.last.ok ? "✓ Correct" : "✗ Incorrect") + "</span>" +
          '<button class="btn" data-action="read-next">' + (s.i + 1 < total ? "Next →" : "See score →") + "</button></div>"
      : "";

    return (
      '<div class="q-count">Question ' + (s.i + 1) + " of " + total + "</div>" +
      '<div class="card quiz-card"><div class="q-prompt"><div class="q-ko">' + esc(q.q) + "</div>" +
        (q.qe ? '<div class="muted small">' + esc(q.qe) + "</div>" : "") + "</div>" +
        '<div class="opt-list">' + opts + "</div>" + foot + "</div>"
    );
  }

  function passageHTML(r) {
    if (!state || state.id !== r.id) reset(r.id);
    var g = state.gloss
      ? '<div class="gloss-box"><span class="ko-p">' + esc(state.gloss.w) + "</span> — " + esc(state.gloss.m) +
          ' <button class="spk" data-speak="' + esc(state.gloss.w) + '" title="Listen">🔊</button></div>'
      : '<div class="gloss-box muted small">Tap a dotted word to see its meaning here.</div>';

    return (
      '<section class="view">' +
        '<div class="head-row"><h2>' + esc(r.title) + "</h2>" +
          '<span class="tag">Level ' + esc(String(r.level)) + "</span></div>" +
        '<div class="card passage"><div class="passage-text">' + glossedText(r) + "</div>" +
          '<div class="nav-row"><button class="btn ghost small-btn" data-speak="' + esc(r.text.replace(/\n/g, " ")) + '">🔊 Listen to the passage</button><span></span></div>' +
          g +
        "</div>" +
        questionHTML(r) +
        '<div class="nav-row"><a class="btn ghost" href="#/reading">← Passages</a><span></span></div>' +
      "</section>"
    );
  }

  function reset(id) {
    state = { id: id, i: 0, correct: 0, phase: "q", last: null, gloss: null };
  }

  function render(parts) {
    var id = parts[1];
    if (!id) { state = null; return listHTML(); }
    var r = byId(id);
    if (!r) return '<section class="view"><p class="muted">Passage not found.</p></section>';
    return passageHTML(r);
  }

  // App forwards "read-*" clicks here, then re-renders.
  function handle(action, el) {
    var r = state && byId(state.id);
    if (action === "read-gloss") {
      var w = el.getAttribute("data-w");
      state.gloss = { w: w, m: (r && r.glossary[w]) || "" };
      if (window.TTS) TTS.speak(w);
    } else if (action === "read-opt") {
      if (state.phase === "feedback") return;
      var chosen = parseInt(el.getAttribute("data-i"), 10);
      var q = r.questions[state.i];
      var ok = chosen === q.answer;
      window.Storage.markActivity();
      window.Storage.recordAnswer(ok);
      if (ok) state.correct++;
      state.last = { ok: ok, chosen: chosen };
      state.phase = "feedback";
    } else if (action === "read-next") {
      if (state.i + 1 < r.questions.length) {
        state.i++; state.phase = "q"; state.last = null;
      } else {
        state.phase = "done";
      }
    } else if (action === "read-retry") {
      reset(state.id);
    }
  }

  return { render: render, handle: handle };
})();

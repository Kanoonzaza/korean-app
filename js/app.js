/* app.js — top-bar nav, hash router, views, and the lesson stepper.
 * Depends on: window.LESSONS, window.PODCASTS, Storage, TTS, Quiz, Practice, Listening.
 */
window.App = (function () {
  var STEPS = ["Grammar", "Vocab", "Examples", "Quiz", "Practice"];
  var root;                 // #app element
  var quizState = null;     // { lessonId, questions, i, correct, phase, last }
  var practiceState = null; // { lessonId, items, i, correct, phase, last }
  var reviewState = null;   // { mode, questions, i, correct, phase, last }

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function nl2br(s) { return esc(s).replace(/\n/g, "<br>"); }

  function lessonById(id) {
    return (window.LESSONS || []).filter(function (l) { return l.id === id; })[0] || null;
  }

  // A small 🔊 button that speaks the given text.
  function speak(text) {
    return '<button class="spk" data-speak="' + esc(text) + '" title="Listen" aria-label="Listen">🔊</button>';
  }

  function pitfallsBox(lesson) {
    if (!lesson.pitfalls || !lesson.pitfalls.length) return "";
    var items = lesson.pitfalls.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("");
    return (
      '<details class="callout">' +
        '<summary>⚠️ Common mistakes</summary>' +
        '<ul>' + items + "</ul>" +
      "</details>"
    );
  }

  /* ---------- top bar ---------- */
  function topbar(active) {
    function link(href, label, key) {
      return '<a href="' + href + '" class="' + (active === key ? "active" : "") + '">' + label + "</a>";
    }
    return (
      '<header class="topbar">' +
        '<div class="brand"><a href="#/lessons">한국어 <span>Study</span></a></div>' +
        '<nav>' +
          link("#/lessons", "Lessons", "lessons") +
          link("#/review", "Review", "review") +
          link("#/listening", "Listening", "listening") +
          link("#/progress", "Progress", "progress") +
        "</nav>" +
      "</header>"
    );
  }

  /* ---------- home ---------- */
  function renderHome() {
    var cards = (window.LESSONS || []).map(function (l) {
      var pct = Storage.percent(l.id);
      var done = Storage.getLesson(l.id).done;
      return (
        '<a class="card lesson-card" href="#/lesson/' + l.id + '/1">' +
          '<div class="lc-top">' +
            '<span class="lc-id">Lesson ' + esc(l.id) + (done ? ' <span class="check">✓</span>' : "") + "</span>" +
            '<span class="lc-pct">' + pct + "%</span>" +
          "</div>" +
          "<h3>" + esc(l.title) + "</h3>" +
          '<div class="lc-point">' + esc(l.point) + "</div>" +
          '<div class="bar"><div class="bar-fill" style="width:' + pct + '%"></div></div>' +
        "</a>"
      );
    }).join("");

    return (
      '<section class="view">' +
        "<h2>Level 4 · Lessons</h2>" +
        '<p class="muted">Continuing past your TTMIK deck — the modal patterns (must, may, can).</p>' +
        '<div class="lesson-list">' + cards + "</div>" +
      "</section>"
    );
  }

  /* ---------- progress ---------- */
  function renderProgress() {
    var rows = (window.LESSONS || []).map(function (l) {
      var e = Storage.getLesson(l.id);
      var score = e.bestScore == null ? "—" : e.bestScore + "%";
      return (
        "<tr>" +
          "<td>" + esc(l.id) + "</td>" +
          "<td>" + esc(l.title) + "</td>" +
          '<td class="center">' + (e.done ? '<span class="check">✓</span>' : Storage.percent(l.id) + "%") + "</td>" +
          '<td class="center">' + score + "</td>" +
        "</tr>"
      );
    }).join("");
    return (
      '<section class="view">' +
        "<h2>Progress</h2>" +
        '<table class="progress">' +
          "<thead><tr><th>#</th><th>Lesson</th><th class='center'>Complete</th><th class='center'>Best quiz</th></tr></thead>" +
          "<tbody>" + rows + "</tbody>" +
        "</table>" +
        '<div class="card sync">' +
          "<h4>Move progress to another device</h4>" +
          '<p class="muted small">Progress lives in this browser only. Export a file here, ' +
            "then import it on your phone (or another browser) to carry it over.</p>" +
          '<div class="nav-row">' +
            '<button class="btn ghost" data-action="export-progress">⬇ Export progress</button>' +
            '<button class="btn ghost" data-action="import-progress">⬆ Import progress</button>' +
          "</div>" +
          '<input type="file" id="importFile" accept="application/json,.json" style="display:none" />' +
          '<div id="syncMsg" class="muted small"></div>' +
        "</div>" +
      "</section>"
    );
  }

  function download(filename, text) {
    var a = document.createElement("a");
    a.href = "data:application/json;charset=utf-8," + encodeURIComponent(text);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  /* ---------- lesson stepper ---------- */
  function stepper(lesson, step) {
    var dots = STEPS.map(function (label, i) {
      var n = i + 1;
      var cls = n === step ? "on" : (n < step ? "done" : "");
      return '<a class="step ' + cls + '" href="#/lesson/' + lesson.id + "/" + n + '">' +
        '<span class="dot">' + n + "</span><span class='step-label'>" + label + "</span></a>";
    }).join("");
    return '<div class="stepper">' + dots + "</div>";
  }

  function navButtons(lesson, step) {
    var back = step > 1
      ? '<a class="btn ghost" href="#/lesson/' + lesson.id + "/" + (step - 1) + '">← Back</a>'
      : '<a class="btn ghost" href="#/lessons">← Lessons</a>';
    var next = step < 5
      ? '<a class="btn" href="#/lesson/' + lesson.id + "/" + (step + 1) + '">Next →</a>'
      : "";
    return '<div class="nav-row">' + back + next + "</div>";
  }

  function stepGrammar(lesson) {
    var g = lesson.grammar;
    var notes = (g.notes || []).map(function (n) { return "<li>" + nl2br(n) + "</li>"; }).join("");
    return (
      '<div class="step-body">' +
        "<h2>" + esc(lesson.title) + ' <span class="point">' + esc(lesson.point) + "</span></h2>" +
        '<p class="lead">' + esc(g.summary) + "</p>" +
        '<div class="card"><h4>How to form it</h4><pre class="formation">' + esc(g.formation) + "</pre></div>" +
        '<div class="card"><h4>Explanation</h4><p>' + nl2br(g.explanation) + "</p>" +
          (notes ? '<ul class="notes">' + notes + "</ul>" : "") +
        "</div>" +
        pitfallsBox(lesson) +
      "</div>"
    );
  }

  function stepVocab(lesson) {
    var rows = lesson.vocab.map(function (v) {
      return (
        '<div class="vocab-row">' +
          '<div class="ko-cell"><span class="ko">' + esc(v.ko) + "</span>" + speak(v.ko) + "</div>" +
          '<div class="meaning"><span class="en">' + esc(v.en) + "</span>" +
            '<span class="romaji">' + esc(v.romaji) + "</span>" +
            (v.note ? '<span class="vnote">' + esc(v.note) + "</span>" : "") +
          "</div>" +
        "</div>"
      );
    }).join("");
    return '<div class="step-body"><h2>Vocabulary</h2><div class="vocab-list">' + rows + "</div></div>";
  }

  function stepExamples(lesson) {
    var rows = lesson.sentences.map(function (s) {
      return (
        '<div class="card example">' +
          '<div class="ko-cell"><span class="ko">' + esc(s.ko) + "</span>" + speak(s.ko) + "</div>" +
          '<div class="en">' + esc(s.en) + "</div>" +
          '<div class="romaji">' + esc(s.romaji) + "</div>" +
        "</div>"
      );
    }).join("");
    return '<div class="step-body"><h2>Example sentences</h2>' + rows + pitfallsBox(lesson) + "</div>";
  }

  /* ----- shared typed-question renderer (used by lesson quiz + review) ----- */
  // prefix is "quiz" or "review"; it drives the input id and data-action names.
  function questionInner(q, st, prefix) {
    var total = st.questions.length;
    var prompt;
    if (q.kind === "listen") {
      prompt = '<div class="q-prompt listen"><button class="btn" data-speak="' + esc(q.answer) +
        '">🔊 Play audio</button><p class="muted small">Type the Korean you hear.</p></div>';
    } else {
      prompt = '<div class="q-prompt"><span class="q-label">Type in Korean:</span>' +
        '<div class="q-en">' + esc(q.promptText) + "</div></div>";
    }

    var body;
    if (st.phase === "feedback") {
      body =
        '<div class="feedback ' + (st.last.ok ? "ok" : "bad") + '">' +
          (st.last.ok ? "✓ Correct" : "✗ Not quite") +
          '<div class="ans">Answer: <span class="ko">' + esc(q.answer) + "</span> " + speak(q.answer) +
            ' <span class="romaji">' + esc(q.romaji) + "</span></div>" +
          (st.last.ok ? "" : '<div class="yours">You wrote: ' + esc(st.last.input || "—") + "</div>") +
        "</div>" +
        '<div class="nav-row"><span></span><button class="btn" data-action="' + prefix + '-next">' +
          (st.i + 1 < total ? "Next →" : "See score →") + "</button></div>";
    } else {
      body =
        '<div class="answer-row">' +
          '<input class="ko-input" id="' + prefix + 'Input" type="text" autocomplete="off" autocapitalize="off" placeholder="여기에 입력…" />' +
          '<button class="btn" data-action="' + prefix + '-submit">Check</button>' +
        "</div>";
    }

    return (
      '<div class="q-count">Question ' + (st.i + 1) + " of " + total + "</div>" +
      '<div class="card quiz-card">' + prompt + body + "</div>"
    );
  }

  /* ----- quiz runner (lesson step 4) ----- */
  function startQuiz(lesson) {
    quizState = {
      lessonId: lesson.id,
      questions: Quiz.build(lesson),
      i: 0, correct: 0, phase: "q", last: null
    };
  }
  function stepQuiz(lesson) {
    if (!quizState || quizState.lessonId !== lesson.id) startQuiz(lesson);
    var s = quizState;
    var total = s.questions.length;

    if (s.phase === "done") {
      var pct = Math.round((s.correct / total) * 100);
      Storage.saveScore(lesson.id, pct);
      return (
        '<div class="step-body"><h2>Quiz complete</h2>' +
          '<div class="card score-card"><div class="big-score">' + pct + "%</div>" +
            "<p>" + s.correct + " / " + total + " correct</p>" +
            '<button class="btn ghost" data-action="quiz-retry">Try again</button>' +
          "</div>" +
          '<p class="muted">Continue to Practice for sentence work, then finish the lesson.</p>' +
        "</div>"
      );
    }

    return '<div class="step-body"><h2>Quiz</h2>' + questionInner(s.questions[s.i], s, "quiz") + "</div>";
  }

  /* ----- practice runner ----- */
  function startPractice(lesson) {
    practiceState = {
      lessonId: lesson.id,
      items: Practice.build(lesson),
      i: 0, correct: 0, phase: "q", last: null
    };
  }
  function stepPractice(lesson) {
    if (!practiceState || practiceState.lessonId !== lesson.id) startPractice(lesson);
    var s = practiceState;
    var total = s.items.length;

    if (s.phase === "done") {
      Storage.setLessonDone(lesson.id);
      return (
        '<div class="step-body"><h2>Lesson complete 🎉</h2>' +
          '<div class="card score-card"><div class="big-score">' +
            Math.round((s.correct / total) * 100) + "%</div>" +
            "<p>Practice: " + s.correct + " / " + total + " correct</p></div>" +
          '<div class="nav-row"><a class="btn ghost" data-action="practice-retry" href="#/lesson/' + lesson.id + '/5">Practice again</a>' +
            '<a class="btn" href="#/lessons">Back to lessons →</a></div>' +
        "</div>"
      );
    }

    var it = s.items[s.i];
    var prompt;
    if (it.kind === "blank") {
      prompt = '<div class="q-prompt"><span class="q-label">Fill in the blank:</span>' +
        '<div class="q-ko">' + esc(it.display) + "</div>" +
        '<div class="q-en muted">' + esc(it.en) + "</div></div>";
    } else {
      prompt = '<div class="q-prompt"><span class="q-label">Translate to Korean:</span>' +
        '<div class="q-en">' + esc(it.display) + "</div></div>";
    }

    var feedback = "";
    if (s.phase === "feedback") {
      feedback =
        '<div class="feedback ' + (s.last.ok ? "ok" : "bad") + '">' +
          (s.last.ok ? "✓ Correct" : "✗ Not quite") +
          '<div class="ans">Answer: <span class="ko">' + esc(it.answer) + "</span> " + speak(it.fullKo) +
            ' <span class="romaji">' + esc(it.romaji) + "</span></div>" +
          '<div class="full muted">' + esc(it.fullKo) + "</div>" +
          (s.last.ok ? "" : '<div class="yours">You wrote: ' + esc(s.last.input || "—") + "</div>") +
        "</div>" +
        '<div class="nav-row"><span></span><button class="btn" data-action="practice-next">' +
          (s.i + 1 < total ? "Next →" : "Finish lesson →") + "</button></div>";
    } else {
      feedback =
        '<div class="answer-row">' +
          '<input class="ko-input" id="practiceInput" type="text" autocomplete="off" autocapitalize="off" placeholder="여기에 입력…" />' +
          '<button class="btn" data-action="practice-submit">Check</button>' +
        "</div>";
    }

    return (
      '<div class="step-body"><h2>Practice</h2>' +
        '<div class="q-count">Item ' + (s.i + 1) + " of " + total + "</div>" +
        '<div class="card quiz-card">' + prompt + feedback + "</div>" +
      "</div>"
    );
  }

  /* ----- review ----- */
  function renderReviewHome() {
    var done = Review.completedCount();
    var weak = Storage.missCount();

    var mixed = done > 0
      ? '<a class="card review-opt" href="#/review/mixed"><h3>🔁 Mixed review</h3>' +
          '<p class="muted">Questions drawn from all ' + done + ' completed lesson' + (done > 1 ? "s" : "") +
          '. Keeps older material fresh.</p></a>'
      : '<div class="card review-opt disabled"><h3>🔁 Mixed review</h3>' +
          '<p class="muted">Finish a lesson first — then its words come back here for review.</p></div>';

    var weakCard = weak > 0
      ? '<a class="card review-opt" href="#/review/weak"><h3>🎯 Weak items <span class="tag">' + weak + '</span></h3>' +
          '<p class="muted">The words & sentences you\'ve gotten wrong. Answer one right to retire it from this pile.</p></a>'
      : '<div class="card review-opt disabled"><h3>🎯 Weak items</h3>' +
          '<p class="muted">Nothing here yet. Anything you miss in a quiz or review lands here automatically.</p></div>';

    return (
      '<section class="view">' +
        "<h2>Review</h2>" +
        '<p class="muted">Come back here any time to revisit earlier material so it sticks.</p>' +
        '<div class="lesson-list">' + mixed + weakCard + "</div>" +
      "</section>"
    );
  }

  function startReview(mode) {
    reviewState = {
      mode: mode,
      questions: mode === "weak" ? Review.buildWeak() : Review.buildMixed(),
      i: 0, correct: 0, phase: "q", last: null
    };
  }

  function renderReviewRun(mode) {
    if (!reviewState || reviewState.mode !== mode) startReview(mode);
    var s = reviewState;
    var total = s.questions.length;
    var title = mode === "weak" ? "Weak-item review" : "Mixed review";
    var backMenu = '<div class="nav-row"><a class="btn ghost" href="#/review">← Review menu</a><span></span></div>';

    if (total === 0) {
      var msg = mode === "weak"
        ? "No weak items right now — nice. Miss something in a quiz and it shows up here."
        : "Finish a lesson first, then its material appears here for mixed review.";
      return '<section class="view"><h2>' + title + '</h2><div class="card"><p class="muted">' + msg + "</p></div>" + backMenu + "</section>";
    }

    if (s.phase === "done") {
      var pct = Math.round((s.correct / total) * 100);
      return (
        '<section class="view"><h2>' + title + " complete</h2>" +
          '<div class="card score-card"><div class="big-score">' + pct + "%</div>" +
            "<p>" + s.correct + " / " + total + " correct</p>" +
            '<button class="btn ghost" data-action="review-retry">Again</button>' +
          "</div>" +
          (mode === "weak"
            ? '<p class="muted">Items you answered correctly have been retired from your weak pile.</p>'
            : "") +
          backMenu +
        "</section>"
      );
    }

    return '<section class="view"><h2>' + title + "</h2>" +
      questionInner(s.questions[s.i], s, "review") + backMenu + "</section>";
  }

  function renderLesson(id, step) {
    var lesson = lessonById(id);
    if (!lesson) return '<section class="view"><p class="muted">Lesson not found.</p></section>';
    Storage.setStep(id, step);

    var body;
    switch (step) {
      case 1: body = stepGrammar(lesson); break;
      case 2: body = stepVocab(lesson); break;
      case 3: body = stepExamples(lesson); break;
      case 4: body = stepQuiz(lesson); break;
      case 5: body = stepPractice(lesson); break;
      default: body = stepGrammar(lesson);
    }
    // Hide the generic Next button on interactive steps (they have their own flow).
    var nav = (step === 4 || step === 5) ? navButtons2(lesson, step) : navButtons(lesson, step);
    return '<section class="view lesson">' + stepper(lesson, step) + body + nav + "</section>";
  }

  // For quiz/practice steps: only Back (forward happens via the runner).
  function navButtons2(lesson, step) {
    var back = '<a class="btn ghost" href="#/lesson/' + lesson.id + "/" + (step - 1) + '">← Back</a>';
    return '<div class="nav-row">' + back + "<span></span></div>";
  }

  /* ---------- router ---------- */
  function parse() {
    var h = (location.hash || "#/lessons").replace(/^#/, "");
    var parts = h.split("/").filter(Boolean); // e.g. ["lesson","4.1","2"]
    return parts;
  }

  function render() {
    var parts = parse();
    var page = parts[0] || "lessons";
    var active = page, html;

    if (page === "lesson") {
      var id = parts[1];
      var step = parseInt(parts[2], 10) || 1;
      if (step < 1) step = 1; if (step > 5) step = 5;
      active = "lessons";
      html = renderLesson(id, step);
    } else if (page === "review") {
      active = "review";
      var mode = parts[1];
      if (mode === "mixed" || mode === "weak") {
        html = renderReviewRun(mode);
      } else {
        reviewState = null;          // returning to the menu resets the runner
        html = renderReviewHome();
      }
    } else if (page === "listening") {
      html = Listening.render();
    } else if (page === "progress") {
      html = renderProgress();
    } else {
      html = renderHome();
    }

    root.innerHTML = topbar(active) + '<main class="container">' + html + "</main>";

    // Autofocus the answer input when present.
    var input = document.getElementById("quizInput") ||
                document.getElementById("practiceInput") ||
                document.getElementById("reviewInput");
    if (input) input.focus();

    // If a Korean voice exists, auto-play listening prompts in the active runner.
    var runner = null;
    if (page === "lesson" && parts[2] === "4") runner = quizState;
    else if (page === "review" && (parts[1] === "mixed" || parts[1] === "weak")) runner = reviewState;
    if (runner && runner.phase === "q") {
      var q = runner.questions[runner.i];
      if (q && q.kind === "listen" && TTS.available()) TTS.speak(q.answer);
    }
  }

  /* ---------- actions ---------- */
  function currentInput() {
    var el = document.getElementById("quizInput") ||
             document.getElementById("practiceInput") ||
             document.getElementById("reviewInput");
    return el ? el.value : "";
  }

  function handleClick(e) {
    var t = e.target.closest("[data-speak],[data-action]");
    if (!t) return;

    if (t.hasAttribute("data-speak")) {
      TTS.speak(t.getAttribute("data-speak"));
      if (t.getAttribute("data-action")) e.preventDefault();
      if (!t.hasAttribute("data-action")) return;
    }

    var action = t.getAttribute("data-action");
    if (!action) return;
    e.preventDefault();

    if (action === "quiz-submit") {
      var q = quizState.questions[quizState.i];
      var val = currentInput();
      var ok = q.check(val);
      if (ok) { quizState.correct++; Storage.clearMiss(q.answer); }
      else { Storage.addMiss({ en: q.en, ko: q.answer, romaji: q.romaji }); }
      quizState.last = { ok: ok, input: val };
      quizState.phase = "feedback";
      render();
    } else if (action === "quiz-next") {
      if (quizState.i + 1 < quizState.questions.length) {
        quizState.i++; quizState.phase = "q"; quizState.last = null;
      } else {
        quizState.phase = "done";
      }
      render();
    } else if (action === "quiz-retry") {
      var lesson = lessonById(quizState.lessonId);
      startQuiz(lesson); render();
    } else if (action === "practice-submit") {
      var it = practiceState.items[practiceState.i];
      var pv = currentInput();
      var pok = it.check(pv);
      if (pok) { practiceState.correct++; Storage.clearMiss(it.fullKo); }
      else { Storage.addMiss({ en: it.en, ko: it.fullKo, romaji: it.romaji }); }
      practiceState.last = { ok: pok, input: pv };
      practiceState.phase = "feedback";
      render();
    } else if (action === "practice-next") {
      if (practiceState.i + 1 < practiceState.items.length) {
        practiceState.i++; practiceState.phase = "q"; practiceState.last = null;
      } else {
        practiceState.phase = "done";
      }
      render();
    } else if (action === "practice-retry") {
      var l2 = lessonById(practiceState.lessonId);
      startPractice(l2); render();
    } else if (action === "review-submit") {
      var rq = reviewState.questions[reviewState.i];
      var rv = currentInput();
      var rok = rq.check(rv);
      if (rok) { reviewState.correct++; Storage.clearMiss(rq.answer); }
      else { Storage.addMiss({ en: rq.en, ko: rq.answer, romaji: rq.romaji }); }
      reviewState.last = { ok: rok, input: rv };
      reviewState.phase = "feedback";
      render();
    } else if (action === "review-next") {
      if (reviewState.i + 1 < reviewState.questions.length) {
        reviewState.i++; reviewState.phase = "q"; reviewState.last = null;
      } else {
        reviewState.phase = "done";
      }
      render();
    } else if (action === "review-retry") {
      startReview(reviewState.mode); render();
    } else if (action === "export-progress") {
      download("korean-app-progress.json", Storage.exportData());
      var m = document.getElementById("syncMsg");
      if (m) m.textContent = "Saved a progress file to your downloads.";
    } else if (action === "import-progress") {
      var f = document.getElementById("importFile");
      if (f) f.click();
    }
  }

  function handleChange(e) {
    if (e.target.id !== "importFile") return;
    var file = e.target.files && e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      var ok = Storage.importData(String(reader.result));
      render();
      var m = document.getElementById("syncMsg");
      if (m) m.textContent = ok ? "Progress imported ✓" : "That file didn't look like a valid progress export.";
    };
    reader.readAsText(file);
  }

  function handleKey(e) {
    if (e.key !== "Enter") return;
    var el = e.target;
    if (el.id === "quizInput") {
      if (quizState.phase === "feedback") {
        document.querySelector('[data-action="quiz-next"]') && handleClick({ target: document.querySelector('[data-action="quiz-next"]'), preventDefault: function () {} });
      } else {
        handleClick({ target: document.querySelector('[data-action="quiz-submit"]'), preventDefault: function () {} });
      }
    } else if (el.id === "practiceInput") {
      if (practiceState.phase === "feedback") {
        handleClick({ target: document.querySelector('[data-action="practice-next"]'), preventDefault: function () {} });
      } else {
        handleClick({ target: document.querySelector('[data-action="practice-submit"]'), preventDefault: function () {} });
      }
    } else if (el.id === "reviewInput") {
      var act = reviewState.phase === "feedback" ? "review-next" : "review-submit";
      handleClick({ target: document.querySelector('[data-action="' + act + '"]'), preventDefault: function () {} });
    }
  }

  /* ---------- init ---------- */
  function init() {
    root = document.getElementById("app");
    window.addEventListener("hashchange", function () {
      // Leaving a lesson's quiz/practice resets transient runners only when lesson id changes;
      // render() handles (re)building as needed.
      render();
    });
    root.addEventListener("click", handleClick);
    root.addEventListener("keydown", handleKey);
    root.addEventListener("change", handleChange);
    render();
  }

  return { init: init };
})();

document.addEventListener("DOMContentLoaded", window.App.init);

// grader.js — forgiving typed-answer grading + character-diff feedback.
// Ported from v1: normalize() from v1/js/quiz.js:9-15, esc() + diffParts() from
// v1/js/app.js:18-96. Pure functions — no storage, no DOM.
//
// normalize(): trim, collapse internal whitespace to single spaces, drop a
// trailing run of . ? ! ~ , then trim again. (Note: v1 does NOT lowercase.)
//
// v2 DEVIATION from v1 (deliberate): commas (ASCII "," and ideographic "、")
// are removed from BOTH expected and typed before comparison. Dictation plays
// sentences via TTS — punctuation is inaudible, so it must never fail an
// answer. Everything else is exactly v1; the diff still shows the original
// un-normalized strings.
//
// grade(expected, typed) -> { ok, diffHtml }. diffHtml is "" when ok; otherwise
// an LCS character diff of the raw strings: the learner's answer with intruding
// chars marked .d-bad, the key with missed chars marked .d-miss. All rendered
// text is HTML-escaped.

export function normalize(s) {
  return (s || "")
    .trim()
    .replace(/[,、]/g, "")   // v2: commas are inaudible over TTS — never fail on them
    .replace(/\s+/g, " ")
    .replace(/[.?!~]+$/g, "")
    .trim();
}

function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
  });
}

// Character-level LCS diff so wrong answers show exactly which syllables differ.
// Returns { yours, key } HTML strings (matched chars escaped plainly, mismatches
// wrapped in a span with the given class).
function diffParts(input, answer) {
  var a = (input || "").split(""), b = (answer || "").split("");
  var m = a.length, n = b.length, i, j;
  var L = [];
  for (i = 0; i <= m; i++) { L[i] = []; for (j = 0; j <= n; j++) L[i][j] = 0; }
  for (i = 1; i <= m; i++) {
    for (j = 1; j <= n; j++) {
      L[i][j] = a[i - 1] === b[j - 1] ? L[i - 1][j - 1] + 1 : Math.max(L[i - 1][j], L[i][j - 1]);
    }
  }
  var inA = {}, inB = {};
  i = m; j = n;
  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) { inA[i - 1] = 1; inB[j - 1] = 1; i--; j--; }
    else if (L[i - 1][j] >= L[i][j - 1]) i--;
    else j--;
  }
  function markup(chars, matched, cls) {
    return chars.map(function (c, k) {
      return matched[k] ? esc(c) : '<span class="' + cls + '">' + esc(c) + "</span>";
    }).join("");
  }
  return { yours: markup(a, inA, "d-bad"), key: markup(b, inB, "d-miss") };
}

// Grade a typed answer against the expected string.
// ok := normalize(expected) === normalize(typed). When wrong, diffHtml shows the
// key (missed chars .d-miss) and the learner's answer (intruding chars .d-bad).
export function grade(expected, typed) {
  var ok = normalize(expected) === normalize(typed);
  if (ok) return { ok: true, diffHtml: "" };
  var d = diffParts(typed, expected);
  var diffHtml =
    '<div class="ans">Answer: <span class="ko">' + d.key + "</span></div>" +
    '<div class="yours">You wrote: <span class="ko">' + d.yours + "</span></div>";
  return { ok: false, diffHtml: diffHtml };
}

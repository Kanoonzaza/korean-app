/* level.js — rough TOPIK-level estimate + a semicircular gauge.
 *
 * IMPORTANT: this is an *indicative self-study estimate* from your in-app
 * performance, not an official TOPIK result. The app's current content lives in
 * the early-intermediate band (about TOPIK 2 → 3.5), so the estimate moves within
 * that range; reaching higher needs more advanced lessons.
 */
window.Level = (function () {
  var MIN = 1, MAX = 6;     // TOPIK scale
  var BASE = 2.0, SPAN = 2.0; // content band (L4+L5): mastery 0..1 -> level 2.0..4.0

  function estimate() {
    var lessons = window.LESSONS || [];
    var total = lessons.length || 1;
    var completed = 0, sumMastery = 0;

    lessons.forEach(function (l) {
      var e = window.Storage.getLesson(l.id);
      if (e.done) {
        completed++;
        // no recorded score -> assume a middling 0.6
        sumMastery += (e.bestScore == null ? 0.6 : e.bestScore / 100);
      }
    });

    var avg = sumMastery / total;                  // share of curriculum mastered, 0..1
    var weak = window.Storage.missCount();
    var penalty = Math.min(weak * 0.01, 0.15);     // up to -0.15 for a big weak pile
    var mastery = Math.max(0, Math.min(1, avg - penalty));
    var level = BASE + mastery * SPAN;             // 2.0 .. 3.5

    return {
      level: level,
      mastery: mastery,
      completed: completed,
      total: total,
      weak: weak,
      hasData: completed > 0,
      band: band(level)
    };
  }

  function band(level) {
    if (level < 2.5) return "High beginner · TOPIK I";
    if (level < 3.5) return "Low intermediate · TOPIK II";
    if (level < 4.5) return "Intermediate · TOPIK II";
    if (level < 5.5) return "Upper-intermediate · TOPIK II";
    return "Advanced · TOPIK II";
  }

  // --- gauge geometry (top semicircle) ---
  var cx = 140, cy = 140, R = 108;
  function ang(v) { return Math.PI * (1 - (v - MIN) / (MAX - MIN)); } // v=MIN->180°, v=MAX->0°
  function pt(v, r) { var a = ang(v); return [cx + r * Math.cos(a), cy - r * Math.sin(a)]; }
  function arc(fromV, toV, r) {
    var p0 = pt(fromV, r), p1 = pt(toV, r);
    return "M " + p0[0].toFixed(1) + " " + p0[1].toFixed(1) +
      " A " + r + " " + r + " 0 0 1 " + p1[0].toFixed(1) + " " + p1[1].toFixed(1);
  }

  function gaugeHTML() {
    var est = estimate();
    var ticks = "";
    for (var v = MIN; v <= MAX; v++) {
      var a = pt(v, R + 6), b = pt(v, R - 8), lp = pt(v, R - 24);
      ticks += '<line x1="' + a[0].toFixed(1) + '" y1="' + a[1].toFixed(1) +
        '" x2="' + b[0].toFixed(1) + '" y2="' + b[1].toFixed(1) + '" class="g-tick"/>';
      ticks += '<text x="' + lp[0].toFixed(1) + '" y="' + (lp[1] + 4).toFixed(1) + '" class="g-tnum">' + v + "</text>";
    }
    var needle = pt(est.level, R - 16);
    var svg =
      '<svg viewBox="0 0 280 168" class="gauge" role="img" aria-label="Estimated TOPIK level gauge">' +
        '<path d="' + arc(MIN, MAX, R) + '" class="g-track"/>' +
        '<path d="' + arc(MIN, est.level, R) + '" class="g-val"/>' +
        ticks +
        '<line x1="' + cx + '" y1="' + cy + '" x2="' + needle[0].toFixed(1) + '" y2="' + needle[1].toFixed(1) + '" class="g-needle"/>' +
        '<circle cx="' + cx + '" cy="' + cy + '" r="6" class="g-hub"/>' +
        '<text x="' + cx + '" y="104" class="g-big">' + est.level.toFixed(1) + "</text>" +
        '<text x="' + cx + '" y="124" class="g-sub">≈ TOPIK level</text>' +
      "</svg>";

    var note = est.hasData
      ? est.completed + " of " + est.total + " lessons done" + (est.weak ? " · " + est.weak + " weak item" + (est.weak > 1 ? "s" : "") : "")
      : "Finish a lesson to start refining this estimate.";

    return (
      '<div class="card gauge-card">' +
        "<h4>Estimated level</h4>" +
        svg +
        '<div class="g-band">' + est.band + "</div>" +
        '<div class="muted small g-note">' + note + "</div>" +
        '<details class="callout g-how"><summary>How is this estimated?</summary>' +
          '<p class="small">A rough self-study estimate from your completed lessons, quiz scores, ' +
          'and remaining weak items — <strong>not an official TOPIK result</strong>. It assumes the ' +
          'beginner foundation (TTMIK 1–3) you already have. This app\'s lessons (Level 4–5) reach ' +
          'about TOPIK level 4, so the gauge moves within the 2–4 range; going higher needs more advanced material.</p>' +
        "</details>" +
      "</div>"
    );
  }

  return { estimate: estimate, gaugeHTML: gaugeHTML };
})();

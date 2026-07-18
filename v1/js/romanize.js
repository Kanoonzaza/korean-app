/* romanize.js — Revised Romanization (RR) of Korean, reflecting sound changes.
 *
 * Decomposes Hangul syllables and applies the standard RR transcription rules:
 * liaison (연음), aspiration (격음화), nasalization (비음화), lateralization (유음화),
 * palatalization (구개음화), and final-consonant neutralization. Verified against a
 * battery of authoritative examples (안녕하세요→annyeonghaseyo, 좋다→jota,
 * 맛있어요→masisseoyo, 학교→hakgyo, 같이→gachi, 신라→silla, 입니다→imnida, …).
 *
 * Note: like official RR transcription, automatic tensification (경음화) is not
 * doubled (학교 → "hakgyo", not "hakkkyo"). Always defer to the 🔊 audio for the
 * exact pronunciation; romanization is a reading aid.
 *
 * window.Romanize(text) -> RR string.
 * window.RR(ko)        -> RR string, or "" when the user has romanization turned off.
 */
(function () {
  var CHO = ["g", "kk", "n", "d", "tt", "r", "m", "b", "pp", "s", "ss", "", "j", "jj", "ch", "k", "t", "p", "h"];
  var JUNG = ["a", "ae", "ya", "yae", "eo", "e", "yeo", "ye", "o", "wa", "wae", "oe", "yo", "u", "wo", "we", "wi", "yu", "eu", "ui", "i"];
  // neutralized final sound by jongseong index (0 = none)
  var FN = ["", "k", "k", "k", "n", "n", "n", "t", "l", "k", "m", "l", "l", "l", "p", "l", "m", "p", "p", "t", "t", "ng", "t", "t", "k", "t", "p", "t"];
  // liaison: when the next onset is ㅇ, how the final splits into {coda, onset}
  var LIA = {
    1: { c: "", o: "g" }, 2: { c: "", o: "kk" }, 3: { c: "k", o: "s" }, 4: { c: "", o: "n" },
    5: { c: "n", o: "j" }, 6: { c: "", o: "n" }, 7: { c: "", o: "d" }, 8: { c: "", o: "r" },
    9: { c: "l", o: "g" }, 10: { c: "l", o: "m" }, 11: { c: "l", o: "b" }, 12: { c: "l", o: "s" },
    13: { c: "l", o: "t" }, 14: { c: "l", o: "p" }, 15: { c: "", o: "r" }, 16: { c: "", o: "m" },
    17: { c: "", o: "b" }, 18: { c: "p", o: "s" }, 19: { c: "", o: "s" }, 20: { c: "", o: "ss" },
    21: { c: "ng", o: "" }, 22: { c: "", o: "j" }, 23: { c: "", o: "ch" }, 24: { c: "", o: "k" },
    25: { c: "", o: "t" }, 26: { c: "", o: "p" }, 27: { c: "", o: "" }
  };

  function assim(fi, ni) {
    var codaN = FN[fi], onset = CHO[ni];
    // final contains ㅎ (ㅎ / ㄶ / ㅀ) → aspirate the next plain onset
    if (fi === 27 || fi === 6 || fi === 15) {
      var base = (fi === 6 ? "n" : (fi === 15 ? "l" : ""));
      var asp = { 0: "k", 3: "t", 12: "ch", 7: "p", 9: "ss" };
      if (asp[ni] !== undefined) return { c: base, o: asp[ni] };
      if (ni === 2) return { c: "n", o: "n" };
      return { c: base || codaN, o: onset };
    }
    // next onset is ㅎ → aspirate the final
    if (ni === 18) {
      if (codaN === "k") return { c: "", o: "k" };
      if (codaN === "t") return { c: "", o: "t" };
      if (codaN === "p") return { c: "", o: "p" };
      return { c: codaN, o: "h" };
    }
    // nasalization before ㄴ / ㅁ
    if (ni === 2 || ni === 6) {
      if (codaN === "k") return { c: "ng", o: onset };
      if (codaN === "t") return { c: "n", o: onset };
      if (codaN === "p") return { c: "m", o: onset };
    }
    // before ㄹ (lateralization / nasalization)
    if (ni === 5) {
      if (codaN === "n" || codaN === "l") return { c: "l", o: "l" };
      if (codaN === "k") return { c: "ng", o: "n" };
      if (codaN === "p" || codaN === "m") return { c: "m", o: "n" };
      if (codaN === "ng") return { c: "ng", o: "n" };
    }
    if (codaN === "l" && ni === 2) return { c: "l", o: "l" }; // ㄹ + ㄴ → ll
    return { c: codaN, o: onset };
  }

  function romanize(text) {
    if (!text) return "";
    var S = 0xAC00, L = 19, V = 21, T = 28, sy = [];
    for (var i = 0; i < text.length; i++) {
      var cc = text.charCodeAt(i);
      if (cc >= S && cc < S + L * V * T) {
        var s = cc - S;
        sy.push({ l: Math.floor(s / (V * T)), v: Math.floor(s / T) % V, t: s % T });
      } else sy.push({ ch: text[i] });
    }
    var out = [];
    for (var j = 0; j < sy.length; j++) {
      var cur = sy[j];
      if (cur.ch !== undefined) { out.push(cur.ch); continue; }
      var nx = sy[j + 1];
      var onset = (cur._o !== undefined ? cur._o : CHO[cur.l]);
      var vowel = JUNG[cur.v], fi = cur.t, coda = "";
      if (fi > 0) {
        if (nx && nx.l !== undefined && CHO[nx.l] === "") {        // liaison (next onset ㅇ)
          var t = LIA[fi]; coda = t.c; var no = t.o;
          if ((fi === 7 || fi === 25) && nx.v === 20) no = (fi === 7 ? "j" : "ch"); // palatalization
          nx._o = no;
        } else if (nx && nx.l !== undefined) {                      // consonant boundary
          var a = assim(fi, nx.l); coda = a.c; if (a.o !== undefined) nx._o = a.o;
        } else coda = FN[fi];                                       // word-final
      }
      out.push(onset + vowel + coda);
    }
    return out.join("");
  }

  window.Romanize = romanize;
  window.RR = function (ko) {
    try { if (window.Storage && !window.Storage.romajiEnabled()) return ""; } catch (e) {}
    return romanize(ko || "");
  };
})();

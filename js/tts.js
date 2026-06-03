/* tts.js — speak Korean via the browser's Web Speech API.
 * Gracefully reports when no Korean voice is available so the UI can hide 🔊.
 */
window.TTS = (function () {
  var supported = typeof window.speechSynthesis !== "undefined";
  var koVoice = null;
  var ready = false;

  function pickVoice() {
    if (!supported) return;
    var voices = window.speechSynthesis.getVoices();
    koVoice =
      voices.find(function (v) { return v.lang && v.lang.toLowerCase().indexOf("ko") === 0; }) ||
      null;
    ready = voices.length > 0;
  }

  if (supported) {
    pickVoice();
    // Voices often load asynchronously.
    window.speechSynthesis.onvoiceschanged = pickVoice;
  }

  return {
    // True only once we actually have a Korean voice to use.
    available: function () { return supported && !!koVoice; },

    // Whether the engine exists at all (voices may still be loading).
    engineExists: function () { return supported; },

    speak: function (text) {
      if (!supported || !text) return;
      try {
        window.speechSynthesis.cancel();
        var u = new SpeechSynthesisUtterance(text);
        if (!koVoice) pickVoice();
        if (koVoice) u.voice = koVoice;
        u.lang = "ko-KR";
        u.rate = 0.92;
        window.speechSynthesis.speak(u);
      } catch (e) {
        console.warn("TTS failed:", e);
      }
    }
  };
})();

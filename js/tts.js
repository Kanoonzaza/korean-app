// tts.js — speak Korean via the browser's Web Speech API.
// Ported from v1/js/tts.js. Silently no-ops when no Korean voice is available so
// the UI can hide the 🔊 control. Touches window.speechSynthesis only.

const supported = typeof window !== "undefined" && typeof window.speechSynthesis !== "undefined";
let koVoice = null;

function pickVoice() {
  if (!supported) return;
  // v1 preference: first voice whose BCP-47 lang tag starts with "ko".
  const voices = window.speechSynthesis.getVoices();
  koVoice = voices.find(v => v.lang && v.lang.toLowerCase().indexOf("ko") === 0) || null;
}

if (supported) {
  pickVoice();
  // Voices often load asynchronously; re-pick when the list arrives.
  window.speechSynthesis.onvoiceschanged = pickVoice;
}

// True once a Korean voice is actually available. Re-checks in case voices
// finished loading after module init.
export function hasKorean() {
  if (!supported) return false;
  if (!koVoice) pickVoice();
  return !!koVoice;
}

// Speak `text` at `rate` (default 0.92, matching v1). Cancels any ongoing
// utterance first (v1 behavior). Falls back silently on any failure.
export function speak(text, rate) {
  if (!supported || !text) return;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    if (!koVoice) pickVoice();
    if (koVoice) u.voice = koVoice;
    u.lang = "ko-KR";
    u.rate = (typeof rate === "number" && rate > 0) ? rate : 0.92;
    window.speechSynthesis.speak(u);
  } catch (e) {
    console.warn("TTS failed:", e);
  }
}

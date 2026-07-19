const P = "kov2.";
function get(k, fallback) { try { return JSON.parse(localStorage.getItem(P + k)) ?? fallback; } catch { return fallback; } }
function set(k, v) { localStorage.setItem(P + k, JSON.stringify(v)); }
export const store = {
  lessons: () => get("lessons", {}),                 // {"4.01": {step, done, best}}
  setLesson(id, v) { const m = get("lessons", {}); m[id] = v; set("lessons", m); },
  cards: () => get("cards", {}),                     // {"KE|word": schedState}
  setCard(id, v) { const m = get("cards", {}); m[id] = v; set("cards", m); },
  removeCard(id) { const m = get("cards", {}); delete m[id]; set("cards", m); },
  cardsMeta: () => get("cardsMeta", {}),             // {day, introduced, newPerDay}
  setCardsMeta: v => set("cardsMeta", v),
  weak: () => get("weak", {}),                       // {ko: {en, kind}}
  setWeak: v => set("weak", v),
  days: () => get("days", {}),                       // {"2026-07-18": {right, wrong, done:[...]}}
  setDays: v => set("days", v),
  settings: () => get("settings", { ttsRate: 1, newPerDay: 20 }),
  setSettings: v => set("settings", v),
  exportAll() { const o = {}; for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k.startsWith(P)) o[k] = localStorage.getItem(k); } return JSON.stringify(o); },
  importAll(json) { const o = JSON.parse(json); Object.entries(o).forEach(([k, v]) => { if (k.startsWith(P)) localStorage.setItem(k, v); }); },
};

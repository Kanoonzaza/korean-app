// localStorage-backed store, all keys prefixed "kov2.".
//
// NOTE: every accessor (lessons(), cards(), days(), ...) returns a FRESH parse
// of the stored JSON — a plain object snapshot, not a live reference. Mutating
// the returned object without calling a setter is silently lost. Always
// read-modify-write: take the whole object, change it, pass it to the setter
// (or use an item-level helper like setLesson/setCard/setDay).
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
  reading: () => get("reading", {}),                  // {"r4-1": {best}}
  setReading(id, v) { const m = get("reading", {}); m[id] = v; set("reading", m); },
  days: () => get("days", {}),                       // {"2026-07-18": {right, wrong, done:[...]}}
  setDays: v => set("days", v),
  setDay(dateKey, v) { const m = get("days", {}); m[dateKey] = v; set("days", m); },
  settings: () => get("settings", { ttsRate: 1, newPerDay: 20 }),
  setSettings: v => set("settings", v),
  lastBackup: () => get("lastBackup", null),         // "YYYY-MM-DD" of the last export
  setLastBackup: v => set("lastBackup", v),
  // True once there is anything worth losing. Gates both the persistent-storage
  // request and the backup reminder, so a brand-new browser is asked for neither.
  //
  // A day record on its own is NOT evidence: syncToday() writes one the moment a
  // leg is vacuously complete (nothing due that day), so simply opening the app
  // creates days{} with done:["dict"] and no work behind it. Only days that hold
  // graded answers count.
  hasProgress() {
    if (Object.keys(get("lessons", {})).length > 0) return true;
    if (Object.keys(get("cards", {})).length > 0) return true;
    return Object.values(get("days", {})).some(d => {
      if (!d) return false;
      const right = typeof d.right === "number" ? d.right : 0;
      const wrong = typeof d.wrong === "number" ? d.wrong : 0;
      return right + wrong > 0;
    });
  },
  exportAll() { const o = {}; for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k.startsWith(P)) o[k] = localStorage.getItem(k); } return JSON.stringify(o); },
  importAll(json) { const o = JSON.parse(json); Object.entries(o).forEach(([k, v]) => { if (k.startsWith(P)) localStorage.setItem(k, v); }); },
};

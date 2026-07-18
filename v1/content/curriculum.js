/* curriculum.js — academic framework metadata per lesson.
 *
 * Each entry maps a lesson id to:
 *   topik     — approximate TOPIK level the grammar point sits at (1–6)
 *   cefr      — approximate CEFR band (A1–C2)
 *   objective — a CEFR-style "can-do" learning objective
 *
 * NOTE: these alignments are APPROXIMATE, mapped to the standard TOPIK / CEFR /
 * 국립국어원 grammar progression — a study aid, not an official placement.
 */
window.CURRICULUM = {
  "4.1":  { topik: 2, cefr: "A2", objective: "I can say what I have to do (obligation)." },
  "4.2":  { topik: 2, cefr: "A2", objective: "I can ask for permission and state what's not allowed." },
  "4.3":  { topik: 2, cefr: "A2", objective: "I can say what I am and am not able to do." },
  "4.4":  { topik: 2, cefr: "A2", objective: "I can give a reason, even before a suggestion or request." },
  "4.5":  { topik: 2, cefr: "A2", objective: "I can talk about conditions ('if / when…')." },
  "4.6":  { topik: 3, cefr: "B1", objective: "I can give opinions and guesses ('I think / it seems…')." },
  "4.7":  { topik: 3, cefr: "A2", objective: "I can describe changes of state ('become…')." },
  "4.8":  { topik: 2, cefr: "A2", objective: "I can say when something happens ('when…')." },
  "4.9":  { topik: 2, cefr: "A2", objective: "I can order actions with 'before…'." },
  "4.10": { topik: 2, cefr: "A2", objective: "I can order actions with 'after…'." },
  "4.11": { topik: 2, cefr: "A2", objective: "I can suggest trying something and ask about experience." },
  "4.12": { topik: 2, cefr: "A2", objective: "I can make polite requests and offers ('do for me/you')." },
  "4.13": { topik: 2, cefr: "A2", objective: "I can compare things ('more than / the most')." },
  "4.14": { topik: 2, cefr: "A2", objective: "I can describe ongoing actions ('be …-ing')." },
  "4.15": { topik: 3, cefr: "B1", objective: "I can describe how a situation came about ('end up…')." },
  "4.16": { topik: 3, cefr: "A2", objective: "I can say whether I know how to do something." },
  "4.17": { topik: 2, cefr: "A2", objective: "I can express inability ('cannot')." },
  "4.18": { topik: 3, cefr: "A2", objective: "I can describe two actions at once ('while…')." },
  "4.19": { topik: 3, cefr: "B1", objective: "I can talk about decisions and plans ('decide to…')." },
  "4.20": { topik: 3, cefr: "A2", objective: "I can talk about past experiences ('have done…')." },
  "5.1":  { topik: 3, cefr: "B1", objective: "I can concede a point ('even if / even though…')." },
  "5.2":  { topik: 3, cefr: "B1", objective: "I can give reasons in a clear, formal way ('because…')." },
  "5.3":  { topik: 3, cefr: "B1", objective: "I can express intentions and plans ('intend / about to…')." },
  "5.4":  { topik: 3, cefr: "B1", objective: "I can link immediate events ('as soon as…')." },
  "5.5":  { topik: 2, cefr: "A2", objective: "I can state the purpose of going somewhere ('go to do…')." },
  "5.6":  { topik: 3, cefr: "B1", objective: "I can react with realization or mild surprise ('oh, it's…!')." }
};

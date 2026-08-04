import { start } from "./router.js";
import { register as today } from "./views/today.js";
import { register as syllabus } from "./views/syllabus.js";
import { register as lesson } from "./views/lesson.js";
import { register as practice } from "./views/practice.js";
import { register as cards } from "./views/cards.js";
import { register as dictation } from "./views/dictation.js";
import { register as reading } from "./views/reading.js";
import { register as listening } from "./views/listening.js";
import { register as weak } from "./views/weak.js";
import { register as me } from "./views/me.js";

// Register every view's route(s), then start the router.
[today, syllabus, lesson, practice, cards, dictation, reading, listening, weak, me]
  .forEach(register => register());

start();

// Offline support. sw.js precaches the whole app; file:// has no SW at all,
// which is one more reason to serve the app over http (see README).
if (location.protocol.startsWith("http") && "serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}

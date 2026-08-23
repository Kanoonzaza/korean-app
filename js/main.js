import { start } from "./router.js";
import { store } from "./store.js";
import { watchForUpdates } from "./update.js";
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
// Registration lives in js/update.js because a new worker is now held back until
// the user taps Reload — see the comment there for why.
watchForUpdates();

// Ask the browser to keep localStorage. Every bit of progress — lessons, card
// schedules, day history — lives there and syncs nowhere, so eviction is the one
// failure that loses real work. Default "best-effort" storage is discardable
// under disk pressure, and iOS Safari clears it after 7 days of no interaction
// when the site was never added to the home screen.
//
// Only asked once there is progress worth keeping: Firefox shows a permission
// prompt for this, and a first-ever visit has nothing to protect. Chrome decides
// silently from engagement/installation, so the call is free there.
if (location.protocol.startsWith("http") && navigator.storage && navigator.storage.persist) {
  (async () => {
    try {
      if (await navigator.storage.persisted()) return;
      if (store.hasProgress()) await navigator.storage.persist();
    } catch { /* unsupported, or the user declined — nothing to do either way */ }
  })();
}

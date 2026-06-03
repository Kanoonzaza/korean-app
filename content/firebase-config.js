/* Firebase web config for cloud sync.
 *
 * Two ways to enable sync:
 *   (A) Paste your config object below (replaces null) — then EVERY device that loads
 *       the app already has it, and each device only needs to enter a sync code.
 *   (B) Leave it null and paste the config inside the app (Progress → Cloud sync) on
 *       each device instead.
 *
 * Get the config from: Firebase console → Project settings (gear) → "Your apps" →
 * Web app → SDK setup and configuration → "Config".
 *
 * This config is SAFE to be public (it only identifies the project); access is
 * controlled by Firestore security rules, not by hiding these values.
 */
window.FIREBASE_CONFIG = null;

/* Example shape:
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};
*/

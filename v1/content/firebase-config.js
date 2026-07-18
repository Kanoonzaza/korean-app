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
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyBPK8i9_tatMpzqZKbnQwW8Tm2ZYzZzmY4",
  authDomain: "korean-app-d08a8.firebaseapp.com",
  projectId: "korean-app-d08a8",
  storageBucket: "korean-app-d08a8.firebasestorage.app",
  messagingSenderId: "525936316941",
  appId: "1:525936316941:web:fcc3f4d13b9d29d6837b44"
};

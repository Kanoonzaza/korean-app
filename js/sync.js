/* sync.js — cloud sync via Firebase Auth (Google sign-in) + Firestore.
 *
 * Experience: tap "Sign in with Google" once per device → progress syncs
 * automatically under your account (Firestore doc progress/{uid}). No codes.
 *   - on sign-in / load: pull + MERGE (no progress lost), then push.
 *   - after any change: debounced push.
 *   - back online: re-sync.
 * Session persists, so a signed-in device auto-syncs on every open.
 *
 * The Firebase SDK is loaded only when needed (signed-in session on load, or when
 * the user taps sign-in), so signed-out/offline use stays light.
 */
window.Sync = (function () {
  var SDK = "https://www.gstatic.com/firebasejs/10.12.2/";
  var SIGNED = "koreanApp.signedin";   // remembers to auto-restore the session
  var LAST = "koreanApp.synclast";
  var started = false, authResolved = false, authUser = null;
  var db = null, pushTimer = null, subscribed = false, msgCb = null;

  function ls(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsset(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  function getConfig() { return window.FIREBASE_CONFIG || null; }
  function isConfigured() { return !!getConfig(); }
  function isSignedIn() { return !!authUser; }
  function getUser() { return authUser; }
  function lastSynced() { return ls(LAST) || ""; }
  function connecting() { return ls(SIGNED) === "1" && !authResolved; }
  function onMessage(cb) { msgCb = cb; }
  function notify(m) { if (msgCb) msgCb(m); }

  function loadScript(src) {
    return new Promise(function (res, rej) {
      var s = document.createElement("script");
      s.src = src; s.onload = res;
      s.onerror = function () { rej(new Error("load-failed")); };
      document.head.appendChild(s);
    });
  }
  function loadSDK() {
    if (window.firebase && window.firebase.auth && window.firebase.firestore) return Promise.resolve();
    return loadScript(SDK + "firebase-app-compat.js")
      .then(function () { return loadScript(SDK + "firebase-auth-compat.js"); })
      .then(function () { return loadScript(SDK + "firebase-firestore-compat.js"); });
  }

  function ensureStarted() {
    if (started) return Promise.resolve();
    var cfg = getConfig();
    if (!cfg) return Promise.reject(new Error("no-config"));
    return loadSDK().then(function () {
      if (!window.firebase.apps.length) window.firebase.initializeApp(cfg);
      db = window.firebase.firestore();
      started = true;
      window.firebase.auth().getRedirectResult().catch(function () {});
      window.firebase.auth().onAuthStateChanged(function (user) {
        authResolved = true;
        authUser = user;
        lsset(SIGNED, user ? "1" : "0");
        if (user) beginSync();
        if (window.App && window.App.refresh) window.App.refresh();
      });
    });
  }

  function docRef() { return db.collection("progress").doc(authUser.uid); }
  function mark() { lsset(LAST, new Date().toISOString()); }

  function pull(done) {
    if (!authUser) return done && done("signed-out");
    docRef().get().then(function (snap) {
      if (snap.exists) {
        var d = snap.data();
        if (d && d.data) {
          window.Storage.mergeData(d.data);
          if (window.App && window.App.refresh) window.App.refresh();
        }
      }
      mark(); done && done(null);
    }).catch(function (e) { done && done(e); });
  }
  function push(done) {
    if (!authUser) return done && done("signed-out");
    docRef().set({ data: window.Storage.getProgress(), updatedAt: Date.now() })
      .then(function () { mark(); done && done(null); })
      .catch(function (e) { done && done(e); });
  }
  function schedulePush() {
    if (!authUser) return;
    clearTimeout(pushTimer);
    pushTimer = setTimeout(function () { push(); }, 1500);
  }
  function beginSync() {
    if (!subscribed) {
      window.Storage.subscribe(schedulePush);
      window.addEventListener("online", function () { if (authUser) syncNow(); });
      subscribed = true;
    }
    syncNow();
  }
  function syncNow(done) { pull(function () { push(done); }); }

  function signIn() {
    ensureStarted().then(function () {
      var provider = new window.firebase.auth.GoogleAuthProvider();
      // Redirect is the most reliable method across desktop and installed PWAs.
      window.firebase.auth().signInWithRedirect(provider);
    }).catch(function (e) {
      notify("Couldn't start sign-in (are you online?): " + (e.message || e));
    });
  }
  function signOut() {
    lsset(SIGNED, "0");
    if (window.firebase && window.firebase.auth) {
      window.firebase.auth().signOut().then(function () {
        authUser = null;
        if (window.App && window.App.refresh) window.App.refresh();
      });
    }
  }

  function init() {
    if (!isConfigured()) return;
    if (ls(SIGNED) === "1") ensureStarted().catch(function () {});  // restore session + auto-sync
  }

  return {
    isConfigured: isConfigured, isSignedIn: isSignedIn, getUser: getUser,
    lastSynced: lastSynced, connecting: connecting,
    signIn: signIn, signOut: signOut, syncNow: syncNow,
    onMessage: onMessage, init: init
  };
})();

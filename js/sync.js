/* sync.js — optional cloud sync of progress via Firebase Firestore.
 *
 * Model: one Firestore document per "sync code" in collection `progress`.
 * Enter the same code on each device and they share progress automatically:
 *   - on load: pull remote, MERGE into local (no progress lost), then push.
 *   - after any change: debounced push.
 *   - when back online: sync.
 *
 * Privacy: anyone who knows your sync code can read/overwrite that progress, so we
 * use a long random code. Config + code live in localStorage (per device).
 *
 * Stays completely dormant until a Firebase config is provided (window.FIREBASE_CONFIG
 * or pasted in-app) AND a sync code is set + sync turned on.
 */
window.Sync = (function () {
  var LSK = {
    config: "koreanApp.fbconfig",
    code: "koreanApp.synccode",
    on: "koreanApp.syncon",
    last: "koreanApp.synclast"
  };
  var SDK = "https://www.gstatic.com/firebasejs/10.12.2/";
  var fbReady = false, db = null, pushTimer = null;

  function ls(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsset(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  function getConfig() {
    if (window.FIREBASE_CONFIG) return window.FIREBASE_CONFIG;
    var s = ls(LSK.config);
    if (s) { try { return JSON.parse(s); } catch (e) {} }
    return null;
  }
  function isConfigured() { return !!getConfig(); }
  function getCode() { return ls(LSK.code) || ""; }
  function isOn() { return ls(LSK.on) === "1" && isConfigured() && !!getCode(); }
  function lastSynced() { return ls(LSK.last) || ""; }

  function setConfig(obj) { if (obj) lsset(LSK.config, JSON.stringify(obj)); }
  function setCode(c) { lsset(LSK.code, (c || "").trim()); }
  function genCode() {
    var a = "abcdefghijklmnopqrstuvwxyz0123456789", s = "";
    for (var i = 0; i < 20; i++) s += a[Math.floor(Math.random() * a.length)];
    return s;
  }
  function markSynced() { lsset(LSK.last, new Date().toISOString()); }

  function loadSDK(cb, err) {
    if (fbReady || (window.firebase && window.firebase.firestore)) { fbReady = true; return cb(); }
    var a = document.createElement("script"); a.src = SDK + "firebase-app-compat.js";
    a.onload = function () {
      var b = document.createElement("script"); b.src = SDK + "firebase-firestore-compat.js";
      b.onload = function () { fbReady = true; cb(); };
      b.onerror = function () { err && err("sdk-load-failed"); };
      document.head.appendChild(b);
    };
    a.onerror = function () { err && err("sdk-load-failed"); };
    document.head.appendChild(a);
  }

  function ensureDb(cb, err) {
    var cfg = getConfig();
    if (!cfg) return err && err("no-config");
    loadSDK(function () {
      try {
        if (!window.firebase.apps.length) window.firebase.initializeApp(cfg);
        db = window.firebase.firestore();
        cb();
      } catch (e) { err && err(e); }
    }, err);
  }

  function docRef() { return db.collection("progress").doc(getCode()); }

  function pull(done) {
    if (!isOn()) return done && done("off");
    ensureDb(function () {
      docRef().get().then(function (snap) {
        if (snap.exists) {
          var d = snap.data();
          if (d && d.data) {
            window.Storage.mergeData(d.data);
            if (window.App && window.App.refresh) window.App.refresh();
          }
        }
        markSynced();
        done && done(null);
      }).catch(function (e) { done && done(e); });
    }, function (e) { done && done(e); });
  }

  function push(done) {
    if (!isOn()) return done && done("off");
    ensureDb(function () {
      docRef().set({ data: window.Storage.getProgress(), updatedAt: Date.now() }).then(function () {
        markSynced();
        done && done(null);
      }).catch(function (e) { done && done(e); });
    }, function (e) { done && done(e); });
  }

  function schedulePush() {
    if (!isOn()) return;
    clearTimeout(pushTimer);
    pushTimer = setTimeout(function () { push(); }, 1500);
  }

  function syncNow(done) { pull(function () { push(done); }); }

  function enable(code) {
    if (code) setCode(code);
    if (!getCode()) setCode(genCode());
    lsset(LSK.on, "1");
    syncNow();           // merge both ways on first enable
  }
  function disable() { lsset(LSK.on, "0"); }

  function init() {
    // Always listen for changes; the push no-ops while sync is off.
    window.Storage.subscribe(schedulePush);
    window.addEventListener("online", function () { if (isOn()) syncNow(); });
    if (isOn()) syncNow();
  }

  return {
    isConfigured: isConfigured, getConfig: getConfig, setConfig: setConfig,
    getCode: getCode, setCode: setCode, genCode: genCode,
    isOn: isOn, lastSynced: lastSynced,
    enable: enable, disable: disable, syncNow: syncNow, init: init
  };
})();

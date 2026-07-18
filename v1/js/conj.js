/* conj.js — conjugation drills: random verb × grammar ending from the lessons.
 *
 * Every form is stored explicitly per verb (no auto-conjugation engine), so
 * irregular verbs (ㄷ→ㄹ, ㅂ→우, 르, ㄹ-drop, ㅡ-drop) are always correct.
 * Fields per verb:
 *   dict  dictionary form          ae    아/어 form (먹어, 와, 불러)
 *   l     (으)ㄹ-attached (먹을)    myeon (으)면 form (들으면)
 *   neun  present modifier (듣는)   gi    stem before 기/고/지 (듣)
 *   nikka (으)니까 form (사니까)    eun   past modifier (들은)
 */
window.Conj = (function () {
  var VERBS = [
    { dict: "가다", en: "to go", ae: "가", l: "갈", myeon: "가면", neun: "가는", gi: "가", nikka: "가니까", eun: "간" },
    { dict: "오다", en: "to come", ae: "와", l: "올", myeon: "오면", neun: "오는", gi: "오", nikka: "오니까", eun: "온" },
    { dict: "먹다", en: "to eat", ae: "먹어", l: "먹을", myeon: "먹으면", neun: "먹는", gi: "먹", nikka: "먹으니까", eun: "먹은" },
    { dict: "마시다", en: "to drink", ae: "마셔", l: "마실", myeon: "마시면", neun: "마시는", gi: "마시", nikka: "마시니까", eun: "마신" },
    { dict: "보다", en: "to see / watch", ae: "봐", l: "볼", myeon: "보면", neun: "보는", gi: "보", nikka: "보니까", eun: "본" },
    { dict: "하다", en: "to do", ae: "해", l: "할", myeon: "하면", neun: "하는", gi: "하", nikka: "하니까", eun: "한" },
    { dict: "공부하다", en: "to study", ae: "공부해", l: "공부할", myeon: "공부하면", neun: "공부하는", gi: "공부하", nikka: "공부하니까", eun: "공부한" },
    { dict: "읽다", en: "to read", ae: "읽어", l: "읽을", myeon: "읽으면", neun: "읽는", gi: "읽", nikka: "읽으니까", eun: "읽은" },
    { dict: "쓰다", en: "to write / use", ae: "써", l: "쓸", myeon: "쓰면", neun: "쓰는", gi: "쓰", nikka: "쓰니까", eun: "쓴" },
    { dict: "듣다", en: "to listen", ae: "들어", l: "들을", myeon: "들으면", neun: "듣는", gi: "듣", nikka: "들으니까", eun: "들은" },
    { dict: "걷다", en: "to walk", ae: "걸어", l: "걸을", myeon: "걸으면", neun: "걷는", gi: "걷", nikka: "걸으니까", eun: "걸은" },
    { dict: "묻다", en: "to ask", ae: "물어", l: "물을", myeon: "물으면", neun: "묻는", gi: "묻", nikka: "물으니까", eun: "물은" },
    { dict: "돕다", en: "to help", ae: "도와", l: "도울", myeon: "도우면", neun: "돕는", gi: "돕", nikka: "도우니까", eun: "도운" },
    { dict: "살다", en: "to live", ae: "살아", l: "살", myeon: "살면", neun: "사는", gi: "살", nikka: "사니까", eun: "산" },
    { dict: "알다", en: "to know", ae: "알아", l: "알", myeon: "알면", neun: "아는", gi: "알", nikka: "아니까", eun: "안" },
    { dict: "만들다", en: "to make", ae: "만들어", l: "만들", myeon: "만들면", neun: "만드는", gi: "만들", nikka: "만드니까", eun: "만든" },
    { dict: "놀다", en: "to play / hang out", ae: "놀아", l: "놀", myeon: "놀면", neun: "노는", gi: "놀", nikka: "노니까", eun: "논" },
    { dict: "자다", en: "to sleep", ae: "자", l: "잘", myeon: "자면", neun: "자는", gi: "자", nikka: "자니까", eun: "잔" },
    { dict: "사다", en: "to buy", ae: "사", l: "살", myeon: "사면", neun: "사는", gi: "사", nikka: "사니까", eun: "산" },
    { dict: "주다", en: "to give", ae: "줘", l: "줄", myeon: "주면", neun: "주는", gi: "주", nikka: "주니까", eun: "준" },
    { dict: "받다", en: "to receive", ae: "받아", l: "받을", myeon: "받으면", neun: "받는", gi: "받", nikka: "받으니까", eun: "받은" },
    { dict: "입다", en: "to wear", ae: "입어", l: "입을", myeon: "입으면", neun: "입는", gi: "입", nikka: "입으니까", eun: "입은" },
    { dict: "찾다", en: "to find / look for", ae: "찾아", l: "찾을", myeon: "찾으면", neun: "찾는", gi: "찾", nikka: "찾으니까", eun: "찾은" },
    { dict: "배우다", en: "to learn", ae: "배워", l: "배울", myeon: "배우면", neun: "배우는", gi: "배우", nikka: "배우니까", eun: "배운" },
    { dict: "기다리다", en: "to wait", ae: "기다려", l: "기다릴", myeon: "기다리면", neun: "기다리는", gi: "기다리", nikka: "기다리니까", eun: "기다린" },
    { dict: "부르다", en: "to call / sing", ae: "불러", l: "부를", myeon: "부르면", neun: "부르는", gi: "부르", nikka: "부르니까", eun: "부른" },
    { dict: "모르다", en: "to not know", ae: "몰라", l: "모를", myeon: "모르면", neun: "모르는", gi: "모르", nikka: "모르니까", eun: "모른" },
    { dict: "만나다", en: "to meet", ae: "만나", l: "만날", myeon: "만나면", neun: "만나는", gi: "만나", nikka: "만나니까", eun: "만난" }
  ];

  // One entry per grammar point taught in the lessons.
  var ENDINGS = [
    { label: "must (~아/어야 돼요)", make: function (v) { return v.ae + "야 돼요"; } },
    { label: "may (~아/어도 돼요)", make: function (v) { return v.ae + "도 돼요"; } },
    { label: "must not (~(으)면 안 돼요)", make: function (v) { return v.myeon + " 안 돼요"; } },
    { label: "can (~(으)ㄹ 수 있어요)", make: function (v) { return v.l + " 수 있어요"; } },
    { label: "cannot (~(으)ㄹ 수 없어요)", make: function (v) { return v.l + " 수 없어요"; } },
    { label: "because (~(으)니까)", make: function (v) { return v.nikka; } },
    { label: "if / when (~(으)면)", make: function (v) { return v.myeon; } },
    { label: "seems like (~는 것 같아요)", make: function (v) { return v.neun + " 것 같아요"; } },
    { label: "when (~(으)ㄹ 때)", make: function (v) { return v.l + " 때"; } },
    { label: "before (~기 전에)", make: function (v) { return v.gi + "기 전에"; } },
    { label: "after (~(으)ㄴ 후에)", make: function (v) { return v.eun + " 후에"; } },
    { label: "try (~아/어 보세요)", make: function (v) { return v.ae + " 보세요"; } },
    { label: "progressive (~고 있어요)", make: function (v) { return v.gi + "고 있어요"; } },
    { label: "decided to (~기로 했어요)", make: function (v) { return v.gi + "기로 했어요"; } },
    { label: "as soon as (~자마자)", make: function (v) { return v.gi + "자마자"; } }
  ];

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  // n typed questions in the shared runner format (works with questionInner).
  function build(n) {
    n = n || 10;
    var verbs = shuffle(VERBS);
    var qs = [];
    for (var i = 0; i < n; i++) {
      var v = verbs[i % verbs.length];
      var e = ENDINGS[Math.floor(Math.random() * ENDINGS.length)];
      var answer = e.make(v);
      qs.push({
        kind: "type",
        promptText: v.dict + " (" + v.en + ")  →  " + e.label,
        answer: answer,
        romaji: "",
        en: v.en + " — " + e.label,
        check: (function (ans) {
          return function (input) { return window.Quiz.normalize(input) === window.Quiz.normalize(ans); };
        })(answer)
      });
    }
    return qs;
  }

  return { build: build };
})();

# Level 5 content spec review — `content/lessons/l5.js`

**Commit reviewed:** `ca3accf` (branch `main`, v2 merged) — `content/lessons/l5.js`, 29 lesson bodies, ids 5.01–5.30 minus 5.02.
**Reviewer pass date:** 2026-08-05
**Review key:** BRAINDUMP Part A (per-lesson cribs), Part D (GOLD blocks for 5.04, 5.05, 5.10, 5.12, 5.14, 5.16, 5.17, 5.19, 5.23, 5.29), plan Task 6, `content/curriculum.js`.
**Why this review exists:** L5 was the one batch that never got an independent pass. 5.01–5.15 were salvaged from a dead authoring agent; **5.16–5.30 were authored by the controller itself and had never been read by anyone else** — those are scrutinised hardest below and each finding is tagged with its range.

**Verdict:** ❌ **Not clean — 9 blocking findings, 24 polish findings.** Structure, quotas, leakage mechanics and all ten GOLD blocks are correct; the defects are linguistic/pedagogical and all are local fixes (no re-authoring needed). Blocking findings split **5 in the self-authored 5.16–5.30 range**, **4 in the 5.01–5.15 range**.

---

## 1. Structure & mechanics — PASS (re-run independently)

Parsed `export const L5` + `json.loads`; all checks re-run from scratch, not taken from prior claims.

- **29 entries**, ids exactly `5.01, 5.03–5.30`. No body for `5.02` (`status:"known"`). Matches `curriculum.js`: no missing bodies, no extras.
- Every `title`, `point` and `level` matches its `curriculum.js` entry exactly. No drift.
- `compressed:true` on **5.27 only** — matches the only `status:"compressed"` L5 entry.
- **Quotas** (vocab / sentences / bridge / pitfalls):
  - Full lessons: 5.01 8/7/2/3 · 5.03 7/7/2/3 · 5.04 7/7/2/3 · 5.05 7/8/2/3 · 5.07 7/8/2/3 · 5.08 7/8/2/3 · 5.09 6/8/2/3 · 5.10 6/7/2/3 · 5.12 7/8/2/3 · 5.14 6/8/2/3 · 5.15 7/8/2/3 · 5.16 8/8/3/3 · 5.17 8/8/3/3 · 5.18 8/8/3/3 · 5.19 8/8/3/3 · 5.23 8/8/3/2 · 5.24 7/8/3/3 · 5.25 6/8/3/3 · 5.26 6/8/2/2 · 5.28 7/8/3/3 · 5.29 7/8/3/3 — all within 6–10 / 6–8 / 2–3 / 2+. ✓
  - **5.21 5/8/2/2 — vocab is 5, below the 6-word minimum.** See P-01 (the crib grants "light vocab latitude" here, but it is still a deviation from the hard rule).
  - Word Builders: 5.06 8/7/0/2 · 5.13 8/8/0/2 · 5.22 8/7/0/2 — bridge 0 is allowed (optional). ✓
  - Drills: 5.11 0/6/2/2 · 5.20 0/6/2/2 · 5.30 0/6/2/2. ✓
  - Compressed 5.27: 0/3/2/1. ✓
- Every lesson has non-empty `grammar.summary` / `formation` / `explanation` (compressed lesson: summary present); every vocab entry has `ko/en/romaji/pos`; every sentence has `en` + `romaji`.
- **Leakage checks re-run over l4.js + l5.js together, one `seen` set: 0 problems.**
  - No vocab word ∈ `known.js` (`KNOWN_TTMIK` ∪ `KNOWN_CORE5K`).
  - No vocab word repeated across any two lessons in either file.
  - Every `bridge` string is an exact `ko` in `content/ttmik-sentences.js`.
  - Every `blankWord` is a substring of its own `ko`.
  - **No `blankWord` occurs twice in its own sentence — the 5.18 bug is the only one that ever existed and it is fixed.** (5.18 S1 `그 사람이 오는지 안 오는지 몰라요` uses the full `오는지 안 오는지` as the blank, which occurs once. Correct.)

## 2. GOLD block fidelity (Part D) — PASS

Diffed all ten shipped `grammar` + `pitfalls` blocks against Part D.

| Lesson | Verdict |
|---|---|
| 5.04, 5.05, 5.10, 5.12, 5.14, 5.16, 5.17, 5.19, 5.23, 5.29 | Transcribed faithfully. Wording smoothed only (Part D's semicolon-joined note bundles split into separate `notes` array entries; `✗` sometimes spelled out as "is wrong"). |

**No linguistic claim was altered, dropped or weakened in any of the ten.** All Part D pitfalls survive intact, including the load-bearing ones: 달라고/주라고 (5.19), 니까-before-commands vs 아/어서 (5.14), 있다/없다 verb-side exception (5.05), 거라고-never-거다고 (5.29), nouns-take-이라고 (5.17).

Additions beyond Part D (permitted — additive, not contradictory, and all correct):
- 5.10: +1 note (question words are nouns), +1 pitfall (forward pointer to 5.17's -다고). Matches the crib.
- 5.12: +1 note, +1 pitfall on the 이/vowel split — **but the added material is factually wrong**, see B-01.
- 5.17, 5.19, 5.23, 5.29, 5.16: notes reorganised only.

## 3. Blocking findings

### B-01 — 5.12: 부산 taught as a vowel-final noun (it is consonant-final) — *range 5.01–5.15*
Shipped note 3 and pitfall 3 (both **added on top of** the GOLD block, not in Part D):
> "Consonant-final noun → 이라는 (한강이라는); **vowel-final → 라는 (부산이라는)**"
> "Keep 이 after consonants (한강이라는), **라는 after vowels (부산이라는)**"

부산 ends in ㄴ. It takes 이라는 — and the lesson's own S2 correctly writes `부산이라는 도시`. So the rule as stated contradicts the lesson's own example and would teach a learner to produce `부산라는`. Part D used 한강이라는/부산이라는 only as contraction examples, never as the consonant/vowel contrast; the error was introduced by the author.
**Fix:** use a genuinely vowel-final noun — `vowel-final → 라는 (제주라는 섬, 나비라는 곤충)`.

### B-02 — 5.24 S7: `제가 말고` is ungrammatical — *range 5.16–5.30 (self-authored)*
> `오늘은 제가 말고 친구가 대타로 갈 거예요.`

말고 attaches to a **bare noun**; it cannot follow a case-marked pronoun. `제가 말고` is not something a native speaker says.
**Fix:** `오늘은 저 말고 친구가 대타로 갈 거예요.`

### B-03 — 5.11 drill uses -(으)니까, which is not taught until 5.14 — *range 5.01–5.15*
Drill rule (Part A + batch rule 4): drills may only combine points from **lower** ids in the level.
> S2 `불이 꺼져 있는 걸 **보니** 다들 집에 갔나 봐요…`
> S5 `수업이 끝나자마자 조는 걸 **보니** 많이 피곤한가 봐요.`

`보니` is the connective -(으)니 (short -(으)니까) — precisely Lesson 5.14's point, three lessons later. A drill must not introduce untaught grammar.
**Fix:** `불이 꺼져 있어요. 다들 집에 갔나 봐요.` / `수업이 끝나자마자 졸아요. 많이 피곤한가 봐요.` (evidence + guess, the frame 5.04/5.05 already teach.)

### B-04 — 5.27 bridge contains the target grammar (and something harder) — *range 5.16–5.30 (self-authored)*
> BRIDGE: `싫다잖아요. 하지 마세요.`

Bridges must feature **prerequisite** grammar the new point builds on. This one is `-다잖아요` — the target `-잖아요` *plus* reported speech stacked on top, i.e. strictly harder than the lesson itself. The crib specifies 알다/기억하다 sentences. (The l5.js header even cites this deck sentence as the *source* for the grammar point, which is how it ended up as a bridge.)
**Fix:** replace with a known 알다/모르다 sentence, e.g. `저도 알아요.` / keep `저도 몰라요.` as the second.

### B-05 — 5.22 (Word Builder 食) lists two words that are not 食 words — *range 5.16–5.30 (self-authored)*
`공복` is **空腹** (empty + belly — no 食 at all), and `끼니` is a **native Korean** word with no hanja. Both sit in the vocab list of a lesson whose `canDo` is "I can recognize vocabulary built from the hanja 食", with no false-friend flag — the same class of error the 5.06 신문/新聞 correction exists to prevent. (5.06 itself handles 신문 correctly — see §5.)
**Fix:** swap both for genuine 食 words that pass leakage. `식습관` (食習慣) is not in `known.js` and is on the crib's own list; `편식` (偏食) / `육식` (肉食) / `걸식` (乞食) are also free. (`식품`, `식욕`, `식사`, `외식`, `과식`, `회식` are all in `known.js` and therefore ineligible as vocab; `시식` was consumed by 4.12.)

### B-06 — 5.17 S5 uses -(으)라고 하다, the point of 5.19 — *range 5.16–5.30 (self-authored)*
> `회사에서 진술을 다시 **하라고** 해서 갔어요.`

Task 6 rule 3: sentences use only the new point + L1–3 grammar + this lesson's/earlier vocab. Reported **commands** are two lessons away, and putting 하라고 inside the lesson that teaches 다고 actively muddies the contrast.
**Fix:** `회사에서 진술이 다시 필요하다고 해서 갔어요.`

### B-07 — 5.05 vocab: 수줍다 labelled a ㅂ-irregular — *range 5.01–5.15*
> VOCAB `수줍다` … note: "ㅂ-irregular: 수줍어요"

수줍다 is **regular** (수줍어, 수줍으니, 수줍은) — that is exactly why the note's own example is 수줍어요 and not 수주워요, and why S1's `수줍은가 봐요` is right. A true ㅂ-irregular would give 수주운가 봐요. The shipped forms are all correct; the *rule label* is false and would mislead a learner generalising from it (cf. 부끄럽다 → 부끄러워요, which is the real ㅂ-irregular).
**Fix:** note → "regular ㅂ-final stem: 수줍어요, 수줍은 (unlike 부끄럽다 → 부끄러워요)".

### B-08 — 5.26: `formation` contradicts its own pitfall — *range 5.16–5.30 (self-authored)*
> FORMATION: "… **Past + -(으)ㄴ 대신에.**"
> PITFALL 2: "The verb form stays present 는 even for past events: **어제 간 대신에 is wrong**…"

The formation licenses exactly the form the pitfall forbids. The pitfall is the crib's requirement and is the one to keep.
**Fix:** delete "Past + -(으)ㄴ 대신에" from the formation line (keep `Adjective + -(으)ㄴ 대신에`, which is the trade-off use and is correct).

### B-09 — 5.10 S3 is redundant/unnatural and its gloss is broken — *range 5.01–5.15*
> `이 도구의 정확한 명칭을 뭐라고 해요?` — "What's the exact name for this tool called?"

`X를 뭐라고 해요?` already means "what do you call X"; applying it to `명칭` ("name") yields "what do you call the exact name of this tool", which no native speaker would say. The English gloss is garbled in the same way.
**Fix:** `이 도구의 정확한 명칭이 뭐예요?` ("What's the exact name of this tool?") or, keeping the point, `이 도구를 뭐라고 해요?`

## 4. Linguistic review, lesson by lesson

Every sentence in all 29 lessons was read. Register is consistent 해요체 throughout, with the two correct exceptions: **5.16** (narrative -(ㄴ/는)다, as the point requires) and the 하십시오체 set expressions in **5.03** (수고하셨습니다 / 고생 많으셨습니다), which are lexical items.

**Canonical pitfalls demanded by the cribs — all present and correct** unless noted:

| Lesson | Crib pitfall | Status |
|---|---|---|
| 5.01 | did NOT happen; 뻔 spacing; always past | ✓ all three |
| 5.03 | 수고하세요 upward is cheeky; not to customers/teachers | ✓ both, plus a timing pitfall |
| 5.04 / 5.05 | **verb vs adjective split** (바쁘나 ✗ → 바쁜가); 있다/없다 verb-side; past funnels to -았나 | ✓ correct on both sides, and modelled in 5.05 S8 (바빴나 봐요) |
| 5.07 | **no tense before 자마자** (먹었자마자 ✗); vs -고 나서 | ✓ both |
| 5.09 | 하다가 vs 했다가; **same-subject rule** | ✓ both (see P-13 on over-strength) |
| 5.10 | 뭐라고 not 뭐다고; keep 이 after consonants | ✓ both |
| 5.12 | must modify a noun; drop it for known things | ✓ both (but see B-01) |
| 5.14 | **commands after -아/어서 are ungrammatical**; thanks/apologies keep 아/어서; discovery 니까 takes no past | ✓ all three, verbatim from GOLD; modelled in S1 (추우니까 … 닫아 주세요) and S2 (여니까) |
| 5.15 | vs plain -도; 라도 on a best case sounds sarcastic | ✓ both |
| 5.16 | 좋는다 ✗; 있다/없다 side with adjectives; narrative ≠ rude | ✓ all three |
| 5.17 | **nouns take -(이)라고 not -다고**; never quote the 요-form; tense inside the quote | ✓ all three, and modelled correctly in S4 (작가라고) and S6 (실언이었다고) |
| 5.18 | -는지 vs -는데 | ✓ present; crib's second pitfall missing (P-05) |
| 5.19 | **달라고 vs 주라고**; no polite endings in the quote; -지 말라고 | ✓ all three, and S2/S3 demonstrate the split with the right semantics |
| 5.23 | adjectives can't be imminent (예쁘려나 ✗); don't stack hedges | ✓ both |
| 5.24 | **말고 vs 아니라** (choice vs factual correction); -지 말고 needs a directive | ✓ both, explanation states it cleanly |
| 5.25 | **편이다 needs a modifier form** (커요 편이에요 ✗); no hedging absolutes (최고인 편 ✗) | ✓ both, plus a 는/(으)ㄴ split pitfall |
| 5.26 | the trade-off sense; tense stays 는 | ✓ both (but see B-08) |
| 5.28 | **밖에 requires 없다 + the 밖에 "outside" homograph**; 수밖에 spacing | ✓ both, homograph explicitly contrasted (밖에 있어요 = "he's outside") |
| 5.29 | **-(으)ㄹ 거다고 ✗**; keep original tense; past nouns 학생이었다고 | ✓ all three |

**Formation accuracy.** Irregulars and 받침 rules are handled correctly where they matter: 5.01 vowel/ㄹ vs consonant; 5.08 -으려고/-려고 incl. ㄹ-stem 살려고; 5.14 ㄹ-keeping 사니까; 5.16 ㄹ-drop 살다→산다/알다→안다/놀다→논다; 5.19 ㄹ-stems attach directly; 5.23 ㄹ-stems 팔려나. Sentences honour them (5.14 S1 추우니까 = ㅂ-irregular; 5.10 S6 일컬었어요 = ㄷ-irregular, correctly noted; 5.18 S3 아는지 = ㄹ-drop). Gaps: P-04 (5.18), P-19 (5.25).

## 5. Word Builders — 5.06 文 / 5.13 會 / 5.22 食

- **5.06 (文): correct, including the false friend.** The lesson states three times — explanation, note, pitfall — that **신문 is 新聞 (聞 "hear"), NOT a 文 word**, and separately distinguishes 門 (대문) and 問 (질문). Every vocab item is a genuine 文 word: 논문 論文, 문체 文體, 공문 公文, 산문 散文, 운문 韻文, 비문 非文, 문호 文豪, 어문 語文. The "already known" list (문장/문법/문자/문화/문서/문맥/예문) is also all genuine 文. **No repeat of the 신문 error.**
- **5.13 (會): correct.** 총회 總會, 면회 面會, 회담 會談, 집회 集會, 재회 再會, 회원제 會員制, 개회 開會, 폐회 閉會 — all genuine 會. Homograph note 回 (회수) and the pitfall on 일회용 = 一回用 are both right. Known list 회의/사회/기회/회원/회장/회비/동호회 all genuine.
- **5.22 (食): two non-食 items — see B-05.** The rest (식성 食性, 식탐 食貪, 급식 給食, 채식 菜食, 결식 缺食, 미식 美食) are genuine, and the 式 warning (방식/형식/공식 = 式, not 食) is correct and valuable.
- **회식 coordination:** the crib said 회식 goes in 5.22 with a 會 cross-reference in 5.13. **회식 is in `known.js` (KNOWN_CORE5K), so it is ineligible as vocab anywhere** — the leakage rule overrides the crib. The shipped resolution is the right one: 5.22's explanation and note both carry `회식 (會食) = 'gathering + eat'`, and 5.13's note points forward to 5.22. Cross-reference requirement satisfied; the word simply cannot be a vocab card. ✓
- **Namespace:** 5.06/5.13/5.22 do not collide with each other or with 4.06 動 / 4.13 不 / 4.22 場 (global no-repeat check clean). Note that `시식` (試食) was consumed by **4.12** and `준말`/`줄임말`/`본말` by **4.17/4.23**, which is what squeezes 5.21 (P-01/P-02).

## 6. Drill lessons

- **5.11** (combinable = 5.01–5.10): S1 -다가 + -ㄹ 뻔했다 · S3 -자마자 + -ㄹ 뻔했다 · S4 -(이)라고 + -나 보다 · S6 -(으)려고 하다 + -다가 + -ㄹ 뻔했다 — all ≥2 taught points. **S2 and S5 leak 5.14's -(으)니 — see B-03.**
- **5.20** (combinable = 5.12–5.19 + earlier): S1 니까+다고 · S2 자마자+(으)라고 · S3 -는지+니까 · S4 -ㄹ 뻔했는데 + 았/었다고 · S5 니까 + 나 보다 · S6 -다가 + -(이)라도 + -(으)려고. All taught. Past-quote `줬다고` is licensed by 5.17's own formation ("past anything -았/었다고"), so it is not a 5.29 leak. ✓
- **5.30** (all of L5): S1 니까 + 수밖에 없다고 · S2 니까 + 나 보다 · S3 편이다 + 말고 · S4 다고 + 거라고 · S5 대신에 + 려나 보다 · S6 뻔했다 + 잖아요. All taught, nothing later leaking (5.30 is last). ✓

## 7. Bridge sentences — prerequisite grammar check

All 66 bridges are exact bank matches. Prerequisite fit vs the cribs:

✓ **Correct:** 5.01 (-아/어서 cause) · 5.04/5.05 (것 같다 — the exact contrast the point needs) · 5.07 (sequential -고) · 5.08 (-(으)러 가다) · 5.09 (sequential -고 / past narrative) · 5.10/5.12 (identity 이에요) · 5.14 (-아/어서 reason) · 5.15 (-도 particle) · 5.16 (요-form sentences to transform) · 5.17 (말하다/듣다) · 5.18 (알다/모르다) · 5.19 (-(으)세요 imperatives + 주세요) · 5.23 (것 같아요 future guesses) · 5.24 (-지 마세요) · 5.25 (보다 comparisons) · 5.28 (-(으)ㄹ 수 있다/없다 — the direct ancestor) · 5.11/5.20/5.30 (mixed prerequisites).

❌ **5.27** — see B-04.
⚠ **5.26 / 5.29** — see P-06 and P-07.

## 8. Vocabulary discipline

Method: tokenised every sentence in all 29 lessons, matched each eojeol against `known.js` ∪ lesson vocab ∪ all earlier-lesson vocab ∪ the studied sentence bank, then hand-triaged every unmatched token (this is far more than the required 2 sentences per lesson).

**Result: essentially clean.** Content words all resolve — 몰려오다, 쓰러지다, 매진, 근거, 택하다, 품다, 지원, 전공, 확인, 운영, 별명, 엉망, 박수, 소식, 원서, 정상, 표정, 결과, 지르다, 잃어버리다, 쏟다, 아끼다, 시키다, 전하다, 주인공, 기사, 소설, 작가, 꿀, 설탕, 산책, 미루다, 끊기다, 걸어가다, 물가, 값, 코트, 모이다, 서두르다 are all in `known.js`; 강행/체념/자책/도전/의향/광장/진술 are lesson vocab (their 하다-forms count as derived).

Four items are outside `known.js` and outside all lesson vocab — the only genuine leaks, all minor Sino-Korean nouns (P-16).

## 9. Romanization

Per-syllable, hyphenated, lowercase Revised Romanization throughout — **matches the batch ruling and l4.js**. Automated format scan over l4+l5: 0 uppercase, 0 unhyphenated multi-syllable tokens, 0 stray characters. Pronunciation is applied (aspiration 깜빡하다 → `kkam-ppa-ka-da`, ㄴ-assimilation 속내 → `song-nae`, ㅂ+ㅎ 집회 → `ji-poe`, 연례 → `yeol-lye`, 지역마다 → `ji-yeong-ma-da` — all correct).

One systematic inconsistency: **liaison across a syllable boundary is applied in most places but not all** (P-15).

## 10. Curriculum sanity

Each lesson teaches what `curriculum.js` says. No lesson's `point` disagrees with its body. No duplicate explanations. Copy-paste artifacts found: the 5.17/5.29 bridge triple (P-07) and repeated bridges across lessons (P-08); nothing else.

## 11. Polish findings

*Range tags: **[A]** = 5.01–5.15 (agent-authored), **[C]** = 5.16–5.30 (controller/self-authored).*

- **P-01 [C] 5.21 has only 5 vocab words** (minimum 6). The crib grants "light vocab latitude" for this lesson, and the obvious candidates were already consumed (준말 by 4.17; 본말/줄임말 by 4.23), so this is defensible — but it is a quota miss. Free options: 사투리, 존댓말, 반말(if free), 말투.
- **P-02 [C] 5.21 vocab `말줄임`** is not a standard dictionary headword (only 말줄임표 = the ellipsis mark "…"), and S8 uses it to mean "contraction", which it doesn't mean. Replace with 말투 or 어투 and reword S8, or drop the sentence to a real contraction example.
- **P-03 [C] 5.21 S5 and S8 contain no contraction at all** — they are vocab carriers in a lesson about contractions (S5 blank is `구어에서는`). Same shape in **5.18 S2** (`이 소문의 진위가 궁금해요` — no -는지 anywhere) and **5.28 S8** (`제 잘못이 아니니까 자책하지 마세요` — no 수밖에). Each lesson still has 6+ sentences that do use the point, so quotas hold, but these four teach nothing about the point.
  Fixes: 5.18 S2 → `이 소문이 진짜인지 궁금해요.`; 5.28 S8 → `제 잘못이 아니니까 억울할 수밖에 없어요.` (already S6's shape — pick another verb).
- **P-04 [C] 5.18 formation omits two irregular classes** that its own sentences rely on: ㄹ-stems drop ㄹ (알다 → **아는지**, used in S3; 만들다 → 만드는지) and ㅂ-irregular adjectives (어렵다 → **어려운지**, not 어렵은지).
- **P-05 [C] 5.18 is missing the crib's second pitfall** ("question word + 는지 needs no 냐 — 어디 가는지 알아요, not 가느냐고"). The two substitutes shipped (adjective 은지, future -(으)ㄹ지) are correct and useful, so this is a swap rather than a hole.
- **P-06 [C] 5.26 bridges are 보다 comparisons** (`이거보다 더 좋아요`, `저는 책을 읽는 것보다 사는 것을 더 좋아해요`) — the crib asked for 그렇지만-style **contrast** sentences, and 5.25 immediately before it already used 보다 bridges. Substitution/trade-off isn't comparison; a 하지만/그런데 sentence would prime it better.
- **P-07 [C] 5.29's three bridges are an exact copy of 5.17's** (`이야기 많이 들었어요` / `어디에서 들었어요?` / `말했어요`). The crib specifically wanted **-(으)ㄹ 거예요 future sentences** (77 in the bank) so the learner sees the form that 거라고 is built from. Clear copy-paste artifact.
- **P-08 [A+C] Bridge reuse across lessons** (not prohibited, but it thins the "you already know these" panel): `그런 것 같아요` in 5.04/5.11/5.23; `오늘은 바빠서 영화를 못 봐요` in 5.01/5.11/5.14; `이거는 뭐예요?` in 5.10/5.12; `저도 몰라요` in 5.18/5.27; `저도 물 주세요` in 5.15/5.19; `커피 마시고, 도너츠 먹고…` in 5.07/5.09.
- **P-09 [A] 5.01's two bridges both use 바빠서** — same word, same pattern, minimal added value.
- **P-10 [A] 5.07 S7 `원서를 접수하자마자`** — prescriptively 접수하다 = *to receive* an application (the office's side), not to submit it; the standard-language authorities flag the submitter reading as an error even though it is common in speech. The gloss says "As soon as I submitted". Fix: `원서를 내자마자`.
- **P-11 [A] 5.05 S5 `날씨가 나른한가 봐요`** — 나른하다 describes a person/body (나른한 오후 is the idiomatic collocation); "the weather is languid" is odd, and the English gloss ("the weather makes you drowsy") silently repairs it. Fix: `날씨 때문에 다들 나른한가 봐요.`
- **P-12 [A] 5.05 vocab 노곤하다 hanja given as `困`** — it is 勞困. Minor, but the notes are otherwise scrupulous about full hanja.
- **P-13 [A] 5.09's same-subject rule is stated absolutely** ("for two different subjects, -다가 doesn't work"). The crib asked for it, so this is per-spec, but it is over-strong: `비가 오다가 눈이 와요` is perfectly natural. Worth softening to "the same subject *normally* carries both clauses".
- **P-14 [A] 5.09 pitfall 3 is a strawman** ("Attach it to the plain stem: 마시다가, not 마시어다가") — no learner produces 마시어다가. A real trap would be 마셨다가 vs 마시다가, which pitfall 1 already covers.
- **P-15 [A+C] Romanization liaison is inconsistent.** The house style resolves liaison (5.06 `논문을` → `non-mu-neul`, 5.01 `약속을` → `yak-so-geul`), but ~25 tokens keep the coda attached to the preceding syllable. Densest in 5.15 (`물이라도` → `mul-i-ra-do`, should be `mu-ri-ra-do`; likewise 라면이라도, 오늘이라도, 미봉책이라도, 궁여지책이라도, 임시방편이라도), 5.10 (`지민이라고` → should be `ji-mi-ni-ra-go`; 기쁨이라고, 샛별이라고, 느낌을), 5.14 (`탓이니까` → `ta-si-ni-kka`; 화근이, 명분이, 사람이), 5.12 (`부산이라는` → `bu-sa-ni-ra-neun`; 명물이에요). A handful in 5.16–5.30 (`so-mun-ui`, `so-seol-ui`, `seon-eon-hae-sseo-yo`, `nae-nyeon-e`, `gye-dan-e-seo`). **Pre-existing style drift, not L5-specific** — l4.js has the same pattern (`ap-gwon-i-e-yo`, `sa-jin-i`, `choe-u-seon-i-e-yo`) — so fixing it is a whole-corpus job, not an L5 blocker. (Sequences after ㅇ, e.g. `sik-dang-i`, are correct as written and are not counted.)
- **P-16 [A+C] Four content words are outside `known.js` and outside all lesson vocab:** `마감` (5.23 S8), `계열` + `전공` compound in `어문 계열을 전공했어요` — 전공 is known, **계열** is not (5.06 S7), `연례` (5.13 S1), `선언(하다)` (5.13 S8). All are guessable Sino-Korean and none derails the sentence, but strictly they violate Task 6 rule 3. Cheapest fixes: `마감 날짜가 가까우니까…` → use 시간; `어문 전공을 했어요`; `다음 주에 큰 총회가 열려요`; `행사가 끝나고 폐회를 알렸어요`.
- **P-17 [A] 5.06 vocab 비문** is glossed only as 非文 ("ungrammatical sentence" — linguistics jargon). For most speakers 비문 is 碑文, an inscription/epitaph. Given the lesson's own care with 門/問/聞, this homograph deserves the same one-line note.
- **P-18 [C] 5.16 vocab 문어 and 지문 have very common homographs** — 문어 = octopus (much more frequent than 文語) and 지문 = 指紋 fingerprint (more frequent than 地文). Add a note each, or replace 문어 with 문어체 (which the note already mentions).
- **P-19 [C] 5.25 formation omits ㅂ-irregular and ㄹ-stem forms** of 편이다: 어렵다 → 어려운 편이에요, 살다 → 사는 편이에요.
- **P-20 [C] 5.25 S7 word order** — `동생은 성향이 저에 비해서 조금 급해요` splits the topic from its comparison. Natural: `동생은 저에 비해서 성향이 조금 급해요.`
- **P-21 [A] 5.11 S4 `저 사람 이름을 '민수'라고 하는데`** — with the naming use, the name-bearer takes 은/는 or 이/가 (cf. the lesson's own S1 `제 이름은 지민이라고 해요`). Fix: `저 사람 이름은 '민수'라고 하는데…`
- **P-22 [C] Bound roots listed as free nouns:** 억울 (5.28), 불가피 (5.28), 임박 (5.23). None of these stands alone as a noun — they exist as 억울하다/억울함, 불가피하다/불가피성, 임박하다. The notes do give the 하다-forms, but the headword and `pos:"noun"` are misleading. Same treatment as elsewhere would be to list 억울하다 [adj] etc.
- **P-23 [C] 5.16 S4 `유명한 각본 작가`** — "screenwriter" is 각본가 or 시나리오 작가; 각본 작가 is not idiomatic. Fix: `그 사람은 유명한 각본가이다.`
- **P-24 [A] 5.01 S3 gloss mismatch** — `발을 헛디뎌서 삐끗할 뻔했어요` glossed "I almost twisted my ankle", but no ankle appears and 삐끗하다 here is intransitive. Either gloss it "I almost took a bad step" or write `발목을 삐끗할 뻔했어요`.
- Minor, no action needed: 5.13 could list 회사 (會社) among the already-known 會 words; 5.10 S5 `통칭해요` is stiff (더 자연스럽게: `강남이라고 불러요`); 5.23 pitfall 2 renders the bad form as `오려나 봐 것 같아요`, which is hard to parse — `비가 오려나 봐요` + `올 것 같아요` stated as two alternatives would be clearer; 5.15's `임시방편` vs 5.26's note spelling `임시 방편` should agree.

## 12. Summary for the controller

**Ship-blocking (9), in fix order — 5 of them in the never-reviewed 5.16–5.30 range:**

| # | Lesson | Range | One-line fix |
|---|---|---|---|
| B-01 | 5.12 | A | 부산 is consonant-final — use 제주라는/나비라는 as the vowel example |
| B-02 | 5.24 | **C** | `제가 말고` → `저 말고` |
| B-03 | 5.11 | A | drop `보니` (5.14 grammar) from drill S2/S5 |
| B-04 | 5.27 | **C** | bridge `싫다잖아요` contains the target — swap for an 알다 sentence |
| B-05 | 5.22 | **C** | 공복 (空腹) and 끼니 aren't 食 — swap for 식습관/편식 |
| B-06 | 5.17 | **C** | S5 `하라고` is 5.19's point — reword to `필요하다고` |
| B-07 | 5.05 | A | 수줍다 is regular, not ㅂ-irregular |
| B-08 | 5.26 | **C** | formation's "Past + -(으)ㄴ 대신에" contradicts pitfall 2 — delete it |
| B-09 | 5.10 | A | S3 `명칭을 뭐라고 해요?` is redundant — `명칭이 뭐예요?` |

**What held up well:** all ten GOLD blocks transcribed without a single altered claim; the structural/leakage machinery is clean including the previously-buggy blankWord rule; every canonical pitfall the cribs named is present and correct except 5.18's second one; the 5.06 신문/新聞 false friend is handled exactly as the correction required, and 5.13 is error-free; the drill in 5.20 and 5.30 combines only taught points; vocabulary discipline is near-perfect across 200+ sentences.

**Pattern worth noting for future batches:** the self-authored 5.16–5.30 range is *linguistically* very strong (its blocking findings are mostly bookkeeping — a stray forward reference, a bad bridge pick, a contradictory formation line, two mis-assigned hanja words), while the salvaged 5.01–5.15 range carries the two outright false rule statements (B-01, B-07). Neither range is worse; they fail differently.

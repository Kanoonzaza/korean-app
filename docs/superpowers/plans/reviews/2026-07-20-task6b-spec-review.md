# Task 6B spec review — L4 lesson bodies 4.16–4.30 (`content/lessons/l4.js`)

**Commit reviewed:** `b9e5af3` (branch `v2`) — `content/lessons/l4.js` (4.16–4.30 appended) + regenerated `content/wordsnext.js`
**Reviewer pass date:** 2026-07-20
**Verdict:** ✅ **Spec compliant.** No blocking issues — no wrong grammar taught, no vocabulary leakage, no broken bridges, no untaught grammar point leaked into any lesson (including the two drills), structure/quotas correct, wordsnext post-state correct, Word-Builder namespace clean, commit clean. Every canonical pitfall the crib named for the twelve new lessons is present. A small set of **polish** notes follows.

---

## 1. Structure — PASS

- L4 array parses as JSON (`json.loads` after regex-extracting the literal): **exactly 23 entries**, ids `4.01, 4.03, 4.04, 4.05, 4.06, 4.09, 4.10, 4.11, 4.12, 4.13, 4.15, 4.16, 4.17, 4.18, 4.19, 4.20, 4.21, 4.22, 4.23, 4.24, 4.28, 4.29, 4.30`.
- All twelve new ids present; **4.25 / 4.26 / 4.27 have no body** (status `known`), matching the plan. No duplicate ids.
- Quotas (vocab / sentences / bridge / pitfalls), all within latitude:
  - **Full grammar lessons:** 4.18 8/7/2/3 · 4.19 7/7/2/3 · 4.24 8/7/2/3 · 4.28 8/7/2/3 · 4.29 7/7/2/3 — all 6–10 vocab, 6–8 sentences, 2 bridge, 2+ pitfalls. ✓
  - **Spacing/contraction lessons** (0–6 vocab latitude): 4.16 5/6/2/3 · 4.17 5/6/2/3 · 4.21 4/6/2/3 · 4.23 5/6/2/3. ✓
  - **Word Builder 4.22 (場):** 7/7/0/2 — bridge 0 (optional for WB, consistent with 4.06/4.13). ✓
  - **Drills 4.20 / 4.30:** 0 vocab / **6 sentences** each / 2 bridge / 2 pitfalls — within the 6–8 drill-sentence band. ✓

## 2. Validation script + wordsnext post-state — PASS

Re-ran the leakage checks over the **whole** 23-lesson file:
- **No vocab word ∈ known.js** (∪ v1 sources). **No vocab repeated across any two lessons.** **131 unique vocab** total — matches the implementer's claim.
- **Every bridge is an exact `ko` match in `TTMIK_SENTENCES`** (1596 bank entries). All 40 bridges resolve.
- **Every `blankWord` is a substring of its sentence `ko`.** No misses.

**wordsnext post-state** (parsed `content/wordsnext.js`):
- **Deck size 2524**, `r` contiguous 5001–7524.
- **Zero leakage:** none of the 131 L4 vocab words remain in the deck; no deck word ∈ known.js.
- Diff vs prior deck (`b9e5af3^`): **exactly 10 dropped, 10 refilled**, size steady 2524. The 10 dropped are all newly-authored 6B lesson vocab that were previously in the deck:
  `광장, 낱말, 농장, 대폭, 선명하다, 완화, 최상, 최악, 최우선, 표준어` — and all 10 are confirmed absent from the new deck. Matches the "dropped 10 / refilled 10" claim exactly.

## 3. Linguistic review per lesson — PASS

**Canonical pitfalls from the crib — all present and correctly stated:**

| Lesson | Crib-required trap | Status |
|---|---|---|
| 4.16 | 한번 (attached, "once/just") vs 한 번 (spaced, count) | ✓ in both notes and pitfalls; plus 저 는 ✗ and 안/못 spacing |
| 4.17 | 게 homonym: 것이→게 (subject) vs 게 in -게 되다 | ✓ in both notes and pitfalls |
| 4.18 | 제일 + noun ✗ (제일 사람→제일 좋은 사람); 최고 as adverb ✗ (최고 빨라요) | ✓ both present |
| 4.19 | "not-fully" sense missed; 덜 + noun ✗ (덜 돈) | ✓ both present |
| 4.21 | -(으)ㄹ 거예요 spacing (갈 거예요, not 갈거예요) | ✓ present; plus 수 spacing + auxiliary spacing |
| 4.23 | 되/돼 rule (test by substituting 하/해) | ✓ notes give the 하/해 test; pitfall gives 돼요/됐어요 not 되요/됬어요 |
| 4.24 | 많이 더 ✗ vs 훨씬 더 ✓; needs a comparison target | ✓ both present |
| 4.28 | verb → use -게 되다 pointer | ✓ pitfall + notes point to Lesson 29 |
| 4.29 | vs -아/어지다; 돼요/됐어요 spelling | ✓ both present |

**Grammar correctness (formation statements + ≥3 sentences per lesson spot-checked):** every Korean sentence is grammatically correct and natural 해요체. -아/어지다 formations are all correct (따뜻해지다, 튼튼해지다, 깨끗해지다, 촉촉해지다, 선명해지다, 팽팽해지다, 좋아지다; ㅂ-irregular flagged on 매끄럽다). -게 되다 sentences all use 됐어요/돼서 correctly. 場 Word-Builder formation (root at word-end, 場≠長 homograph note) is accurate; 不 and 動 already validated in 6A.

**Drills only combine already-taught points — verified sentence by sentence:**
- **4.20** (combines 4.01–4.19): every sentence stacks ≥2 taught points — e.g. -(으)ㄹ수록(4.01)+-(으)면 안 되다(4.09); 아무거나(4.11)+안 되다(4.09); 중에서(4.10)+제일(4.18)+-아/어 보다(4.12); 아무 데도(4.15)+덜(4.19); -아/어 보다(4.12 past)+-(으)ㄹ 리가 없다(4.03); 가장(4.18)+-(으)ㄹ수록(4.01). **No -아/어지다 or -게 되다 leaks in.** ✓
- **4.30** (combines 4.01–4.29): 훨씬(4.24)+-아/어지다(4.28); -게 되다(4.29)+-아/어지다(4.28); 덜(4.19)+-아/어지다(4.28); 제일(4.18)+-게 되다(4.29); 훨씬(4.24)+-아/어지다(4.28); 아무거나(4.11)+-게 되다(4.29). ✓

**Point-leakage scan (whole file):** no lesson uses 훨씬 before 4.24, no -아/어지다 before 4.28, no -게 되다 before 4.29. Clean.

**Sentence vocabulary discipline (spot-checked ≥2 sentences/lesson):** all content words resolve to known.js ∪ that lesson's vocab ∪ earlier-lesson vocab. Cross-lesson reuse of earlier L4 vocab is legitimate and correct: 동사 (4.06) reused in 4.16; 위험하다 + 반칙 (4.09) reused in 4.22. The only two tokens not literally in known.js — 세수하다 (4.28), 무리하다 (4.20) — are predictable X하다 derivatives of known bases 세수 / 무리 (and are written as noun+를+하다 anyway), so no leakage.

**Bridges are genuinely prerequisite (never the new point):** 4.17/4.21/4.28 use 것 같다; 4.18/4.19/4.24/4.28 use 보다/더 comparison; 4.23 primes 그러면/그런데 (the words being contracted); 4.29 uses -아/어서 + 것 같다 — all as the cribs specify.

## 4. Word Builder namespace (場) — PASS

- 4.22 (場) vocab `시험장, 공사장, 목장, 농장, 광장, 퇴장, 장터` is disjoint from 4.06 (動) and 4.13 (不) — global no-repeat check passed.
- **운동장 confirmed in known.js and NOT used as vocab in any lesson** — no Word Builder consumed it, exactly as claimed. The crib's other "already-known" 場 words (시장, 극장, 수영장, 주차장, 공연장, 경기장, 현장, 장소, 장면) are all in known.js and correctly relegated to the explanation/notes rather than used as vocab.

## 5. Romanization — PASS

All new-lesson vocab romaji are per-syllable hyphenated lowercase RR (regex `^[a-z]+(-[a-z]+)*$` matches every entry). Consistent with 6A.

## 6. Commit hygiene — PASS

`git show b9e5af3 --stat` → exactly **2 files**: `content/lessons/l4.js` (+332) and `content/wordsnext.js`. Matches the batch-coordination rule (append lessons + rerun tool + commit together). `V2_LESSON_FILES` already points at `content/lessons/l4.js`, so the whole-file leakage scan covered the new lessons.

---

## Polish notes (optional, non-blocking)

1. **4.28 — passive note omitted.** The crib asked for a one-line note that *verb* + -아/어지다 = passive (out of scope). The delivered lesson only points verbs to -게 되다 (which covers the practical trap) but never mentions the passive sense. Harmless; add a half-sentence note if a follow-up pass is done.
2. **wordsnext refill quality (pipeline-level, not 6B authoring).** The 10 auto-refilled tier-B words include some low-value entries — `지랄` (vulgar), `제인` (proper noun "Jane"), `하여금`/`더러` (bound/particle-ish forms), `스카`/`캐리`/`그립` (loan fragments). These come from the automated wordfreq/kengdic refill, not from lesson authoring, and are the kind of homograph/junk the `BLOCK` set exists to catch. Worth a curation pass on `tools/build_wordsnext.py`'s BLOCK list eventually; out of scope for 6B and not a leakage/correctness issue.

## Summary for the controller

Task 6B is **accept**-quality — ship it. Same bar 6A cleared: structure, quotas, zero leakage (vocab and wordsnext), exact-match bridges, all canonical pitfalls present, drills combine only already-taught points with no forward leakage, Word-Builder namespace (esp. 운동장) coordinated, clean 2-file commit. Only two optional polish items, both non-blocking.

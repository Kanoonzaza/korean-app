# Task 6A spec review — L4 lesson bodies (`content/lessons/l4.js`)

**Commit reviewed:** `7d64d9c` (branch `v2`) — `content/lessons/l4.js` + `tools/build_wordsnext.py` + regenerated `content/wordsnext.js`
**Reviewer pass date:** 2026-07-20
**Verdict:** ✅ **Spec compliant.** No blocking issues (no wrong grammar taught, no vocabulary leakage, no broken bridges, structure/quotas correct, wordsnext post-state correct, commit clean). A set of **polish** deviations from the BRAINDUMP cribs is listed below — several are canonical pitfalls the crib named that are missing or only implicitly modeled.

---

## 1. Structure — PASS

- L4 array parses as JSON; **exactly 11 entries** with the right ids: `4.01, 4.03, 4.04, 4.05, 4.06, 4.09, 4.10, 4.11, 4.12, 4.13, 4.15`. No bodies for `4.02/4.07/4.08/4.14` (status `known`). Matches the implementer's claim.
- `compressed:true` on 4.04 and 4.10 only. Correct.
- Quotas (per lesson: vocab / sentences / bridge / pitfalls):
  - Full lessons: 4.01 8/7/2/3 · 4.03 7/7/2/3 · 4.05 7/6/2/3 · 4.09 8/7/2/3 · 4.11 7/7/2/3 · 4.12 8/7/2/3 · 4.15 6/7/2/3 — all within 6–10 vocab, 6–8 sentences, 2–3 bridge, 2+ pitfalls. ✓
  - Word Builders: 4.06 8/6/0/2 · 4.13 8/6/0/2 — vocab-driven, bridge=0 (optional, OK), 2 pitfalls. ✓
  - Compressed: 4.04 0/3/2/1 · 4.10 0/3/2/1 — 3 sentences, 2 bridge, 0 vocab, 1 pitfall. ✓

## 2. Validation script + wordsnext post-state — PASS

- Re-ran the Task 6.3 leakage check independently: **no vocab word ∈ known.js**, **no repeated vocab across lessons**, **every bridge is an exact match in TTMIK_SENTENCES**, **every blankWord is a substring of its `ko`**. Clean.
- All 22 spot-checked bridges resolve to real bank entries with an `en` gloss.
- **wordsnext post-state:** parsed `content/wordsnext.js` (2524 entries, r 5001–7524 contiguous). **None of the 67 L4 vocab words remain** in wordsnext. ✓
- Verified the "dropped 8 / refilled 8" claim: exactly 8 L4 vocab words (`동요, 능동적, 포기하다, 당사자, 불필요하다, 뻔하다, 호칭, 동력`) were present in the prior deck (`b309cf3`) and are now gone; deck size held at 2524 (2516 carried forward + 8 refilled). The report's "kept 2516" reconciles correctly.

## 3. Linguistic review — PASS on correctness; polish deviations noted

**Grammar correctness:** every Korean sentence is grammatically correct, natural 해요체, and (spot-checking ≥2 sentences per lesson) uses only the new point + L1–3 grammar + lesson vocab + known words. No vocabulary-discipline violations found. Proper nouns 경은 (4.03) and 명동 (4.15 bridge) are TTMIK character/place names, not content vocab — acceptable.

**Canonical-trap coverage vs the crib (the polish findings):**

- **4.01 (-(으)ㄹ수록)** — the crib's pitfall (1) *"no past tense inside 수록"* (갔을수록 ✗) is **absent** from both pitfalls and notes. Task instruction #3 explicitly names this trap. Crib's second trap (forgetting 더 in the result clause) is modeled in sentence 4 (`노력하면 노력할수록 더 발전해요`) but not stated as a pitfall. Crib's suggested note that `갈수록` alone = "increasingly over time" is also absent. Delivered pitfalls (same-verb requirement, don't split 수+록, 을/ㄹ selection) are all correct and useful, just not the two the crib prioritized.
- **4.09 (-(으)면 안 되다)** — the mirror with -아/어도 되다 **is present** (explanation + notes). But the crib's required **`안 하면 안 되다` = "must do" (double-negative obligation idiom) note is missing**; task instruction #3 explicitly lists it. Bridges are two plain -(으)면 sentences (good prerequisite grammar, in bank) but neither is an -아/어도 되다 sentence, which the crib suggested to reinforce the mirror.
- **4.12 (-아/어 보다)** — auxiliary **spacing is modeled correctly everywhere** (`가 보다`, `먹어 보다`, `보세요`) but is **not called out as an explicit pitfall/note**; task instruction #3 lists "4.12: auxiliary spacing" as a trap to check. Bridges (`어제 여기에서 누구 만났어요?`, `비가 와서 못 갔어요`) are prerequisite past-tense/못 sentences but do **not** feature the -아/어 주세요 / -아/어+auxiliary *shape* the crib recommended to prime the construction. The "don't stack 봐 보세요" pitfall is present (good).
- **4.03 (-(으)ㄹ 리가 없다)** — 리 spacing is shown in the formation (`올 리가 없다`) but **not stated as an explicit pitfall** (crib wanted it as pitfall 1). The crib's 수-없다 contrast is addressed only *structurally* (pitfall "don't insert 수 → never -(으)ㄹ 수 리가 없다") rather than *semantically* (likelihood vs ability). Bridges (`그럴 수도 있어요`, `그럴 거예요`) are epistemic/possibility sentences — defensible prerequisite grammar — but not the crib-suggested -(으)ㄹ 수 없다 contrast sentences.
- **4.05 (당신)** — all four registers, avoidance strategy, and three good pitfalls are present. Deviations: vocab leans **academic** (호칭/존칭/애칭/당사자/화자/청자/삼인칭) vs the crib's more practical address terms (여러분, 님, 씨, 저기요); the crib's "너 is fine only in 반말 between intimates" nuance is not mentioned; bridges (`이거 누구예요?`, `저도 학생이에요`) don't really illustrate subject-omission as the crib intended.
- **4.15 (아무 + noun + (이)나/도)** — polarity is fully and correctly covered. The crib's 아무 데나 vs 어디나 register nuance is not covered (replaced by a useful -이나/나 allomorph pitfall). Bridges (`공원이나 영화관`, `저도 학생이에요`) cleverly prime the two particles (이나 / 도) the lesson combines — a good choice.
- **Minor gloss:** 4.03 sentence 4 `그 사람이 사실을 부정할 리가 없어요.` — English "There's no way he denies the truth" reads awkwardly; "…would deny the truth" is more natural. Korean is correct.

**Well-executed (no issues):**
- **4.11 / 4.15 나/도 polarity** — fully correct, consistent across all sentences and pitfalls. Positive verbs pair with 나-forms, negatives with 도-forms throughout.
- **4.13 불→부 before ㄷ/ㅈ** — the key rule is stated in formation, explanation, notes, AND demonstrated in the vocab itself (`부족하다`, `부당하다`) and sentences. Best-executed word builder.
- **4.09 mirror with -아/어도 되다** — present.
- **4.06 動** — 動 vs 同 homograph note present; all 8 vocab genuinely contain 動; known derivations correctly relegated to the explanation.

**Bridges feature prerequisite grammar (not the new point):** confirmed across all lessons — 4.01 plain -(으)면; 4.04/4.05/4.15 plain 이에요/statements + particles; 4.09/4.10 -(으)면 + 에서 location; 4.11/4.12 못/past negation; 4.03 possibility 수도 있다/거예요.

## 4. Word Builder namespace — PASS

- 4.06 (動) and 4.13 (不) vocab do **not overlap** each other (global no-repeat check passed).
- **No reserved word consumed:** 운동장 (reserved → 4.22 場) and 회식 (reserved → 5.22 食) are not used. Likely future-builder words for 4.22/5.06/5.13/5.22 (場/文/會/食 families) were not consumed by 4.06/4.13. Clear.

## 5. Romanization — PASS

Per-syllable hyphenated lowercase Revised Romanization throughout, matching the ruling (v1 style). Pronunciation-based (aspiration/liaison/ㅎ-elision applied consistently; tensification unmarked per RR convention). No uppercase or spacing anomalies.

## 6. Commit hygiene — PASS

`git show 7d64d9c --stat` → exactly 3 files: `content/lessons/l4.js`, `content/wordsnext.js`, `tools/build_wordsnext.py`. `V2_LESSON_FILES` correctly points at `content/lessons/l4.js`.

---

## Summary for the controller

Task 6A is **accept**-quality. Ship it. The polish items are optional tightening for a follow-up pass — the three worth doing because task instruction #3 named them and the crib required them:

1. **4.01** — add a pitfall/note: no past tense before 수록 (갔을수록 ✗).
2. **4.09** — add a note: `안 하면 안 되다` = "must do" (double-negative obligation, common in speech).
3. **4.12** — add an explicit note that the auxiliary 보다 is spaced (`가 보세요`), even though it's already modeled correctly. (4.21 covers spacing later, so this is genuinely optional.)

Secondary polish: 4.03 make 리 spacing + likelihood-vs-ability an explicit pitfall; consider swapping 4.05 vocab toward practical address terms (여러분/님/씨); fix the 4.03 sentence-4 English gloss.

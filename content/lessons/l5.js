/* content/lessons/l5.js — TTMIK-aligned Level 5 lesson bodies, 5.01–5.23.
 *
 * HAND-WRITTEN (not generated). Original compositions only; no TTMIK example
 * sentences are copied. Titles/points come from content/curriculum.js; bridge
 * sentences are exact `ko` copies from content/ttmik-sentences.js (the app looks
 * up their `en` at render time). Authoring rules: docs/superpowers/plans/
 * 2026-07-18-korean-app-v2.md, Task 6; grammar/pitfalls for 5.04, 5.05, 5.10,
 * 5.12, 5.14, 5.16, 5.17, 5.19, 5.23 transcribed from the controller's GOLD blocks (BRAINDUMP Part D).
 * Vocab namespace is shared with l4.js (no repeats across either file); Word
 * Builders 5.06 (文) and 5.13 (會) don't collide with each other or with L4;
 * 회식 (會+食) is reserved for 5.22, so it is NOT used in 5.13.
 *
 * Which entries appear: within 5.01–5.23, status:"new" → full body.
 * 5.02 (status:"known", honorific -(으)시-) has NO body. Word Builder lessons:
 * 5.06 (文), 5.13 (會). Drill: 5.11 (0 vocab, combines 5.01–5.10 points).
 *
 * Grammar verified per lesson (id → source consulted 2026-07-24):
 *   5.01 https://courses.talktomeinkorean.com/core-grammar-level-5-non  +  https://www.topikguide.com/  (-(으)ㄹ 뻔했다: future modifier + 뻔했다, always past, event did NOT happen)
 *   5.03 https://www.tumblr.com/learninghangukeo/156426755390/  +  Korean FAQ 수고 vs 고생  (수고 = routine effort; 고생 = draining/special; register)
 *   5.04 [GOLD block] verified against https://www.topikguide.com/ + hanabira -나 보다  (evidence inference, verbs + 있다/없다)
 *   5.05 [GOLD block] verified against https://courses.talktomeinkorean.com/core-grammar-level-5-non  (-(으)ㄴ가 보다, adjectives/nouns; past funnels to -았/었나 보다)
 *   5.06 https://en.wiktionary.org/wiki/%E6%96%87  +  https://www.howtostudykorean.com/hanja-unit-1-lessons-1-20/hanja-lesson-18/  (文 = writing; NOTE 신문 = 新聞 uses 聞 "hear", NOT 文)
 *   5.07 https://www.topikguide.com/verb-%EC%9E%90%EB%A7%88%EC%9E%90-korean-grammar/  +  https://www.howtostudykorean.com/upper-intermediate-korean-grammar/unit-4-lessons-84-91/lesson-84/  (-자마자: bare stem, no tense before it)
 *   5.08 https://www.90daykorean.com/euryeogohada-grammar/  +  https://elon.io/grammar/korean/choosing/reo-vs-ryeogo  (-(으)려고 하다 intention; vs -(으)러 motion-only)
 *   5.09 https://practice-korean.com/grammar/daga/  +  https://sayhikorean.com/korean-grammar-%EB%8B%A4%EA%B0%80-expressing-mid-action/  (-다가 mid-action switch; SAME subject both clauses)
 *   5.10 [GOLD block] verified against https://courses.talktomeinkorean.com/core-grammar-level-5-non  (명사 + -(이)라고: noun quote marker)
 *   5.11 (Sentence Building Drill 3 — no new grammar; combines already-taught 5.01–5.10 points + L1–4)
 *   5.12 [GOLD block] verified against https://courses.talktomeinkorean.com/core-grammar-level-5-non  (-(이)라는 = -(이)라고 하는; always modifies a following noun)
 *   5.13 https://en.wiktionary.org/wiki/%E6%9C%83  +  https://www.howtostudykorean.com/hanja-unit-4-lessons-61-80/hanja-lesson-65/  (會 = gathering/meeting)
 *   5.14 [GOLD block] verified against https://koreangrammardifferently.wordpress.com/2017/10/09/  (-(으)니까: only reason connector allowed before commands/suggestions; discovery use)
 *   5.15 https://hanabira.org/langs/korean/grammarpoint/~%EB%9D%BC%EB%8F%84%20%5Brado%5D%20(At%20least,%20even%20if)  +  https://123learnkorean.wordpress.com/2009/08/25/%EC%9D%B4%EB%9D%BC%EB%8F%84-at-least/  (-(이)라도 = at least / even; vs plain -도)
 *   5.16 [GOLD block] verified against https://www.howtostudykorean.com/unit-3-intermediate-korean-grammar/unit-3-lessons-51-58/lesson-54/  +  https://www.topikguide.com/  (plain form: 간다/먹는다; adjectives + 있다/없다 + 이다 stay 다)
 *   5.17 [GOLD block] verified against https://www.topikguide.com/%EB%9D%BC%EA%B3%A0-%EB%9D%BC%EB%8A%94-%EB%8B%A4%EA%B3%A0-%EB%8B%A4%EB%8A%94-%EC%9E%90%EA%B3%A0-%EB%83%90%EA%B3%A0-%ED%95%98%EB%8B%A4-korean-grammar/  (indirect quotation: -다고 for V/A, -(이)라고 for nouns)
 *   5.18 https://www.topikguide.com/v-a-%E3%84%B4-%EC%9D%80-%EB%8A%94%EC%A7%80-%EC%95%8C%EB%8B%A4-%EB%AA%A8%EB%A5%B4%EB%8B%A4-korean-grammar/  +  https://explorekorean.net/intermediate1-lesson1/  (V 는지 / A (으)ㄴ지 / N 인지; past -았/었는지; future -(으)ㄹ지)
 *   5.19 [GOLD block] verified against https://www.howtostudykorean.com/unit-3-intermediate-korean-grammar/unit-3-lessons-51-58/lesson-55/  +  https://elon.io/grammar/korean/syntax/reported-command-rago  (달라고 = to the asker; 주라고 = to a third party; negative -지 말라고)
 *   5.20 (Sentence Building Drill 4 — no new grammar; combines already-taught points with id ≤ 5.19 + L1–4)
 *   5.21 https://practice-korean.com/grammar/contractions/  +  https://elon.io/grammar/korean/particles/object-eul-reul  (를 → ㄹ on vowel-final words: 날, 널, 뭘, 이걸; 을 cannot contract)
 *   5.22 https://en.wiktionary.org/wiki/%E9%A3%9F  +  https://www.howtostudykorean.com/hanja-unit-1-lessons-1-20/hanja-lesson-15/  (食 = eat/food; 회식 = 會食 ties back to 5.13's 會)
 *   5.23 [GOLD block] verified against https://skapetokorea.com/%EC%9C%BC%EB%A0%A4%EB%82%98-%EB%B3%B4%EB%8B%A4-i-guess-it-seems-like-i-assume/  +  https://hanabira.org/langs/korean/grammarpoint/~(%EC%9C%BC)%EB%A0%A4%EB%82%98%20[(eu)ryeona]%20(I%20wonder%20if...)  (-(으)려나 보다 = 려(고 하)다 + 나 보다; verbs only)
 */
export const L5 = [
  {
    "id": "5.01", "level": 5, "title": "Almost did", "point": "-(으)ㄹ 뻔했다",
    "grammar": {
      "summary": "How to say you 'almost / nearly did' something — but it did NOT actually happen.",
      "formation": "V-stem + -(으)ㄹ 뻔했다, almost always in the past (했다 → 했어요).\n• vowel or ㄹ stem → -ㄹ 뻔했다  (넘어지다 → 넘어질 뻔했어요)\n• consonant stem → -을 뻔했다  (죽다 → 죽을 뻔했어요)\n뻔 is a dependent noun, so you use the future modifier -(으)ㄹ in front of it — at the moment you 'almost' acted, the action was still just about to happen.",
      "explanation": "-(으)ㄹ 뻔했다 describes coming right up to the edge of something happening, without it actually happening. Because you are talking about a near-event that is now over, it is fixed in the past: 뻔했어요, never 뻔해요. It covers both a near-miss you're relieved about (하마터면 넘어질 뻔했어요 = 'I almost fell') and something you nearly did on purpose but didn't. The key point learners forget: the thing did NOT happen — 넘어질 뻔했어요 means you did NOT fall.",
      "notes": ["It pairs naturally with 하마터면 ('nearly, almost') for emphasis: 하마터면 지각할 뻔했어요.", "Set idiom: 큰일 날 뻔했다 = 'that was a close call / it nearly became a disaster'.", "뻔 is a dependent noun — a space before it: 갈 뻔했어요, never 갈뻔했어요."]
    },
    "pitfalls": ["It means the event did NOT happen: 넘어질 뻔했어요 = 'I almost fell' (but didn't) — don't use it for something that actually occurred.", "Keep it past tense: say 죽을 뻔했어요, not 죽을 뻔해요, in this meaning.", "Use the future modifier -(으)ㄹ before 뻔 (갈 뻔했어요), and put a space before the dependent noun 뻔."],
    "bridge": ["오늘은 바빠서 영화를 못 봐요.", "요즘에 바빠서 친구들을 못 만나요."],
    "vocab": [
      {"ko": "깜빡하다", "en": "to forget for a moment, to slip one's mind", "romaji": "kkam-ppa-ka-da", "pos": "verb", "note": "a momentary lapse, not long-term forgetting"},
      {"ko": "헛디디다", "en": "to miss one's step, to step wrong", "romaji": "heot-di-di-da", "pos": "verb", "note": "발을 헛디디다 = to lose one's footing"},
      {"ko": "하마터면", "en": "almost, nearly (and it would have been bad)", "romaji": "ha-ma-teo-myeon", "pos": "adv", "note": "pairs with -(으)ㄹ 뻔했다"},
      {"ko": "아찔하다", "en": "to be dizzying, to feel a sudden fright", "romaji": "a-jjil-ha-da", "pos": "adj", "note": "the stomach-drop of a near-miss"},
      {"ko": "봉변", "en": "an unexpected misfortune, a nasty scrape", "romaji": "bong-byeon", "pos": "noun", "note": "逢變; 봉변을 당하다 = to run into trouble"},
      {"ko": "낭패", "en": "a fix, an embarrassing failure", "romaji": "nang-pae", "pos": "noun", "note": "狼狽; 낭패를 보다 = to end up in a mess"},
      {"ko": "자칫", "en": "one slip / a little carelessness (and...)", "romaji": "ja-chit", "pos": "adv", "note": "자칫하면 = if one isn't careful"},
      {"ko": "삐끗하다", "en": "to slip, to wrench (a joint)", "romaji": "ppi-kkeu-ta-da", "pos": "verb", "note": "허리를 삐끗하다 = to tweak one's back"}
    ],
    "sentences": [
      {"ko": "하마터면 계단에서 넘어질 뻔했어요.", "en": "I almost fell on the stairs.", "romaji": "ha-ma-teo-myeon gye-dan-e-seo neo-meo-jil ppeon-hae-sseo-yo", "blankWord": "넘어질 뻔했어요"},
      {"ko": "약속을 깜빡하고 안 갈 뻔했어요.", "en": "I forgot the appointment and almost didn't go.", "romaji": "yak-so-geul kkam-ppa-ka-go an gal ppeon-hae-sseo-yo", "blankWord": "갈 뻔했어요"},
      {"ko": "발을 헛디뎌서 삐끗할 뻔했어요.", "en": "I missed my step and almost twisted my ankle.", "romaji": "ba-reul heot-di-dyeo-seo ppi-kkeu-tal ppeon-hae-sseo-yo", "blankWord": "삐끗할 뻔했어요"},
      {"ko": "너무 아찔해서 소리를 지를 뻔했어요.", "en": "It was so dizzying I almost screamed.", "romaji": "neo-mu a-jjil-hae-seo so-ri-reul ji-reul ppeon-hae-sseo-yo", "blankWord": "지를 뻔했어요"},
      {"ko": "자칫 큰 봉변을 당할 뻔했어요.", "en": "One slip and I nearly ran into serious trouble.", "romaji": "ja-chit keun bong-byeo-neul dang-hal ppeon-hae-sseo-yo", "blankWord": "당할 뻔했어요"},
      {"ko": "지갑을 잃어버려서 낭패를 볼 뻔했어요.", "en": "I lost my wallet and almost ended up in a mess.", "romaji": "ji-ga-beul i-reo-beo-ryeo-seo nang-pae-reul bol ppeon-hae-sseo-yo", "blankWord": "볼 뻔했어요"},
      {"ko": "어제는 정말 큰일 날 뻔했어요.", "en": "Yesterday something terrible almost happened.", "romaji": "eo-je-neun jeong-mal keu-nil nal ppeon-hae-sseo-yo", "blankWord": "날 뻔했어요"}
    ]
  },
  {
    "id": "5.03", "level": 5, "title": "Good work", "point": "수고",
    "grammar": {
      "summary": "How to thank someone for their effort — and pick the right form for who you're talking to.",
      "formation": "The 수고 family, by situation:\n• 수고하세요 — to someone who is STILL working as you leave ('keep up the good work').\n• 수고했어요 / 수고하셨어요 — to a peer or junior who has FINISHED ('good job, thanks for the work').\n• 수고하셨습니다 — polite, to someone who has finished (formal).\n• 고생 많으셨습니다 — for a genuinely draining or special effort, warmer and safer upward.",
      "explanation": "수고 means 'effort / trouble taken', and these are set greetings that acknowledge it. Use 수고 words for ordinary, everyday effort. When the work was especially hard or unusual (a big event, a tough project), 고생 ('hardship') words sound more heartfelt: 고생하셨어요, 고생 많으셨습니다. The tricky part is direction: saying 수고하세요 to someone much senior can sound like you're patting them on the back from below, so upward you're safer with 고생 많으셨습니다 or plain 감사합니다.",
      "notes": ["수고 = routine effort; 고생 = a draining or special effort — 고생 is warmer.", "Downward/among peers, 수고했어 / 수고했어요 is friendly and normal.", "In formal service settings (to a customer or teacher), thank them with 감사합니다 rather than 수고하세요."]
    },
    "pitfalls": ["Don't say 수고하세요 to someone much senior to you — from below it can sound cheeky; use 고생 많으셨습니다 or 감사합니다 instead.", "Don't use 수고하세요 to a customer or a teacher in a formal service context — it isn't a polite thank-you there.", "Match the form to timing: 수고하세요 = they're still working; 수고하셨습니다 / 고생 많으셨습니다 = they're finished."],
    "bridge": ["감사합니다.", "들어줘서 감사합니다."],
    "vocab": [
      {"ko": "수고하세요", "en": "\"keep up the good work\" (to someone still working)", "romaji": "su-go-ha-se-yo", "pos": "expr", "note": "said as YOU leave and they stay"},
      {"ko": "수고하셨습니다", "en": "\"thank you for your hard work\" (polite, they've finished)", "romaji": "su-go-ha-syeot-seum-ni-da", "pos": "expr", "note": "formal, after the work is done"},
      {"ko": "수고했어요", "en": "\"good job / thanks for the work\" (to peers, juniors)", "romaji": "su-go-hae-sseo-yo", "pos": "expr", "note": "casual 수고했어 among close friends"},
      {"ko": "고생 많으셨습니다", "en": "\"you went through a lot; thank you\"", "romaji": "go-saeng ma-neu-syeot-seum-ni-da", "pos": "expr", "note": "warmer; safer to use upward"},
      {"ko": "애쓰셨어요", "en": "\"you put in real effort; thank you\"", "romaji": "ae-sseu-syeo-sseo-yo", "pos": "expr", "note": "애쓰다 = to take pains over something"},
      {"ko": "노고", "en": "toil, painstaking effort", "romaji": "no-go", "pos": "noun", "note": "勞苦; 노고를 치하하다 = to honor someone's efforts"},
      {"ko": "치하하다", "en": "to commend, to acknowledge (someone's work)", "romaji": "chi-ha-ha-da", "pos": "verb", "note": "致賀; usually from a superior downward"}
    ],
    "sentences": [
      {"ko": "먼저 퇴근할 때는 \"수고하세요\"를 써요.", "en": "When you leave first, you use '수고하세요'.", "romaji": "meon-jeo toe-geun-hal ttae-neun su-go-ha-se-yo-reul sseo-yo", "blankWord": "수고하세요"},
      {"ko": "회의가 끝난 뒤에 윗사람한테는 \"수고하셨습니다\"가 좋아요.", "en": "After a meeting, to a senior '수고하셨습니다' is good.", "romaji": "hoe-ui-ga kkeun-nan dwi-e wit-sa-ram-han-te-neun su-go-ha-syeot-seum-ni-da-ga jo-a-yo", "blankWord": "수고하셨습니다"},
      {"ko": "친구한테는 편하게 \"수고했어요\"를 써도 돼요.", "en": "With a friend, you can casually use '수고했어요'.", "romaji": "chin-gu-han-te-neun pyeon-ha-ge su-go-hae-sseo-yo-reul sseo-do dwae-yo", "blankWord": "수고했어요"},
      {"ko": "아주 힘든 일 뒤에는 \"고생 많으셨습니다\"가 더 좋아요.", "en": "After something really hard, '고생 많으셨습니다' is better.", "romaji": "a-ju him-deun il dwi-e-neun go-saeng ma-neu-syeot-seum-ni-da-ga deo jo-a-yo", "blankWord": "고생 많으셨습니다"},
      {"ko": "도와주신 분께 \"애쓰셨어요\"를 전했어요.", "en": "I passed on '애쓰셨어요' to the person who helped.", "romaji": "do-wa-ju-sin bun-kke ae-sseu-syeo-sseo-yo-reul jeon-hae-sseo-yo", "blankWord": "애쓰셨어요"},
      {"ko": "선생님은 우리의 노고를 치하했어요.", "en": "The teacher acknowledged our hard work.", "romaji": "seon-saeng-ni-meun u-ri-ui no-go-reul chi-ha-hae-sseo-yo", "blankWord": "노고를"},
      {"ko": "윗사람한테 \"수고하세요\"는 조금 무례할 수도 있어요.", "en": "Saying '수고하세요' to a senior can be a bit rude.", "romaji": "wit-sa-ram-han-te su-go-ha-se-yo-neun jo-geum mu-rye-hal su-do i-sseo-yo", "blankWord": "수고하세요"}
    ]
  },
  {
    "id": "5.04", "level": 5, "title": "I guess / I assume (part 1)", "point": "-나 보다",
    "grammar": {
      "summary": "'I guess / it seems (from what I observe)' — inference for ACTION verbs and 있다/없다.",
      "formation": "Verb stem + 나 보다: 오나 봐요, 없나 봐요. Past: -았/었나 보다 (벌써 갔나 봐요). 보다 conjugates normally but usually stays present.",
      "explanation": "Use -나 보다 when INFERRING from evidence, not stating an opinion: wet umbrellas → 비가 오나 봐요. The guessed subject is normally not yourself. Contrast with known 것 같다: 것 같다 covers opinions and guesses about anything; -나 보다 specifically signals 'the evidence points this way' and sounds detached.",
      "notes": ["있다/없다 pattern as verbs (집에 없나 봐요).", "The natural two-sentence frame is evidence + guess (불이 꺼져 있어요. 자나 봐요) — mirror that in your own examples.", "First person only works as outside self-observation (it piggybacks on 5.05's 피곤한가 봐요)."]
    },
    "pitfalls": ["Present adjectives don't take -나 보다: 바쁘나 봐요 ✗ — that's 5.05's 바쁜가 봐요.", "Not for firsthand knowledge: saying 비가 오나 봐요 while standing in the rain is absurd — state it plainly.", "The past marker goes before 나: 갔나 봐요, never 가나 봤어요 (that means 'tried looking')."],
    "bridge": ["그런 것 같아요.", "눈이 오는 것 같아요."],
    "vocab": [
      {"ko": "짐작하다", "en": "to guess, to surmise", "romaji": "jim-ja-ka-da", "pos": "verb", "note": "斟酌; reason toward a likely answer"},
      {"ko": "추측하다", "en": "to conjecture, to speculate", "romaji": "chu-cheu-ka-da", "pos": "verb", "note": "推測; guess without firm proof"},
      {"ko": "눈치채다", "en": "to notice, to catch on", "romaji": "nun-chi-chae-da", "pos": "verb", "note": "sense something unspoken"},
      {"ko": "감지하다", "en": "to detect, to sense", "romaji": "gam-ji-ha-da", "pos": "verb", "note": "感知; pick up a subtle signal"},
      {"ko": "낌새", "en": "a sign, an inkling (something's up)", "romaji": "kkim-sae", "pos": "noun", "note": "a faint hint of a hidden situation"},
      {"ko": "기미", "en": "a hint, a trace (of something coming)", "romaji": "gi-mi", "pos": "noun", "note": "幾微; an early indication"},
      {"ko": "징후", "en": "a symptom, an omen", "romaji": "jing-hu", "pos": "noun", "note": "徵候; a telling sign"}
    ],
    "sentences": [
      {"ko": "불이 다 꺼져 있어요. 다들 자나 봐요.", "en": "The lights are all off. I guess everyone's asleep.", "romaji": "bu-ri da kkeo-jyeo i-sseo-yo. da-deul ja-na bwa-yo", "blankWord": "자나 봐요"},
      {"ko": "밖에 우산이 많아요. 비가 오나 봐요.", "en": "Lots of umbrellas outside. I guess it's raining.", "romaji": "ba-kke u-sa-ni ma-na-yo. bi-ga o-na bwa-yo", "blankWord": "오나 봐요"},
      {"ko": "다들 표정이 안 좋아요. 안 좋은 징후가 있나 봐요.", "en": "Everyone looks glum. I guess there's a bad sign.", "romaji": "da-deul pyo-jeong-i an jo-a-yo. an jo-eun jing-hu-ga in-na bwa-yo", "blankWord": "있나 봐요"},
      {"ko": "강아지가 문을 봐요. 주인이 오는 기미를 감지했나 봐요.", "en": "The dog is watching the door. I guess it sensed its owner coming.", "romaji": "gang-a-ji-ga mu-neul bwa-yo. ju-i-ni o-neun gi-mi-reul gam-ji-haen-na bwa-yo", "blankWord": "감지했나 봐요"},
      {"ko": "다들 놀란 얼굴이에요. 무슨 낌새를 눈치챘나 봐요.", "en": "Everyone looks startled. I guess they noticed some sign.", "romaji": "da-deul nol-lan eol-gu-ri-e-yo. mu-seun kkim-sae-reul nun-chi-chaen-na bwa-yo", "blankWord": "눈치챘나 봐요"},
      {"ko": "다들 조용해요. 벌써 결과를 짐작했나 봐요.", "en": "Everyone's quiet. I guess they already guessed the result.", "romaji": "da-deul jo-yong-hae-yo. beol-sseo gyeol-gwa-reul jim-ja-kaen-na bwa-yo", "blankWord": "짐작했나 봐요"},
      {"ko": "사람들이 창밖을 자꾸 봐요. 날씨를 추측하나 봐요.", "en": "People keep looking outside. I guess they're guessing the weather.", "romaji": "sa-ram-deu-ri chang-ba-kkeul ja-kku bwa-yo. nal-ssi-reul chu-cheu-ka-na bwa-yo", "blankWord": "추측하나 봐요"}
    ]
  },
  {
    "id": "5.05", "level": 5, "title": "I guess / I assume (part 2)", "point": "-(으)ㄴ가 보다",
    "grammar": {
      "summary": "The adjective/noun partner of -나 보다: 'I guess it's (state)'.",
      "formation": "Adjective stem + 은가 보다 (작은가 봐요) / ㄴ가 보다 (바쁜가 봐요, 예쁜가 봐요). Noun + 인가 보다 (학생인가 봐요). Past of ANYTHING rejoins the verb side: -았/었나 보다 (바빴나 봐요, 학생이었나 봐요).",
      "explanation": "Same evidence-based feel as 5.04 but for states. Present states use -(으)ㄴ가 보다; any past tense funnels back to -았/었나 보다. 이다 follows the adjective pattern (인가 보다), giving the very common 그런가 봐요 ('I guess so').",
      "notes": ["있다/없다 stay verb-side (있나 보다, never 있은가 보다).", "그런가 봐요 / 아닌가 봐요 are useful set phrases.", "Future guesses point forward to 5.23's -(으)려나 보다."]
    },
    "pitfalls": ["Past states: 바빴은가 봐요 / 바쁜가 봤어요 ✗ → 바빴나 봐요 ✓.", "있은가 봐요 ✗ — 있다/없다 are verb-side exceptions.", "Nouns need 인: 학생가 봐요 ✗ → 학생인가 봐요."],
    "bridge": ["여기 비싼 것 같아요.", "이상한 것 같아요."],
    "vocab": [
      {"ko": "수줍다", "en": "to be shy, bashful", "romaji": "su-jup-da", "pos": "adj", "note": "ㅂ-irregular: 수줍어요"},
      {"ko": "무뚝뚝하다", "en": "to be curt, blunt, unsmiling", "romaji": "mu-ttuk-ttu-ka-da", "pos": "adj", "note": "gruff but not necessarily unkind"},
      {"ko": "산만하다", "en": "to be distracted, scattered", "romaji": "san-man-ha-da", "pos": "adj", "note": "散漫; unable to focus"},
      {"ko": "어수선하다", "en": "to be messy, in disarray, unsettled", "romaji": "eo-su-seon-ha-da", "pos": "adj", "note": "of a room or a mood"},
      {"ko": "나른하다", "en": "to be languid, drowsy", "romaji": "na-reun-ha-da", "pos": "adj", "note": "the heavy, sleepy feeling of a warm afternoon"},
      {"ko": "노곤하다", "en": "to be weary, worn out", "romaji": "no-gon-ha-da", "pos": "adj", "note": "困; tired in the body"},
      {"ko": "무료하다", "en": "to be bored, idle", "romaji": "mu-ryo-ha-da", "pos": "adj", "note": "無聊; nothing to do"}
    ],
    "sentences": [
      {"ko": "얼굴이 빨개요. 저 사람이 수줍은가 봐요.", "en": "Their face is red. I guess that person is shy.", "romaji": "eol-gu-ri ppal-gae-yo. jeo sa-ra-mi su-ju-beun-ga bwa-yo", "blankWord": "수줍은가 봐요"},
      {"ko": "말이 별로 없어요. 원래 무뚝뚝한가 봐요.", "en": "He barely talks. I guess he's just curt by nature.", "romaji": "ma-ri byeol-lo eop-seo-yo. wol-lae mu-ttuk-ttu-kan-ga bwa-yo", "blankWord": "무뚝뚝한가 봐요"},
      {"ko": "아이가 집중을 못 해요. 마음이 산만한가 봐요.", "en": "The kid can't focus. I guess his mind is scattered.", "romaji": "a-i-ga jip-jung-eul mot hae-yo. ma-eu-mi san-man-han-ga bwa-yo", "blankWord": "산만한가 봐요"},
      {"ko": "책상 위가 엉망이에요. 방이 어수선한가 봐요.", "en": "The desktop is a mess. I guess the room is in disarray.", "romaji": "chaek-sang wi-ga eong-mang-i-e-yo. bang-i eo-su-seon-han-ga bwa-yo", "blankWord": "어수선한가 봐요"},
      {"ko": "다들 하품을 해요. 날씨가 나른한가 봐요.", "en": "Everyone's yawning. I guess the weather makes you drowsy.", "romaji": "da-deul ha-pu-meul hae-yo. nal-ssi-ga na-reun-han-ga bwa-yo", "blankWord": "나른한가 봐요"},
      {"ko": "눈이 자꾸 감겨요. 몸이 노곤한가 봐요.", "en": "My eyes keep closing. I guess my body is worn out.", "romaji": "nu-ni ja-kku gam-gyeo-yo. mo-mi no-gon-han-ga bwa-yo", "blankWord": "노곤한가 봐요"},
      {"ko": "계속 시계만 봐요. 많이 무료한가 봐요.", "en": "He keeps watching the clock. I guess he's really bored.", "romaji": "gye-sok si-gye-man bwa-yo. ma-ni mu-ryo-han-ga bwa-yo", "blankWord": "무료한가 봐요"},
      {"ko": "어제는 많이 바빴나 봐요. 답장이 없었어요.", "en": "I guess she was really busy yesterday; there was no reply.", "romaji": "eo-je-neun ma-ni ba-bban-na bwa-yo. dap-jang-i eop-seo-sseo-yo", "blankWord": "바빴나 봐요"}
    ]
  },
  {
    "id": "5.06", "level": 5, "title": "Word Builder 6", "point": "文 (문)",
    "grammar": {
      "summary": "文 (문) means 'writing / text / letters'; spotting it points to words about writing and literature.",
      "formation": "文 (문) is a Sino-Korean building block. It combines with another root, at the front or the end: 文 + 章 → 문장 (sentence), 論 + 文 → 논문 (thesis), 作 + 文 → 작문 (composition).",
      "explanation": "文 (문) means 'writing, a text, letters'. You already meet it in 문장 (sentence), 문법 (grammar), 문자 (a character / a text message), 문화 (culture), 문서 (a document), 문맥 (context), and 예문 (an example sentence). Spot 文 and you can guess the word has to do with writing or text. Watch out for a famous false friend: 신문 ('newspaper') is 新聞 and uses 聞 ('to hear'), NOT 文. The words below extend the real 文 set.",
      "notes": ["Already-known 文 words: 문장, 문법, 문자, 문화, 문서, 문맥, 예문.", "文 (문, 'writing') sounds identical to 門 (문, 'gate', as in 대문 = front gate) and 問 (문, 'ask', as in 질문 = question) — same sound, different characters.", "신문 (newspaper) is NOT a 文 word — it is 新聞, with 聞 ('hear/news')."]
    },
    "pitfalls": ["Don't confuse 文 (문, writing) with 門 (문, gate) or 問 (문, ask) — 대문/질문 use different hanja.", "文 attaches to Sino-Korean roots (논문, 작문); you can't paste it onto native Korean words."],
    "bridge": [],
    "vocab": [
      {"ko": "논문", "en": "a thesis, an academic paper", "romaji": "non-mun", "pos": "noun", "note": "論文; 졸업 논문 = graduation thesis"},
      {"ko": "문체", "en": "writing style, prose style", "romaji": "mun-che", "pos": "noun", "note": "文體; an author's characteristic voice"},
      {"ko": "공문", "en": "an official document / letter", "romaji": "gong-mun", "pos": "noun", "note": "公文; issued by an organization"},
      {"ko": "산문", "en": "prose", "romaji": "san-mun", "pos": "noun", "note": "散文; opposite of 운문 (verse)"},
      {"ko": "운문", "en": "verse, poetry", "romaji": "un-mun", "pos": "noun", "note": "韻文; writing with meter/rhyme"},
      {"ko": "비문", "en": "an ungrammatical sentence", "romaji": "bi-mun", "pos": "noun", "note": "非文; a sentence that breaks the rules"},
      {"ko": "문호", "en": "a great writer, a literary master", "romaji": "mun-ho", "pos": "noun", "note": "文豪; a towering author"},
      {"ko": "어문", "en": "language and literature", "romaji": "eo-mun", "pos": "noun", "note": "語文; as in 국어국문학 fields"}
    ],
    "sentences": [
      {"ko": "저는 지금 졸업 논문을 쓰고 있어요.", "en": "I'm writing my graduation thesis now.", "romaji": "jeo-neun ji-geum jo-reop non-mu-neul sseu-go i-sseo-yo", "blankWord": "논문을"},
      {"ko": "이 작가는 문체가 아주 독특해요.", "en": "This author's writing style is very distinctive.", "romaji": "i jak-ga-neun mun-che-ga a-ju dok-teu-kae-yo", "blankWord": "문체가"},
      {"ko": "회사에서 공문을 하나 받았어요.", "en": "I received an official document from the company.", "romaji": "hoe-sa-e-seo gong-mu-neul ha-na ba-da-sseo-yo", "blankWord": "공문을"},
      {"ko": "소설은 산문이고, 시는 운문이에요.", "en": "Novels are prose, and poems are verse.", "romaji": "so-seo-reun san-mu-ni-go, si-neun un-mu-ni-e-yo", "blankWord": "산문이고"},
      {"ko": "이 문장은 비문이에요. 그래서 어색해요.", "en": "This sentence is ungrammatical, so it sounds odd.", "romaji": "i mun-jang-eun bi-mu-ni-e-yo. geu-rae-seo eo-saek-hae-yo", "blankWord": "비문이에요"},
      {"ko": "그분은 한국의 유명한 문호예요.", "en": "He is a famous literary master of Korea.", "romaji": "geu-bu-neun han-gu-ge yu-myeong-han mun-ho-ye-yo", "blankWord": "문호예요"},
      {"ko": "저는 대학교에서 어문 계열을 전공했어요.", "en": "I majored in a language-and-literature field at university.", "romaji": "jeo-neun dae-hak-gyo-e-seo eo-mun gye-yeo-reul jeon-gong-hae-sseo-yo", "blankWord": "어문"}
    ]
  },
  {
    "id": "5.07", "level": 5, "title": "As soon as ...", "point": "-자마자",
    "grammar": {
      "summary": "How to say one action happens the instant another finishes — 'as soon as / right after'.",
      "formation": "Bare V-stem + 자마자, with NO tense marker before it.\n• vowel or consonant stem alike → just add 자마자  (가다 → 가자마자, 먹다 → 먹자마자, 도착하다 → 도착하자마자)\nThe tense of the whole sentence lives in the SECOND clause: 도착하자마자 잤어요 (past), 도착하자마자 잘 거예요 (future).",
      "explanation": "-자마자 links two events with almost no gap: the moment the first finishes, the second happens. You attach 자마자 straight onto the plain verb stem — never add 았/었 or 겠 in front of it, because the timing is carried by the second clause. It stresses immediacy, which sets it apart from -고 나서 ('after doing', which allows a gap). Works for past or future depending on how you end the sentence.",
      "notes": ["No tense before 자마자: 먹자마자, never 먹었자마자.", "The second clause carries the tense: 오자마자 갔어요 / 오자마자 갈 거예요.", "-자마자 = immediate; -고 나서 = 'after' with no immediacy implied."]
    },
    "pitfalls": ["Don't put a tense marker before 자마자: 먹었자마자 ✗ → 먹자마자 (let the second clause show tense).", "-자마자 stresses 'the very instant'; for a plain 'after doing', use -고 나서 instead.", "Attach it to the bare stem for both vowel and consonant stems: 가자마자, 듣자마자."],
    "bridge": ["밥 먹고, 수다떨고, 술 마실 거예요.", "커피 마시고, 도너츠 먹고, 케익 먹고, 우유 마셨어요."],
    "vocab": [
      {"ko": "출발하다", "en": "to depart, to set off", "romaji": "chul-bal-ha-da", "pos": "verb", "note": "出發; opposite of 도착하다"},
      {"ko": "귀가하다", "en": "to return home", "romaji": "gwi-ga-ha-da", "pos": "verb", "note": "歸家; formal for 집에 가다"},
      {"ko": "착수하다", "en": "to set to work, to begin (a task)", "romaji": "chak-su-ha-da", "pos": "verb", "note": "着手; start on a job in earnest"},
      {"ko": "개시하다", "en": "to commence, to open (an event/operation)", "romaji": "gae-si-ha-da", "pos": "verb", "note": "開始; formal 'begin'"},
      {"ko": "접수하다", "en": "to submit / to receive (an application)", "romaji": "jeop-su-ha-da", "pos": "verb", "note": "接受; hand in or take in paperwork"},
      {"ko": "켜지다", "en": "(a light/device) to come on, to turn on", "romaji": "kyeo-ji-da", "pos": "verb", "note": "intransitive; opposite of 꺼지다"},
      {"ko": "연락하다", "en": "to contact, to get in touch", "romaji": "yeol-la-ka-da", "pos": "verb", "note": "連絡; 연락하다 + 에게/한테"}
    ],
    "sentences": [
      {"ko": "집에 도착하자마자 손을 씻었어요.", "en": "As soon as I got home, I washed my hands.", "romaji": "ji-be do-cha-ka-ja-ma-ja so-neul ssi-seo-sseo-yo", "blankWord": "도착하자마자"},
      {"ko": "기차가 출발하자마자 잠이 들었어요.", "en": "As soon as the train departed, I fell asleep.", "romaji": "gi-cha-ga chul-bal-ha-ja-ma-ja ja-mi deu-reo-sseo-yo", "blankWord": "출발하자마자"},
      {"ko": "귀가하자마자 침대에 누웠어요.", "en": "As soon as I got home, I lay down on the bed.", "romaji": "gwi-ga-ha-ja-ma-ja chim-dae-e nu-wo-sseo-yo", "blankWord": "귀가하자마자"},
      {"ko": "소식을 듣자마자 바로 연락했어요.", "en": "As soon as I heard the news, I contacted you right away.", "romaji": "so-si-geul deut-ja-ma-ja ba-ro yeol-la-kae-sseo-yo", "blankWord": "듣자마자"},
      {"ko": "회사가 문을 열자마자 일에 착수했어요.", "en": "As soon as the company opened, they set to work.", "romaji": "hoe-sa-ga mu-neul yeol-ja-ma-ja i-re chak-su-hae-sseo-yo", "blankWord": "열자마자"},
      {"ko": "행사를 개시하자마자 사람들이 몰려왔어요.", "en": "As soon as the event kicked off, people flocked in.", "romaji": "haeng-sa-reul gae-si-ha-ja-ma-ja sa-ram-deu-ri mol-lyeo-wa-sseo-yo", "blankWord": "개시하자마자"},
      {"ko": "원서를 접수하자마자 확인 문자가 왔어요.", "en": "As soon as I submitted the application, a confirmation text came.", "romaji": "won-seo-reul jeop-su-ha-ja-ma-ja hwa-gin mun-ja-ga wa-sseo-yo", "blankWord": "접수하자마자"},
      {"ko": "불이 켜지자마자 다들 박수를 쳤어요.", "en": "As soon as the lights came on, everyone clapped.", "romaji": "bu-ri kyeo-ji-ja-ma-ja da-deul bak-su-reul chyeo-sseo-yo", "blankWord": "켜지자마자"}
    ]
  },
  {
    "id": "5.08", "level": 5, "title": "About to / Planning to ...", "point": "-(으)려고 하다",
    "grammar": {
      "summary": "How to say you intend to, plan to, or are about to do something.",
      "formation": "V-stem + -(으)려고 하다.\n• vowel or ㄹ stem → -려고 하다  (가다 → 가려고 해요, 살다 → 살려고 해요)\n• consonant stem → -으려고 하다  (먹다 → 먹으려고 해요)\nAlso 'was about to (but...)' with -(으)려고 했는데.",
      "explanation": "-(으)려고 하다 expresses intention or an action on the verge of happening: 내일 일찍 일어나려고 해요 = 'I plan to get up early tomorrow'. On its own, -(으)려고 also states purpose in front of another verb ('in order to'): 이기려고 열심히 했어요. Don't confuse it with -(으)러, which also means 'in order to' but ONLY attaches to movement verbs (가다/오다): -(으)려고 is general and doesn't need motion.",
      "notes": ["Use -으려고 after a consonant stem (먹으려고), -려고 after a vowel/ㄹ stem (가려고, 살려고).", "-(으)려고 했는데 = 'I was going to, but ...' — a very common frame.", "-(으)러 needs a motion verb (밥 먹으러 가요); -(으)려고 doesn't."]
    },
    "pitfalls": ["Colloquial spellings -(으)ㄹ려고 / 할라고 are nonstandard — recognize them but write -(으)려고.", "-(으)러 attaches only to movement verbs (가다/오다); for general intention use -(으)려고 하다.", "Use -으려고 after a consonant stem (읽으려고), -려고 after a vowel/ㄹ stem (보려고, 만들려고)."],
    "bridge": ["영화 보러 갈까요?", "언젠가 미국에 가고 싶어요."],
    "vocab": [
      {"ko": "계획하다", "en": "to plan, to make a plan", "romaji": "gye-hoe-ka-da", "pos": "verb", "note": "計劃; 여행을 계획하다"},
      {"ko": "다짐하다", "en": "to resolve, to pledge to oneself", "romaji": "da-jim-ha-da", "pos": "verb", "note": "make a firm inner promise"},
      {"ko": "작정하다", "en": "to be determined, to set one's mind", "romaji": "jak-jeong-ha-da", "pos": "verb", "note": "作定; decide firmly to do something"},
      {"ko": "벼르다", "en": "to be itching to, to bide one's time for", "romaji": "byeo-reu-da", "pos": "verb", "note": "르-irregular: 별렀어요"},
      {"ko": "의향", "en": "an inclination, a willingness (to do)", "romaji": "ui-hyang", "pos": "noun", "note": "意向; 의향이 있다 = to be inclined to"},
      {"ko": "포부", "en": "an aspiration, ambition", "romaji": "po-bu", "pos": "noun", "note": "抱負; a big goal one holds"},
      {"ko": "채비", "en": "preparations, getting ready (to go/do)", "romaji": "chae-bi", "pos": "noun", "note": "채비를 하다 = to get ready"}
    ],
    "sentences": [
      {"ko": "내년에 한국에서 공부하려고 해요.", "en": "I'm planning to study in Korea next year.", "romaji": "nae-nyeon-e han-gu-ge-seo gong-bu-ha-ryeo-go hae-yo", "blankWord": "공부하려고 해요"},
      {"ko": "저는 새 일에 도전할 의향이 있어서 지원하려고 해요.", "en": "I'm inclined to take on new work, so I'm going to apply.", "romaji": "jeo-neun sae i-re do-jeon-hal ui-hyang-i i-sseo-seo ji-won-ha-ryeo-go hae-yo", "blankWord": "지원하려고 해요"},
      {"ko": "큰 포부를 품고 사업을 시작하려고 해요.", "en": "With big ambitions, I'm about to start a business.", "romaji": "keun po-bu-reul pum-go sa-eo-beul si-ja-ka-ryeo-go hae-yo", "blankWord": "시작하려고 해요"},
      {"ko": "담배를 꼭 끊으려고 단단히 다짐했어요.", "en": "I firmly resolved to definitely quit smoking.", "romaji": "dam-bae-reul kkok kkeu-neu-ryeo-go dan-dan-hi da-jim-hae-sseo-yo", "blankWord": "끊으려고"},
      {"ko": "저는 이번엔 꼭 이기려고 오래 별렀어요.", "en": "This time I've long been itching to win.", "romaji": "jeo-neun i-beo-nen kkok i-gi-ryeo-go o-rae byeol-leo-sseo-yo", "blankWord": "이기려고"},
      {"ko": "주말에 이사하려고 미리 계획했어요.", "en": "I planned ahead to move this weekend.", "romaji": "ju-ma-re i-sa-ha-ryeo-go mi-ri gye-hoe-kae-sseo-yo", "blankWord": "이사하려고"},
      {"ko": "지금 막 나가려고 채비를 했어요.", "en": "I just got ready to head out now.", "romaji": "ji-geum mak na-ga-ryeo-go chae-bi-reul hae-sseo-yo", "blankWord": "나가려고"},
      {"ko": "오늘은 일을 일찍 끝내려고 작정했어요.", "en": "I'm determined to finish work early today.", "romaji": "o-neu-reun i-reul il-jjik kkeun-nae-ryeo-go jak-jeong-hae-sseo-yo", "blankWord": "끝내려고"}
    ]
  },
  {
    "id": "5.09", "level": 5, "title": "While doing, and then ...", "point": "-다가",
    "grammar": {
      "summary": "How to say you were in the middle of one action and then switched to (or into) another.",
      "formation": "V-stem + 다가 (often shortened to 다): 하다가, 걷다가, 마시다가.\n• present stem + 다가 → interrupt an ongoing action: 공부하다가 잤어요.\n• -았/었다가 → finish one action, then reverse or do the next: 집에 갔다가 다시 왔어요.\nThe subject must be the SAME in both clauses.",
      "explanation": "-다가 marks a switch mid-action: you were doing one thing, and then something else happened or you changed to another thing. 밥을 먹다가 전화를 받았어요 = 'I was eating and then took a call'. It often introduces an accidental result (걷다가 넘어졌어요 = 'I was walking and fell'). With -았/었다가, the first action fully completes before it flips: 갔다가 왔어요 = 'went and came back'. Crucially, the same person does both actions.",
      "notes": ["하다가 = mid-action (still going when interrupted); 했다가 = completed, then reversed/next.", "Both clauses share ONE subject: 뛰다가 넘어졌어요 (I ran, I fell).", "It often flags an unplanned outcome: 졸다가 역을 지나쳤어요."]
    },
    "pitfalls": ["하다가 (mid-action) vs 했다가 (after completion, then a reversal) are different — choose by whether the first action finished.", "The subject must be the same in both clauses; for two different subjects, -다가 doesn't work.", "Attach it to the plain stem: 마시다가, not 마시어다가."],
    "bridge": ["다 먹고 세 개 남았어요.", "커피 마시고, 도너츠 먹고, 케익 먹고, 우유 마셨어요."],
    "vocab": [
      {"ko": "딴짓하다", "en": "to do something else (instead of what one should)", "romaji": "ttan-ji-ta-da", "pos": "verb", "note": "딴- = 'other'; goofing off"},
      {"ko": "엎지르다", "en": "to spill, to knock over (a liquid)", "romaji": "eop-ji-reu-da", "pos": "verb", "note": "르-irregular: 엎질렀어요"},
      {"ko": "서성이다", "en": "to pace, to hover around", "romaji": "seo-seong-i-da", "pos": "verb", "note": "walk back and forth uneasily"},
      {"ko": "한눈팔다", "en": "to let one's attention wander, to look away", "romaji": "han-nun-pal-da", "pos": "verb", "note": "get distracted from what you're doing"},
      {"ko": "허둥대다", "en": "to fluster, to scramble in a panic", "romaji": "heo-dung-dae-da", "pos": "verb", "note": "move about in a flustered rush"},
      {"ko": "우물쭈물하다", "en": "to dither, to hesitate and stall", "romaji": "u-mul-jju-mul-ha-da", "pos": "verb", "note": "waver without acting"}
    ],
    "sentences": [
      {"ko": "커피를 마시다가 옷에 쏟았어요.", "en": "I was drinking coffee and spilled it on my clothes.", "romaji": "keo-pi-reul ma-si-da-ga o-se sso-da-sseo-yo", "blankWord": "마시다가"},
      {"ko": "길을 걷다가 한눈팔아서 넘어졌어요.", "en": "I was walking, got distracted, and fell.", "romaji": "gi-reul geot-da-ga han-nun-pa-ra-seo neo-meo-jyeo-sseo-yo", "blankWord": "걷다가"},
      {"ko": "공부하다가 자꾸 딴짓했어요.", "en": "I was studying but kept doing other things.", "romaji": "gong-bu-ha-da-ga ja-kku ttan-ji-tae-sseo-yo", "blankWord": "공부하다가"},
      {"ko": "물을 옮기다가 그만 엎질렀어요.", "en": "I was moving the water and ended up spilling it.", "romaji": "mu-reul om-gi-da-ga geu-man eop-jil-leo-sseo-yo", "blankWord": "옮기다가"},
      {"ko": "문 앞에서 서성이다가 그냥 돌아갔어요.", "en": "I paced in front of the door and just went back.", "romaji": "mun a-pe-seo seo-seong-i-da-ga geu-nyang do-ra-ga-sseo-yo", "blankWord": "서성이다가"},
      {"ko": "대답을 못 하고 우물쭈물하다가 시간이 다 갔어요.", "en": "I dithered without answering and ran out of time.", "romaji": "dae-da-beul mot ha-go u-mul-jju-mul-ha-da-ga si-ga-ni da ga-sseo-yo", "blankWord": "우물쭈물하다가"},
      {"ko": "급하게 나오다가 허둥대서 지갑을 놓고 왔어요.", "en": "I rushed out, got flustered, and left my wallet behind.", "romaji": "geu-pa-ge na-o-da-ga heo-dung-dae-seo ji-ga-beul no-ko wa-sseo-yo", "blankWord": "나오다가"},
      {"ko": "집에 갔다가 다시 회사로 왔어요.", "en": "I went home and then came back to the office.", "romaji": "ji-be gat-da-ga da-si hoe-sa-ro wa-sseo-yo", "blankWord": "갔다가"}
    ]
  },
  {
    "id": "5.10", "level": 5, "title": "(To say) that something is + noun", "point": "명사 + -(이)라고 (말하다)",
    "grammar": {
      "summary": "Say what something is called, or quote a noun+이다 statement.",
      "formation": "Consonant + 이라고 (학생이라고), vowel + 라고 (의사라고). 이거는 한국어로 뭐라고 해요? — 나비라고 해요. Quotes 이다-statements: 학생이라고 했어요.",
      "explanation": "-(이)라고 is the noun world's quote marker — the counterpart of -다고 for verbs/adjectives (5.17 completes that side). Two jobs: naming things (제 이름은 ...(이)라고 해요 — the standard self-intro) and reporting someone's 이다-sentence. The 이 is pronunciation glue after consonants.",
      "notes": ["저는 OOO(이)라고 합니다 is the polite self-introduction formula.", "Negation quotes use 아니라고 (아니라고 했어요 = said it isn't).", "Question words are nouns here: 뭐라고, 누구라고."]
    },
    "pitfalls": ["뭐라고, never 뭐다고 — question words are nouns here.", "Keep 이 after consonants: 지민라고 해요 ✗ → 지민이라고 해요 ✓.", "For verbs and adjectives you'll use -다고 (Lesson 17), not -(이)라고 — that's only for nouns."],
    "bridge": ["저도 학생이에요.", "이거는 뭐예요?"],
    "vocab": [
      {"ko": "별칭", "en": "an alias, an alternate name", "romaji": "byeol-ching", "pos": "noun", "note": "別稱; another name for the same thing"},
      {"ko": "명칭", "en": "a name, a designation (of a thing)", "romaji": "myeong-ching", "pos": "noun", "note": "名稱; the official term for something"},
      {"ko": "표현하다", "en": "to express, to put into words", "romaji": "pyo-hyeon-ha-da", "pos": "verb", "note": "表現; 뭐라고 표현하다 = how to put it"},
      {"ko": "정의하다", "en": "to define", "romaji": "jeong-ui-ha-da", "pos": "verb", "note": "定義; state what a term means"},
      {"ko": "통칭", "en": "a collective / common name", "romaji": "tong-ching", "pos": "noun", "note": "通稱; what a group is generally called"},
      {"ko": "일컫다", "en": "to call, to refer to (as)", "romaji": "il-keot-da", "pos": "verb", "note": "ㄷ-irregular: 일컬어요, 일컬었어요"}
    ],
    "sentences": [
      {"ko": "제 이름은 지민이라고 해요.", "en": "My name is Jimin.", "romaji": "je i-reu-meun ji-min-i-ra-go hae-yo", "blankWord": "지민이라고"},
      {"ko": "그런 이름을 별칭이라고 해요.", "en": "A name like that is called an alias.", "romaji": "geu-reon i-reu-meul byeol-ching-i-ra-go hae-yo", "blankWord": "별칭이라고"},
      {"ko": "이 도구의 정확한 명칭을 뭐라고 해요?", "en": "What's the exact name for this tool called?", "romaji": "i do-gu-ui jeong-hwa-kan myeong-ching-eul mwo-ra-go hae-yo", "blankWord": "뭐라고"},
      {"ko": "사전은 이 말을 '기쁨'이라고 정의해요.", "en": "The dictionary defines this word as 'joy'.", "romaji": "sa-jeo-neun i ma-reul gi-ppeum-i-ra-go jeong-ui-hae-yo", "blankWord": "'기쁨'이라고"},
      {"ko": "이 지역을 흔히 강남이라고 통칭해요.", "en": "This area is commonly referred to collectively as Gangnam.", "romaji": "i ji-yeo-geul heu-ni gang-nam-i-ra-go tong-ching-hae-yo", "blankWord": "강남이라고"},
      {"ko": "옛사람들은 이 별을 '샛별'이라고 일컬었어요.", "en": "People of old called this star 'Saetbyeol'.", "romaji": "yet-sa-ram-deu-reun i byeo-reul saet-byeol-i-ra-go il-keo-reo-sseo-yo", "blankWord": "'샛별'이라고"},
      {"ko": "이런 느낌을 한국어로 뭐라고 표현해요?", "en": "How do you express this feeling in Korean?", "romaji": "i-reon neu-kkim-eul han-gu-geo-ro mwo-ra-go pyo-hyeon-hae-yo", "blankWord": "뭐라고"}
    ]
  },
  {
    "id": "5.11", "level": 5, "title": "Sentence Building Drill 3", "point": "복습 / 문장 만들기",
    "grammar": {
      "summary": "A review lesson: combine the Level 5 grammar you've learned so far into longer sentences.",
      "formation": "No new form. Each example stacks two or more points you already know — e.g. -다가 (Lesson 9) + -(으)ㄹ 뻔했다 (Lesson 1), or -나 보다 (Lesson 4) + -(으)려고 하다 (Lesson 8).",
      "explanation": "This is a sentence-building drill, not a new pattern. It trains you to snap together the Level 5 points taught so far (Lessons 1–10): 'almost did', the two 'I guess' forms, 'as soon as', 'about to / planning to', the mid-action '-다가', and noun quoting with -(이)라고. Read each example, notice which points it joins, then build your own along the same lines.",
      "notes": ["No new grammar here — everything comes from Lessons 1–10 (plus all of Levels 1–4).", "Aim to combine at least two patterns in each sentence.", "Say each one aloud to build fluency."]
    },
    "pitfalls": ["Keep each combined point in its own correct form — combining doesn't change how each one conjugates.", "Mind tense: -자마자 and -다가 take no tense marker themselves; the final verb carries it."],
    "bridge": ["오늘은 바빠서 영화를 못 봐요.", "그런 것 같아요."],
    "vocab": [],
    "sentences": [
      {"ko": "늦잠을 자다가 하마터면 지각할 뻔했어요.", "en": "I was oversleeping and almost ended up late.", "romaji": "neut-ja-meul ja-da-ga ha-ma-teo-myeon ji-ga-kal ppeon-hae-sseo-yo", "blankWord": "지각할 뻔했어요"},
      {"ko": "불이 꺼져 있는 걸 보니 다들 집에 갔나 봐요. 그래서 저도 나가려고 해요.", "en": "The lights are off, so I guess everyone went home. So I'm going to head out too.", "romaji": "bu-ri kkeo-jyeo in-neun geol bo-ni da-deul ji-be gan-na bwa-yo. geu-rae-seo jeo-do na-ga-ryeo-go hae-yo", "blankWord": "갔나 봐요"},
      {"ko": "집에 도착하자마자 너무 피곤해서 쓰러질 뻔했어요.", "en": "As soon as I got home, I was so tired I almost collapsed.", "romaji": "ji-be do-cha-ka-ja-ma-ja neo-mu pi-gon-hae-seo sseu-reo-jil ppeon-hae-sseo-yo", "blankWord": "도착하자마자"},
      {"ko": "저 사람 이름을 '민수'라고 하는데, 아직 안 왔나 봐요.", "en": "That person's name is Minsu, but I guess he hasn't come yet.", "romaji": "jeo sa-ram i-reu-meul min-su-ra-go ha-neun-de, a-jik an wan-na bwa-yo", "blankWord": "'민수'라고"},
      {"ko": "수업이 끝나자마자 조는 걸 보니 많이 피곤한가 봐요.", "en": "He dozes off the moment class ends, so I guess he's really tired.", "romaji": "su-eo-bi kkeun-na-ja-ma-ja jo-neun geol bo-ni ma-ni pi-gon-han-ga bwa-yo", "blankWord": "끝나자마자"},
      {"ko": "그 식당을 찾으려고 하다가 길을 잃을 뻔했어요.", "en": "While trying to find that restaurant, I almost got lost.", "romaji": "geu sik-dang-eul cha-jeu-ryeo-go ha-da-ga gi-reul i-reul ppeon-hae-sseo-yo", "blankWord": "찾으려고"}
    ]
  },
  {
    "id": "5.12", "level": 5, "title": "Noun that is called ...", "point": "-(이)라는",
    "grammar": {
      "summary": "Label something the listener may not know: X + -(이)라는 + noun.",
      "formation": "-(이)라고 하는 contracted: 한강이라는 강, 부산이라는 도시; consonant + 이라는, vowel + 라는.",
      "explanation": "Introduces named things: 김치찌개라는 음식을 먹어 봤어요? Literally 'the noun that people call X', so it always modifies a following noun. Combines naturally with -아/어 보다 (4.12) for 'have you tried the thing called...'.",
      "notes": ["With people, OOO이라는 사람 = 'someone called OOO' (distancing — you don't know them).", "The contracted -(이)라는 is the default in speech (rather than the full -(이)라고 하는).", "Consonant-final noun → 이라는 (한강이라는); vowel-final → 라는 (부산이라는)."]
    },
    "pitfalls": ["It must be followed by a noun: 서울이라는 가요 ✗ — it's a modifier, not a sentence ending.", "Drop it for things the listener obviously knows: 서울이라는 도시에 살아요 sounds odd — just 서울에 살아요.", "Keep 이 after consonants (한강이라는), 라는 after vowels (부산이라는)."],
    "bridge": ["저는 학생이에요. 그래서 돈이 없어요.", "이거는 뭐예요?"],
    "vocab": [
      {"ko": "명소", "en": "a famous spot, an attraction", "romaji": "myeong-so", "pos": "noun", "note": "名所; a well-known place to visit"},
      {"ko": "특산물", "en": "a local specialty product", "romaji": "teuk-san-mul", "pos": "noun", "note": "特産物; what a region is famous for producing"},
      {"ko": "정체", "en": "true identity, real nature", "romaji": "jeong-che", "pos": "noun", "note": "正體; 정체를 알 수 없다 = can't tell who/what it is"},
      {"ko": "유래", "en": "origin, provenance (of a thing/custom)", "romaji": "yu-rae", "pos": "noun", "note": "由來; where something came from"},
      {"ko": "명물", "en": "a local specialty / famous feature", "romaji": "myeong-mul", "pos": "noun", "note": "名物; a thing a place is known for"},
      {"ko": "별미", "en": "a delicacy, a special treat (to eat)", "romaji": "byeol-mi", "pos": "noun", "note": "別味; an unusually good dish"},
      {"ko": "진풍경", "en": "a spectacular / remarkable sight", "romaji": "jin-pung-gyeong", "pos": "noun", "note": "珍風景; a rare, striking scene"}
    ],
    "sentences": [
      {"ko": "김치찌개라는 음식을 먹어 봤어요?", "en": "Have you tried the food called kimchi jjigae?", "romaji": "gim-chi-jji-gae-ra-neun eum-si-geul meo-geo bwa-sseo-yo", "blankWord": "김치찌개라는"},
      {"ko": "부산이라는 도시에 유명한 명소가 많아요.", "en": "The city called Busan has many famous spots.", "romaji": "bu-san-i-ra-neun do-si-e yu-myeong-han myeong-so-ga ma-na-yo", "blankWord": "부산이라는"},
      {"ko": "한라봉이라는 특산물을 제주에서 많이 팔아요.", "en": "They sell a specialty called hallabong a lot in Jeju.", "romaji": "hal-la-bong-i-ra-neun teuk-san-mu-reul je-ju-e-seo ma-ni pa-ra-yo", "blankWord": "한라봉이라는"},
      {"ko": "홍어라는 음식은 이 지역의 별미예요.", "en": "The food called hongeo is a delicacy of this region.", "romaji": "hong-eo-ra-neun eum-si-geun i ji-yeo-ge byeol-mi-ye-yo", "blankWord": "홍어라는"},
      {"ko": "'해맞이'라는 행사는 이 동네의 명물이에요.", "en": "The event called 'sunrise-greeting' is the town's famous feature.", "romaji": "hae-ma-ji-ra-neun haeng-sa-neun i dong-ne-ui myeong-mul-i-e-yo", "blankWord": "'해맞이'라는"},
      {"ko": "정체를 알 수 없는 그 사람을 '수수께끼'라는 별명으로 불러요.", "en": "We call that person, whose identity we can't tell, by the nickname 'Mystery'.", "romaji": "jeong-che-reul al su eom-neun geu sa-ra-meul su-su-kke-kki-ra-neun byeol-myeong-eu-ro bul-leo-yo", "blankWord": "'수수께끼'라는"},
      {"ko": "'강강술래'라는 놀이의 유래는 아주 오래됐어요.", "en": "The origin of the game called ganggangsullae is very old.", "romaji": "gang-gang-sul-lae-ra-neun no-ri-ui yu-rae-neun a-ju o-rae-dwae-sseo-yo", "blankWord": "'강강술래'라는"},
      {"ko": "'눈꽃축제'라는 행사에서 진풍경을 봤어요.", "en": "I saw a spectacular sight at the event called the Snow Flower Festival.", "romaji": "nun-kkot-chuk-je-ra-neun haeng-sa-e-seo jin-pung-gyeong-eul bwa-sseo-yo", "blankWord": "'눈꽃축제'라는"}
    ]
  },
  {
    "id": "5.13", "level": 5, "title": "Word Builder 7", "point": "會 (회)",
    "grammar": {
      "summary": "會 (회) means 'gathering / meeting / association'; spotting it points to words about people coming together.",
      "formation": "會 (회) is a Sino-Korean building block. It combines with another root, at the front or the end: 會 + 議 → 회의 (meeting), 社 + 會 → 사회 (society), 總 + 會 → 총회 (general assembly).",
      "explanation": "會 (회) means 'to gather / a meeting / an association'. You already meet it in 회의 (a meeting), 사회 (society), 기회 (opportunity — a chance that 'comes together'), 회원 (a member), 회장 (a chairperson), 회비 (membership dues), and 동호회 (a hobby club). Spot 會 and you can guess the word involves people meeting or an organized group. The words below extend that set.",
      "notes": ["Already-known 會 words: 회의, 사회, 기회, 회원, 회장, 회비, 동호회.", "會 (회, 'gathering') sounds identical to 回 (회, 'times / a turn', as in 회수 = number of times) — same sound, different character.", "회식 (會食, a company dinner) joins 會 with 食 ('eat/meal') — it's introduced later with the 食 builder (5.22)."]
    },
    "pitfalls": ["Don't confuse 會 (회, gathering) with 回 (회, 'times / return') — 일회용 (disposable) uses 回, not 會.", "會 attaches to Sino-Korean roots (총회, 집회); you can't paste it onto native Korean words."],
    "bridge": [],
    "vocab": [
      {"ko": "총회", "en": "a general assembly / general meeting", "romaji": "chong-hoe", "pos": "noun", "note": "總會; a full meeting of all members"},
      {"ko": "면회", "en": "a visit (to a patient, soldier, inmate)", "romaji": "myeon-hoe", "pos": "noun", "note": "面會; a supervised in-person visit"},
      {"ko": "회담", "en": "talks, a conference (between parties)", "romaji": "hoe-dam", "pos": "noun", "note": "會談; 정상 회담 = a summit"},
      {"ko": "집회", "en": "a rally, an assembly", "romaji": "ji-poe", "pos": "noun", "note": "集會; people gathering for a cause"},
      {"ko": "재회", "en": "a reunion, meeting again", "romaji": "jae-hoe", "pos": "noun", "note": "再會; 재회하다 = to reunite"},
      {"ko": "회원제", "en": "a membership system", "romaji": "hoe-won-je", "pos": "noun", "note": "會員制; open only to members"},
      {"ko": "개회", "en": "the opening (of a meeting/session)", "romaji": "gae-hoe", "pos": "noun", "note": "開會; opposite of 폐회"},
      {"ko": "폐회", "en": "the closing (of a meeting/session)", "romaji": "pye-hoe", "pos": "noun", "note": "閉會; declared at the end"}
    ],
    "sentences": [
      {"ko": "다음 주에 연례 총회가 열려요.", "en": "The annual general assembly is held next week.", "romaji": "da-eum ju-e yeol-lye chong-hoe-ga yeol-lyeo-yo", "blankWord": "총회가"},
      {"ko": "병원에서는 면회 시간이 정해져 있어요.", "en": "At the hospital, visiting hours are set.", "romaji": "byeong-won-e-seo-neun myeon-hoe si-ga-ni jeong-hae-jyeo i-sseo-yo", "blankWord": "면회"},
      {"ko": "두 나라의 정상이 회담을 했어요.", "en": "The two countries' leaders held talks.", "romaji": "du na-ra-ui jeong-sang-i hoe-da-meul hae-sseo-yo", "blankWord": "회담을"},
      {"ko": "광장에서 큰 집회가 있었어요.", "en": "There was a big rally in the square.", "romaji": "gwang-jang-e-seo keun ji-poe-ga i-sseo-sseo-yo", "blankWord": "집회가"},
      {"ko": "오랜 친구와의 재회는 정말 반가웠어요.", "en": "Reuniting with an old friend was really joyful.", "romaji": "o-raen chin-gu-wa-ui jae-hoe-neun jeong-mal ban-ga-wo-sseo-yo", "blankWord": "재회는"},
      {"ko": "이 도서관은 회원제로 운영돼요.", "en": "This library runs on a membership system.", "romaji": "i do-seo-gwa-neun hoe-won-je-ro u-nyeong-dwae-yo", "blankWord": "회원제로"},
      {"ko": "개회 인사 뒤에 바로 발표가 시작됐어요.", "en": "Right after the opening remarks, the presentation began.", "romaji": "gae-hoe in-sa dwi-e ba-ro bal-pyo-ga si-jak-dwae-sseo-yo", "blankWord": "개회"},
      {"ko": "행사가 끝나고 폐회를 선언했어요.", "en": "After the event ended, they declared it closed.", "romaji": "haeng-sa-ga kkeun-na-go pye-hoe-reul seon-eon-hae-sseo-yo", "blankWord": "폐회를"}
    ]
  },
  {
    "id": "5.14", "level": 5, "title": "Since / Because / As", "point": "-(으)니까",
    "grammar": {
      "summary": "'Since / because (as we both can see)' — the reason connector that works with commands, plus a 'when I did X, I discovered Y' use.",
      "formation": "Stem + 으니까 / 니까 (바쁘니까, 오니까; ㄹ keeps: 사니까); past -았/었으니까; nouns (이)니까. Reason clause first.",
      "explanation": "You already use -아/어서 for neutral cause. -(으)니까 differs two ways. It is the ONLY reason connector allowed before commands/suggestions: 더우니까 창문 좀 여세요, 늦었으니까 택시 탑시다 — with -아/어서 those are ungrammatical. And it frames the reason as evident/shared ('as you know'), so overuse on plain facts sounds self-justifying. Separate discovery sense: VERB + 니까 = 'upon doing, found': 문을 여니까 고양이가 있었어요.",
      "notes": ["Politeness formulas keep -아/어서 (와 주셔서 감사합니다, 늦어서 죄송합니다).", "Sentence-final -(으)니까요 works as a standalone 'because ...' answer.", "Discovery sense: the second clause is usually past + a finding."]
    },
    "pitfalls": ["Commands after -아/어서 ✗: 비가 와서 우산 가져가세요 ✗ → 비가 오니까 ✓ — this is the tested contrast.", "Thanks and apologies require -아/어서; using 니까 there sounds like lecturing.", "Discovery 니까 takes no past before it: 열었으니까 (discovery reading) ✗ → 여니까 고양이가 있었어요 ✓."],
    "bridge": ["오늘은 바빠서 영화를 못 봐요.", "현우 씨가 재미없어서 졸려요."],
    "vocab": [
      {"ko": "탓", "en": "fault, blame (the cause of a bad result)", "romaji": "tat", "pos": "noun", "note": "네 탓이 아니야 = it's not your fault"},
      {"ko": "연유", "en": "reason, the how-and-why (of a matter)", "romaji": "yeo-nyu", "pos": "noun", "note": "緣由; the background reason"},
      {"ko": "사유", "en": "a reason, grounds (often formal/official)", "romaji": "sa-yu", "pos": "noun", "note": "事由; 지각 사유 = reason for lateness"},
      {"ko": "화근", "en": "the source of trouble, the root of a problem", "romaji": "hwa-geun", "pos": "noun", "note": "禍根; what a disaster grew out of"},
      {"ko": "빌미", "en": "a pretext, an excuse (that invites trouble)", "romaji": "bil-mi", "pos": "noun", "note": "빌미를 주다 = to give someone an opening"},
      {"ko": "명분", "en": "a justification, a legitimate cause", "romaji": "myeong-bun", "pos": "noun", "note": "名分; the stated grounds for acting"}
    ],
    "sentences": [
      {"ko": "밖이 추우니까 창문을 좀 닫아 주세요.", "en": "Since it's cold outside, please close the window.", "romaji": "ba-kki chu-u-ni-kka chang-mu-neul jom da-da ju-se-yo", "blankWord": "추우니까"},
      {"ko": "문을 여니까 고양이가 안에 있었어요.", "en": "When I opened the door, a cat was inside.", "romaji": "mu-neul yeo-ni-kka go-yang-i-ga a-ne i-sseo-sseo-yo", "blankWord": "여니까"},
      {"ko": "제가 실수한 탓이니까 제가 사과할게요.", "en": "Since it's my fault for the mistake, I'll apologize.", "romaji": "je-ga sil-su-han tat-i-ni-kka je-ga sa-gwa-hal-ge-yo", "blankWord": "탓이니까"},
      {"ko": "그 사람이 화를 낸 연유를 모르니까 답답해요.", "en": "Since I don't know why he got angry, it's frustrating.", "romaji": "geu sa-ram-i hwa-reul naen yeo-nyu-reul mo-reu-ni-kka dap-da-pae-yo", "blankWord": "모르니까"},
      {"ko": "지각한 사유가 분명하니까 걱정하지 마세요.", "en": "Since the reason for being late is clear, don't worry.", "romaji": "ji-ga-kan sa-yu-ga bun-myeong-ha-ni-kka geok-jeong-ha-ji ma-se-yo", "blankWord": "분명하니까"},
      {"ko": "작은 오해가 화근이 됐으니까 빨리 풀어야 해요.", "en": "Since a small misunderstanding became the root of trouble, we should clear it up fast.", "romaji": "ja-geun o-hae-ga hwa-geun-i dwae-sseu-ni-kka ppal-li pu-reo-ya hae-yo", "blankWord": "됐으니까"},
      {"ko": "괜한 빌미를 주면 안 되니까 말을 조심하세요.", "en": "Since you shouldn't give a needless pretext, watch your words.", "romaji": "gwaen-han bil-mi-reul ju-myeon an doe-ni-kka ma-reul jo-sim-ha-se-yo", "blankWord": "안 되니까"},
      {"ko": "명분이 충분하니까 당당하게 주장하세요.", "en": "Since the justification is solid, make your case with confidence.", "romaji": "myeong-bun-i chung-bun-ha-ni-kka dang-dang-ha-ge ju-jang-ha-se-yo", "blankWord": "충분하니까"}
    ]
  },
  {
    "id": "5.15", "level": 5, "title": "At least / Instead / It might not be the best but...", "point": "-(이)라도",
    "grammar": {
      "summary": "How to offer or accept a second-best option — 'at least / even (if it's just) ...'.",
      "formation": "N + -(이)라도.\n• consonant-final noun → -이라도  (물이라도)\n• vowel-final noun → -라도  (커피라도)\nWith question words it means 'any-': 뭐라도 (anything), 누구라도 (anyone), 어디라도 (anywhere).",
      "explanation": "-(이)라도 attaches to a noun to say 'at least this, if nothing better': 물이라도 드세요 = 'at least drink some water'. It signals the noun isn't the ideal choice but is acceptable as a fallback. This is different from plain -도 ('also, too'): 커피도 마셔요 = 'I drink coffee too', but 커피라도 마셔요 = 'let's at least have coffee (since there's nothing better)'. Paired with a question word, it opens up to 'any at all': 뭐라도 먹어요 = 'let's eat something (anything)'.",
      "notes": ["Use -이라도 after a consonant-final noun (밥이라도), -라도 after a vowel-final one (차라도).", "Question word + 라도 = 'any-': 뭐라도, 누구라도, 어디라도, 언제라도.", "It carries a 'not ideal, but okay' tone — a fallback, not a first choice."]
    },
    "pitfalls": ["-(이)라도 (a fallback, 'at least') is not plain -도 ('also'): 커피도 = 'coffee too'; 커피라도 = 'at least coffee'.", "Putting 라도 on a best-case or a compliment can sound sarcastic — it implies the thing is only second-best.", "Match the form to the noun ending: 물이라도 (consonant), 커피라도 (vowel)."],
    "bridge": ["저도 물 주세요.", "저도 돈이 없어요. 그래도 걱정하지 마세요."],
    "vocab": [
      {"ko": "대안", "en": "an alternative, another option", "romaji": "dae-an", "pos": "noun", "note": "代案; a substitute plan"},
      {"ko": "하다못해", "en": "at the very least, if nothing else", "romaji": "ha-da-mo-tae", "pos": "adv", "note": "even in the worst case, at minimum"},
      {"ko": "미봉책", "en": "a stopgap, a temporary patch", "romaji": "mi-bong-chaek", "pos": "noun", "note": "彌縫策; a quick fix, not a real solution"},
      {"ko": "궁여지책", "en": "a last resort, a desperate measure", "romaji": "gung-yeo-ji-chaek", "pos": "noun", "note": "窮餘之策; the only move left when cornered"},
      {"ko": "웬만하면", "en": "if at all possible, if it can be helped", "romaji": "wen-man-ha-myeon", "pos": "adv", "note": "unless there's a strong reason not to"},
      {"ko": "임시방편", "en": "a makeshift measure, a temporary expedient", "romaji": "im-si-bang-pyeon", "pos": "noun", "note": "臨時方便; a for-now workaround"},
      {"ko": "궁하다", "en": "to be hard up, to be short (of options/money)", "romaji": "gung-ha-da", "pos": "adj", "note": "窮; in a tight, pressed situation"}
    ],
    "sentences": [
      {"ko": "목이 마르면 물이라도 드세요.", "en": "If you're thirsty, at least drink some water.", "romaji": "mo-gi ma-reu-myeon mul-i-ra-do deu-se-yo", "blankWord": "물이라도"},
      {"ko": "시간이 없으면 커피라도 한잔해요.", "en": "If there's no time, let's at least grab a coffee.", "romaji": "si-ga-ni eop-seu-myeon keo-pi-ra-do han-jan-hae-yo", "blankWord": "커피라도"},
      {"ko": "완벽한 방법이 없으면 임시방편이라도 써 봐요.", "en": "If there's no perfect way, at least try a stopgap.", "romaji": "wan-byeo-kan bang-beo-bi eop-seu-myeon im-si-bang-pyeon-i-ra-do sseo bwa-yo", "blankWord": "임시방편이라도"},
      {"ko": "지금은 궁하니까 하다못해 라면이라도 먹어야 해요.", "en": "I'm hard up now, so at least I have to eat ramen.", "romaji": "ji-geum-eun gung-ha-ni-kka ha-da-mo-tae ra-myeon-i-ra-do meo-geo-ya hae-yo", "blankWord": "라면이라도"},
      {"ko": "더 나은 대안이 없어서 이 방법이라도 골랐어요.", "en": "There was no better alternative, so I chose at least this method.", "romaji": "deo na-eun dae-an-i eop-seo-seo i bang-beo-bi-ra-do gol-la-sseo-yo", "blankWord": "방법이라도"},
      {"ko": "미봉책이라도 지금은 급한 불을 꺼야 해요.", "en": "Even a stopgap — right now we have to put out the immediate fire.", "romaji": "mi-bong-chaek-i-ra-do ji-geum-eun geu-pan bu-reul kkeo-ya hae-yo", "blankWord": "미봉책이라도"},
      {"ko": "궁여지책이라도 좋으니까 뭐라도 해 봐요.", "en": "Even a last resort is fine, so let's at least try something.", "romaji": "gung-yeo-ji-chaek-i-ra-do jo-eu-ni-kka mwo-ra-do hae bwa-yo", "blankWord": "궁여지책이라도"},
      {"ko": "웬만하면 오늘이라도 이 일을 끝내고 싶어요.", "en": "If at all possible, I'd like to finish this at least today.", "romaji": "wen-man-ha-myeon o-neul-i-ra-do i i-reul kkeun-nae-go si-peo-yo", "blankWord": "오늘이라도"}
    ]
  },
  {"id": "5.16", "level": 5, "title": "Narrative present tense", "point": "-(ㄴ/는)다", "grammar": {"summary": "The plain (narrative) form used in writing, diaries, headlines, and quoted speech — the dictionary's own register.", "formation": "Action verbs, present: vowel stem + ㄴ다 (가다 → 간다), consonant stem + 는다 (먹다 → 먹는다); ㄹ-stems drop ㄹ before ㄴ (살다 → 산다). Descriptive verbs (adjectives), 있다/없다, and noun + 이다 stay as plain 다 in the present (좋다, 있다, 학생이다). Past for everything: -았/었다 (갔다, 먹었다, 좋았다, 학생이었다). Future: -(으)ㄹ 것이다 / 거다.", "explanation": "Korean has a neutral written register that isn't about politeness at all: novels, news, diaries, exam questions, and your own inner monologue all use it. Only present-tense ACTION verbs change shape (간다/먹는다); adjectives and 이다 just use the bare dictionary form. This form is also the base that all reported speech is built on, so this lesson is the foundation for Lesson 17 and Lesson 29. Spoken to someone's face, the same forms are 반말 — fine with close friends, rude to strangers.", "notes": ["Exclamations to yourself use it too: 맛있다! 눈 온다!", "In diaries the subject 나 + plain form is standard: 오늘은 일찍 일어났다.", "ㄹ-drop: 살다 → 산다, 알다 → 안다, 놀다 → 논다."]}, "pitfalls": ["Adjectives never take -는다/-ㄴ다: 좋는다 and 예쁜다 are wrong — present adjectives stay 좋다, 예쁘다. Only action verbs change.", "있다/없다 side with adjectives here (있다, not 있는다) — even though they take -는- in other patterns like 있는지.", "Don't mistake the narrative form in writing for rudeness: on paper it is register-neutral; only face-to-face speech makes it 반말."], "bridge": ["학교에 갔어요.", "맛있어요.", "네, 맞아요."], "vocab": [{"ko": "서술", "en": "narration, description (in writing)", "romaji": "seo-sul", "pos": "noun", "note": "敍述; 서술하다 = to narrate"}, {"ko": "서사", "en": "narrative, epic account", "romaji": "seo-sa", "pos": "noun", "note": "敍事; 서사 구조 = narrative structure"}, {"ko": "지문", "en": "a written passage (on an exam); stage directions", "romaji": "ji-mun", "pos": "noun", "note": "地文; the reading passage in a test question"}, {"ko": "문어", "en": "written language (as opposed to speech)", "romaji": "mu-neo", "pos": "noun", "note": "文語; 문어체 = literary style"}, {"ko": "독백", "en": "a monologue, talking to oneself", "romaji": "dok-baek", "pos": "noun", "note": "獨白; 독백하다 = to soliloquize"}, {"ko": "각본", "en": "a script, screenplay", "romaji": "gak-bon", "pos": "noun", "note": "脚本; 각본을 쓰다 = to write a script"}, {"ko": "등장인물", "en": "a character (in a story)", "romaji": "deung-jang-in-mul", "pos": "noun", "note": "登場人物; the people who appear in a work"}, {"ko": "논조", "en": "the tone or slant (of an article)", "romaji": "non-jo", "pos": "noun", "note": "論調; 기사의 논조 = an article's stance"}], "sentences": [{"ko": "나는 매일 아침 여섯 시에 일어난다.", "en": "I get up at six every morning.", "romaji": "na-neun mae-il a-chim yeo-seot si-e i-reo-nan-da", "blankWord": "일어난다"}, {"ko": "주인공은 밥을 먹고 학교에 간다.", "en": "The main character eats and goes to school.", "romaji": "ju-in-gong-eun ba-beul meok-go hak-gyo-e gan-da", "blankWord": "간다"}, {"ko": "이 소설의 문체는 아주 좋다.", "en": "This novel's writing style is very good.", "romaji": "i so-seol-ui mun-che-neun a-ju jo-ta", "blankWord": "좋다"}, {"ko": "그 사람은 유명한 각본 작가이다.", "en": "That person is a famous screenwriter.", "romaji": "geu sa-ra-meun yu-myeong-han gak-bon jak-ga-i-da", "blankWord": "작가이다"}, {"ko": "서울에서는 지금도 눈이 온다.", "en": "It is still snowing in Seoul.", "romaji": "seo-u-re-seo-neun ji-geum-do nu-ni on-da", "blankWord": "온다"}, {"ko": "등장인물이 혼자 독백을 한다.", "en": "The character delivers a monologue alone.", "romaji": "deung-jang-in-mu-ri hon-ja dok-bae-geul han-da", "blankWord": "한다"}, {"ko": "어제 지문을 다 읽었다.", "en": "I read the whole passage yesterday.", "romaji": "eo-je ji-mu-neul da il-geot-da", "blankWord": "읽었다"}, {"ko": "이 기사의 논조는 조금 차갑다.", "en": "This article's tone is a bit cold.", "romaji": "i gi-sa-ui non-jo-neun jo-geum cha-gap-da", "blankWord": "차갑다"}]},
  {"id": "5.17", "level": 5, "title": "To say that ...", "point": "-(ㄴ/는)다고 (말하다)", "grammar": {"summary": "Report what someone says or said: plain form + -고 (+ 하다/말하다/듣다).", "formation": "Take the Lesson 16 plain form and add 고: action verb present 간다고/먹는다고, adjective 좋다고, 있다고/없다고, past anything -았/었다고, and nouns use -(이)라고 (학생이라고 — from Lesson 10, NOT 학생이다고). The quoting verb follows: -다고 해요 / 했어요 / 말했어요 / 들었어요.", "explanation": "Korean reported speech nests the plain form inside your sentence: 마크 씨가 내일 온다고 했어요 = 'Mark said he's coming tomorrow.' The tense INSIDE the quote is the tense of the original statement: 온다고 했어요 (said he comes/will come) vs 왔다고 했어요 (said he came). -다고 해요 with no specific speaker also means 'they say / I hear': 이 식당이 맛있다고 해요. In casual speech the whole thing contracts to -대요 (온대요 = 온다고 해요) — recognize it; producing it is optional.", "notes": ["Quoting shortcut: -다고요? = 'you said ...?' (echo question).", "고 싶다 inside a quote behaves as an adjective: 가고 싶다고 했어요.", "The person being quoted takes 이/가 or 은/는 as normal — no special marker."]}, "pitfalls": ["Nouns never take -다고: 학생이다고 is wrong — use -(이)라고 (학생이라고 했어요). This is the single most common mix-up.", "Never quote the 요-form: 가요라고 했어요 is wrong — strip to the plain form first (간다고 했어요).", "Put tense inside the quote, not only on 하다: 갔다고 했어요 'said he went' is different from 간다고 했어요 'said he goes/will go' — choose deliberately."], "bridge": ["이야기 많이 들었어요.", "어디에서 들었어요?", "말했어요."], "vocab": [{"ko": "전언", "en": "a message, word passed along", "romaji": "jeo-neon", "pos": "noun", "note": "傳言; 전언을 남기다 = to leave a message"}, {"ko": "진술", "en": "a statement (esp. official/legal)", "romaji": "jin-sul", "pos": "noun", "note": "陳述; 진술하다 = to state formally"}, {"ko": "인용", "en": "a quotation, citing", "romaji": "i-nyong", "pos": "noun", "note": "引用; 인용하다 = to quote"}, {"ko": "발언", "en": "a remark, an utterance (in public)", "romaji": "ba-reon", "pos": "noun", "note": "發言; 발언하다 = to speak up"}, {"ko": "해명", "en": "an explanation clearing something up", "romaji": "hae-myeong", "pos": "noun", "note": "解明; 해명하다 = to explain oneself"}, {"ko": "실언", "en": "a slip of the tongue, misstatement", "romaji": "si-reon", "pos": "noun", "note": "失言; something you shouldn't have said"}, {"ko": "언급", "en": "a mention, reference", "romaji": "eon-geup", "pos": "noun", "note": "言及; 언급하다 = to mention"}, {"ko": "유언비어", "en": "a groundless rumor", "romaji": "yu-eon-bi-eo", "pos": "noun", "note": "流言蜚語; false talk that spreads"}], "sentences": [{"ko": "친구가 내일 온다고 했어요.", "en": "My friend said he's coming tomorrow.", "romaji": "chin-gu-ga nae-il on-da-go hae-sseo-yo", "blankWord": "온다고"}, {"ko": "그 사람은 어제 이미 갔다고 했어요.", "en": "He said he already left yesterday.", "romaji": "geu sa-ra-meun eo-je i-mi gat-da-go hae-sseo-yo", "blankWord": "갔다고"}, {"ko": "이 식당이 정말 맛있다고 들었어요.", "en": "I heard this restaurant is really good.", "romaji": "i sik-dang-i jeong-mal ma-sit-da-go deu-reo-sseo-yo", "blankWord": "맛있다고"}, {"ko": "그분이 유명한 작가라고 해요.", "en": "They say that person is a famous writer.", "romaji": "geu-bu-ni yu-myeong-han jak-ga-ra-go hae-yo", "blankWord": "작가라고"}, {"ko": "회사에서 진술을 다시 하라고 해서 갔어요.", "en": "The company said to give the statement again, so I went.", "romaji": "hoe-sa-e-seo jin-su-reul da-si ha-ra-go hae-seo ga-sseo-yo", "blankWord": "하라고"}, {"ko": "그 발언이 실언이었다고 해명했어요.", "en": "He explained that the remark was a slip of the tongue.", "romaji": "geu ba-reo-ni si-reo-ni-eot-da-go hae-myeong-hae-sseo-yo", "blankWord": "실언이었다고"}, {"ko": "선생님이 시험이 어렵다고 하셨어요.", "en": "The teacher said the exam is difficult.", "romaji": "seon-saeng-ni-mi si-heo-mi eo-ryeop-da-go ha-syeo-sseo-yo", "blankWord": "어렵다고"}, {"ko": "그건 유언비어라고 언급했어요.", "en": "He mentioned that it is a groundless rumor.", "romaji": "geu-geon yu-eon-bi-eo-ra-go eon-geu-pae-sseo-yo", "blankWord": "유언비어라고"}]},
  {"id": "5.18", "level": 5, "title": "Whether or not", "point": "-(으)ㄴ/는지", "grammar": {"summary": "Embed a question inside a sentence: 'whether / if ...', or 'what/where/when ... (I don't know)'.", "formation": "Action verbs + 는지 (가는지, 먹는지). Adjectives: 받침 + 은지 (좋은지), no 받침 + ㄴ지 (바쁜지). Nouns + 인지 (학생인지). Past for everything: -았/었는지 (갔는지, 좋았는지). Future/guess: -(으)ㄹ지 (갈지, 좋을지). Usually followed by 알다/모르다/궁금하다/물어보다/확인하다.", "explanation": "-(으)ㄴ/는지 turns a question into a noun-like chunk you can slot into a bigger sentence: 그 사람이 오는지 몰라요 = 'I don't know whether he's coming.' It works with question words too: 어디에 있는지 알아요? = 'Do you know where it is?' When you are weighing an unsettled future choice, -(으)ㄹ지 is the natural form: 갈지 안 갈지 아직 몰라요. To make the 'or not' explicit, repeat the verb in the negative: 오는지 안 오는지.", "notes": ["있다/없다 pattern with verbs: 있는지, 없는지.", "-(으)ㄴ지 also appears in a different meaning — 'since (a time)': 온 지 2년 됐어요. Same shape, unrelated job.", "궁금하다 is the natural partner verb: 왜 그런지 궁금해요."]}, "pitfalls": ["Don't confuse -는지 with -는데: 뭐 하는지 알아요? asks 'do you know what he's doing?', while 뭐 하는데? is a casual 'what are you doing?' — different jobs entirely.", "Adjectives take 은지/ㄴ지, not 는지: 좋는지 is wrong — say 좋은지. Only action verbs (and 있다/없다) use 는지.", "For an unresolved future decision use -(으)ㄹ지, not -는지: 내일 갈지 모르겠어요 (not 가는지 모르겠어요, which asks about a present fact)."], "bridge": ["아직 몰라요.", "저기 있는 사람 알아요?", "저도 몰라요."], "vocab": [{"ko": "궁금증", "en": "curiosity, a nagging question", "romaji": "gung-geum-jeung", "pos": "noun", "note": "궁금증이 풀리다 = to have one's curiosity satisfied"}, {"ko": "진위", "en": "the truth or falsehood (of something)", "romaji": "ji-nwi", "pos": "noun", "note": "眞僞; 진위를 확인하다 = to verify"}, {"ko": "행방", "en": "someone's whereabouts", "romaji": "haeng-bang", "pos": "noun", "note": "行方; 행방을 모르다 = to not know where sb went"}, {"ko": "속내", "en": "one's real thoughts, inner feelings", "romaji": "song-nae", "pos": "noun", "note": "속내를 밝히다 = to reveal what one really thinks"}, {"ko": "여지", "en": "room, leeway (for something)", "romaji": "yeo-ji", "pos": "noun", "note": "餘地; 의심의 여지가 없다 = no room for doubt"}, {"ko": "관건", "en": "the key issue, the deciding factor", "romaji": "gwan-geon", "pos": "noun", "note": "關鍵; 관건은 시간이에요 = the key is time"}, {"ko": "속셈", "en": "a hidden intention, ulterior motive", "romaji": "sok-sem", "pos": "noun", "note": "속셈이 뭐예요? = what are you really after?"}, {"ko": "진상", "en": "the true state of affairs", "romaji": "jin-sang", "pos": "noun", "note": "眞相; 진상을 밝히다 = to uncover the truth"}], "sentences": [{"ko": "그 사람이 오는지 안 오는지 몰라요.", "en": "I don't know whether he's coming or not.", "romaji": "geu sa-ra-mi o-neun-ji an o-neun-ji mol-la-yo", "blankWord": "오는지"}, {"ko": "이 소문의 진위가 궁금해요.", "en": "I'm curious whether this rumor is true.", "romaji": "i so-mun-ui ji-nwi-ga gung-geum-hae-yo", "blankWord": "진위"}, {"ko": "친구의 행방을 아는지 물어봤어요.", "en": "I asked whether they know my friend's whereabouts.", "romaji": "chin-gu-ui haeng-bang-eul a-neun-ji mu-reo-bwa-sseo-yo", "blankWord": "아는지"}, {"ko": "그 식당이 지금도 좋은지 모르겠어요.", "en": "I'm not sure whether that restaurant is still good.", "romaji": "geu sik-dang-i ji-geum-do jo-eun-ji mo-reu-ge-sseo-yo", "blankWord": "좋은지"}, {"ko": "내일 갈지 아직 안 정했어요.", "en": "I haven't decided yet whether I'll go tomorrow.", "romaji": "nae-il gal-ji a-jik an jeong-hae-sseo-yo", "blankWord": "갈지"}, {"ko": "저 사람이 학생인지 선생님인지 몰라요.", "en": "I don't know whether that person is a student or a teacher.", "romaji": "jeo sa-ra-mi hak-saeng-in-ji seon-saeng-nim-in-ji mol-la-yo", "blankWord": "학생인지"}, {"ko": "그분의 속내가 뭔지 알 여지가 없어요.", "en": "There's no room to know what he really thinks.", "romaji": "geu-bu-nui song-nae-ga mwon-ji al yeo-ji-ga eop-seo-yo", "blankWord": "뭔지"}, {"ko": "어제 왜 안 왔는지 설명해 주세요.", "en": "Please explain why you didn't come yesterday.", "romaji": "eo-je wae an wan-neun-ji seol-myeong-hae ju-se-yo", "blankWord": "왔는지"}]},
  {"id": "5.19", "level": 5, "title": "To tell someone to do something", "point": "동사 + -(으)라고 하다", "grammar": {"summary": "Report an order or request: verb stem + -(으)라고 하다 ('told me to ...').", "formation": "Consonant stem + 으라고 (먹으라고), vowel stem + 라고 (가라고), ㄹ-stems attach directly (살라고). Negative command: -지 말라고 (가지 말라고 = told me not to go). GIVE is special: 주라고 하다 = told someone to give TO A THIRD PARTY; 달라고 하다 = asked that something be given TO THE SPEAKER of the original request.", "explanation": "선생님이 숙제를 하라고 했어요 = 'The teacher told us to do the homework.' The imperative inside the quote always uses -(으)라, regardless of how polite the original command was (하세요 → 하라고). The 주다/달다 split is the famous trap: 동생이 물을 달라고 했어요 = my little sibling asked (me) to give HIM water; 엄마가 동생한테 물을 주라고 했어요 = mom told me to give water TO my sibling. Use 달라고 whenever the asker is also the receiver.", "notes": ["Echo check: -라고요? = 'you're telling me to ...?'", "Suggestions ('let's') are reported with -자고 하다 (가자고 했어요) — a sibling pattern worth recognizing.", "Questions are reported with -냐고 하다 — same note: recognize, don't drill it here."]}, "pitfalls": ["달라고 vs 주라고: if the original asker receives the thing, it MUST be 달라고 (물 좀 달라고 했어요); 주라고 means give it to someone else. Swapping them changes who gets the water.", "Don't keep polite endings inside the quote: 하세요라고 / 하십시오라고 are wrong — always reduce the command to -(으)라 (하라고).", "Negative: -지 말라고, never 안 -(으)라고 (가지 말라고 했어요, not 안 가라고 했어요 — the latter sounds like 'told me he isn't going')."], "bridge": ["저도 물 주세요.", "내일 세 시에 오세요.", "한국어로 말해 주세요."], "vocab": [{"ko": "당부", "en": "an earnest request, a reminder to do something", "romaji": "dang-bu", "pos": "noun", "note": "當付; 당부하다 = to urge kindly"}, {"ko": "분부", "en": "an order from a superior", "romaji": "bun-bu", "pos": "noun", "note": "分付; formal, respectful register"}, {"ko": "재촉", "en": "urging someone to hurry", "romaji": "jae-chok", "pos": "noun", "note": "재촉하다 = to press someone to hurry"}, {"ko": "채근", "en": "pressing/nagging someone to act", "romaji": "chae-geun", "pos": "noun", "note": "채근하다 = to keep pushing sb"}, {"ko": "엄포", "en": "an empty threat, bluster", "romaji": "eom-po", "pos": "noun", "note": "엄포를 놓다 = to make an idle threat"}, {"ko": "독촉", "en": "a demand for payment or action", "romaji": "dok-chok", "pos": "noun", "note": "督促; 독촉 전화 = a chasing phone call"}, {"ko": "성화", "en": "persistent pestering", "romaji": "seong-hwa", "pos": "noun", "note": "성화를 부리다 = to badger sb"}, {"ko": "신신당부", "en": "repeated earnest requests", "romaji": "sin-sin-dang-bu", "pos": "noun", "note": "申申當付; asking over and over"}], "sentences": [{"ko": "선생님이 숙제를 하라고 했어요.", "en": "The teacher told us to do the homework.", "romaji": "seon-saeng-ni-mi suk-je-reul ha-ra-go hae-sseo-yo", "blankWord": "하라고"}, {"ko": "동생이 물을 달라고 했어요.", "en": "My younger sibling asked me to give him water.", "romaji": "dong-saeng-i mu-reul dal-la-go hae-sseo-yo", "blankWord": "달라고"}, {"ko": "엄마가 동생한테 우유를 주라고 했어요.", "en": "Mom told me to give milk to my sibling.", "romaji": "eom-ma-ga dong-saeng-han-te u-yu-reul ju-ra-go hae-sseo-yo", "blankWord": "주라고"}, {"ko": "여기에서는 담배를 피우지 말라고 했어요.", "en": "They said not to smoke here.", "romaji": "yeo-gi-e-seo-neun dam-bae-reul pi-u-ji mal-la-go hae-sseo-yo", "blankWord": "피우지 말라고"}, {"ko": "친구가 조금만 더 기다리라고 했어요.", "en": "My friend told me to wait a little longer.", "romaji": "chin-gu-ga jo-geum-man deo gi-da-ri-ra-go hae-sseo-yo", "blankWord": "기다리라고"}, {"ko": "부모님이 밥을 꼭 먹으라고 신신당부하셨어요.", "en": "My parents earnestly told me to be sure to eat.", "romaji": "bu-mo-ni-mi ba-beul kkok meo-geu-ra-go sin-sin-dang-bu-ha-syeo-sseo-yo", "blankWord": "먹으라고"}, {"ko": "사장님이 빨리 끝내라고 재촉했어요.", "en": "The boss urged me to finish it quickly.", "romaji": "sa-jang-ni-mi ppal-li kkeun-nae-ra-go jae-cho-kae-sseo-yo", "blankWord": "끝내라고"}, {"ko": "은행에서 돈을 내라고 독촉 전화가 왔어요.", "en": "The bank called demanding that I pay the money.", "romaji": "eun-haeng-e-seo do-neul nae-ra-go dok-chok jeon-hwa-ga wa-sseo-yo", "blankWord": "내라고"}]},
  {"id": "5.20", "level": 5, "title": "Sentence Building Drill 4", "point": "복습 / 문장 만들기", "grammar": {"summary": "No new grammar — this lesson stacks the Level 5 patterns you have met so far into longer, natural sentences.", "formation": "Combine two or more of: -(으)ㄹ 뻔했다 (5.01), -나 보다 / -(으)ㄴ가 보다 (5.04–5.05), -자마자 (5.07), -(으)려고 하다 (5.08), -다가 (5.09), -(이)라고 (5.10), -(이)라는 (5.12), -(으)니까 (5.14), -(이)라도 (5.15), narrative -(ㄴ/는)다 (5.16), -다고 하다 (5.17), -(으)ㄴ/는지 (5.18), -(으)라고 하다 (5.19) — plus everything from Levels 1–4.", "explanation": "Fluency is mostly recombination: one clause sets a reason or a time, the next carries the main claim. Read each sentence below aloud, notice which two patterns are doing the work, then try swapping one of them for another you know. The blank in each practice item marks the newest pattern in that sentence.", "notes": ["A reliable frame: [reason with -(으)니까] + [reported speech or request].", "Another: [time clause with -자마자/-다가] + [inference with -나 보다].", "If a sentence feels heavy, split it in two — natural Korean prefers shorter clauses than English."]}, "pitfalls": ["Don't chain more than two or three patterns in one sentence; Korean sounds unnatural when overloaded, even if each piece is correct.", "Keep tense where it belongs: inside a quote for reported speech (갔다고 했어요), on the final verb for everything else."], "bridge": ["공부하고 있어요.", "벌써 비가 오고 있어요."], "vocab": [], "sentences": [{"ko": "비가 오니까 친구가 오늘은 못 온다고 했어요.", "en": "Since it's raining, my friend said he can't come today.", "romaji": "bi-ga o-ni-kka chin-gu-ga o-neu-reun mot on-da-go hae-sseo-yo", "blankWord": "못 온다고"}, {"ko": "집에 도착하자마자 어머니가 밥을 먹으라고 하셨어요.", "en": "As soon as I got home, my mother told me to eat.", "romaji": "ji-be do-cha-ka-ja-ma-ja eo-meo-ni-ga ba-beul meo-geu-ra-go ha-syeo-sseo-yo", "blankWord": "먹으라고"}, {"ko": "그 사람이 어디에 사는지 모르니까 물어볼 수 없어요.", "en": "Since I don't know where he lives, I can't ask.", "romaji": "geu sa-ra-mi eo-di-e sa-neun-ji mo-reu-ni-kka mu-reo-bol su eop-seo-yo", "blankWord": "사는지"}, {"ko": "길에서 넘어질 뻔했는데 친구가 잡아 줬다고 말했어요.", "en": "I said I almost fell on the street but my friend caught me.", "romaji": "gi-re-seo neo-meo-jil ppeon-haen-neun-de chin-gu-ga ja-ba jwot-da-go mal-hae-sseo-yo", "blankWord": "잡아 줬다고"}, {"ko": "불이 꺼져 있는 걸 보니까 벌써 자나 봐요.", "en": "Seeing that the light is off, I guess they're already asleep.", "romaji": "bu-ri kkeo-jyeo in-neun geol bo-ni-kka beol-sseo ja-na bwa-yo", "blankWord": "자나 봐요"}, {"ko": "공부하다가 너무 졸려서 커피라도 마시려고 해요.", "en": "I was studying and got so sleepy that I'm going to have at least a coffee.", "romaji": "gong-bu-ha-da-ga neo-mu jol-lyeo-seo keo-pi-ra-do ma-si-ryeo-go hae-yo", "blankWord": "마시려고"}]},
  {"id": "5.21", "level": 5, "title": "Word Contractions - object marker", "point": "축약형 (part 3) 목적격 조사", "grammar": {"summary": "In casual speech the object marker 를 shrinks onto the word before it as a final ㄹ.", "formation": "Vowel-final word + 를 → ㄹ attached: 나를 → 날, 너를 → 널, 뭐를 → 뭘, 이거를 → 이걸, 그거를 → 그걸, 저거를 → 저걸, 어디를 → 어딜. Consonant-final words take 을 and CANNOT contract: 책을 stays 책을.", "explanation": "This is the same squeezing you met with 것 → 거 in Level 4, applied to the object marker. It only happens after a vowel, because the ㄹ needs an empty final slot to land in: 나 + 를 → 날. Contractions are spoken and casual-written register — texts, chats, dialogue in novels. In formal writing, essays, or business email, keep the full 를/을.", "notes": ["The same shrink hits 는 → ㄴ (나는 → 난, 이거는 → 이건) — you saw it in Level 4 Lesson 17.", "뭘 is extremely common: 뭘 먹을까요? = What shall we eat?", "Sung lyrics and poetry use these contractions freely to fit the meter."]}, "pitfalls": ["Consonant-final words can't contract: 책을 → 책ㄹ is impossible, and 밥을 stays 밥을. Only vowel-final words have the empty slot the ㄹ needs.", "Don't use contractions in formal writing: a report or business email keeps 저는, 이것을 — 난, 이걸 there reads as sloppy."], "bridge": ["아침에만 커피를 마셔요.", "저는 대학교에서 중국어를 가르쳐요."], "vocab": [{"ko": "구어", "en": "spoken language", "romaji": "gu-eo", "pos": "noun", "note": "口語; the opposite of 문어 (written language)"}, {"ko": "입말", "en": "everyday spoken words", "romaji": "im-mal", "pos": "noun", "note": "native-Korean word for 구어"}, {"ko": "말줄임", "en": "shortening of speech, abbreviation", "romaji": "mal-ju-rim", "pos": "noun", "note": "말줄임표 = ellipsis (…)"}, {"ko": "군말", "en": "unnecessary words, padding", "romaji": "gun-mal", "pos": "noun", "note": "군말 없이 = without complaint"}, {"ko": "비속어", "en": "slang, vulgar speech", "romaji": "bi-so-geo", "pos": "noun", "note": "卑俗語; avoid in polite settings"}], "sentences": [{"ko": "이걸 어디에서 샀어요?", "en": "Where did you buy this?", "romaji": "i-geol eo-di-e-seo sa-sseo-yo", "blankWord": "이걸"}, {"ko": "뭘 먹고 싶어요?", "en": "What do you want to eat?", "romaji": "mwol meok-go si-peo-yo", "blankWord": "뭘"}, {"ko": "친구가 날 기다리고 있어요.", "en": "My friend is waiting for me.", "romaji": "chin-gu-ga nal gi-da-ri-go i-sseo-yo", "blankWord": "날"}, {"ko": "그걸 아직 안 읽었어요.", "en": "I haven't read that yet.", "romaji": "geu-geol a-jik an il-geo-sseo-yo", "blankWord": "그걸"}, {"ko": "구어에서는 군말이 많아요.", "en": "In spoken language there are a lot of filler words.", "romaji": "gu-eo-e-seo-neun gun-ma-ri ma-na-yo", "blankWord": "구어에서는"}, {"ko": "널 기다린다고 말했어요.", "en": "He said he's waiting for you.", "romaji": "neol gi-da-rin-da-go mal-hae-sseo-yo", "blankWord": "널"}, {"ko": "어딜 그렇게 급하게 가요?", "en": "Where are you going in such a hurry?", "romaji": "eo-dil geu-reo-ke geu-pa-ge ga-yo", "blankWord": "어딜"}, {"ko": "글에서는 말줄임을 쓰지 않는 게 좋아요.", "en": "In writing it's better not to use contractions.", "romaji": "geu-re-seo-neun mal-ju-ri-meul sseu-ji an-neun ge jo-a-yo", "blankWord": "말줄임을"}]},
  {"id": "5.22", "level": 5, "title": "Word Builder 8", "point": "食 (식)", "grammar": {"summary": "The hanja 食 (식) means 'eat / food' and builds a large family of everyday words.", "formation": "食 usually sits at the front (식품, 식성) or the back (외식, 과식) of a two-character compound. Many of the back-position words take 하다 to become verbs: 외식하다, 과식하다, 시식하다.", "explanation": "You already know several 食 words without knowing the root: 식당 (eating + hall = restaurant), 음식 (drink + eat = food), 식사 (eating + affair = a meal), 외식 (outside + eat = eating out), 과식 (excess + eat = overeating), 식중독 (eat + poisoning = food poisoning). Once you see 식 as 'eat', a new compound is often guessable. Note the crossover with Lesson 13's 會: 회식 (會食) is literally 'gathering + eat' — the work dinner. Careful: not every 식 is 食 — 방식 (方式, method) and 형식 (形式, form) use 式 'style/form', a different character with the same sound.", "notes": ["Already-known 食 words: 식당, 음식, 식사, 외식, 과식, 식중독, 식후, 간식.", "회식 (會食) ties this builder back to Lesson 13's 會 — a gathering built around eating.", "Same sound, different hanja: 방식/형식/공식 use 式 (style, form), not 食."]}, "pitfalls": ["Don't assume every 식 means 'eat': 방식 (method) and 형식 (form) are 式, a completely different character.", "식성 (what foods you like) and 식탐 (greed for food) are easy to swap — 식성이 좋다 means you eat anything, while 식탐이 많다 means you're greedy about food."], "bridge": [], "vocab": [{"ko": "식성", "en": "one's taste in food, dietary preferences", "romaji": "sik-seong", "pos": "noun", "note": "食性; 식성이 좋다 = to be an easy eater"}, {"ko": "식탐", "en": "greed for food", "romaji": "sik-tam", "pos": "noun", "note": "食貪; 식탐이 많다 = to be greedy about food"}, {"ko": "급식", "en": "meals provided (at school, work)", "romaji": "geup-sik", "pos": "noun", "note": "給食; 학교 급식 = school lunch"}, {"ko": "채식", "en": "a vegetarian diet", "romaji": "chae-sik", "pos": "noun", "note": "菜食; 채식하다 = to eat vegetarian"}, {"ko": "결식", "en": "skipping meals", "romaji": "gyeol-sik", "pos": "noun", "note": "缺食; 결식 아동 = children who miss meals"}, {"ko": "미식", "en": "gourmet eating, fine dining", "romaji": "mi-sik", "pos": "noun", "note": "美食; 미식가 = a gourmet"}, {"ko": "공복", "en": "an empty stomach", "romaji": "gong-bok", "pos": "noun", "note": "空腹; 공복에 = on an empty stomach"}, {"ko": "끼니", "en": "a meal (as one of the day's meals)", "romaji": "kki-ni", "pos": "noun", "note": "끼니를 거르다 = to skip a meal"}], "sentences": [{"ko": "제 동생은 식성이 아주 좋아요.", "en": "My younger sibling eats anything.", "romaji": "je dong-saeng-eun sik-seong-i a-ju jo-a-yo", "blankWord": "식성"}, {"ko": "요즘 채식을 하려고 해요.", "en": "I'm planning to eat vegetarian these days.", "romaji": "yo-jeum chae-si-geul ha-ryeo-go hae-yo", "blankWord": "채식"}, {"ko": "학교 급식이 생각보다 맛있어요.", "en": "The school lunch is tastier than I expected.", "romaji": "hak-gyo geup-si-gi saeng-gak-bo-da ma-si-sseo-yo", "blankWord": "급식"}, {"ko": "공복에 커피를 마시면 안 좋아요.", "en": "It's not good to drink coffee on an empty stomach.", "romaji": "gong-bo-ge keo-pi-reul ma-si-myeon an jo-a-yo", "blankWord": "공복"}, {"ko": "바빠서 끼니를 자주 거르니까 건강이 나빠졌어요.", "en": "Since I often skip meals because I'm busy, my health got worse.", "romaji": "ba-ppa-seo kki-ni-reul ja-ju geo-reu-ni-kka geon-gang-i na-ppa-jyeo-sseo-yo", "blankWord": "끼니"}, {"ko": "그 친구는 식탐이 많다고 해요.", "en": "They say that friend is greedy about food.", "romaji": "geu chin-gu-neun sik-ta-mi man-ta-go hae-yo", "blankWord": "식탐"}, {"ko": "부산은 미식으로 유명한 도시예요.", "en": "Busan is a city famous for fine food.", "romaji": "bu-sa-neun mi-si-geu-ro yu-myeong-han do-si-ye-yo", "blankWord": "미식"}]},
  {"id": "5.23", "level": 5, "title": "It seems like / I assume", "point": "-(으)려나 보다", "grammar": {"summary": "'I guess it's about to / going to ...' — inference about something that hasn't happened yet.", "formation": "Verb stem + (consonant) 으려나 보다 / (vowel, ㄹ) 려나 보다: 비가 오려나 봐요, 곧 시작하려나 봐요, 팔려나 봐요. Built from -(으)려(고 하)다 ('about to', Lesson 8) + -나 보다 (Lesson 4), so it applies to VERBS.", "explanation": "When the evidence points at the FUTURE — dark clouds, people gathering, someone putting on their coat — use -(으)려나 봐요: 하늘이 어두워요. 비가 오려나 봐요. It stacks two things you already have: the imminent-intention 려 of -(으)려고 하다 and the evidence-based guess of -나 보다. A near-synonym you'll hear is -(으)ㄹ 건가 봐요; recognize it, but produce -(으)려나 봐요 here.", "notes": ["Often paired with an evidence sentence first — mirror that structure when you practice.", "The subject is usually a third person or the weather/world; guessing your own imminent action is odd.", "ㄹ-stems attach directly: 곧 팔려나 봐요 (looks like it'll sell soon)."]}, "pitfalls": ["Verbs only: adjectives can't intend or be imminent, so 예쁘려나 봐요 is wrong — for future states use 예뻐지려나 봐요 (via -아/어지다) or 예쁠 것 같아요.", "Don't double the hedge: 오려나 봐 것 같아요 mixes two guesses — pick one."], "bridge": ["눈이 올 것 같아요", "이 영화 재미있을 것 같아요.", "그런 것 같아요."], "vocab": [{"ko": "조짐", "en": "a sign, an omen (of something coming)", "romaji": "jo-jim", "pos": "noun", "note": "兆朕; 좋은 조짐 = a good sign"}, {"ko": "기색", "en": "a look, a hint of feeling on someone's face", "romaji": "gi-saek", "pos": "noun", "note": "氣色; 피곤한 기색 = a tired look"}, {"ko": "징조", "en": "an omen, a portent", "romaji": "jing-jo", "pos": "noun", "note": "徵兆; slightly more literary than 조짐"}, {"ko": "전조", "en": "a precursor, a forewarning", "romaji": "jeon-jo", "pos": "noun", "note": "前兆; 지진의 전조 = a precursor of an earthquake"}, {"ko": "먹구름", "en": "dark rain clouds", "romaji": "meok-gu-reum", "pos": "noun", "note": "먹구름이 끼다 = for dark clouds to gather"}, {"ko": "인기척", "en": "the sound or sign of someone being there", "romaji": "in-gi-cheok", "pos": "noun", "note": "인기척이 나다 = to hear someone stirring"}, {"ko": "임박", "en": "being imminent, close at hand", "romaji": "im-bak", "pos": "noun", "note": "臨迫; 마감이 임박했어요 = the deadline is imminent"}, {"ko": "기별", "en": "word, news (that something will happen)", "romaji": "gi-byeol", "pos": "noun", "note": "奇別; 기별이 오다 = for word to arrive"}], "sentences": [{"ko": "하늘에 먹구름이 꼈어요. 비가 오려나 봐요.", "en": "Dark clouds have gathered. I guess it's going to rain.", "romaji": "ha-neu-re meok-gu-reu-mi kkyeo-sseo-yo. bi-ga o-ryeo-na bwa-yo", "blankWord": "오려나 봐요"}, {"ko": "사람들이 모여요. 곧 시작하려나 봐요.", "en": "People are gathering. I guess it's about to start.", "romaji": "sa-ram-deu-ri mo-yeo-yo. got si-ja-ka-ryeo-na bwa-yo", "blankWord": "시작하려나 봐요"}, {"ko": "코트를 입네요. 나가려나 봐요.", "en": "He's putting on a coat. I guess he's about to go out.", "romaji": "ko-teu-reul im-ne-yo. na-ga-ryeo-na bwa-yo", "blankWord": "나가려나 봐요"}, {"ko": "인기척이 나요. 누가 오려나 봐요.", "en": "I hear someone stirring. I guess somebody's coming.", "romaji": "in-gi-cheo-gi na-yo. nu-ga o-ryeo-na bwa-yo", "blankWord": "오려나 봐요"}, {"ko": "표가 벌써 많이 팔렸어요. 금방 매진되려나 봐요.", "en": "A lot of tickets have already sold. I guess it'll sell out soon.", "romaji": "pyo-ga beol-sseo ma-ni pal-lyeo-sseo-yo. geum-bang mae-jin-doe-ryeo-na bwa-yo", "blankWord": "매진되려나 봐요"}, {"ko": "좋은 조짐이 보이니까 잘 되려나 봐요.", "en": "Since I see good signs, I guess it'll go well.", "romaji": "jo-eun jo-ji-mi bo-i-ni-kka jal doe-ryeo-na bwa-yo", "blankWord": "되려나 봐요"}, {"ko": "피곤한 기색이에요. 일찍 자려나 봐요.", "en": "She looks tired. I guess she's going to sleep early.", "romaji": "pi-gon-han gi-sae-gi-e-yo. il-jjik ja-ryeo-na bwa-yo", "blankWord": "자려나 봐요"}, {"ko": "마감이 임박했으니까 다들 서두르려나 봐요.", "en": "Since the deadline is imminent, I guess everyone's about to hurry.", "romaji": "ma-ga-mi im-ba-kae-sseu-ni-kka da-deul seo-du-reu-ryeo-na bwa-yo", "blankWord": "서두르려나 봐요"}]}
];

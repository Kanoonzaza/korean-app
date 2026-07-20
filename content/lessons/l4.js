/* content/lessons/l4.js — TTMIK-aligned Level 4 lesson bodies, 4.01–4.15.
 *
 * HAND-WRITTEN (not generated). Original compositions only; no TTMIK example
 * sentences are copied. Titles/points come from content/curriculum.js; bridge
 * sentences are exact `ko` copies from content/ttmik-sentences.js (the app looks
 * up their `en` at render time). Authoring rules: docs/superpowers/plans/
 * 2026-07-18-korean-app-v2.md, Task 6.
 *
 * Which entries appear: within 4.01–4.15, status:"new" → full body,
 * status:"compressed" (4.04, 4.10) → short body + "compressed": true,
 * status:"known" (4.02, 4.07, 4.08, 4.14) → NO body (rendered dimmed from
 * curriculum.js). Word Builder lessons: 4.06 (動), 4.13 (不).
 *
 * Grammar verified per lesson (id → source consulted 2026-07-20):
 *   4.01 https://www.howtostudykorean.com/unit-6/lessons-126-133/lesson-132/  (-(으)ㄹ수록)
 *   4.03 https://www.howtostudykorean.com/unit-6/lessons-126-133/lesson-133/  (-(으)ㄹ 리가 없다)
 *   4.04 https://courses.talktomeinkorean.com/core-grammar-level-4-non  (TTMIK L4 L4, -지요/-죠)
 *   4.05 https://talktomeinkorean.com/lessons/level-4-lesson-5  (당신 usage)
 *   4.06 https://retrolearnskorean.blogspot.com/2019/01/talk-to-me-in-korean-ttmik-hanja-lesson.html  (Word Builder 動)
 *   4.09 https://www.koreantopik.com/2018/02/l1g33-av-grammar-may-not-not.html  (-(으)면 안 되다)
 *   4.10 https://courses.talktomeinkorean.com/core-grammar-level-4-non  +  hanabira.org ~사이에서  (사이에 / 중에서)
 *   4.11 https://www.howtostudykorean.com/unit1/unit-1-lessons-17-25-2/lesson-25/  (아무나/아무도)
 *   4.12 https://www.topikguide.com/verb-%EC%95%84-%EC%96%B4-%EB%B3%B4%EB%8B%A4-to-try-doing-something-korean-verb-ending/  (-아/어 보다)
 *   4.13 https://en.wiktionary.org/wiki/%EB%B6%88  +  koreantopik.com (Word Builder 不, 불/부 reading)
 *   4.15 https://www.koreantopik.com/2017/05/l2g45-grammar-anyone-nobodyanywhere.html  (아무 + noun + (이)나/도)
 *   4.16 https://www.90daykorean.com/korean-spacing/  (띄어쓰기 — particles attach, 안/못 spaced)
 *   4.17 https://practice-korean.com/grammar/contractions/  (축약형 — 것→거/게/건/걸, 나는→난, 무엇→뭐)
 *   4.18 https://www.howtostudykorean.com/unit1/unit-1-lessons-17-25-2/lesson-19/  (가장/제일 superlative)
 *   4.19 https://courses.talktomeinkorean.com/core-grammar-level-4-non  (TTMIK L4 L19, 덜 = less / not fully)
 *   4.20 (Sentence Building Drill #1 — no new grammar; combines already-taught 4.01–4.19 points)
 *   4.21 https://www.koreanvalley.com/korean-grammar-blog/korean-spacing-rules-made-easy-particles-dependent-nouns-and-word-spacing  (띄어쓰기 — dependent nouns)
 *   4.22 https://en.wiktionary.org/wiki/%E5%A0%B4  (Word Builder 場, place/venue)
 *   4.23 https://practice-korean.com/grammar/contractions/  +  되어→돼 / 하여→해 rule (축약형 part 2)
 *   4.24 https://courses.talktomeinkorean.com/core-grammar-level-4-non  (TTMIK L4 L24, 훨씬 = much/by far)
 *   4.28 https://www.howtostudykorean.com/unit1/unit-1-lessons-17-25-2/lesson-18/  (-아/어지다, become + adjective)
 *   4.29 https://ltl-korea.com/grammar-bank/change-in-korean/  (-게 되다 = come to / end up doing)
 *   4.30 (Sentence Building Drill #2 — no new grammar; combines already-taught 4.01–4.29 points)
 */
export const L4 = [
  {
    "id": "4.01", "level": 4, "title": "The more..., the more...", "point": "-(으)면 -(으)ㄹ수록",
    "grammar": {
      "summary": "How to say 'the more X, the more Y' — as one thing increases, another follows.",
      "formation": "V/A-stem + -(으)ㄹ수록, optionally preceded by the same stem + -(으)면.\n• vowel or ㄹ stem → -ㄹ수록  (크다 → 클수록, 살다 → 살수록)\n• consonant stem → -을수록  (많다 → 많을수록)\n• 하다 verbs → 할수록\nThe optional front half repeats the same stem with -(으)면: 크면 클수록, 많으면 많을수록.",
      "explanation": "-(으)ㄹ수록 on its own already means 'the more ...'. Korean often doubles it by putting the same verb with -(으)면 in front for emphasis: 하면 할수록 = 'the more you do it'. Both halves must use the same verb. You can drop the -(으)면 half with no change in meaning, just a little less emphasis. It attaches to verbs and adjectives the same way, following the (으) rule you know from -(으)면 and -(으)ㄹ 거예요.",
      "notes": ["The -(으)면 front half is optional; -(으)ㄹ수록 by itself is enough.", "A very common fixed phrase: 많으면 많을수록 좋아요 = 'the more, the better'.", "ㄹ-stems attach directly: 살다 → 살수록, 만들다 → 만들수록."]
    },
    "pitfalls": ["Both halves must use the SAME verb — 공부하면 볼수록 is wrong.", "Don't split it as 수 + 록; -(으)ㄹ수록 is one ending, unrelated to -(으)ㄹ 수 있다.", "Use -을수록 after a consonant stem (많을수록), -ㄹ수록 after a vowel stem (클수록).", "No past tense inside -(으)ㄹ수록: 먹었을수록 is wrong — say 먹을수록; tense goes in the main clause."],
    "bridge": ["TTMIK으로 공부하면, 재미있어요.", "리모콘을 찾으면, TV를 볼 수 있어요."],
    "vocab": [
      {"ko": "성장하다", "en": "to grow, to develop", "romaji": "seong-jang-ha-da", "pos": "verb", "note": "of a person, plant, or company"},
      {"ko": "발전하다", "en": "to develop, to make progress", "romaji": "bal-jeon-ha-da", "pos": "verb", "note": "improve to a higher stage"},
      {"ko": "성공하다", "en": "to succeed", "romaji": "seong-gong-ha-da", "pos": "verb", "note": "opposite of 실패하다"},
      {"ko": "실패하다", "en": "to fail", "romaji": "sil-pae-ha-da", "pos": "verb", "note": ""},
      {"ko": "도전하다", "en": "to take on a challenge", "romaji": "do-jeon-ha-da", "pos": "verb", "note": "도전하다 + 에/-에게 for the target"},
      {"ko": "포기하다", "en": "to give up", "romaji": "po-gi-ha-da", "pos": "verb", "note": ""},
      {"ko": "단순하다", "en": "to be simple, plain", "romaji": "dan-sun-ha-da", "pos": "adj", "note": "of a thing or idea, not a person's looks"},
      {"ko": "성실하다", "en": "to be sincere, diligent", "romaji": "seong-sil-ha-da", "pos": "adj", "note": "hard-working and honest"}
    ],
    "sentences": [
      {"ko": "한국어는 공부하면 공부할수록 재미있어요.", "en": "The more I study Korean, the more fun it is.", "romaji": "han-gu-geo-neun gong-bu-ha-myeon gong-bu-hal-su-rok jae-mi-i-sseo-yo", "blankWord": "공부할수록"},
      {"ko": "도전하면 도전할수록 실력이 늘어요.", "en": "The more you take on challenges, the more your skills grow.", "romaji": "do-jeon-ha-myeon do-jeon-hal-su-rok sil-lyeo-gi neu-reo-yo", "blankWord": "도전할수록"},
      {"ko": "성실하면 성실할수록 성공해요.", "en": "The more diligent you are, the more you succeed.", "romaji": "seong-sil-ha-myeon seong-sil-hal-su-rok seong-gong-hae-yo", "blankWord": "성실할수록"},
      {"ko": "노력하면 노력할수록 더 발전해요.", "en": "The more effort you make, the more you develop.", "romaji": "no-ryeo-ka-myeon no-ryeo-kal-su-rok deo bal-jeon-hae-yo", "blankWord": "노력할수록"},
      {"ko": "사람이 많으면 많을수록 좋아요.", "en": "The more people there are, the better.", "romaji": "sa-ra-mi ma-neu-myeon ma-neul-su-rok jo-a-yo", "blankWord": "많을수록"},
      {"ko": "문제가 단순할수록 좋아요.", "en": "The simpler the problem, the better.", "romaji": "mun-je-ga dan-sun-hal-su-rok jo-a-yo", "blankWord": "단순할수록"},
      {"ko": "날씨가 좋으면 좋을수록 기분이 좋아요.", "en": "The nicer the weather, the better my mood.", "romaji": "nal-ssi-ga jo-eu-myeon jo-eul-su-rok gi-bu-ni jo-a-yo", "blankWord": "좋을수록"}
    ]
  },
  {
    "id": "4.03", "level": 4, "title": "It can't be ...", "point": "-(으)ㄹ 리가 없다",
    "grammar": {
      "summary": "How to say 'there's no way ...' / 'it can't be that ...' to express strong disbelief.",
      "formation": "V/A-stem + -(으)ㄹ 리가 없다.\n• vowel or ㄹ stem → -ㄹ 리가 없다  (오다 → 올 리가 없다)\n• consonant stem → -을 리가 없다  (있다 → 있을 리가 없다)\n• past → -았/었을 리가 없다  (갔을 리가 없다)\n리 = 'reason', so literally 'there is no reason that ...'.",
      "explanation": "리 is a noun meaning 'reason' or 'logic', and 리가 없다 means 'there is no such reason' → 'no way that could be true'. You attach it to a verb or adjective stem just like -(으)ㄹ 거예요. It expresses that you find something highly unlikely or impossible to believe. The ready-made phrase 그럴 리가 없어요 ('that can't be') is extremely common. For past events, put the tense on the stem: 갔을 리가 없어요.",
      "notes": ["그럴 리가 없어요 = 'that can't be' is worth memorizing as a set phrase.", "For past events use -았/었을 리가 없다: 벌써 갔을 리가 없어요.", "가 is the subject marker and is sometimes dropped in speech: 그럴 리 없어요."]
    },
    "pitfalls": ["Keep 없다 — swapping in 있다 (리가 있다) turns it into a rhetorical question, not a plain statement.", "리 is a noun, so it is spaced from the verb: 올 리가 없어요, never 올리가 없어요.", "Don't confuse it with -(으)ㄹ 수 없다: 수 없다 = 'can't' (ability), 리가 없다 = 'can't be true' (likelihood).", "Use -을 after a consonant stem (있을 리가 없어요), -ㄹ after a vowel stem (올 리가 없어요)."],
    "bridge": ["그럴 수도 있어요.", "그럴 거예요."],
    "vocab": [
      {"ko": "의심하다", "en": "to doubt, to suspect", "romaji": "ui-sim-ha-da", "pos": "verb", "note": "의심하다 + 을/를 (suspect someone/something)"},
      {"ko": "오해하다", "en": "to misunderstand", "romaji": "o-hae-ha-da", "pos": "verb", "note": "take something the wrong way"},
      {"ko": "착각하다", "en": "to be mistaken, to mix up", "romaji": "chak-gak-ha-da", "pos": "verb", "note": "mistakenly think A is B"},
      {"ko": "부정하다", "en": "to deny", "romaji": "bu-jeong-ha-da", "pos": "verb", "note": "deny that something is true"},
      {"ko": "헛소문", "en": "a groundless rumor", "romaji": "heot-so-mun", "pos": "noun", "note": "헛- prefix = 'false, in vain'"},
      {"ko": "뻔하다", "en": "to be obvious, predictable", "romaji": "ppeon-ha-da", "pos": "adj", "note": "결과가 뻔해요 = the outcome is obvious"},
      {"ko": "설득하다", "en": "to persuade", "romaji": "seol-deuk-ha-da", "pos": "verb", "note": "talk someone into something"}
    ],
    "sentences": [
      {"ko": "경은이가 저를 의심할 리가 없어요.", "en": "There's no way Kyeong-eun suspects me.", "romaji": "gyeong-eu-ni-ga jeo-reul ui-sim-hal li-ga eop-seo-yo", "blankWord": "리가 없어요"},
      {"ko": "선생님이 저를 오해했을 리가 없어요.", "en": "The teacher can't have misunderstood me.", "romaji": "seon-saeng-ni-mi jeo-reul o-hae-hae-sseul li-ga eop-seo-yo", "blankWord": "리가 없어요"},
      {"ko": "제가 그렇게 착각했을 리가 없어요.", "en": "There's no way I got it that wrong.", "romaji": "je-ga geu-reo-ke chak-gak-hae-sseul li-ga eop-seo-yo", "blankWord": "리가 없어요"},
      {"ko": "그 사람이 사실을 부정할 리가 없어요.", "en": "There's no way he denies the truth.", "romaji": "geu sa-ra-mi sa-si-reul bu-jeong-hal li-ga eop-seo-yo", "blankWord": "리가 없어요"},
      {"ko": "저 소식이 사실일 리가 없어요.", "en": "That news can't be true.", "romaji": "jeo so-si-gi sa-si-ril li-ga eop-seo-yo", "blankWord": "리가 없어요"},
      {"ko": "경은이가 벌써 집에 갔을 리가 없어요.", "en": "There's no way Kyeong-eun already went home.", "romaji": "gyeong-eu-ni-ga beol-sseo ji-be ga-sseul li-ga eop-seo-yo", "blankWord": "리가 없어요"},
      {"ko": "그 친구가 약속을 잊어버렸을 리가 없어요.", "en": "There's no way that friend forgot the promise.", "romaji": "geu chin-gu-ga yak-so-geul i-jeo-beo-ryeo-sseul li-ga eop-seo-yo", "blankWord": "리가 없어요"}
    ]
  },
  {
    "id": "4.04", "level": 4, "title": "Confirming sentence ending", "point": "-지요 / -죠", "compressed": true,
    "grammar": {
      "summary": "How to add '..., right?' to confirm something you already assume is true.",
      "formation": "stem + -지요, contracted to -죠 in speech (no 으 needed).\n• 춥다 → 춥지요 / 춥죠   • 맛있다 → 맛있죠   • 이다 → -(이)죠   • past → -았/었죠 (갔죠)",
      "explanation": "Attach -지요 (usually shortened to -죠) to a verb, adjective, or 이다 stem to seek agreement about something you believe the listener also knows. Unlike a plain question, it expects a 'yes' — 'It's cold today, right?' rather than a genuine 'Is it cold?'.",
      "notes": []
    },
    "pitfalls": ["-죠 seeks confirmation of something you already believe; for a real, open question use plain -아/어요? instead."],
    "bridge": ["삼겹살 맛있어요.", "저도 학생이에요."],
    "vocab": [],
    "sentences": [
      {"ko": "오늘 날씨가 춥죠?", "en": "It's cold today, right?", "romaji": "o-neul nal-ssi-ga chup-jyo", "blankWord": "춥죠"},
      {"ko": "이거 진짜 맛있죠?", "en": "This is really tasty, isn't it?", "romaji": "i-geo jin-jja ma-sit-jyo", "blankWord": "맛있죠"},
      {"ko": "경은이도 학생이죠?", "en": "Kyeong-eun is a student too, right?", "romaji": "gyeong-eu-ni-do hak-saeng-i-jyo", "blankWord": "이죠"}
    ]
  },
  {
    "id": "4.05", "level": 4, "title": "\"당신\" and \"you\"", "point": "당신",
    "grammar": {
      "summary": "What 당신 ('you') really means, and why Koreans usually avoid it.",
      "formation": "당신 is a second-person pronoun, but it is limited to a few situations:\n• between a married couple ('honey/dear')\n• in a confrontation or argument (aggressive)\n• in songs, poems, ads, and writing addressed to a general 'you'\n• as a stiff formal 'you' in written questions.\nIn everyday polite speech you drop 'you' entirely, or use a name + 씨 or a title.",
      "explanation": "Although 당신 is the dictionary word for 'you', using it to a stranger or a superior in conversation sounds either overly intimate or hostile. Koreans normally leave the subject out, or use a name + 씨, a title (선생님, 사장님), or a role word. 당신 is comfortable mainly between spouses (like 'honey'), at the fixed distance of song lyrics and formal writing, or — pointedly — when you want to pick a fight. Learners should recognize it but rarely produce it.",
      "notes": ["Between couples, 여보 and 자기 are far more common than 당신.", "To get a stranger's attention, use 저기요, never 당신.", "In writing and ads, 당신 addresses a faceless 'you' (당신의 꿈 = 'your dream')."]
    },
    "pitfalls": ["Don't call a stranger or your boss 당신 — it sounds rude or picks a fight.", "'Your' as 당신의 is mostly written or lyrical; in speech, drop it or use a name + 씨.", "Adding 당신 to every sentence like English 'you' sounds unnatural — omit the subject instead."],
    "bridge": ["이거 누구예요?", "저도 학생이에요."],
    "vocab": [
      {"ko": "호칭", "en": "a term of address (what you call someone)", "romaji": "ho-ching", "pos": "noun", "note": "e.g. 선생님, 언니, 사장님"},
      {"ko": "존칭", "en": "an honorific title", "romaji": "jon-ching", "pos": "noun", "note": "a respectful form of address"},
      {"ko": "애칭", "en": "a pet name, term of endearment", "romaji": "ae-ching", "pos": "noun", "note": "like 자기 between couples"},
      {"ko": "당사자", "en": "the person directly concerned", "romaji": "dang-sa-ja", "pos": "noun", "note": "the party actually involved"},
      {"ko": "화자", "en": "the speaker", "romaji": "hwa-ja", "pos": "noun", "note": "grammar/discussion term"},
      {"ko": "청자", "en": "the listener", "romaji": "cheong-ja", "pos": "noun", "note": "grammar/discussion term"},
      {"ko": "삼인칭", "en": "third person", "romaji": "sam-in-ching", "pos": "noun", "note": "1인칭 / 2인칭 / 3인칭"}
    ],
    "sentences": [
      {"ko": "당신은 보통 부부 사이에서 써요.", "en": "당신 is usually used between a married couple.", "romaji": "dang-si-neun bo-tong bu-bu sa-i-e-seo sseo-yo", "blankWord": "당신"},
      {"ko": "노래에는 당신이 자주 나와요.", "en": "'당신' comes up a lot in songs.", "romaji": "no-rae-e-neun dang-si-ni ja-ju na-wa-yo", "blankWord": "당신"},
      {"ko": "처음 만난 사람한테 당신은 실례예요.", "en": "Using 당신 to someone you just met is rude.", "romaji": "cheo-eum man-nan sa-ram-han-te dang-si-neun sil-lye-ye-yo", "blankWord": "당신"},
      {"ko": "화자와 청자 사이의 호칭은 중요해요.", "en": "The term of address between speaker and listener matters.", "romaji": "hwa-ja-wa cheong-ja sa-i-ui ho-ching-eun jung-yo-hae-yo", "blankWord": "호칭"},
      {"ko": "부부는 서로 애칭으로 불러요.", "en": "A married couple call each other by pet names.", "romaji": "bu-bu-neun seo-ro ae-ching-eu-ro bul-leo-yo", "blankWord": "애칭"},
      {"ko": "당사자가 아니면 잘 몰라요.", "en": "If you're not the person involved, you don't really know.", "romaji": "dang-sa-ja-ga a-ni-myeon jal mol-la-yo", "blankWord": "당사자"}
    ]
  },
  {
    "id": "4.06", "level": 4, "title": "Word Builder 3", "point": "動 (동)",
    "grammar": {
      "summary": "動 (동) means 'move / motion'; spotting it unlocks a family of words about movement and action.",
      "formation": "動 (동) is a Sino-Korean building block. It sits inside a word, usually combining with another hanja root: 動 + 力 → 동력 (driving force), 反 + 動 → 반동 (recoil).",
      "explanation": "動 (동) is a Sino-Korean block meaning 'to move' or 'motion'. It hides inside many words you already know — 운동 (exercise), 자동차 (car = self-moving vehicle), 동물 (animal = moving thing), 활동 (activity), 행동 (behavior), 이동 (moving/transfer), 자동 (automatic), 진동 (vibration), 동작 (motion). Once you spot 동, you can guess that a new word involves movement or being moved. The words below extend that set.",
      "notes": ["Already-known 動 words: 운동, 자동차, 동물, 활동, 행동, 이동, 자동, 진동, 동작, 동기.", "動 (동, 'move') is a different hanja from 同 (동, 'same', as in 동시 = same time) — same sound, different character.", "감동 (感動, being moved emotionally) uses 動 in its 'stirred' sense."]
    },
    "pitfalls": ["Don't confuse 動 (동, move) with 同 (동, same); they sound identical but build different words.", "동력 is 'driving force / power source', not electricity itself (that's 전기)."],
    "bridge": [],
    "vocab": [
      {"ko": "동력", "en": "driving force, motive power", "romaji": "dong-nyeok", "pos": "noun", "note": "動力; a source of power or momentum"},
      {"ko": "능동적", "en": "active, proactive", "romaji": "neung-dong-jeok", "pos": "adj", "note": "能動的; opposite of 수동적 (passive)"},
      {"ko": "유동적", "en": "fluid, flexible, changeable", "romaji": "yu-dong-jeok", "pos": "adj", "note": "流動的; not fixed yet"},
      {"ko": "동요", "en": "agitation, being unsettled", "romaji": "dong-yo", "pos": "noun", "note": "動搖; wavering of the mind (also a homonym meaning 'children's song')"},
      {"ko": "동원하다", "en": "to mobilize, to muster", "romaji": "dong-won-ha-da", "pos": "verb", "note": "動員; call up people or resources"},
      {"ko": "반동", "en": "recoil, backlash, reaction", "romaji": "ban-dong", "pos": "noun", "note": "反動; a force pushing back"},
      {"ko": "감동하다", "en": "to be deeply moved, touched", "romaji": "gam-dong-ha-da", "pos": "verb", "note": "感動; moved by something emotional"},
      {"ko": "동사", "en": "a verb (grammar)", "romaji": "dong-sa", "pos": "noun", "note": "動詞; an 'action word'"}
    ],
    "sentences": [
      {"ko": "그 영화에 정말 감동했어요.", "en": "I was really moved by that movie.", "romaji": "geu yeong-hwa-e jeong-mal gam-dong-hae-sseo-yo", "blankWord": "감동했어요"},
      {"ko": "이 계획은 아직 유동적이에요.", "en": "This plan is still flexible.", "romaji": "i gye-hoe-geun a-jik yu-dong-jeo-gi-e-yo", "blankWord": "유동적"},
      {"ko": "그 사람은 아주 능동적이에요.", "en": "He is very proactive.", "romaji": "geu sa-ra-meun a-ju neung-dong-jeo-gi-e-yo", "blankWord": "능동적"},
      {"ko": "회사가 모든 힘을 동원했어요.", "en": "The company mobilized all its strength.", "romaji": "hoe-sa-ga mo-deun hi-meul dong-won-hae-sseo-yo", "blankWord": "동원했어요"},
      {"ko": "좋은 음악은 큰 동력이 돼요.", "en": "Good music becomes a big driving force.", "romaji": "jo-eun eu-ma-geun keun dong-nyeo-gi dwae-yo", "blankWord": "동력"},
      {"ko": "'먹다'는 동사예요.", "en": "'먹다' is a verb.", "romaji": "meok-da-neun dong-sa-ye-yo", "blankWord": "동사"}
    ]
  },
  {
    "id": "4.09", "level": 4, "title": "You shouldn't... / not supposed to...", "point": "-(으)면 안 되다",
    "grammar": {
      "summary": "How to say 'you shouldn't / you're not allowed to' — a prohibition.",
      "formation": "V-stem + -(으)면 안 되다.\n• vowel or ㄹ stem → -면 안 되다  (가다 → 가면 안 돼요)\n• consonant stem → -으면 안 되다  (먹다 → 먹으면 안 돼요)\n• 하다 → 하면 안 돼요\nLiterally 'if you do X, it becomes not-okay'.",
      "explanation": "This is the mirror image of the permission pattern -아/어도 되다. -(으)면 is the 'if' ending you know, and 안 되다 means 'it won't do / it's not okay'. Together: 'if you do X, that's not allowed' → 'you must not X'. The 안 sits right before 되다, and 되다 usually appears as 돼요 (spoken) or, more formally, 안 됩니다. To ask 'Is it not allowed to ...?', just raise your intonation: -(으)면 안 돼요?",
      "notes": ["Spelling: 되 + 어요 → 돼요, never 되요.", "안 goes before 되다 (…으면 안 돼요), not before the main verb.", "The opposite ('it's okay to / you don't have to') uses -아/어도 되다.", "Double negative 안 -(으)면 안 되다 = 'must do': 안 가면 안 돼요 = 'you have to go' — extremely common in speech."]
    },
    "pitfalls": ["Don't drop 안 — without it, -(으)면 돼요 means 'it's fine to' (the opposite!).", "Use -으면 after a consonant stem (먹으면 안 돼요), -면 after a vowel stem (가면 안 돼요).", "Write 돼요, not 되요, in 안 돼요."],
    "bridge": ["지금 한국어 공부 안 하면 후회할 거예요.", "이거 다 먹으면, 배가 아플 거예요."],
    "vocab": [
      {"ko": "금지하다", "en": "to prohibit, to ban", "romaji": "geum-ji-ha-da", "pos": "verb", "note": "흡연을 금지하다 = to ban smoking"},
      {"ko": "위험하다", "en": "to be dangerous", "romaji": "wi-heom-ha-da", "pos": "adj", "note": ""},
      {"ko": "무례하다", "en": "to be rude, impolite", "romaji": "mu-rye-ha-da", "pos": "adj", "note": "무례하게 = rudely"},
      {"ko": "지각하다", "en": "to be late, to arrive tardy", "romaji": "ji-gak-ha-da", "pos": "verb", "note": "esp. to class or work"},
      {"ko": "새치기", "en": "cutting in line", "romaji": "sae-chi-gi", "pos": "noun", "note": "새치기하다 = to cut in line"},
      {"ko": "낙서", "en": "scribbling, graffiti", "romaji": "nak-seo", "pos": "noun", "note": "낙서하다 = to scribble/doodle"},
      {"ko": "흡연", "en": "smoking", "romaji": "heu-byeon", "pos": "noun", "note": "흡연하다 = to smoke; formal register"},
      {"ko": "반칙", "en": "a foul, breaking the rules", "romaji": "ban-chik", "pos": "noun", "note": "반칙하다 = to commit a foul"}
    ],
    "sentences": [
      {"ko": "수업에 지각하면 안 돼요.", "en": "You mustn't be late to class.", "romaji": "su-eo-be ji-gak-ha-myeon an dwae-yo", "blankWord": "지각하면"},
      {"ko": "여기에서 흡연하면 안 돼요.", "en": "You may not smoke here.", "romaji": "yeo-gi-e-seo heu-byeon-ha-myeon an dwae-yo", "blankWord": "흡연하면"},
      {"ko": "벽에 낙서하면 안 돼요.", "en": "You mustn't scribble on the wall.", "romaji": "byeo-ge nak-seo-ha-myeon an dwae-yo", "blankWord": "낙서하면"},
      {"ko": "줄에서 새치기하면 안 돼요.", "en": "You mustn't cut in line.", "romaji": "ju-re-seo sae-chi-gi-ha-myeon an dwae-yo", "blankWord": "새치기하면"},
      {"ko": "친구한테 무례하게 말하면 안 돼요.", "en": "You mustn't speak rudely to a friend.", "romaji": "chin-gu-han-te mu-rye-ha-ge mal-ha-myeon an dwae-yo", "blankWord": "말하면"},
      {"ko": "여기는 위험해요. 들어가면 안 돼요.", "en": "It's dangerous here. You mustn't go in.", "romaji": "yeo-gi-neun wi-heom-hae-yo. deu-reo-ga-myeon an dwae-yo", "blankWord": "들어가면"},
      {"ko": "경기 중에 반칙하면 안 돼요.", "en": "During the game you mustn't commit a foul.", "romaji": "gyeong-gi jung-e ban-chik-ha-myeon an dwae-yo", "blankWord": "반칙하면"}
    ]
  },
  {
    "id": "4.10", "level": 4, "title": "Among / Between", "point": "사이에, 사이에서, 중에, 중에서", "compressed": true,
    "grammar": {
      "summary": "How to say something is 'between' two things or 'among' several.",
      "formation": "N + 사이에 / 사이에서  (between two)\nN + 중에 / 중에서  (among many, out of a group)\n에 marks a static location; 에서 marks where an action happens, so 사이에서 / 중에서 appear when there is a verb of doing or choosing.",
      "explanation": "Use 사이에 for the space or relationship 'between' two items, and 중에(서) for 'among / out of' a group of three or more (often before picking a best one). 사이에서 shows up for actions or reputation within a group ('popular among friends'), and 중에서 for choosing out of options.",
      "notes": []
    },
    "pitfalls": ["Use 사이 for 'between' two things; for 'among' three or more, use 중에(서) — they aren't interchangeable."],
    "bridge": ["명동에서 만날 거예요.", "은행 앞에서 만날 거예요."],
    "vocab": [],
    "sentences": [
      {"ko": "은행과 병원 사이에 카페가 있어요.", "en": "There's a café between the bank and the hospital.", "romaji": "eun-haeng-gwa byeong-won sa-i-e ka-pe-ga i-sseo-yo", "blankWord": "사이에"},
      {"ko": "그 가수는 친구들 사이에서 인기가 많아요.", "en": "That singer is popular among friends.", "romaji": "geu ga-su-neun chin-gu-deul sa-i-e-seo in-gi-ga ma-na-yo", "blankWord": "사이에서"},
      {"ko": "이 중에서 뭐가 제일 좋아요?", "en": "Out of these, which do you like best?", "romaji": "i jung-e-seo mwo-ga je-il jo-a-yo", "blankWord": "중에서"}
    ]
  },
  {
    "id": "4.11", "level": 4, "title": "Anybody / Anything / Anywhere (part 1)", "point": "아무나, 아무도, 아무거나, 아무것도",
    "grammar": {
      "summary": "How to say 'anyone/anything' (open choice) and 'no one/nothing' (with a negative).",
      "formation": "Open choice (with a positive verb):\n• 아무나 = anyone   • 아무거나 = anything\nTotal negation (always with 안/못/없다):\n• 아무도 = no one   • 아무것도 = nothing\n아무 + -(이)나 → free choice; 아무 + -도 → total negation.",
      "explanation": "아무 means 'any' person or thing in a vague sense. Add -(이)나 (아무나, 아무거나) for 'any at all, doesn't matter which', and use it with a positive verb: 아무나 올 수 있어요 = 'anyone can come'. Add -도 (아무도, 아무것도) for 'not even one', and it MUST pair with a negative verb: 아무도 안 왔어요 = 'no one came'. English 'anyone/anything' can be positive, so be careful — 아무도/아무것도 are negative-only.",
      "notes": ["아무거나 / 아무것도 refer to things; 아무나 / 아무도 refer to people.", "-도 forms need a negative predicate (안/못/없다); -(이)나 forms take a positive one.", "The next lesson extends this to full nouns (아무 데도, 아무 말도)."]
    },
    "pitfalls": ["아무도 can only mean 'no one'; it always needs a negative verb. 'Anyone can' is 아무나.", "Don't use a positive verb with 아무것도 — say 아무것도 없어요, not 아무것도 있어요.", "아무나 vs 아무거나: people vs things — don't swap them."],
    "bridge": ["지금 못 만나요.", "오늘은 바빠서 영화를 못 봐요."],
    "vocab": [
      {"ko": "초대하다", "en": "to invite", "romaji": "cho-dae-ha-da", "pos": "verb", "note": "초대하다 + 을/를 (invite someone)"},
      {"ko": "참석하다", "en": "to attend, be present", "romaji": "cham-seok-ha-da", "pos": "verb", "note": "참석하다 + 에 (attend an event)"},
      {"ko": "참가하다", "en": "to participate, join in", "romaji": "cham-ga-ha-da", "pos": "verb", "note": "참가하다 + 에 (join an activity)"},
      {"ko": "참여하다", "en": "to take part, get involved", "romaji": "cham-yeo-ha-da", "pos": "verb", "note": "broader involvement than 참가하다"},
      {"ko": "접근하다", "en": "to approach, get close to", "romaji": "jeop-geun-ha-da", "pos": "verb", "note": "접근하다 + 에 (approach something)"},
      {"ko": "방문하다", "en": "to visit", "romaji": "bang-mun-ha-da", "pos": "verb", "note": "방문하다 + 을/를 (visit a place)"},
      {"ko": "초청하다", "en": "to invite (formally)", "romaji": "cho-cheong-ha-da", "pos": "verb", "note": "more formal than 초대하다"}
    ],
    "sentences": [
      {"ko": "이 모임에는 아무나 참가할 수 있어요.", "en": "Anyone can join this gathering.", "romaji": "i mo-i-me-neun a-mu-na cham-ga-hal su i-sseo-yo", "blankWord": "아무나"},
      {"ko": "파티에 아무도 안 왔어요.", "en": "No one came to the party.", "romaji": "pa-ti-e a-mu-do an wa-sseo-yo", "blankWord": "아무도"},
      {"ko": "저는 아무것도 안 샀어요.", "en": "I didn't buy anything.", "romaji": "jeo-neun a-mu-geot-do an sa-sseo-yo", "blankWord": "아무것도"},
      {"ko": "점심은 아무거나 괜찮아요.", "en": "Anything is fine for lunch.", "romaji": "jeom-si-meun a-mu-geo-na gwaen-cha-na-yo", "blankWord": "아무거나"},
      {"ko": "여기는 아무나 방문할 수 있어요.", "en": "Anyone can visit here.", "romaji": "yeo-gi-neun a-mu-na bang-mun-hal su i-sseo-yo", "blankWord": "아무나"},
      {"ko": "그 행사에 아무도 참석 안 했어요.", "en": "No one attended that event.", "romaji": "geu haeng-sa-e a-mu-do cham-seok an hae-sseo-yo", "blankWord": "아무도"},
      {"ko": "아무도 저를 초대 안 했어요.", "en": "No one invited me.", "romaji": "a-mu-do jeo-reul cho-dae an hae-sseo-yo", "blankWord": "아무도"}
    ]
  },
  {
    "id": "4.12", "level": 4, "title": "To try doing something", "point": "-아/어 보다",
    "grammar": {
      "summary": "How to say 'to try doing something' — give it a go, or ask someone to try.",
      "formation": "V-stem + -아/어 보다 (보다 conjugates).\n• ㅏ/ㅗ stem → -아 보다  (가다 → 가 보다)\n• other vowel → -어 보다  (먹다 → 먹어 보다)\n• 하다 → 해 보다\n'I've tried it' = -아/어 봤어요; 'give it a try' = -아/어 보세요.",
      "explanation": "Attach -아/어 (the same vowel form as -아/어요) plus 보다 ('to see') to mean 'do X and see' → 'try doing X'. In the past, -아/어 봤어요 means 'I've tried / I once did (and experienced) it'. As a request, -아/어 보세요 is a friendly 'go ahead and try'. Note: when the main verb is already 보다 ('to see/watch'), don't stack it — just say 보세요, not 봐 보세요.",
      "notes": ["Past -아/어 봤어요 often means 'I have (once) experienced ...'.", "-아/어 보세요 = 'try it', softer than a bare command.", "With 보다 itself, don't double it up: 'try watching' is just 보세요."]
    },
    "pitfalls": ["The vowel follows the same ㅏ/ㅗ vs other rule as -아/어요: 가 보다, 먹어 보다, 해 보다.", "Auxiliary 보다 is written with a space after the -아/어 form: 가 보세요, 먹어 봤어요 — same spacing as 가 주세요.", "-아/어 보다 is 'try doing' (an attempt); it's different from -고 싶다 'want to'.", "Don't stack 보다 on itself: say 보세요, not 봐 보세요."],
    "bridge": ["무서워요. 같이 가 주세요.", "10 분 기다려 주세요."],
    "vocab": [
      {"ko": "시도하다", "en": "to attempt, to try", "romaji": "si-do-ha-da", "pos": "verb", "note": "make an attempt at something new"},
      {"ko": "재도전", "en": "another try, re-challenge", "romaji": "jae-do-jeon", "pos": "noun", "note": "재- prefix = 're-, again'; 재도전하다"},
      {"ko": "시식", "en": "sampling, tasting (food)", "romaji": "si-sik", "pos": "noun", "note": "시식하다 = to sample food"},
      {"ko": "시음", "en": "tasting (a drink)", "romaji": "si-eum", "pos": "noun", "note": "시음하다 = to taste a drink"},
      {"ko": "시착", "en": "trying on (clothes)", "romaji": "si-chak", "pos": "noun", "note": "시착하다 = to try clothes on in a store"},
      {"ko": "감상하다", "en": "to appreciate, enjoy (art/music)", "romaji": "gam-sang-ha-da", "pos": "verb", "note": "음악을 감상하다"},
      {"ko": "관람하다", "en": "to watch, to view (a show/exhibit)", "romaji": "gwal-lam-ha-da", "pos": "verb", "note": "영화/경기를 관람하다"},
      {"ko": "결심하다", "en": "to make up one's mind, to resolve", "romaji": "gyeol-sim-ha-da", "pos": "verb", "note": "firmly decide to do something"}
    ],
    "sentences": [
      {"ko": "이 김치 한번 먹어 보세요.", "en": "Try this kimchi once.", "romaji": "i gim-chi han-beon meo-geo bo-se-yo", "blankWord": "먹어 보세요"},
      {"ko": "저는 한복을 입어 봤어요.", "en": "I've tried wearing a hanbok.", "romaji": "jeo-neun han-bo-geul i-beo bwa-sseo-yo", "blankWord": "입어 봤어요"},
      {"ko": "새로운 방법을 시도해 봤어요.", "en": "I tried a new method.", "romaji": "sae-ro-un bang-beo-beul si-do-hae bwa-sseo-yo", "blankWord": "시도해 봤어요"},
      {"ko": "그 영화를 꼭 관람해 보세요.", "en": "Definitely try watching that movie.", "romaji": "geu yeong-hwa-reul kkok gwal-lam-hae bo-se-yo", "blankWord": "관람해 보세요"},
      {"ko": "이 커피를 시음해 보세요.", "en": "Try tasting this coffee.", "romaji": "i keo-pi-reul si-eum-hae bo-se-yo", "blankWord": "시음해 보세요"},
      {"ko": "한국 음악을 감상해 보세요.", "en": "Try enjoying some Korean music.", "romaji": "han-guk eu-ma-geul gam-sang-hae bo-se-yo", "blankWord": "감상해 보세요"},
      {"ko": "다시 한번 재도전해 봐요.", "en": "Let's give it another try.", "romaji": "da-si han-beon jae-do-jeon-hae bwa-yo", "blankWord": "재도전해 봐요"}
    ]
  },
  {
    "id": "4.13", "level": 4, "title": "Word Builder 4", "point": "不 (불)",
    "grammar": {
      "summary": "不 (불/부) means 'not / non-'; it negates the word it attaches to.",
      "formation": "不 is a Sino-Korean prefix. It reads 불 before most sounds (불 + 가능 → 불가능), but changes to 부 right before ㄷ or ㅈ (不 + 足 → 부족, 不 + 當 → 부당).",
      "explanation": "不 is a Sino-Korean prefix meaning 'not'. It usually reads 불 (불가능 = impossible, 불법 = illegal, 불행 = unhappiness, 불만 = dissatisfaction, 불규칙 = irregular), but it shifts to 부 before ㄷ or ㅈ sounds (부족 = lack, 부당 = unjust, 부정 = injustice). Spotting 불/부 at the front of a word tells you it flips the meaning to the negative. The words below extend this set.",
      "notes": ["Already-known 不 words: 불가능, 불법, 불행, 불만, 불규칙, 불평.", "不 reads 부 (not 불) before ㄷ/ㅈ: 부족, 부당, 부정 — not 불족, 불당.", "The opposite prefix, meaning 'not' via a native root, is often just 안- or 못- on verbs."]
    },
    "pitfalls": ["Read 不 as 부 before ㄷ/ㅈ sounds (부족, 부당), not 불족, 불당.", "不 attaches to Sino-Korean roots; you can't paste it onto native Korean verbs."],
    "bridge": [],
    "vocab": [
      {"ko": "불편하다", "en": "to be inconvenient, uncomfortable", "romaji": "bul-pyeon-ha-da", "pos": "adj", "note": "不便; opposite of 편하다"},
      {"ko": "불안하다", "en": "to be anxious, uneasy", "romaji": "bu-ran-ha-da", "pos": "adj", "note": "不安; opposite of 안심하다"},
      {"ko": "부족하다", "en": "to be insufficient, lacking", "romaji": "bu-jok-ha-da", "pos": "adj", "note": "不足; note the 부 reading before ㅈ"},
      {"ko": "불필요하다", "en": "to be unnecessary", "romaji": "bul-pi-ryo-ha-da", "pos": "adj", "note": "不必要; opposite of 필요하다"},
      {"ko": "불공평하다", "en": "to be unfair", "romaji": "bul-gong-pyeong-ha-da", "pos": "adj", "note": "不公平; opposite of 공평하다"},
      {"ko": "불신", "en": "distrust", "romaji": "bul-sin", "pos": "noun", "note": "不信; opposite of 신뢰"},
      {"ko": "불황", "en": "recession, economic slump", "romaji": "bul-hwang", "pos": "noun", "note": "不況; opposite of 호황"},
      {"ko": "부당하다", "en": "to be unjust, unreasonable", "romaji": "bu-dang-ha-da", "pos": "adj", "note": "不當; note the 부 reading before ㄷ"}
    ],
    "sentences": [
      {"ko": "이 의자는 좀 불편해요.", "en": "This chair is a bit uncomfortable.", "romaji": "i ui-ja-neun jom bul-pyeon-hae-yo", "blankWord": "불편해요"},
      {"ko": "시험 전에는 항상 불안해요.", "en": "Before an exam I'm always anxious.", "romaji": "si-heom jeo-ne-neun hang-sang bu-ran-hae-yo", "blankWord": "불안해요"},
      {"ko": "시간이 많이 부족해요.", "en": "There's really not enough time.", "romaji": "si-ga-ni ma-ni bu-jok-hae-yo", "blankWord": "부족해요"},
      {"ko": "그건 불필요한 걱정이에요.", "en": "That's an unnecessary worry.", "romaji": "geu-geon bul-pi-ryo-han geok-jeong-i-e-yo", "blankWord": "불필요한"},
      {"ko": "그 규칙은 좀 불공평해요.", "en": "That rule is a bit unfair.", "romaji": "geu gyu-chi-geun jom bul-gong-pyeong-hae-yo", "blankWord": "불공평해요"},
      {"ko": "요즘 경제가 불황이에요.", "en": "The economy is in a slump these days.", "romaji": "yo-jeum gyeong-je-ga bul-hwang-i-e-yo", "blankWord": "불황"}
    ]
  },
  {
    "id": "4.15", "level": 4, "title": "\"Any\" expanded (part 2)", "point": "아무 + noun + (이)나/도",
    "grammar": {
      "summary": "How to combine 아무 with a noun to say 'any ___ at all' or, with a negative, 'no ___'.",
      "formation": "아무 + Noun + -(이)나 → 'any N, doesn't matter which' (positive verb)\n아무 + Noun + -도 → 'no N at all' (negative verb)\ne.g. 아무 데나 = anywhere; 아무 데도 = nowhere; 아무 때나 = anytime; 아무 말도 = (not) a single word.",
      "explanation": "This expands last lesson's 아무나/아무도 to full noun phrases. Put 아무 before a noun, then add -(이)나 for free choice ('any N') with a positive verb, or -도 for total negation ('not any N') with a negative verb. So 아무 노래나 = 'any song', 아무 이유도 없어요 = 'there's no reason at all'. The positive/negative pairing is the same rule you learned for 아무나 / 아무도.",
      "notes": ["The common nouns are 데 (place), 때 (time), 말 (words), 이유 (reason).", "-도 phrases need a negative verb (없다/안/못); -(이)나 phrases take a positive one.", "아무렇게나 ('any old way') is a fixed adverb from this same 아무 family."]
    },
    "pitfalls": ["Match the ending to the verb: 아무 N-도 needs a negative, 아무 N-(이)나 needs a positive.", "Use -이나 after a consonant-final noun (아무 말이나), -나 after a vowel-final one (아무 때나).", "아무 N도 means 'no N' — don't pair it with a positive verb."],
    "bridge": ["공원이나 영화관", "저도 학생이에요."],
    "vocab": [
      {"ko": "아무렇게나", "en": "any old way, carelessly", "romaji": "a-mu-reo-ke-na", "pos": "adv", "note": "without care or thought"},
      {"ko": "제멋대로", "en": "as one pleases, willfully", "romaji": "je-meot-dae-ro", "pos": "adv", "note": "doing whatever one wants, selfishly"},
      {"ko": "되는대로", "en": "haphazardly, as it comes", "romaji": "doe-neun-dae-ro", "pos": "adv", "note": "however it works out, with no plan"},
      {"ko": "헛소리", "en": "nonsense, rubbish talk", "romaji": "heot-so-ri", "pos": "noun", "note": "헛- prefix = 'empty, in vain'"},
      {"ko": "막말", "en": "reckless / rude remarks", "romaji": "mang-mal", "pos": "noun", "note": "막- prefix = 'recklessly'"},
      {"ko": "눈치껏", "en": "tactfully, reading the situation", "romaji": "nun-chi-kkeot", "pos": "adv", "note": "-껏 = 'to the extent of'"}
    ],
    "sentences": [
      {"ko": "아무 데나 앉으세요.", "en": "Sit anywhere.", "romaji": "a-mu de-na an-jeu-se-yo", "blankWord": "아무 데나"},
      {"ko": "저는 아무 말도 안 했어요.", "en": "I didn't say a single word.", "romaji": "jeo-neun a-mu mal-do an hae-sseo-yo", "blankWord": "아무 말도"},
      {"ko": "아무 때나 전화하세요.", "en": "Call anytime.", "romaji": "a-mu ttae-na jeon-hwa-ha-se-yo", "blankWord": "아무 때나"},
      {"ko": "저는 아무 데도 안 갔어요.", "en": "I didn't go anywhere.", "romaji": "jeo-neun a-mu de-do an ga-sseo-yo", "blankWord": "아무 데도"},
      {"ko": "저는 아무 노래나 들어요.", "en": "I listen to any song.", "romaji": "jeo-neun a-mu no-rae-na deu-reo-yo", "blankWord": "아무 노래나"},
      {"ko": "저는 아무 이유도 없어요.", "en": "I have no reason at all.", "romaji": "jeo-neun a-mu i-yu-do eop-seo-yo", "blankWord": "아무 이유도"},
      {"ko": "일을 아무렇게나 하지 마세요.", "en": "Don't do the work carelessly.", "romaji": "i-reul a-mu-reo-ke-na ha-ji ma-se-yo", "blankWord": "아무렇게나"}
    ]
  },
  {
    "id": "4.16", "level": 4, "title": "Spacing in Korean (part 1)", "point": "띄어쓰기",
    "grammar": {
      "summary": "The basic word-spacing rules of written Korean: particles attach, everything else is separated.",
      "formation": "• Particles (조사) attach to the noun before them with NO space: 저는, 학교에서, 밥을.\n• Every full word is separated by a space: 저는 밥을 먹어요.\n• The negatives 안 and 못 are separate words: 안 먹어요, 못 가요.\n• Native number + counter is spaced: 한 번, 두 명 (but attached with Arabic numerals: 2명).",
      "explanation": "Korean is written with spaces (띄어쓰기), but the rules differ from English. The key idea: a particle is not its own word — it glues onto the noun before it (저 + 는 → 저는), so you never leave a space before 는/이/가/을/를/에/에서/도. Everything that IS a full word — nouns, verbs, adverbs — takes a space around it. The negation adverbs 안 and 못 count as their own words, so 안 먹어요 is spaced. Good spacing makes your writing far easier to read.",
      "notes": ["A particle never starts a new chunk: write 학교에서, never 학교 에서.", "한번 (attached) = 'once / just try it', but 한 번 (spaced) = 'one time' as a count.", "안/못 are spaced from the verb: 안 가요, 못 봐요."]
    },
    "pitfalls": ["Don't put a space before a particle: 저 는 is wrong — write 저는.", "안 and 못 are separate words: write 안 먹어요, not 안먹어요.", "한번 'once / give it a go' is attached, but counting 'one time' is 한 번 with a space."],
    "bridge": ["저도 학생이에요.", "수박은 사과보다 더 커요."],
    "vocab": [
      {"ko": "띄어쓰기", "en": "word spacing (between words)", "romaji": "tti-eo-sseu-gi", "pos": "noun", "note": "띄어쓰기하다 = to put spaces"},
      {"ko": "붙여쓰기", "en": "writing without a space", "romaji": "bu-chyeo-sseu-gi", "pos": "noun", "note": "opposite of 띄어쓰기"},
      {"ko": "낱말", "en": "a word (individual word)", "romaji": "nan-mal", "pos": "noun", "note": "same idea as 단어"},
      {"ko": "어절", "en": "a spacing unit (word chunk)", "romaji": "eo-jeol", "pos": "noun", "note": "the chunk between two spaces"},
      {"ko": "규범", "en": "a norm, standard rule", "romaji": "gyu-beom", "pos": "noun", "note": "an official rule to follow"}
    ],
    "sentences": [
      {"ko": "한국어는 띄어쓰기가 정말 어려워요.", "en": "Korean spacing is really hard.", "romaji": "han-gu-geo-neun tti-eo-sseu-gi-ga jeong-mal eo-ryeo-wo-yo", "blankWord": "띄어쓰기가"},
      {"ko": "조사는 앞 낱말에 붙여써요.", "en": "A particle is written attached to the word before it.", "romaji": "jo-sa-neun ap nan-ma-re bu-chyeo-sseo-yo", "blankWord": "붙여써요"},
      {"ko": "동사 앞에서 '안'을 띄어써요.", "en": "You space '안' before the verb.", "romaji": "dong-sa a-pe-seo a-neul tti-eo-sseo-yo", "blankWord": "띄어써요"},
      {"ko": "낱말과 낱말 사이를 띄어요.", "en": "You put a space between one word and the next.", "romaji": "nan-mal-gwa nan-mal sa-i-reul tti-eo-yo", "blankWord": "띄어요"},
      {"ko": "이 규범을 알면 띄어쓰기가 쉬워요.", "en": "If you know this norm, spacing is easy.", "romaji": "i gyu-beo-meul al-myeon tti-eo-sseu-gi-ga swi-wo-yo", "blankWord": "규범을"},
      {"ko": "어절은 띄어쓰기의 단위예요.", "en": "An 어절 is the unit of spacing.", "romaji": "eo-jeo-reun tti-eo-sseu-gi-ui da-ni-ye-yo", "blankWord": "어절은"}
    ]
  },
  {
    "id": "4.17", "level": 4, "title": "Word Contractions (part 1)", "point": "축약형",
    "grammar": {
      "summary": "Common spoken contractions of frequent words — the 것 family and shrinking pronouns.",
      "formation": "• 것 → 거;  것이 → 게;  것은 → 건;  것을 → 걸\n• 나는 → 난;  나를 → 날;  너는 → 넌\n• 무엇 → 뭐;  이것/그것/저것 → 이거/그거/저거\n• -지요 → -죠 (from Lesson 4)",
      "explanation": "In casual speech and casual writing, Koreans shorten many frequent words. The biggest family is 것 ('thing'): 것 → 거, and with particles 것이 → 게, 것은 → 건, 것을 → 걸. Pronouns shrink too: 나는 → 난, 나를 → 날, 너는 → 넌. And 무엇 → 뭐, 이것 → 이거. These forms are everywhere in conversation, but keep the full forms for formal writing.",
      "notes": ["것 is the most-contracted word: 거/게/건/걸 all come from 것.", "The 게 from 것이 (subject) is a different morpheme from the 게 in -게 되다 — same shape, different origin.", "-지요 → -죠 (Lesson 4) is a contraction too."]
    },
    "pitfalls": ["Contractions belong to casual speech/writing — use full forms (것이, 나는) in formal writing.", "게 from 것이 is not the 게 of -게 되다; don't mix them up.", "Contract only where it's standard (무엇 → 뭐); don't invent new ones."],
    "bridge": ["그런 것 같아요.", "이상한 것 같아요."],
    "vocab": [
      {"ko": "축약", "en": "contraction, shortening", "romaji": "chu-gyak", "pos": "noun", "note": "축약하다 = to contract"},
      {"ko": "준말", "en": "a contracted / shortened word", "romaji": "jun-mal", "pos": "noun", "note": "opposite of 본말"},
      {"ko": "구어체", "en": "colloquial (spoken) style", "romaji": "gu-eo-che", "pos": "noun", "note": "language as actually spoken"},
      {"ko": "격식", "en": "formality, formal manner", "romaji": "gyeok-sik", "pos": "noun", "note": "격식을 차리다 = to be formal"},
      {"ko": "말버릇", "en": "a speech habit", "romaji": "mal-beo-reut", "pos": "noun", "note": "a word one says out of habit"}
    ],
    "sentences": [
      {"ko": "'것'은 말할 때 '거'로 축약해요.", "en": "'것' contracts to '거' when you speak.", "romaji": "geo-seun mal-hal ttae geo-ro chu-gya-kae-yo", "blankWord": "축약해요"},
      {"ko": "'것이'는 '게'가 돼요.", "en": "'것이' becomes '게'.", "romaji": "geo-si-neun ge-ga dwae-yo", "blankWord": "돼요"},
      {"ko": "'나는'은 '난'으로 축약해요.", "en": "'나는' contracts to '난'.", "romaji": "na-neu-neun na-neu-ro chu-gya-kae-yo", "blankWord": "축약해요"},
      {"ko": "구어체에서는 '무엇'이 '뭐'예요.", "en": "In colloquial style '무엇' is '뭐'.", "romaji": "gu-eo-che-e-seo-neun mu-eo-si mwo-ye-yo", "blankWord": "구어체에서는"},
      {"ko": "격식 있는 글에서는 준말을 안 써요.", "en": "In formal writing you don't use contractions.", "romaji": "gyeok-sik in-neun geu-re-seo-neun jun-ma-reul an sseo-yo", "blankWord": "준말을"},
      {"ko": "저는 말버릇처럼 '뭐'를 자주 써요.", "en": "I say '뭐' a lot, almost as a habit.", "romaji": "jeo-neun mal-beo-reut-cheo-reom mwo-reul ja-ju sseo-yo", "blankWord": "말버릇처럼"}
    ]
  },
  {
    "id": "4.18", "level": 4, "title": "Most / Best (superlative)", "point": "가장, 제일, 최고",
    "grammar": {
      "summary": "How to say something is 'the most ...' or 'the best' — the Korean superlative.",
      "formation": "• 가장 / 제일 + adjective/adverb = 'the most ...' — they sit right before the word they boost.\n  제일 커요 (is biggest), 가장 빨리 (fastest).\n• Out of a group, pair with 중에서 (Lesson 10): 이 중에서 제일 좋아요.\n• 최고 is a NOUN ('the best'): 최고예요; 최고의 + noun (최고의 방법).",
      "explanation": "가장 and 제일 are adverbs meaning 'most'; place them directly before an adjective or adverb: 제일 커요 = 'is biggest', 가장 빨리 = 'fastest'. 제일 is a little more colloquial and 가장 a little more written, but they're interchangeable. 최고 is different — it is a noun meaning 'the best (one)', so you say 이게 최고예요 or 최고의 + noun. To pick 'the ~est out of a group', add 중에서.",
      "notes": ["가장 = neutral/written, 제일 = more colloquial; both mean 'most'.", "최고 is a noun: 최고예요 ('it's the best'), 최고의 실력 ('the best skill').", "'Which do you like most?' pairs with 중에서: 이 중에서 뭐가 제일 좋아요?"]
    },
    "pitfalls": ["가장/제일 modify an adjective or adverb, not a bare noun: 제일 사람 is wrong → 제일 좋은 사람.", "최고 is a noun, not an adverb — don't say 최고 빨라요; say 제일 빨라요.", "Put 가장/제일 right before the word it boosts: 제일 커요, 가장 빨리."],
    "bridge": ["비빔밥하고 냉면 중에서 어느 것을 더 좋아해요?", "수박은 사과보다 더 커요."],
    "vocab": [
      {"ko": "최상", "en": "the best, the highest", "romaji": "choe-sang", "pos": "noun", "note": "最上; 최상의 + noun (최상의 선택)"},
      {"ko": "최악", "en": "the worst", "romaji": "choe-ak", "pos": "noun", "note": "最惡; opposite of 최상"},
      {"ko": "최강", "en": "the strongest", "romaji": "choe-gang", "pos": "noun", "note": "最强; 최강의 팀 = the strongest team"},
      {"ko": "최우선", "en": "the top priority", "romaji": "choe-u-seon", "pos": "noun", "note": "最優先; put first of all"},
      {"ko": "으뜸", "en": "the best, number one", "romaji": "eu-tteum", "pos": "noun", "note": "native word; 으뜸이다 = to be the best"},
      {"ko": "정점", "en": "the peak, the climax", "romaji": "jeong-jeom", "pos": "noun", "note": "頂點; the highest point"},
      {"ko": "압권", "en": "the highlight, the standout", "romaji": "ap-gwon", "pos": "noun", "note": "壓卷; the best part of something"},
      {"ko": "손꼽히다", "en": "to be counted among the best", "romaji": "son-kko-pi-da", "pos": "verb", "note": "최고로 손꼽히다 = to be reckoned the best"}
    ],
    "sentences": [
      {"ko": "이 식당이 이 동네에서 제일 맛있어요.", "en": "This restaurant is the tastiest in this neighborhood.", "romaji": "i sik-dang-i i dong-ne-e-seo je-il ma-si-sseo-yo", "blankWord": "제일"},
      {"ko": "건강이 저한테 최우선이에요.", "en": "Health is my top priority.", "romaji": "geon-gang-i jeo-han-te choe-u-seon-i-e-yo", "blankWord": "최우선이에요"},
      {"ko": "그 영화에서 마지막 장면이 압권이에요.", "en": "The last scene of that movie is the standout.", "romaji": "geu yeong-hwa-e-seo ma-ji-mak jang-myeon-i ap-gwon-i-e-yo", "blankWord": "압권이에요"},
      {"ko": "저는 여기 음식 중에서 이게 제일 좋아요.", "en": "Of the food here, I like this one best.", "romaji": "jeo-neun yeo-gi eum-sik jung-e-seo i-ge je-il jo-a-yo", "blankWord": "제일"},
      {"ko": "어제 날씨는 최악이었어요.", "en": "Yesterday's weather was the worst.", "romaji": "eo-je nal-ssi-neun choe-a-gi-eo-sseo-yo", "blankWord": "최악이었어요"},
      {"ko": "이 방법이 가장 단순해요.", "en": "This method is the simplest.", "romaji": "i bang-beo-bi ga-jang dan-sun-hae-yo", "blankWord": "가장"},
      {"ko": "김치찌개는 이 집에서 으뜸이에요.", "en": "The kimchi stew is number one at this place.", "romaji": "gim-chi-jji-gae-neun i ji-be-seo eu-tteu-mi-e-yo", "blankWord": "으뜸이에요"}
    ]
  },
  {
    "id": "4.19", "level": 4, "title": "Less / Not completely", "point": "덜",
    "grammar": {
      "summary": "How to say something is done 'less', or 'not all the way / not fully'.",
      "formation": "덜 + verb/adjective — the adverb 덜 is the opposite of 더 ('more').\n• comparative sense: 이게 덜 비싸요 (this is less expensive)\n• incompleteness sense: 덜 익었어요 (not fully cooked), 덜 말랐어요 (not fully dry)",
      "explanation": "덜 is a single adverb placed before a verb or adjective. Its first sense mirrors 더: 더 = more, 덜 = less (오늘은 덜 추워요 = 'it's less cold today'). Its second sense is 'not completely / not all the way': 밥이 덜 됐어요 = 'the rice isn't fully cooked', 잠이 덜 깼어요 = 'I'm not fully awake'. Context tells you which sense is meant. Like any adverb, it can't attach directly to a noun.",
      "notes": ["덜 is the opposite of 더: 더 좋아요 (more) ↔ 덜 좋아요 (less).", "The 'not fully' sense is common with cooking / drying / waking: 덜 익다, 덜 마르다, 덜 깨다.", "다 (all / completely) is the natural opposite of the 'not fully' sense."]
    },
    "pitfalls": ["Don't read 덜 only as 'less' — it also means 'not fully' (덜 익었어요 = undercooked).", "덜 modifies a verb/adjective, not a noun: 덜 돈 is wrong → say 돈이 덜 들어요 (costs less).", "덜 goes before the word it lowers: 덜 매워요, 덜 비싸요."],
    "bridge": ["이거보다 더 좋아요.", "오늘은 어제보다 더워요."],
    "vocab": [
      {"ko": "미흡하다", "en": "to be insufficient, lacking", "romaji": "mi-heu-pa-da", "pos": "adj", "note": "未洽; falls a little short"},
      {"ko": "어중간하다", "en": "to be halfway, neither enough nor not", "romaji": "eo-jung-gan-ha-da", "pos": "adj", "note": "於中間; not quite enough"},
      {"ko": "미완성", "en": "incompleteness, an unfinished state", "romaji": "mi-wan-seong", "pos": "noun", "note": "未完成; opposite of 완성"},
      {"ko": "설익다", "en": "to be half-cooked, underripe", "romaji": "seol-lik-da", "pos": "verb", "note": "설- prefix = 'not fully'"},
      {"ko": "완화", "en": "easing, relief, relaxation", "romaji": "wan-hwa", "pos": "noun", "note": "緩和; 완화하다 = to ease"},
      {"ko": "급감", "en": "a sharp decrease", "romaji": "geup-gam", "pos": "noun", "note": "急減; 급감하다 = to drop sharply"},
      {"ko": "절감", "en": "cutting down, reduction", "romaji": "jeol-gam", "pos": "noun", "note": "節減; 비용을 절감하다 = to cut costs"}
    ],
    "sentences": [
      {"ko": "오늘은 어제보다 덜 추워요.", "en": "Today is less cold than yesterday.", "romaji": "o-neu-reun eo-je-bo-da deol chu-wo-yo", "blankWord": "덜"},
      {"ko": "이 김치는 덜 매워요.", "en": "This kimchi is less spicy.", "romaji": "i gim-chi-neun deol mae-wo-yo", "blankWord": "덜"},
      {"ko": "밥이 아직 덜 됐어요.", "en": "The rice isn't fully cooked yet.", "romaji": "ba-bi a-jik deol dwae-sseo-yo", "blankWord": "덜"},
      {"ko": "이게 저것보다 덜 비싸요.", "en": "This is less expensive than that.", "romaji": "i-ge jeo-geot-bo-da deol bi-ssa-yo", "blankWord": "덜"},
      {"ko": "준비가 덜 돼서 걱정이에요.", "en": "I'm worried because I'm not fully ready.", "romaji": "jun-bi-ga deol dwae-seo geok-jeong-i-e-yo", "blankWord": "덜"},
      {"ko": "제 실력이 아직 미흡해요.", "en": "My skills are still lacking.", "romaji": "je sil-lyeo-gi a-jik mi-heu-pae-yo", "blankWord": "미흡해요"},
      {"ko": "이 방법으로 비용을 절감할 수 있어요.", "en": "You can cut costs with this method.", "romaji": "i bang-beo-beu-ro bi-yong-eul jeol-gam-hal su i-sseo-yo", "blankWord": "절감할"}
    ]
  },
  {
    "id": "4.20", "level": 4, "title": "Sentence Building Drill #1", "point": "복습 / 문장 만들기",
    "grammar": {
      "summary": "A review lesson: combine the Level 4 grammar you've learned so far into longer sentences.",
      "formation": "No new form. Each example stacks two or more points you already know — e.g. -(으)면 안 되다 (Lesson 9) + 아무거나 (Lesson 11), or 제일 (Lesson 18) + -(으)ㄹ수록 (Lesson 1).",
      "explanation": "This is a sentence-building drill, not a new pattern. It trains you to snap together points from Lessons 1–19: 'the more/the more', prohibitions, 'try doing', 'any/no', superlatives, and 'less'. Read each example and notice which two grammar points it joins, then make your own along the same lines.",
      "notes": ["No new grammar here — everything comes from Lessons 1–19.", "Aim to combine at least two patterns in each sentence.", "Say each one out loud to build fluency."]
    },
    "pitfalls": ["Keep each combined point in its own correct form — combining doesn't change how each one conjugates.", "Mind your spacing (Lesson 16) and pick full or contracted forms (Lesson 17) to match your register."],
    "bridge": ["리모콘을 찾으면, TV를 볼 수 있어요.", "저는 요즘에 평소보다 더 바빠요."],
    "vocab": [],
    "sentences": [
      {"ko": "성실하면 성실할수록 좋지만, 너무 무리하면 안 돼요.", "en": "The more diligent, the better — but you mustn't overdo it.", "romaji": "seong-sil-ha-myeon seong-sil-hal-su-rok jo-chi-man, neo-mu mu-ri-ha-myeon an dwae-yo", "blankWord": "안 돼요"},
      {"ko": "여기에서는 아무거나 만지면 안 돼요.", "en": "Here you mustn't touch just anything.", "romaji": "yeo-gi-e-seo-neun a-mu-geo-na man-ji-myeon an dwae-yo", "blankWord": "아무거나"},
      {"ko": "이 중에서 제일 좋은 방법을 한번 찾아 보세요.", "en": "Try finding the best method out of these.", "romaji": "i jung-e-seo je-il jo-eun bang-beo-beul han-beon cha-ja bo-se-yo", "blankWord": "제일"},
      {"ko": "저는 주말에 아무 데도 안 가고 일을 덜 하고 싶어요.", "en": "On the weekend I want to go nowhere and work less.", "romaji": "jeo-neun ju-ma-re a-mu de-do an ga-go i-reul deol ha-go si-peo-yo", "blankWord": "덜"},
      {"ko": "그 사람이 이 김치를 안 먹어 봤을 리가 없어요.", "en": "There's no way he hasn't tried this kimchi.", "romaji": "geu sa-ra-mi i gim-chi-reul an meo-geo bwa-sseul li-ga eop-seo-yo", "blankWord": "먹어 봤을"},
      {"ko": "가장 어려운 문제도 풀면 풀수록 재미있어요.", "en": "Even the hardest problem gets more fun the more you solve it.", "romaji": "ga-jang eo-ryeo-un mun-je-do pul-myeon pul-su-rok jae-mi-i-sseo-yo", "blankWord": "가장"}
    ]
  },
  {
    "id": "4.21", "level": 4, "title": "Spacing in Korean (part 2)", "point": "띄어쓰기",
    "grammar": {
      "summary": "The harder spacing case: dependent (bound) nouns take a space BEFORE them.",
      "formation": "• Dependent nouns are spaced: 갈 수 있어요, 할 것 같아요, 아는 것, 간 지 오래됐어요.\n• Auxiliary verbs after -아/어 are usually spaced: 가 보세요, 먹어 주세요.\n• But fused compound verbs are one word (no space): 들어가다, 들어오다, 돌아가다.",
      "explanation": "Building on Lesson 16, this covers the trickiest chunk: dependent nouns like 수, 것/거, 지, 데. They look attached, but they are separate words, so you put a space before them: 갈 수 있어요 (not 갈수), 할 거예요 (not 할거예요). Auxiliary verbs after the -아/어 form are also usually spaced (가 보세요). Watch out — some verb+verb combos have fused into single words (들어가다) and take no space.",
      "notes": ["수, 것/거, 지, 데, 줄 are dependent nouns — always a space before them.", "-(으)ㄹ 거예요 is 갈 거예요 (거 is a dependent noun), not 갈거예요.", "Fused compounds are one word: 들어가다, 들어오다, 돌아가다 — no space."]
    },
    "pitfalls": ["Put a space before a dependent noun: 갈수 있어요 is wrong → 갈 수 있어요.", "-(으)ㄹ 거예요 needs the space: 할거예요 → 할 거예요.", "An auxiliary verb after -아/어 is spaced: 가보세요 → 가 보세요, 먹어주세요 → 먹어 주세요."],
    "bridge": ["이거 읽을 수 있어요?", "여기 비싼 것 같아요."],
    "vocab": [
      {"ko": "의존명사", "en": "a dependent (bound) noun", "romaji": "ui-jon-myeong-sa", "pos": "noun", "note": "依存名詞; e.g. 수, 것, 지 — needs a space before it"},
      {"ko": "관형사", "en": "a determiner (pre-noun word)", "romaji": "gwan-hyeong-sa", "pos": "noun", "note": "冠形詞; e.g. 이/그/저, 새, 헌"},
      {"ko": "보조사", "en": "an auxiliary particle", "romaji": "bo-jo-sa", "pos": "noun", "note": "補助詞; e.g. 은/는, 도, 만"},
      {"ko": "어미", "en": "a word ending", "romaji": "eo-mi", "pos": "noun", "note": "語尾; the conjugating tail of a verb/adjective"}
    ],
    "sentences": [
      {"ko": "'수'는 의존명사예요. 그래서 앞을 띄어써요.", "en": "'수' is a dependent noun, so you space before it.", "romaji": "su-neun ui-jon-myeong-sa-ye-yo. geu-rae-seo a-peul tti-eo-sseo-yo", "blankWord": "의존명사예요"},
      {"ko": "'갈 수 있어요'는 '수' 앞을 띄어써요.", "en": "In '갈 수 있어요' you space before '수'.", "romaji": "gal su i-sseo-yo-neun su a-peul tti-eo-sseo-yo", "blankWord": "띄어써요"},
      {"ko": "'할 거예요'도 '거' 앞을 띄어써요.", "en": "In '할 거예요' too, you space before '거'.", "romaji": "hal geo-ye-yo-do geo a-peul tti-eo-sseo-yo", "blankWord": "띄어써요"},
      {"ko": "'이', '그', '저'는 관형사예요.", "en": "'이', '그', '저' are determiners.", "romaji": "i, geu, jeo-neun gwan-hyeong-sa-ye-yo", "blankWord": "관형사예요"},
      {"ko": "'은', '는', '도'는 보조사예요.", "en": "'은', '는', '도' are auxiliary particles.", "romaji": "eun, neun, do-neun bo-jo-sa-ye-yo", "blankWord": "보조사예요"},
      {"ko": "동사의 어미는 붙여써요.", "en": "A verb's ending is written attached.", "romaji": "dong-sa-ui eo-mi-neun bu-chyeo-sseo-yo", "blankWord": "어미는"}
    ]
  },
  {
    "id": "4.22", "level": 4, "title": "Word Builder 5", "point": "場 (장)",
    "grammar": {
      "summary": "場 (장) means 'place / venue / field'; spotting it points to a place where something happens.",
      "formation": "場 (장) is a Sino-Korean building block. It usually sits at the END of a word, after another root: 運動 + 場 → 운동장, 市 + 場 → 시장.",
      "explanation": "場 (장) means 'a place / open ground / venue where something happens'. You already meet it in 운동장 (sports ground), 시장 (market), 극장 (theater), 수영장 (swimming pool), 주차장 (parking lot), 공연장 (concert hall), 경기장 (stadium), and 현장 (the scene). Spot 장 at the end of a word and you can guess it names a place for some activity. The words below add more.",
      "notes": ["Already-known 場 words: 운동장, 시장, 극장, 수영장, 주차장, 공연장, 경기장, 현장, 장면.", "場 (장, 'place') is a different hanja from 長 (장, 'chief/head', as in 사장 = boss, 교장 = principal) — same sound, different character.", "입장 and 등장 also use 場: 입장 = entry (into a venue), 등장 = appearing on stage."]
    },
    "pitfalls": ["Don't confuse 場 (장, place) with 長 (장, chief) — 사장/교장 use 長, not 場.", "場 attaches to Sino-Korean roots (운동장, 시장); you can't paste it onto native words freely."],
    "bridge": [],
    "vocab": [
      {"ko": "시험장", "en": "an exam hall / test venue", "romaji": "si-heom-jang", "pos": "noun", "note": "試驗場; where a test is held"},
      {"ko": "공사장", "en": "a construction site", "romaji": "gong-sa-jang", "pos": "noun", "note": "工事場; where building work happens"},
      {"ko": "목장", "en": "a ranch, a pasture", "romaji": "mok-jang", "pos": "noun", "note": "牧場; for raising livestock"},
      {"ko": "농장", "en": "a farm", "romaji": "nong-jang", "pos": "noun", "note": "農場; for growing crops or animals"},
      {"ko": "광장", "en": "a plaza, a public square", "romaji": "gwang-jang", "pos": "noun", "note": "廣場; a large open public space"},
      {"ko": "퇴장", "en": "leaving / exiting (a stage or field)", "romaji": "toe-jang", "pos": "noun", "note": "退場; opposite of 등장/입장"},
      {"ko": "장터", "en": "a marketplace, market ground", "romaji": "jang-teo", "pos": "noun", "note": "場 + 터 (ground); where a market is held"}
    ],
    "sentences": [
      {"ko": "저는 주말에 농장에서 일했어요.", "en": "I worked on a farm over the weekend.", "romaji": "jeo-neun ju-ma-re nong-jang-e-seo il-hae-sseo-yo", "blankWord": "농장에서"},
      {"ko": "여기는 공사장이에요. 그래서 위험해요.", "en": "This is a construction site, so it's dangerous.", "romaji": "yeo-gi-neun gong-sa-jang-i-e-yo. geu-rae-seo wi-heom-hae-yo", "blankWord": "공사장이에요"},
      {"ko": "시험장에서는 조용히 하세요.", "en": "Please be quiet in the exam hall.", "romaji": "si-heom-jang-e-seo-neun jo-yong-hi ha-se-yo", "blankWord": "시험장에서는"},
      {"ko": "말들이 목장에 있어요.", "en": "The horses are in the pasture.", "romaji": "mal-deu-ri mok-jang-e i-sseo-yo", "blankWord": "목장에"},
      {"ko": "광장에 사람이 아주 많아요.", "en": "There are a lot of people in the square.", "romaji": "gwang-jang-e sa-ra-mi a-ju ma-na-yo", "blankWord": "광장에"},
      {"ko": "그 선수가 반칙으로 퇴장했어요.", "en": "That player was sent off for a foul.", "romaji": "geu seon-su-ga ban-chi-geu-ro toe-jang-hae-sseo-yo", "blankWord": "퇴장했어요"},
      {"ko": "저는 주말마다 장터에 가요.", "en": "I go to the market ground every weekend.", "romaji": "jeo-neun ju-mal-ma-da jang-teo-e ga-yo", "blankWord": "장터에"}
    ]
  },
  {
    "id": "4.23", "level": 4, "title": "Word Contractions (part 2)", "point": "축약형",
    "grammar": {
      "summary": "More spoken contractions — including the real 되어 → 돼 spelling rule.",
      "formation": "• 되어 → 돼;  하여 → 해;  -아/어 주어 → 줘\n• 무엇을 → 뭘;  이것이 → 이게;  그것을 → 그걸\n• 그러면 → 그럼;  그런데 → 근데;  아이 → 애;  이야기 → 얘기",
      "explanation": "This continues Lesson 17. The big rule here is 되어 → 돼: whenever 되 + 어 meet they fuse to 돼 (됐어요 = 되었어요), and likewise 하여 → 해. Discourse words also shrink: 그러면 → 그럼, 그런데 → 근데, and 아이 → 애, 이야기 → 얘기. Most of these are casual, but the 되/돼 spelling in particular you must get right even in careful writing.",
      "notes": ["The 되어 → 돼 rule is real spelling, not just slang: 됐어요, 안 돼요.", "Test 되/돼 by swapping in 하/해: if 해 fits, write 돼; if 하 fits, write 되.", "근데 (from 그런데) is fine in speech but keep 그런데 in formal writing."]
    },
    "pitfalls": ["돼 comes from 되 + 어: write 돼요 / 됐어요, never 되요 / 됬어요.", "그럼 / 근데 / 얘기 are casual — use 그러면 / 그런데 / 이야기 in formal writing.", "Contract only vowel-friendly pairs (무엇을 → 뭘, 그것을 → 그걸); don't force odd ones."],
    "bridge": ["그러면 이거는 뭐예요?", "너무 좋아요. 그런데 너무 비싸요."],
    "vocab": [
      {"ko": "본말", "en": "the original (full) form", "romaji": "bon-mal", "pos": "noun", "note": "opposite of 준말 / 줄임말"},
      {"ko": "줄임말", "en": "an abbreviation, a shortened word", "romaji": "ju-rim-mal", "pos": "noun", "note": "same idea as 준말"},
      {"ko": "일상어", "en": "everyday language", "romaji": "il-sang-eo", "pos": "noun", "note": "日常語; words used in daily life"},
      {"ko": "표준어", "en": "the standard language", "romaji": "pyo-jun-eo", "pos": "noun", "note": "標準語; the official standard form"},
      {"ko": "말씨", "en": "one's way of speaking, diction", "romaji": "mal-ssi", "pos": "noun", "note": "tone and choice of words"}
    ],
    "sentences": [
      {"ko": "'됐어요'는 '되었어요'의 줄임말이에요.", "en": "'됐어요' is the contraction of '되었어요'.", "romaji": "dwae-sseo-yo-neun doe-eo-sseo-yo-ui ju-rim-ma-ri-e-yo", "blankWord": "줄임말이에요"},
      {"ko": "'그러면'을 '그럼'으로 축약해요.", "en": "'그러면' contracts to '그럼'.", "romaji": "geu-reo-myeo-neul geu-reo-meu-ro chu-gya-kae-yo", "blankWord": "축약해요"},
      {"ko": "'근데'는 '그런데'의 준말이에요.", "en": "'근데' is the contraction of '그런데'.", "romaji": "geun-de-neun geu-reon-de-ui jun-ma-ri-e-yo", "blankWord": "준말이에요"},
      {"ko": "일상어에서는 '얘기'를 자주 써요.", "en": "In everyday language people often say '얘기'.", "romaji": "il-sang-eo-e-seo-neun yae-gi-reul ja-ju sseo-yo", "blankWord": "일상어에서는"},
      {"ko": "표준어에서는 '이야기'가 본말이에요.", "en": "In the standard language '이야기' is the full form.", "romaji": "pyo-jun-eo-e-seo-neun i-ya-gi-ga bon-ma-ri-e-yo", "blankWord": "본말이에요"},
      {"ko": "그 사람은 말씨가 부드러워요.", "en": "That person's way of speaking is gentle.", "romaji": "geu sa-ra-meun mal-ssi-ga bu-deu-reo-wo-yo", "blankWord": "말씨가"}
    ]
  },
  {
    "id": "4.24", "level": 4, "title": "Much (more) / Much (less)", "point": "훨씬",
    "grammar": {
      "summary": "How to emphasize a big difference — 'much / far (more or less)' — with 훨씬.",
      "formation": "훨씬 (+ 더 / 덜) + adjective/adverb = 'much / far ...'.\n• 훨씬 더 커요 (much bigger), 훨씬 덜 비싸요 (much less expensive)\n• needs a comparison in mind, usually marked with 보다.",
      "explanation": "훨씬 means 'by far / much', and it strengthens a comparison. It usually pairs with 더 ('more') or 덜 ('less', Lesson 19): 이게 저것보다 훨씬 더 좋아요 = 'this is much better than that'. Unlike 많이 ('a lot'), 훨씬 specifically boosts a comparative, so it only makes sense when you are comparing to something — stated with 보다 or understood from context.",
      "notes": ["훨씬 pairs with 더 / 덜: 훨씬 더 빨라요, 훨씬 덜 매워요.", "It needs a comparison target — usually marked with 보다 or clear from context.", "훨씬 can also come right before the adjective: 훨씬 좋아요 = 'much better'."]
    },
    "pitfalls": ["훨씬 needs a comparison in mind; on a plain statement with no 'than', it sounds incomplete.", "Use 훨씬 더, not 많이 더, to intensify a comparative: 많이 더 좋아요 is wrong → 훨씬 더 좋아요.", "훨씬 boosts adjectives/adverbs, not nouns: 훨씬 사람 is wrong."],
    "bridge": ["버스보다 지하철이 더 빨라요.", "제가 현우 씨보다 더 건강해요."],
    "vocab": [
      {"ko": "월등하다", "en": "to be far superior, outstanding", "romaji": "wol-deung-ha-da", "pos": "adj", "note": "越等; a clear cut above the rest"},
      {"ko": "격차", "en": "a gap, a disparity", "romaji": "gyeok-cha", "pos": "noun", "note": "隔差; the size of a difference"},
      {"ko": "대폭", "en": "greatly, by a large margin", "romaji": "dae-pok", "pos": "adv", "note": "大幅; 대폭 오르다 = to rise sharply"},
      {"ko": "현저하다", "en": "to be marked, remarkable", "romaji": "hyeon-jeo-ha-da", "pos": "adj", "note": "顯著; clearly noticeable"},
      {"ko": "압도적", "en": "overwhelming, dominant", "romaji": "ap-do-jeok", "pos": "adj", "note": "壓倒的; by an overwhelming degree"},
      {"ko": "갑절", "en": "double, twice as much", "romaji": "gap-jeol", "pos": "noun", "note": "two times the amount"},
      {"ko": "능가하다", "en": "to surpass, to exceed", "romaji": "neung-ga-ha-da", "pos": "verb", "note": "凌駕; to go beyond another"},
      {"ko": "우세하다", "en": "to be superior, to have the upper hand", "romaji": "u-se-ha-da", "pos": "adj", "note": "優勢; ahead in a contest"}
    ],
    "sentences": [
      {"ko": "지하철이 버스보다 훨씬 빨라요.", "en": "The subway is much faster than the bus.", "romaji": "ji-ha-cheo-ri beo-seu-bo-da hwol-ssin ppal-la-yo", "blankWord": "훨씬"},
      {"ko": "이게 저것보다 훨씬 더 비싸요.", "en": "This is much more expensive than that.", "romaji": "i-ge jeo-geot-bo-da hwol-ssin deo bi-ssa-yo", "blankWord": "훨씬"},
      {"ko": "오늘은 어제보다 훨씬 덜 추워요.", "en": "Today is much less cold than yesterday.", "romaji": "o-neu-reun eo-je-bo-da hwol-ssin deol chu-wo-yo", "blankWord": "훨씬"},
      {"ko": "이 방법이 저 방법보다 훨씬 좋아요.", "en": "This method is much better than that one.", "romaji": "i bang-beo-bi jeo bang-beop-bo-da hwol-ssin jo-a-yo", "blankWord": "훨씬"},
      {"ko": "두 사람의 실력 격차가 커요.", "en": "The skill gap between the two people is big.", "romaji": "du sa-ra-mui sil-lyeok gyeok-cha-ga keo-yo", "blankWord": "격차가"},
      {"ko": "이 가수는 압도적으로 인기가 많아요.", "en": "This singer is overwhelmingly popular.", "romaji": "i ga-su-neun ap-do-jeo-geu-ro in-gi-ga ma-na-yo", "blankWord": "압도적으로"},
      {"ko": "그 선수가 다른 선수를 능가해요.", "en": "That player surpasses the other players.", "romaji": "geu seon-su-ga da-reun seon-su-reul neung-ga-hae-yo", "blankWord": "능가해요"}
    ]
  },
  {
    "id": "4.28", "level": 4, "title": "To become + adjective", "point": "-아/어지다",
    "grammar": {
      "summary": "How to say something 'becomes / gets' more (adjective) — a change of state.",
      "formation": "Adjective stem + -아/어지다; the whole thing conjugates as a VERB.\n• ㅏ/ㅗ stem → -아지다  (좋다 → 좋아지다)\n• other vowel → -어지다  (예쁘다 → 예뻐지다)\n• 하다 → -해지다  (따뜻하다 → 따뜻해지다)\nConjugates: 좋아져요 / 좋아졌어요 / 좋아질 거예요.",
      "explanation": "Attach -아/어지다 to an adjective stem to say something 'becomes / gets' that way — marking a change of state. The vowel follows the same ㅏ/ㅗ vs. other rule as -아/어요, and 하다-adjectives become -해지다. Once attached, the result behaves like a verb: 날씨가 추워졌어요 = 'the weather got cold'. Present -아/어져요 describes an ongoing change ('is getting ~'); past -아/어졌어요 states that the change happened.",
      "notes": ["Vowel rule matches -아/어요: 좋아지다, 많아지다, 예뻐지다, 따뜻해지다.", "Present 좋아져요 = 'is getting better'; past 좋아졌어요 = 'has gotten better'.", "This is for adjectives; to say you 'come to do' a verb, use -게 되다 (next lesson).", "Heads-up for later: VERB + -아/어지다 exists too, but it makes a passive ('gets done'), not 'become' — a different pattern taught at higher levels."]
    },
    "pitfalls": ["-아/어지다 attaches to adjectives; for 'coming to do' a verb, use -게 되다 (Lesson 29).", "The vowel follows -아/어요: 좋아지다, 예뻐지다, 따뜻해지다 — not 좋어지다.", "Write 좋아졌어요 for a completed change; 좋아져요 means it's still changing."],
    "bridge": ["예전보다 더 잘 해요.", "이 영화 재미있을 것 같아요."],
    "vocab": [
      {"ko": "선명하다", "en": "to be vivid, clear-cut", "romaji": "seon-myeong-ha-da", "pos": "adj", "note": "鮮明; sharp and distinct"},
      {"ko": "촉촉하다", "en": "to be moist, damp", "romaji": "chok-cho-ka-da", "pos": "adj", "note": "pleasantly wet, not dry"},
      {"ko": "매끄럽다", "en": "to be smooth, sleek", "romaji": "mae-kkeu-reop-da", "pos": "adj", "note": "ㅂ-irregular: 매끄러워요"},
      {"ko": "뻣뻣하다", "en": "to be stiff, rigid", "romaji": "ppeot-ppeo-ta-da", "pos": "adj", "note": "not soft or flexible"},
      {"ko": "산뜻하다", "en": "to be fresh, crisp, refreshing", "romaji": "san-tteu-ta-da", "pos": "adj", "note": "light and clean-feeling"},
      {"ko": "느슨하다", "en": "to be loose, slack", "romaji": "neu-seun-ha-da", "pos": "adj", "note": "opposite of 팽팽하다"},
      {"ko": "팽팽하다", "en": "to be taut, tight", "romaji": "paeng-paeng-ha-da", "pos": "adj", "note": "stretched tight"},
      {"ko": "흐릿하다", "en": "to be blurry, faint", "romaji": "heu-ri-ta-da", "pos": "adj", "note": "opposite of 선명하다"}
    ],
    "sentences": [
      {"ko": "봄이 오면 날씨가 따뜻해져요.", "en": "When spring comes, the weather gets warm.", "romaji": "bo-mi o-myeon nal-ssi-ga tta-tteu-tae-jyeo-yo", "blankWord": "따뜻해져요"},
      {"ko": "운동을 하면 몸이 튼튼해져요.", "en": "If you exercise, your body gets stronger.", "romaji": "un-dong-eul ha-myeon mo-mi teun-teun-hae-jyeo-yo", "blankWord": "튼튼해져요"},
      {"ko": "청소를 해서 방이 깨끗해졌어요.", "en": "I cleaned, so the room got clean.", "romaji": "cheong-so-reul hae-seo bang-i kkae-kkeu-tae-jyeo-sseo-yo", "blankWord": "깨끗해졌어요"},
      {"ko": "세수를 하면 얼굴이 촉촉해져요.", "en": "When you wash your face, it gets moist.", "romaji": "se-su-reul ha-myeon eol-gu-ri chok-cho-kae-jyeo-yo", "blankWord": "촉촉해져요"},
      {"ko": "사진이 예전보다 훨씬 선명해졌어요.", "en": "The photo got much clearer than before.", "romaji": "sa-jin-i ye-jeon-bo-da hwol-ssin seon-myeong-hae-jyeo-sseo-yo", "blankWord": "선명해졌어요"},
      {"ko": "끈이 팽팽해졌어요.", "en": "The string got taut.", "romaji": "kkeu-ni paeng-paeng-hae-jyeo-sseo-yo", "blankWord": "팽팽해졌어요"},
      {"ko": "요즘 한국어 실력이 좋아지고 있어요.", "en": "These days my Korean skills are getting better.", "romaji": "yo-jeum han-gu-geo sil-lyeo-gi jo-a-ji-go i-sseo-yo", "blankWord": "좋아지고"}
    ]
  },
  {
    "id": "4.29", "level": 4, "title": "To gradually/eventually get to...", "point": "-게 되다",
    "grammar": {
      "summary": "How to say you 'came to / ended up / got to' do something, usually through circumstances.",
      "formation": "Verb stem + -게 되다.  되다 conjugates: 되다 / 됐어요 / 돼요 / 될 거예요.\n• 가다 → 가게 되다   • 먹다 → 먹게 되다   • 하다 → 하게 되다",
      "explanation": "Attach -게 되다 to a verb stem to say you 'ended up / came to / got to' do something — usually because of outside circumstances rather than your own plan. 한국에서 일하게 됐어요 = 'I ended up working in Korea'. It's the standard, humble way to announce news about yourself (회사를 옮기게 됐어요 = 'it came about that I'm changing companies'). 되다 spells as 돼요 / 됐어요. Contrast with Lesson 28: adjectives 'become' with -아/어지다; verbs 'come about' with -게 되다.",
      "notes": ["Very common for humble announcements: 결혼하게 됐어요 = 'I'm getting married (as it turned out)'.", "It implies circumstance or arrangement, not pure personal choice.", "Spelling: 되 + 어 → 돼, so 됐어요 / 돼요, never 됬어요 / 되요."]
    },
    "pitfalls": ["-게 되다 is for verbs (come to do); adjectives use -아/어지다 (Lesson 28).", "Write 됐어요 / 돼요, not 됬어요 / 되요.", "It frames the change as external — for a deliberate plan, plain past (했어요) is more direct."],
    "bridge": ["한국어가 너무 재미있어서 매일 공부하고 있어요.", "그런 것 같아요."],
    "vocab": [
      {"ko": "취업하다", "en": "to get a job, to get employed", "romaji": "chwi-eo-pa-da", "pos": "verb", "note": "就業; to enter the workforce"},
      {"ko": "입사하다", "en": "to join a company", "romaji": "ip-sa-ha-da", "pos": "verb", "note": "入社; opposite of 퇴사하다"},
      {"ko": "퇴사하다", "en": "to leave a company, to resign", "romaji": "toe-sa-ha-da", "pos": "verb", "note": "退社; to quit one's job"},
      {"ko": "전학하다", "en": "to transfer schools", "romaji": "jeon-ha-ka-da", "pos": "verb", "note": "轉學; to change to another school"},
      {"ko": "유학하다", "en": "to study abroad", "romaji": "yu-ha-ka-da", "pos": "verb", "note": "留學; to study in another country"},
      {"ko": "적응하다", "en": "to adapt, to adjust", "romaji": "jeo-geung-ha-da", "pos": "verb", "note": "適應; 적응하다 + 에 (adjust to)"},
      {"ko": "합격하다", "en": "to pass (an exam), to be accepted", "romaji": "hap-gyeo-ka-da", "pos": "verb", "note": "合格; opposite of 불합격"}
    ],
    "sentences": [
      {"ko": "저는 내년에 한국에서 유학하게 됐어요.", "en": "I ended up going to study in Korea next year.", "romaji": "jeo-neun nae-nyeon-e han-gu-ge-seo yu-ha-ka-ge dwae-sseo-yo", "blankWord": "유학하게 됐어요"},
      {"ko": "열심히 공부해서 시험에 합격하게 됐어요.", "en": "I studied hard and ended up passing the exam.", "romaji": "yeol-sim-hi gong-bu-hae-seo si-heo-me hap-gyeo-ka-ge dwae-sseo-yo", "blankWord": "합격하게 됐어요"},
      {"ko": "새 회사에 입사하게 됐어요.", "en": "It turned out I'm joining a new company.", "romaji": "sae hoe-sa-e ip-sa-ha-ge dwae-sseo-yo", "blankWord": "입사하게 됐어요"},
      {"ko": "이제 이 도시에 적응하게 됐어요.", "en": "By now I've come to adjust to this city.", "romaji": "i-je i do-si-e jeo-geung-ha-ge dwae-sseo-yo", "blankWord": "적응하게 됐어요"},
      {"ko": "어제 그 친구를 다시 만나게 됐어요.", "en": "Yesterday I ended up meeting that friend again.", "romaji": "eo-je geu chin-gu-reul da-si man-na-ge dwae-sseo-yo", "blankWord": "만나게 됐어요"},
      {"ko": "사정이 있어서 회사를 퇴사하게 됐어요.", "en": "Due to circumstances, I ended up leaving the company.", "romaji": "sa-jeong-i i-sseo-seo hoe-sa-reul toe-sa-ha-ge dwae-sseo-yo", "blankWord": "퇴사하게 됐어요"},
      {"ko": "저는 한국 음식을 아주 좋아하게 됐어요.", "en": "I've come to really like Korean food.", "romaji": "jeo-neun han-guk eum-si-geul a-ju jo-a-ha-ge dwae-sseo-yo", "blankWord": "좋아하게 됐어요"}
    ]
  },
  {
    "id": "4.30", "level": 4, "title": "Sentence Building Drill #2", "point": "복습 / 문장 만들기",
    "grammar": {
      "summary": "A second review drill — combine Level 4 grammar, now including 훨씬, -아/어지다, and -게 되다.",
      "formation": "No new form. Stack points from Lessons 1–29 — e.g. 훨씬 (Lesson 24) + -아/어지다 (Lesson 28), or -게 되다 (Lesson 29) + -아/어서.",
      "explanation": "Like Drill 1, this builds longer sentences by combining patterns you already know, now reaching through Lesson 29. Notice how 'much more' (훨씬), 'become' (-아/어지다), and 'end up doing' (-게 되다) slot together with earlier grammar. Read each, spot the two points, then compose your own.",
      "notes": ["No new grammar — this draws on Lessons 1–29.", "Combine at least two patterns in each sentence.", "Mind 되다 spelling (돼요 / 됐어요) and the -아/어 vowel in -아/어지다."]
    },
    "pitfalls": ["Each point keeps its own conjugation when combined.", "Watch spacing and register — pick full or contracted forms to match the situation."],
    "bridge": ["예전보다 한국어를 더 잘 해요.", "저는 요즘에 평소보다 더 바빠요."],
    "vocab": [],
    "sentences": [
      {"ko": "요즘 날씨가 훨씬 따뜻해졌어요.", "en": "The weather has gotten much warmer lately.", "romaji": "yo-jeum nal-ssi-ga hwol-ssin tta-tteu-tae-jyeo-sseo-yo", "blankWord": "따뜻해졌어요"},
      {"ko": "한국 생활에 적응하게 돼서 마음이 편해졌어요.", "en": "I came to adjust to life in Korea, so I feel more at ease.", "romaji": "han-guk saeng-hwa-re jeo-geung-ha-ge dwae-seo ma-eu-mi pyeon-hae-jyeo-sseo-yo", "blankWord": "적응하게 돼서"},
      {"ko": "봄이 와서 날씨가 덜 추워졌어요.", "en": "Spring came, so it's gotten less cold.", "romaji": "bo-mi wa-seo nal-ssi-ga deol chu-wo-jyeo-sseo-yo", "blankWord": "추워졌어요"},
      {"ko": "제일 가고 싶은 회사에 입사하게 됐어요.", "en": "I ended up joining the company I most wanted to.", "romaji": "je-il ga-go si-peun hoe-sa-e ip-sa-ha-ge dwae-sseo-yo", "blankWord": "입사하게 됐어요"},
      {"ko": "노력해서 실력이 훨씬 좋아졌어요.", "en": "I made an effort, so my skills got much better.", "romaji": "no-ryeo-kae-seo sil-lyeo-gi hwol-ssin jo-a-jyeo-sseo-yo", "blankWord": "좋아졌어요"},
      {"ko": "이제 아무거나 잘 먹게 됐어요.", "en": "By now I've come to eat just about anything.", "romaji": "i-je a-mu-geo-na jal meok-ge dwae-sseo-yo", "blankWord": "먹게 됐어요"}
    ]
  }
];

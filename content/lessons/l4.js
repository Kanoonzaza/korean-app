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
  }
];

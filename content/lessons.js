/* Korean Learning App — Level 4 lessons
 * Original content following the standard early-intermediate ("modals") grammar
 * sequence that comes after TTMIK Level 3. No copyrighted lesson text is used.
 *
 * To add a lesson: copy one object below, change the fields, keep the shape.
 * Shape:
 *   id, level, title,
 *   grammar { summary, formation, explanation, notes[] }
 *   pitfalls[]                         // "common mistakes / usage notes"
 *   vocab[]     { ko, en, romaji, pos, note }
 *   sentences[] { ko, en, romaji, blankWord }   // blankWord = the grammar chunk to hide
 */
window.LESSONS = [
  {
    id: "4.1",
    level: 4,
    title: "Have to / Must",
    point: "V-아/어야 되다 / 하다",
    grammar: {
      summary: "How to say you have to (must) do something.",
      formation:
        "Take the verb stem, add 아/어야, then 되다 or 하다 (conjugated, usually 돼요 / 해요).\n" +
        "• stem vowel ㅏ or ㅗ → 아야   (가다 → 가야)\n" +
        "• any other vowel    → 어야   (먹다 → 먹어야)\n" +
        "• 하다 verbs         → 해야   (공부하다 → 공부해야)",
      explanation:
        "이/that '아/어야 되다' pattern is the everyday way to express obligation — " +
        "\"I have to…\", \"You must…\". The 아/어야 part follows the exact same vowel rules " +
        "you already use for the 아/어요 present tense, so if you can make 가요/먹어요 you can " +
        "make 가야/먹어야. After it you attach 되다 (more conversational) or 하다 " +
        "(slightly more formal) — they mean the same thing here.",
      notes: [
        "되다 and 하다 are interchangeable in this pattern; 돼요 sounds a bit softer/spoken.",
        "Watch the spelling: 되 + 어요 contracts to 돼요 (not 되요).",
        "To say you do NOT have to do something, you use a different pattern: 안 ~아/어도 돼요."
      ]
    },
    pitfalls: [
      "Don't write 되요 — the correct contraction of 되 + 어요 is 돼요.",
      "Don't add 요 to 하다 here: it's 해야 돼요 / 해야 해요, never 하야 or 해야 한다요.",
      "이 pattern is obligation, not desire — 'have to', not 'want to' (that's ~고 싶다)."
    ],
    vocab: [
      { ko: "가다", en: "to go", romaji: "ga-da", pos: "verb", note: "" },
      { ko: "먹다", en: "to eat", romaji: "meok-da", pos: "verb", note: "" },
      { ko: "자다", en: "to sleep", romaji: "ja-da", pos: "verb", note: "" },
      { ko: "사다", en: "to buy", romaji: "sa-da", pos: "verb", note: "" },
      { ko: "일어나다", en: "to get up", romaji: "i-reo-na-da", pos: "verb", note: "" },
      { ko: "공부하다", en: "to study", romaji: "gong-bu-ha-da", pos: "verb", note: "" },
      { ko: "약", en: "medicine", romaji: "yak", pos: "noun", note: "약을 먹다 = to take medicine" },
      { ko: "표", en: "ticket", romaji: "pyo", pos: "noun", note: "" },
      { ko: "일찍", en: "early", romaji: "il-jjik", pos: "adverb", note: "" },
      { ko: "지금", en: "now", romaji: "ji-geum", pos: "adverb", note: "" }
    ],
    sentences: [
      { ko: "지금 가야 돼요.", en: "I have to go now.", romaji: "ji-geum ga-ya dwae-yo", blankWord: "가야" },
      { ko: "약을 먹어야 해요.", en: "I have to take medicine.", romaji: "ya-geul meo-geo-ya hae-yo", blankWord: "먹어야" },
      { ko: "일찍 일어나야 돼요.", en: "I have to get up early.", romaji: "il-jjik i-reo-na-ya dwae-yo", blankWord: "일어나야" },
      { ko: "한국어를 공부해야 해요.", en: "I have to study Korean.", romaji: "han-gu-geo-reul gong-bu-hae-ya hae-yo", blankWord: "공부해야" },
      { ko: "표를 사야 돼요.", en: "I have to buy a ticket.", romaji: "pyo-reul sa-ya dwae-yo", blankWord: "사야" },
      { ko: "이제 자야 돼요.", en: "I have to sleep now.", romaji: "i-je ja-ya dwae-yo", blankWord: "자야" }
    ]
  },

  {
    id: "4.2",
    level: 4,
    title: "May / Must not",
    point: "V-아/어도 되다  ·  V-(으)면 안 되다",
    grammar: {
      summary: "How to give permission ('you may') and prohibition ('you must not').",
      formation:
        "Permission — stem + 아/어도 되다:\n" +
        "• ㅏ/ㅗ → 아도   (앉다 → 앉아도),   other → 어도 (찍다 → 찍어도),   하다 → 해도\n\n" +
        "Prohibition — stem + (으)면 안 되다:\n" +
        "• vowel/ㄹ stem → 면   (가다 → 가면),   consonant stem → 으면 (찍다 → 찍으면)",
      explanation:
        "These two patterns are a natural pair. '아/어도 되다' literally means 'even if you do " +
        "X, it's okay' → 'you may X / it's fine to X', and it's very common as a question: " +
        "'~아/어도 돼요?' = 'May I…?'. Its opposite, '(으)면 안 되다', means 'if you do X, it " +
        "becomes not-okay' → 'you must not X'. The 으 in 으면 only appears after a consonant, " +
        "just like other (으) endings you've seen.",
      notes: [
        "~아/어도 돼요? is the polite way to ask permission ('Is it okay if I…?').",
        "되다 can be swapped for 괜찮다 or 좋다 in the permission pattern (앉아도 괜찮아요).",
        "Again mind the spelling: 돼요, not 되요."
      ]
    },
    pitfalls: [
      "Prohibition is (으)면 안 돼요 — don't drop the 안 (without it you'd be giving permission!).",
      "Use 으면 only after a consonant stem: 가다 → 가면 (not 가으면), 먹다 → 먹으면.",
      "안 sits before 되다 here (…면 안 돼요), not before the main verb."
    ],
    vocab: [
      { ko: "앉다", en: "to sit", romaji: "an-da", pos: "verb", note: "" },
      { ko: "찍다", en: "to take (a photo)", romaji: "jjik-da", pos: "verb", note: "사진을 찍다" },
      { ko: "피우다", en: "to smoke", romaji: "pi-u-da", pos: "verb", note: "담배를 피우다" },
      { ko: "늦다", en: "to be late", romaji: "neut-da", pos: "verb", note: "" },
      { ko: "들어가다", en: "to go in / enter", romaji: "deu-reo-ga-da", pos: "verb", note: "" },
      { ko: "사진", en: "photo", romaji: "sa-jin", pos: "noun", note: "" },
      { ko: "담배", en: "cigarette", romaji: "dam-bae", pos: "noun", note: "" },
      { ko: "여기", en: "here", romaji: "yeo-gi", pos: "noun", note: "여기에서 = here (at)" }
    ],
    sentences: [
      { ko: "여기 앉아도 돼요.", en: "You may sit here.", romaji: "yeo-gi an-ja-do dwae-yo", blankWord: "앉아도" },
      { ko: "사진을 찍어도 돼요?", en: "May I take a photo?", romaji: "sa-ji-neul jji-geo-do dwae-yo", blankWord: "찍어도" },
      { ko: "지금 들어가도 돼요?", en: "May I go in now?", romaji: "ji-geum deu-reo-ga-do dwae-yo", blankWord: "들어가도" },
      { ko: "여기에서 담배를 피우면 안 돼요.", en: "You must not smoke here.", romaji: "yeo-gi-e-seo dam-bae-reul pi-u-myeon an dwae-yo", blankWord: "피우면" },
      { ko: "사진을 찍으면 안 돼요.", en: "You must not take photos.", romaji: "sa-ji-neul jji-geu-myeon an dwae-yo", blankWord: "찍으면" },
      { ko: "늦으면 안 돼요.", en: "You must not be late.", romaji: "neu-jeu-myeon an dwae-yo", blankWord: "늦으면" }
    ]
  },

  {
    id: "4.3",
    level: 4,
    title: "Can / Cannot",
    point: "V-(으)ㄹ 수 있다 / 없다",
    grammar: {
      summary: "How to say you can or cannot do something (ability / possibility).",
      formation:
        "Stem + (으)ㄹ 수 있다 (can) / 없다 (cannot):\n" +
        "• vowel stem → ㄹ 수   (가다 → 갈 수)\n" +
        "• consonant stem → 을 수 (먹다 → 먹을 수)\n" +
        "• ㄹ-stem drops nothing special here → 만들다 → 만들 수\n" +
        "Then finish with 있어요 (can) or 없어요 (cannot).",
      explanation:
        "수 means something like 'a way / possibility', so 갈 수 있어요 literally reads " +
        "'there is a way to go' → 'I can go', and 갈 수 없어요 is 'there is no way to go' → " +
        "'I can't go'. Keep 수 as its own spaced word: 갈 수 있어요. The (으)ㄹ ending is the " +
        "same future-style modifier you'll meet again, so it's worth getting comfortable with.",
      notes: [
        "수 is always written with spaces around it: 먹을 수 있어요.",
        "못 + verb is a shorter everyday way to say 'cannot': 못 가요 ≈ 갈 수 없어요.",
        "있다/없다 here is the same 'exist / not exist' verb you already know."
      ]
    },
    pitfalls: [
      "Don't glue 수 to the verb — it's 갈 수 있어요, with spaces (not 갈수있어요).",
      "Consonant stems take 을 수: 먹다 → 먹을 수 (not 먹ㄹ 수).",
      "있어요 = can, 없어요 = cannot — don't mix them up."
    ],
    vocab: [
      { ko: "수영하다", en: "to swim", romaji: "su-yeong-ha-da", pos: "verb", note: "" },
      { ko: "운전하다", en: "to drive", romaji: "un-jeon-ha-da", pos: "verb", note: "" },
      { ko: "읽다", en: "to read", romaji: "ik-da", pos: "verb", note: "" },
      { ko: "오다", en: "to come", romaji: "o-da", pos: "verb", note: "" },
      { ko: "만들다", en: "to make", romaji: "man-deul-da", pos: "verb", note: "ㄹ-stem verb" },
      { ko: "맵다", en: "to be spicy", romaji: "maep-da", pos: "adjective", note: "매운 음식 = spicy food" },
      { ko: "음식", en: "food", romaji: "eum-sik", pos: "noun", note: "" },
      { ko: "내일", en: "tomorrow", romaji: "nae-il", pos: "noun", note: "" }
    ],
    sentences: [
      { ko: "저는 수영할 수 있어요.", en: "I can swim.", romaji: "jeo-neun su-yeong-hal su i-sseo-yo", blankWord: "수영할 수" },
      { ko: "매운 음식을 먹을 수 있어요?", en: "Can you eat spicy food?", romaji: "mae-un eum-si-geul meo-geul su i-sseo-yo", blankWord: "먹을 수" },
      { ko: "한국어를 읽을 수 있어요.", en: "I can read Korean.", romaji: "han-gu-geo-reul il-geul su i-sseo-yo", blankWord: "읽을 수" },
      { ko: "내일 올 수 있어요?", en: "Can you come tomorrow?", romaji: "nae-il ol su i-sseo-yo", blankWord: "올 수" },
      { ko: "오늘은 운전할 수 없어요.", en: "I can't drive today.", romaji: "o-neu-reun un-jeon-hal su eop-seo-yo", blankWord: "운전할 수" },
      { ko: "지금은 갈 수 없어요.", en: "I can't go now.", romaji: "ji-geu-meun gal su eop-seo-yo", blankWord: "갈 수" }
    ]
  },

  {
    id: "4.4",
    level: 4,
    title: "Because / So",
    point: "V-(으)니까",
    grammar: {
      summary: "How to give a reason — especially when telling or suggesting what to do.",
      formation:
        "Stem + (으)니까:\n" +
        "• vowel / ㄹ stem → 니까   (가다 → 가니까,  비싸다 → 비싸니까)\n" +
        "• consonant stem  → 으니까 (먹다 → 먹으니까,  좋다 → 좋으니까)",
      explanation:
        "(으)니까 marks the reason clause: \"because X, (so) Y\". Its special strength is that " +
        "— unlike 아/어서, the other 'because' you met earlier — it CAN be followed by a command " +
        "or a suggestion. So when the second half is 'let's…', 'please…', or 'don't…', use 니까: " +
        "비싸니까 사지 마세요 = 'It's expensive, so don't buy it.'",
      notes: [
        "Order is reason first: [reason]-(으)니까 [result].",
        "으 appears only after a consonant: 가다 → 가니까 (not 가으니까).",
        "Great with 갈까요? / ~(으)세요 / ~지 마세요 in the second clause."
      ]
    },
    pitfalls: [
      "Use 으 only after a consonant stem: 오다 → 오니까, 먹다 → 먹으니까.",
      "When the result is a command or suggestion, use 니까 — NOT 아/어서 (사서 사지 마세요 is wrong).",
      "Put the reason BEFORE 니까; the result comes after."
    ],
    vocab: [
      { ko: "피곤하다", en: "to be tired", romaji: "pi-gon-ha-da", pos: "adjective", note: "" },
      { ko: "비가 오다", en: "to rain", romaji: "bi-ga o-da", pos: "phrase", note: "lit. 'rain comes'" },
      { ko: "배고프다", en: "to be hungry", romaji: "bae-go-peu-da", pos: "adjective", note: "" },
      { ko: "타다", en: "to ride / take", romaji: "ta-da", pos: "verb", note: "택시를 타다" },
      { ko: "택시", en: "taxi", romaji: "taek-si", pos: "noun", note: "" },
      { ko: "날씨", en: "weather", romaji: "nal-ssi", pos: "noun", note: "" },
      { ko: "산책하다", en: "to take a walk", romaji: "san-chaek-ha-da", pos: "verb", note: "" },
      { ko: "시간", en: "time", romaji: "si-gan", pos: "noun", note: "" }
    ],
    sentences: [
      { ko: "피곤하니까 일찍 잘 거예요.", en: "Since I'm tired, I'll sleep early.", romaji: "pi-gon-ha-ni-kka il-jjik jal geo-ye-yo", blankWord: "피곤하니까" },
      { ko: "비가 오니까 집에 있어요.", en: "Because it's raining, let's stay home.", romaji: "bi-ga o-ni-kka ji-be i-sseo-yo", blankWord: "오니까" },
      { ko: "시간이 없으니까 택시를 타요.", en: "Since there's no time, let's take a taxi.", romaji: "si-ga-ni eop-seu-ni-kka taek-si-reul ta-yo", blankWord: "없으니까" },
      { ko: "이거 비싸니까 사지 마세요.", en: "This is expensive, so don't buy it.", romaji: "i-geo bi-ssa-ni-kka sa-ji ma-se-yo", blankWord: "비싸니까" },
      { ko: "날씨가 좋으니까 산책할까요?", en: "The weather's nice, so shall we take a walk?", romaji: "nal-ssi-ga jo-eu-ni-kka san-chaek-hal-kka-yo", blankWord: "좋으니까" },
      { ko: "배고프니까 밥 먹어요.", en: "I'm hungry, so let's eat.", romaji: "bae-go-peu-ni-kka bap meo-geo-yo", blankWord: "배고프니까" }
    ]
  },

  {
    id: "4.5",
    level: 4,
    title: "If / When",
    point: "V-(으)면",
    grammar: {
      summary: "How to set up a condition: 'if…' or 'when(ever)…'.",
      formation:
        "Stem + (으)면:\n" +
        "• vowel / ㄹ stem → 면   (가다 → 가면,  누르다 → 누르면)\n" +
        "• consonant stem  → 으면 (먹다 → 먹으면,  있다 → 있으면)",
      explanation:
        "(으)면 attaches to the condition clause: \"if/when X, then Y\". One form covers both " +
        "'if' (한국에 가면 = if you go to Korea) and general 'whenever' (비가 오면 = whenever it " +
        "rains). The result clause that follows can be a fact, a plan (-ㄹ 거예요), a question, or " +
        "a request.",
      notes: [
        "Condition first: [condition]-(으)면 [result].",
        "으 appears only after a consonant: 가다 → 가면, 먹다 → 먹으면.",
        "For a specific past 'when', Korean usually uses 때 instead of (으)면."
      ]
    },
    pitfalls: [
      "Use 으 only after a consonant stem: 오다 → 오면, 먹다 → 먹으면.",
      "(으)면 = 'if' OR general 'whenever' — context tells which; it's not for a one-time past 'when'.",
      "Don't confuse 면 (if) with 면 안 되다 (must not) from Lesson 4.2 — different patterns."
    ],
    vocab: [
      { ko: "영화", en: "movie", romaji: "yeong-hwa", pos: "noun", note: "영화를 보다" },
      { ko: "도착하다", en: "to arrive", romaji: "do-chak-ha-da", pos: "verb", note: "" },
      { ko: "누르다", en: "to press", romaji: "nu-reu-da", pos: "verb", note: "" },
      { ko: "버튼", en: "button", romaji: "beo-teun", pos: "noun", note: "" },
      { ko: "열리다", en: "to open (by itself)", romaji: "yeol-li-da", pos: "verb", note: "문이 열리다" },
      { ko: "아프다", en: "to hurt / be sick", romaji: "a-peu-da", pos: "adjective", note: "" },
      { ko: "끝나다", en: "to end / finish", romaji: "kkeun-na-da", pos: "verb", note: "" },
      { ko: "전화하다", en: "to call (phone)", romaji: "jeon-hwa-ha-da", pos: "verb", note: "" }
    ],
    sentences: [
      { ko: "시간이 있으면 영화를 봐요.", en: "If I have time, I watch a movie.", romaji: "si-ga-ni i-sseu-myeon yeong-hwa-reul bwa-yo", blankWord: "있으면" },
      { ko: "비가 오면 집에 있을 거예요.", en: "If it rains, I'll stay home.", romaji: "bi-ga o-myeon ji-be i-sseul geo-ye-yo", blankWord: "오면" },
      { ko: "한국에 가면 뭐 하고 싶어요?", en: "When you go to Korea, what do you want to do?", romaji: "han-gu-ge ga-myeon mwo ha-go si-peo-yo", blankWord: "가면" },
      { ko: "이 버튼을 누르면 문이 열려요.", en: "If you press this button, the door opens.", romaji: "i beo-teu-neul nu-reu-myeon mu-ni yeol-lyeo-yo", blankWord: "누르면" },
      { ko: "배가 아프면 약을 드세요.", en: "If your stomach hurts, take some medicine.", romaji: "bae-ga a-peu-myeon ya-geul deu-se-yo", blankWord: "아프면" },
      { ko: "끝나면 전화해 주세요.", en: "When it's finished, please call me.", romaji: "kkeun-na-myeon jeon-hwa-hae ju-se-yo", blankWord: "끝나면" }
    ]
  },

  {
    id: "4.6",
    level: 4,
    title: "I think / It seems",
    point: "(으)ㄴ/는/(으)ㄹ 것 같다",
    grammar: {
      summary: "How to give an opinion or guess: 'I think…', 'it seems…', 'probably…'.",
      formation:
        "Pick the form by tense + word type, then add 것 같다:\n" +
        "• Verb, now    → V-는 것 같다     (자다 → 자는 것 같다)\n" +
        "• Verb, past   → V-(으)ㄴ 것 같다  (가다 → 간 것 같다)\n" +
        "• Guess/future → V-(으)ㄹ 것 같다  (오다 → 올 것 같다)\n" +
        "• Adjective    → A-(으)ㄴ 것 같다  (비싸다 → 비싼 것 같다)\n" +
        "• Noun         → N + 인 것 같다     (학생 → 학생인 것 같다)",
      explanation:
        "것 같다 softens a statement into an opinion or guess. The (으)ㄹ form is the most " +
        "common — use it for predictions ('it'll probably…'). Choose 는/(으)ㄴ/(으)ㄹ by when " +
        "the action happens and whether the word is a verb or adjective.",
      notes: [
        "Future/guess form is the everyday default: 비가 올 것 같아요 = 'I think it'll rain.'",
        "Adjectives take -(으)ㄴ: 비싼 것 같아요, 작은 것 같아요.",
        "Nouns take 인 것 같다: 학생인 것 같아요."
      ]
    },
    pitfalls: [
      "Match the form to tense AND type: verb-now 는 / verb-past (으)ㄴ / guess (으)ㄹ / adjective (으)ㄴ.",
      "Don't confuse with plain future -(으)ㄹ 거예요; 것 같다 adds 'I think / it seems'.",
      "것 같다 is for YOUR guess/opinion, not stating a hard fact."
    ],
    vocab: [
      { ko: "재미있다", en: "to be fun / interesting", romaji: "jae-mi-it-da", pos: "adjective", note: "" },
      { ko: "벌써", en: "already", romaji: "beol-sseo", pos: "adverb", note: "" },
      { ko: "옷", en: "clothes", romaji: "ot", pos: "noun", note: "" },
      { ko: "학생", en: "student", romaji: "hak-saeng", pos: "noun", note: "" },
      { ko: "사람", en: "person", romaji: "sa-ram", pos: "noun", note: "" },
      { ko: "비싸다", en: "to be expensive", romaji: "bi-ssa-da", pos: "adjective", note: "" },
      { ko: "영화", en: "movie", romaji: "yeong-hwa", pos: "noun", note: "" },
      { ko: "비가 오다", en: "to rain", romaji: "bi-ga o-da", pos: "phrase", note: "" }
    ],
    sentences: [
      { ko: "비가 올 것 같아요.", en: "I think it'll rain.", romaji: "bi-ga ol geot ga-ta-yo", blankWord: "올 것 같아요" },
      { ko: "그 사람은 학생인 것 같아요.", en: "He seems to be a student.", romaji: "geu sa-ra-meun hak-saeng-in geot ga-ta-yo", blankWord: "학생인 것 같아요" },
      { ko: "이 옷은 비싼 것 같아요.", en: "These clothes seem expensive.", romaji: "i o-seun bi-ssan geot ga-ta-yo", blankWord: "비싼 것 같아요" },
      { ko: "친구가 벌써 간 것 같아요.", en: "It seems my friend already left.", romaji: "chin-gu-ga beol-sseo gan geot ga-ta-yo", blankWord: "간 것 같아요" },
      { ko: "지금 자는 것 같아요.", en: "I think he's sleeping now.", romaji: "ji-geum ja-neun geot ga-ta-yo", blankWord: "자는 것 같아요" },
      { ko: "이 영화는 재미있을 것 같아요.", en: "This movie looks like it'll be fun.", romaji: "i yeong-hwa-neun jae-mi-i-sseul geot ga-ta-yo", blankWord: "재미있을 것 같아요" }
    ]
  },

  {
    id: "4.7",
    level: 4,
    title: "To become",
    point: "A-아/어지다",
    grammar: {
      summary: "How to say something 'becomes / gets' a certain way (change of state).",
      formation:
        "Adjective stem + 아/어지다 (same 아/어 rule as the present tense):\n" +
        "• ㅏ/ㅗ → 아지다   (좋다 → 좋아지다)\n" +
        "• other → 어지다   (재미있다 → 재미있어지다)\n" +
        "• 하다  → 해지다   (건강하다 → 건강해지다)\n" +
        "Then conjugate: 좋아져요 (becomes good), 좋아졌어요 (became good).",
      explanation:
        "Korean adjectives can't take past tense to mean 'became' on their own — you add 아/어지다 " +
        "to express change over time: 날씨가 따뜻해졌어요 = 'the weather got warm.' Think of it as " +
        "'-er / more …' happening: 바빠지다 = to get busier.",
      notes: [
        "Attaches to ADJECTIVES to show change of state.",
        "으-stems contract: 크다 → 커지다, 예쁘다 → 예뻐지다, 바쁘다 → 바빠지다.",
        "Past = 아/어졌어요 (좋아졌어요 = it got better)."
      ]
    },
    pitfalls: [
      "Follow the 아/어 vowel rule: 좋다 → 좋아지다, 재미있다 → 재미있어지다.",
      "Use this for adjectives ('become …'); don't tack tense straight onto the bare adjective.",
      "해지다 for 하다-adjectives: 건강하다 → 건강해지다 (not 건강하지다)."
    ],
    vocab: [
      { ko: "따뜻하다", en: "to be warm", romaji: "tta-tteut-ha-da", pos: "adjective", note: "" },
      { ko: "바쁘다", en: "to be busy", romaji: "ba-ppeu-da", pos: "adjective", note: "" },
      { ko: "건강하다", en: "to be healthy", romaji: "geon-gang-ha-da", pos: "adjective", note: "" },
      { ko: "깨끗하다", en: "to be clean", romaji: "kkae-kkeut-ha-da", pos: "adjective", note: "" },
      { ko: "예쁘다", en: "to be pretty", romaji: "ye-ppeu-da", pos: "adjective", note: "" },
      { ko: "점점", en: "gradually", romaji: "jeom-jeom", pos: "adverb", note: "" },
      { ko: "요즘", en: "these days", romaji: "yo-jeum", pos: "noun", note: "" },
      { ko: "운동하다", en: "to exercise", romaji: "un-dong-ha-da", pos: "verb", note: "" }
    ],
    sentences: [
      { ko: "날씨가 따뜻해졌어요.", en: "The weather got warm.", romaji: "nal-ssi-ga tta-tteut-hae-jyeo-sseo-yo", blankWord: "따뜻해졌어요" },
      { ko: "한국어가 점점 재미있어졌어요.", en: "Korean has gradually become fun.", romaji: "han-gu-geo-ga jeom-jeom jae-mi-i-sseo-jyeo-sseo-yo", blankWord: "재미있어졌어요" },
      { ko: "요즘 더 바빠졌어요.", en: "I've gotten busier these days.", romaji: "yo-jeum deo ba-ppa-jyeo-sseo-yo", blankWord: "바빠졌어요" },
      { ko: "운동하면 건강해져요.", en: "If you exercise, you become healthy.", romaji: "un-dong-ha-myeon geon-gang-hae-jyeo-yo", blankWord: "건강해져요" },
      { ko: "방이 깨끗해졌어요.", en: "The room became clean.", romaji: "bang-i kkae-kkeut-hae-jyeo-sseo-yo", blankWord: "깨끗해졌어요" },
      { ko: "사진이 더 예뻐졌어요.", en: "The photo turned out prettier.", romaji: "sa-ji-ni deo ye-ppeo-jyeo-sseo-yo", blankWord: "예뻐졌어요" }
    ]
  },

  {
    id: "4.8",
    level: 4,
    title: "When (doing)",
    point: "V-(으)ㄹ 때",
    grammar: {
      summary: "How to say 'when / at the time of (doing) something'.",
      formation:
        "Stem + (으)ㄹ 때:\n" +
        "• vowel/ㄹ stem → ㄹ 때   (가다 → 갈 때)\n" +
        "• consonant stem → 을 때  (먹다 → 먹을 때)\n" +
        "Completed past 'when' → V-았/었을 때 (가다 → 갔을 때 = when I went).",
      explanation:
        "때 means 'time', so 갈 때 = 'when (I) go'. Keep 때 as a separate word. For something " +
        "that already happened use the past form: 어렸을 때 / 갔을 때.",
      notes: [
        "때 is written with a space: 먹을 때, 갈 때.",
        "Past 'when' uses 았/었을 때: 밥을 먹었을 때.",
        "Common: 어릴 때 (when young), 시간이 있을 때 (when I have time)."
      ]
    },
    pitfalls: [
      "Keep the space: 갈 때 (not 갈때).",
      "Consonant stems take 을 때: 먹다 → 먹을 때.",
      "듣다 is ㄷ-irregular: 들을 때 (when listening)."
    ],
    vocab: [
      { ko: "때", en: "time / when", romaji: "ttae", pos: "noun", note: "" },
      { ko: "어리다", en: "to be young", romaji: "eo-ri-da", pos: "adjective", note: "어릴 때 = when young" },
      { ko: "우산", en: "umbrella", romaji: "u-san", pos: "noun", note: "" },
      { ko: "심심하다", en: "to be bored", romaji: "sim-sim-ha-da", pos: "adjective", note: "" },
      { ko: "음악", en: "music", romaji: "eu-mak", pos: "noun", note: "" },
      { ko: "듣다", en: "to listen", romaji: "deut-da", pos: "verb", note: "ㄷ-irregular: 들어요" },
      { ko: "가져가다", en: "to take (along)", romaji: "ga-jeo-ga-da", pos: "verb", note: "" },
      { ko: "살다", en: "to live", romaji: "sal-da", pos: "verb", note: "" }
    ],
    sentences: [
      { ko: "밥을 먹을 때 전화가 왔어요.", en: "When I was eating, the phone rang.", romaji: "ba-beul meo-geul ttae jeon-hwa-ga wa-sseo-yo", blankWord: "먹을 때" },
      { ko: "시간이 있을 때 책을 읽어요.", en: "When I have time, I read books.", romaji: "si-ga-ni i-sseul ttae chae-geul il-geo-yo", blankWord: "있을 때" },
      { ko: "어릴 때 한국에 살았어요.", en: "When I was young, I lived in Korea.", romaji: "eo-ril ttae han-gu-ge sa-ra-sseo-yo", blankWord: "어릴 때" },
      { ko: "운전할 때 전화하지 마세요.", en: "Don't call when you're driving.", romaji: "un-jeon-hal ttae jeon-hwa-ha-ji ma-se-yo", blankWord: "운전할 때" },
      { ko: "집에 갈 때 우산을 가져가세요.", en: "Take an umbrella when you go home.", romaji: "ji-be gal ttae u-sa-neul ga-jeo-ga-se-yo", blankWord: "갈 때" },
      { ko: "심심할 때 음악을 들어요.", en: "When I'm bored, I listen to music.", romaji: "sim-sim-hal ttae eu-ma-geul deu-reo-yo", blankWord: "심심할 때" }
    ]
  },

  {
    id: "4.9",
    level: 4,
    title: "Before doing",
    point: "V-기 전에",
    grammar: {
      summary: "How to say 'before (doing) something'.",
      formation:
        "Verb stem + 기 전에  (no tense change — always 기 전에):\n" +
        "• 가다 → 가기 전에,  먹다 → 먹기 전에,  자다 → 자기 전에\n" +
        "For a noun: N + 전에  (수업 전에 = before class).",
      explanation:
        "Just add 기 전에 to the dictionary stem — it never conjugates for tense, no matter when " +
        "the sentence happens: 자기 전에 = 'before sleeping', past or future. The tense lives in " +
        "the main verb at the end.",
      notes: [
        "Always 기 전에; the verb stays in dictionary form.",
        "For nouns drop 기: 수업 전에, 식사 전에.",
        "Its opposite is -(으)ㄴ 후에 (after) — next lesson."
      ]
    },
    pitfalls: [
      "Don't conjugate the verb: it's 먹기 전에, never 먹었기 전에.",
      "Nouns take just 전에 (수업 전에), verbs take 기 전에.",
      "Put the tense on the FINAL verb of the sentence."
    ],
    vocab: [
      { ko: "이를 닦다", en: "to brush teeth", romaji: "i-reul dak-da", pos: "phrase", note: "" },
      { ko: "손", en: "hand", romaji: "son", pos: "noun", note: "" },
      { ko: "씻다", en: "to wash", romaji: "ssit-da", pos: "verb", note: "" },
      { ko: "나가다", en: "to go out", romaji: "na-ga-da", pos: "verb", note: "" },
      { ko: "창문", en: "window", romaji: "chang-mun", pos: "noun", note: "" },
      { ko: "닫다", en: "to close", romaji: "dat-da", pos: "verb", note: "" },
      { ko: "결정하다", en: "to decide", romaji: "gyeol-jeong-ha-da", pos: "verb", note: "" },
      { ko: "수업", en: "class / lesson", romaji: "su-eop", pos: "noun", note: "" }
    ],
    sentences: [
      { ko: "자기 전에 이를 닦아요.", en: "I brush my teeth before sleeping.", romaji: "ja-gi jeo-ne i-reul da-kka-yo", blankWord: "자기 전에" },
      { ko: "밥을 먹기 전에 손을 씻으세요.", en: "Wash your hands before eating.", romaji: "ba-beul meok-gi jeo-ne so-neul ssi-seu-se-yo", blankWord: "먹기 전에" },
      { ko: "나가기 전에 창문을 닫으세요.", en: "Close the window before going out.", romaji: "na-ga-gi jeo-ne chang-mu-neul da-deu-se-yo", blankWord: "나가기 전에" },
      { ko: "한국에 가기 전에 한국어를 배웠어요.", en: "I learned Korean before going to Korea.", romaji: "han-gu-ge ga-gi jeo-ne han-gu-geo-reul bae-wo-sseo-yo", blankWord: "가기 전에" },
      { ko: "수업 전에 커피를 마셨어요.", en: "I drank coffee before class.", romaji: "su-eop jeo-ne keo-pi-reul ma-syeo-sseo-yo", blankWord: "수업 전에" },
      { ko: "결정하기 전에 잘 생각하세요.", en: "Think carefully before deciding.", romaji: "gyeol-jeong-ha-gi jeo-ne jal saeng-ga-ka-se-yo", blankWord: "결정하기 전에" }
    ]
  },

  {
    id: "4.10",
    level: 4,
    title: "After doing",
    point: "V-(으)ㄴ 후에",
    grammar: {
      summary: "How to say 'after (doing) something'.",
      formation:
        "Verb stem + (으)ㄴ 후에:\n" +
        "• vowel/ㄹ stem → ㄴ 후에   (가다 → 간 후에)\n" +
        "• consonant stem → 은 후에  (먹다 → 먹은 후에)\n" +
        "For a noun: N + 후에  (수업 후에 = after class).  Synonym: -고 나서.",
      explanation:
        "Use the past-style modifier (으)ㄴ before 후에: 먹은 후에 = 'after eating'. As with " +
        "'before', the main sentence verb carries the real tense. -고 나서 (먹고 나서) means " +
        "almost the same thing.",
      notes: [
        "Use -(으)ㄴ: 간 후에, 먹은 후에.",
        "Nouns take just 후에: 수업 후에.",
        "-고 나서 is a natural synonym: 밥을 먹고 나서 산책해요."
      ]
    },
    pitfalls: [
      "Use the (으)ㄴ form here, not 는: 먹은 후에 (not 먹는 후에).",
      "Nouns take 후에 (식사 후에); verbs take (으)ㄴ 후에.",
      "Tense goes on the final verb: 먹은 후에 산책했어요."
    ],
    vocab: [
      { ko: "숙제", en: "homework", romaji: "suk-je", pos: "noun", note: "" },
      { ko: "게임", en: "game", romaji: "ge-im", pos: "noun", note: "" },
      { ko: "샤워하다", en: "to take a shower", romaji: "sya-wo-ha-da", pos: "verb", note: "" },
      { ko: "저녁", en: "evening / dinner", romaji: "jeo-nyeok", pos: "noun", note: "" },
      { ko: "만나다", en: "to meet", romaji: "man-na-da", pos: "verb", note: "" },
      { ko: "산책하다", en: "to take a walk", romaji: "san-chaek-ha-da", pos: "verb", note: "" },
      { ko: "씻다", en: "to wash", romaji: "ssit-da", pos: "verb", note: "" },
      { ko: "후에", en: "after", romaji: "hu-e", pos: "noun", note: "" }
    ],
    sentences: [
      { ko: "밥을 먹은 후에 산책해요.", en: "After eating, I take a walk.", romaji: "ba-beul meo-geun hu-e san-chae-kae-yo", blankWord: "먹은 후에" },
      { ko: "숙제를 한 후에 게임을 했어요.", en: "After doing homework, I played games.", romaji: "suk-je-reul han hu-e ge-i-meul hae-sseo-yo", blankWord: "한 후에" },
      { ko: "운동한 후에 샤워해요.", en: "After exercising, I shower.", romaji: "un-dong-han hu-e sya-wo-hae-yo", blankWord: "운동한 후에" },
      { ko: "영화를 본 후에 저녁을 먹었어요.", en: "After watching the movie, we had dinner.", romaji: "yeong-hwa-reul bon hu-e jeo-nyeo-geul meo-geo-sseo-yo", blankWord: "본 후에" },
      { ko: "수업 후에 만나요.", en: "Let's meet after class.", romaji: "su-eop hu-e man-na-yo", blankWord: "수업 후에" },
      { ko: "손을 씻은 후에 밥을 먹어요.", en: "I eat after washing my hands.", romaji: "so-neul ssi-seun hu-e ba-beul meo-geo-yo", blankWord: "씻은 후에" }
    ]
  },

  {
    id: "4.11",
    level: 4,
    title: "Try doing",
    point: "V-아/어 보다",
    grammar: {
      summary: "How to say 'try doing something / give it a go' (and 'have you ever…?').",
      formation:
        "Verb stem + 아/어 보다 (same 아/어 rule):\n" +
        "• ㅏ/ㅗ → 아 보다  (가다 → 가 보다)\n" +
        "• other → 어 보다  (먹다 → 먹어 보다)\n" +
        "• 하다  → 해 보다  (하다 → 해 보다)\n" +
        "Past 아/어 봤다 = 'have you ever / I once tried'.",
      explanation:
        "아/어 보다 literally adds 'and see', so 먹어 보세요 = 'try eating it (and see)'. The past " +
        "form 아/어 봤어요 asks or tells about experience: 제주도에 가 봤어요? = 'Have you been to " +
        "Jeju?'",
      notes: [
        "Very common as a gentle suggestion: ~아/어 보세요 ('give it a try').",
        "Experience: 아/어 봤어요 = 'have (you) ever …'.",
        "Built on 보다 'to see', but here it means 'try'."
      ]
    },
    pitfalls: [
      "Follow the 아/어 rule: 가 보다, 먹어 보다, 해 보다.",
      "Past 봤어요 = 'have tried / have you ever'; present 보세요 = 'please try'.",
      "Don't read it as literal 'see' — 먹어 보다 is 'try eating', not 'see and eat'."
    ],
    vocab: [
      { ko: "입다", en: "to wear / try on", romaji: "ip-da", pos: "verb", note: "입어 보다 = try on" },
      { ko: "제주도", en: "Jeju Island", romaji: "je-ju-do", pos: "noun", note: "" },
      { ko: "한번", en: "once / give it a try", romaji: "han-beon", pos: "adverb", note: "" },
      { ko: "다시", en: "again", romaji: "da-si", pos: "adverb", note: "" },
      { ko: "김치", en: "kimchi", romaji: "gim-chi", pos: "noun", note: "" },
      { ko: "만들다", en: "to make", romaji: "man-deul-da", pos: "verb", note: "ㄹ-stem" },
      { ko: "음식", en: "food", romaji: "eum-sik", pos: "noun", note: "" },
      { ko: "책", en: "book", romaji: "chaek", pos: "noun", note: "" }
    ],
    sentences: [
      { ko: "이 음식을 먹어 보세요.", en: "Try eating this food.", romaji: "i eum-si-geul meo-geo bo-se-yo", blankWord: "먹어 보세요" },
      { ko: "한번 입어 봐도 돼요?", en: "May I try it on once?", romaji: "han-beon i-beo bwa-do dwae-yo", blankWord: "입어 봐도" },
      { ko: "제주도에 가 봤어요?", en: "Have you been to Jeju Island?", romaji: "je-ju-do-e ga bwa-sseo-yo", blankWord: "가 봤어요" },
      { ko: "그 책을 읽어 보세요.", en: "Try reading that book.", romaji: "geu chae-geul il-geo bo-se-yo", blankWord: "읽어 보세요" },
      { ko: "김치를 만들어 봤어요.", en: "I tried making kimchi.", romaji: "gim-chi-reul man-deu-reo bwa-sseo-yo", blankWord: "만들어 봤어요" },
      { ko: "다시 한번 해 보세요.", en: "Try doing it once more.", romaji: "da-si han-beon hae bo-se-yo", blankWord: "해 보세요" }
    ]
  },

  {
    id: "4.12",
    level: 4,
    title: "Do for someone",
    point: "V-아/어 주다",
    grammar: {
      summary: "How to do something FOR someone, and how to politely ask someone to do something for you.",
      formation:
        "Verb stem + 아/어 주다 (same 아/어 rule):\n" +
        "• ㅏ/ㅗ → 아 주다  (찾다 → 찾아 주다)\n" +
        "• other → 어 주다  (열다 → 열어 주다)\n" +
        "• 하다  → 해 주다  (말하다 → 말해 주다)\n" +
        "Ask: ~아/어 주세요 (please…) · Offer: ~아/어 줄게요 (I'll… for you).",
      explanation:
        "주다 means 'give', but as a helper after 아/어 it means 'do (it) for someone'. " +
        "열어 주세요 = 'please open it (for me)'; 만들어 줄게요 = 'I'll make it for you'. It's the " +
        "normal polite way to make requests.",
      notes: [
        "~아/어 주세요 = the everyday 'please do … for me'.",
        "돕다 is ㅂ-irregular: 도와 주다 (도와줘요 / 도와줬어요).",
        "Here 주다 means 'do for', not literally 'give'."
      ]
    },
    pitfalls: [
      "Request = ~아/어 주세요; offer = ~아/어 줄게요 — don't mix them up.",
      "돕다 → 도와 주다 (ㅂ-irregular), not 돕어 주다.",
      "Follow the 아/어 rule: 찾아 주다, 열어 주다, 해 주다."
    ],
    vocab: [
      { ko: "열다", en: "to open", romaji: "yeol-da", pos: "verb", note: "" },
      { ko: "찍다", en: "to take (a photo)", romaji: "jjik-da", pos: "verb", note: "" },
      { ko: "돕다", en: "to help", romaji: "dop-da", pos: "verb", note: "ㅂ-irregular: 도와요" },
      { ko: "말하다", en: "to speak / tell", romaji: "mal-ha-da", pos: "verb", note: "" },
      { ko: "들다", en: "to hold / lift", romaji: "deul-da", pos: "verb", note: "" },
      { ko: "천천히", en: "slowly", romaji: "cheon-cheon-hi", pos: "adverb", note: "" },
      { ko: "좀", en: "a little / please", romaji: "jom", pos: "adverb", note: "softens a request" },
      { ko: "문", en: "door", romaji: "mun", pos: "noun", note: "" }
    ],
    sentences: [
      { ko: "문 좀 열어 주세요.", en: "Please open the door.", romaji: "mun jom yeo-reo ju-se-yo", blankWord: "열어 주세요" },
      { ko: "사진 좀 찍어 주세요.", en: "Please take a photo for me.", romaji: "sa-jin jom jji-geo ju-se-yo", blankWord: "찍어 주세요" },
      { ko: "친구가 도와줬어요.", en: "My friend helped me.", romaji: "chin-gu-ga do-wa-jwo-sseo-yo", blankWord: "도와줬어요" },
      { ko: "제가 만들어 줄게요.", en: "I'll make it for you.", romaji: "je-ga man-deu-reo jul-ge-yo", blankWord: "만들어 줄게요" },
      { ko: "천천히 말해 주세요.", en: "Please speak slowly.", romaji: "cheon-cheon-hi mal-hae ju-se-yo", blankWord: "말해 주세요" },
      { ko: "이거 좀 들어 주세요.", en: "Please hold this for me.", romaji: "i-geo jom deu-reo ju-se-yo", blankWord: "들어 주세요" }
    ]
  },

  {
    id: "4.13",
    level: 4,
    title: "Comparing (than / most)",
    point: "N보다 (더) · 제일/가장",
    grammar: {
      summary: "How to say 'more than' and 'the most'.",
      formation:
        "Comparison: [thing]보다 (더) [adjective]\n" +
        "• 보다 attaches to what you compare AGAINST = 'than that'\n" +
        "• 더 = 'more' (optional but common)\n" +
        "Superlative: 제일 or 가장 + [adjective] = 'the most'.",
      explanation:
        "커피보다 차가 더 좋아요 = 'tea is better than coffee' — 보다 marks 'than coffee'. For " +
        "'the most', put 제일 (casual) or 가장 (slightly formal) before the adjective: 제일 비싸요 " +
        "= 'the most expensive'.",
      notes: [
        "보다 attaches to the compared-against noun: 커피보다 = 'than coffee'.",
        "더 (more) is usually added but optional.",
        "제일 = 가장 = 'the most'."
      ]
    },
    pitfalls: [
      "Attach 보다 to the thing you measure against, not the subject.",
      "Some comparisons use irregular adjectives: 춥다 → 추워요, 빠르다 → 빨라요.",
      "제일/가장 go BEFORE the adjective: 제일 맛있어요."
    ],
    vocab: [
      { ko: "보다", en: "than (comparison)", romaji: "bo-da", pos: "particle", note: "" },
      { ko: "더", en: "more", romaji: "deo", pos: "adverb", note: "" },
      { ko: "제일", en: "the most / best", romaji: "je-il", pos: "adverb", note: "= 가장" },
      { ko: "차", en: "tea", romaji: "cha", pos: "noun", note: "" },
      { ko: "춥다", en: "to be cold", romaji: "chup-da", pos: "adjective", note: "ㅂ-irregular: 추워요" },
      { ko: "빠르다", en: "to be fast", romaji: "ppa-reu-da", pos: "adjective", note: "르-irregular: 빨라요" },
      { ko: "기차", en: "train", romaji: "gi-cha", pos: "noun", note: "" },
      { ko: "가을", en: "autumn", romaji: "ga-eul", pos: "noun", note: "" }
    ],
    sentences: [
      { ko: "저는 커피보다 차를 더 좋아해요.", en: "I like tea more than coffee.", romaji: "jeo-neun keo-pi-bo-da cha-reul deo jo-a-hae-yo", blankWord: "커피보다" },
      { ko: "오늘이 어제보다 더 추워요.", en: "Today is colder than yesterday.", romaji: "o-neu-ri eo-je-bo-da deo chu-wo-yo", blankWord: "어제보다" },
      { ko: "비행기가 기차보다 더 빨라요.", en: "Planes are faster than trains.", romaji: "bi-haeng-gi-ga gi-cha-bo-da deo ppal-la-yo", blankWord: "기차보다" },
      { ko: "이 음식이 제일 맛있어요.", en: "This food is the most delicious.", romaji: "i eum-si-gi je-il ma-si-sseo-yo", blankWord: "제일" },
      { ko: "동생이 저보다 키가 더 커요.", en: "My sibling is taller than me.", romaji: "dong-saeng-i jeo-bo-da ki-ga deo keo-yo", blankWord: "저보다" },
      { ko: "저는 가을을 제일 좋아해요.", en: "I like autumn the most.", romaji: "jeo-neun ga-eu-reul je-il jo-a-hae-yo", blankWord: "제일" }
    ]
  },

  {
    id: "4.14",
    level: 4,
    title: "Be doing (-ing)",
    point: "V-고 있다",
    grammar: {
      summary: "How to say an action is in progress right now ('be V-ing').",
      formation:
        "Verb stem + 고 있다 (no vowel change):\n" +
        "• 가다 → 가고 있다,  먹다 → 먹고 있다,  하다 → 하고 있다\n" +
        "Now: 가고 있어요 · Past (was V-ing): 가고 있었어요.",
      explanation:
        "고 있다 marks an action happening at the moment: 밥을 먹고 있어요 = 'I'm eating'. " +
        "Add nothing to the stem except 고 있다, then conjugate 있다 for tense.",
      notes: [
        "Now = 고 있어요; was = 고 있었어요.",
        "Honorific form is 고 계시다 (아버지가 주무시고 계세요).",
        "Don't confuse 고 있다 (ongoing) with plain 고 (and)."
      ]
    },
    pitfalls: [
      "It's 고 있다, no 아/어 change: 먹고 있어요 (not 먹어 있어요).",
      "Past progressive = 고 있었어요 ('was V-ing').",
      "For polite speech about elders use 고 계시다."
    ],
    vocab: [
      { ko: "기다리다", en: "to wait", romaji: "gi-da-ri-da", pos: "verb", note: "" },
      { ko: "청소하다", en: "to clean", romaji: "cheong-so-ha-da", pos: "verb", note: "" },
      { ko: "공부하다", en: "to study", romaji: "gong-bu-ha-da", pos: "verb", note: "" },
      { ko: "자다", en: "to sleep", romaji: "ja-da", pos: "verb", note: "" },
      { ko: "일하다", en: "to work", romaji: "il-ha-da", pos: "verb", note: "" },
      { ko: "비가 오다", en: "to rain", romaji: "bi-ga o-da", pos: "phrase", note: "" },
      { ko: "동생", en: "younger sibling", romaji: "dong-saeng", pos: "noun", note: "" },
      { ko: "지금", en: "now", romaji: "ji-geum", pos: "adverb", note: "" }
    ],
    sentences: [
      { ko: "지금 밥을 먹고 있어요.", en: "I'm eating now.", romaji: "ji-geum ba-beul meok-go i-sseo-yo", blankWord: "먹고 있어요" },
      { ko: "동생이 자고 있어요.", en: "My sibling is sleeping.", romaji: "dong-saeng-i ja-go i-sseo-yo", blankWord: "자고 있어요" },
      { ko: "뭐 하고 있어요?", en: "What are you doing?", romaji: "mwo ha-go i-sseo-yo", blankWord: "하고 있어요" },
      { ko: "한국어를 공부하고 있어요.", en: "I'm studying Korean.", romaji: "han-gu-geo-reul gong-bu-ha-go i-sseo-yo", blankWord: "공부하고 있어요" },
      { ko: "지금 비가 오고 있어요.", en: "It's raining now.", romaji: "ji-geum bi-ga o-go i-sseo-yo", blankWord: "오고 있어요" },
      { ko: "친구를 기다리고 있어요.", en: "I'm waiting for a friend.", romaji: "chin-gu-reul gi-da-ri-go i-sseo-yo", blankWord: "기다리고 있어요" }
    ]
  },

  {
    id: "4.15",
    level: 4,
    title: "End up / come to",
    point: "V-게 되다",
    grammar: {
      summary: "How to say you 'ended up' or 'came to' do something (by circumstance, not just your plan).",
      formation:
        "Verb stem + 게 되다  (no vowel change):\n" +
        "• 가다 → 가게 되다,  알다 → 알게 되다,  하다 → 하게 되다\n" +
        "Most common in the past: 게 됐어요 ('it turned out / I ended up').",
      explanation:
        "게 되다 shows a change of situation that came about — often from circumstances or other " +
        "people rather than purely your own choice: 한국에서 일하게 됐어요 = 'I (ended up) working " +
        "in Korea'. 알게 됐어요 = 'I came to know'.",
      notes: [
        "Past 게 됐어요 = 'ended up / it turned out' (very common).",
        "Suggests the result happened to you / by circumstance.",
        "알다 → 알게 되다 = 'come to know' (vs 알다 = already know)."
      ]
    },
    pitfalls: [
      "It's 게 되다, no 아/어 change: 가게 됐어요.",
      "Implies circumstance/result, not a pure decision (that's 기로 하다).",
      "Very often used in the past tense: 됐어요, not 돼요."
    ],
    vocab: [
      { ko: "사실", en: "fact / truth", romaji: "sa-sil", pos: "noun", note: "" },
      { ko: "알다", en: "to know", romaji: "al-da", pos: "verb", note: "" },
      { ko: "우연히", en: "by chance", romaji: "u-yeon-hi", pos: "adverb", note: "" },
      { ko: "배우다", en: "to learn", romaji: "bae-u-da", pos: "verb", note: "" },
      { ko: "일하다", en: "to work", romaji: "il-ha-da", pos: "verb", note: "" },
      { ko: "만나다", en: "to meet", romaji: "man-na-da", pos: "verb", note: "" },
      { ko: "좋아하다", en: "to like", romaji: "jo-a-ha-da", pos: "verb", note: "" },
      { ko: "일찍", en: "early", romaji: "il-jjik", pos: "adverb", note: "" }
    ],
    sentences: [
      { ko: "한국에서 일하게 됐어요.", en: "I ended up working in Korea.", romaji: "han-gu-ge-seo il-ha-ge dwae-sseo-yo", blankWord: "일하게 됐어요" },
      { ko: "그 사실을 알게 됐어요.", en: "I came to know that fact.", romaji: "geu sa-si-reul al-ge dwae-sseo-yo", blankWord: "알게 됐어요" },
      { ko: "김치를 좋아하게 됐어요.", en: "I've come to like kimchi.", romaji: "gim-chi-reul jo-a-ha-ge dwae-sseo-yo", blankWord: "좋아하게 됐어요" },
      { ko: "내일 일찍 가게 됐어요.", en: "It turned out I have to go early tomorrow.", romaji: "nae-il il-jjik ga-ge dwae-sseo-yo", blankWord: "가게 됐어요" },
      { ko: "우연히 만나게 됐어요.", en: "We happened to meet.", romaji: "u-yeon-hi man-na-ge dwae-sseo-yo", blankWord: "만나게 됐어요" },
      { ko: "한국어를 배우게 됐어요.", en: "I ended up learning Korean.", romaji: "han-gu-geo-reul bae-u-ge dwae-sseo-yo", blankWord: "배우게 됐어요" }
    ]
  },

  {
    id: "4.16",
    level: 4,
    title: "Know how to",
    point: "V-(으)ㄹ 줄 알다/모르다",
    grammar: {
      summary: "How to say you know (or don't know) HOW to do something — a skill.",
      formation:
        "Stem + (으)ㄹ 줄 알다 (know how) / 모르다 (don't know how):\n" +
        "• vowel/ㄹ stem → ㄹ 줄   (하다 → 할 줄)\n" +
        "• consonant stem → 을 줄  (먹다 → 먹을 줄)\n" +
        "e.g. 수영할 줄 알아요 (I can swim) · 운전할 줄 몰라요 (I can't drive).",
      explanation:
        "This is specifically about knowing a method or skill: 김치를 만들 줄 알아요 = 'I know how " +
        "to make kimchi'. Keep 줄 as a separate word. 알다 = know how, 모르다 = don't know how.",
      notes: [
        "줄 is spaced: 할 줄 알아요.",
        "알다 → 알아요 (know how) · 모르다 → 몰라요 (don't know how).",
        "Subtly different from -(으)ㄹ 수 있다 (general ability): 줄 알다 = 'know the skill'."
      ]
    },
    pitfalls: [
      "Keep the space: 할 줄 알아요 (not 할줄알아요).",
      "Consonant stems take 을 줄: 먹을 줄, 읽을 줄.",
      "모르다 is 르-irregular: 몰라요 (don't know how)."
    ],
    vocab: [
      { ko: "줄", en: "way / method (bound noun)", romaji: "jul", pos: "noun", note: "used in 줄 알다/모르다" },
      { ko: "수영하다", en: "to swim", romaji: "su-yeong-ha-da", pos: "verb", note: "" },
      { ko: "운전하다", en: "to drive", romaji: "un-jeon-ha-da", pos: "verb", note: "" },
      { ko: "피아노", en: "piano", romaji: "pi-a-no", pos: "noun", note: "" },
      { ko: "치다", en: "to play (instrument) / hit", romaji: "chi-da", pos: "verb", note: "피아노를 치다" },
      { ko: "젓가락", en: "chopsticks", romaji: "jeot-ga-rak", pos: "noun", note: "" },
      { ko: "쓰다", en: "to use / write", romaji: "sseu-da", pos: "verb", note: "" },
      { ko: "만들다", en: "to make", romaji: "man-deul-da", pos: "verb", note: "" }
    ],
    sentences: [
      { ko: "저는 수영할 줄 알아요.", en: "I know how to swim.", romaji: "jeo-neun su-yeong-hal jul a-ra-yo", blankWord: "수영할 줄" },
      { ko: "운전할 줄 몰라요.", en: "I don't know how to drive.", romaji: "un-jeon-hal jul mol-la-yo", blankWord: "운전할 줄" },
      { ko: "김치를 만들 줄 알아요?", en: "Do you know how to make kimchi?", romaji: "gim-chi-reul man-deul jul a-ra-yo", blankWord: "만들 줄" },
      { ko: "한국어로 말할 줄 알아요.", en: "I know how to speak in Korean.", romaji: "han-gu-geo-ro mal-hal jul a-ra-yo", blankWord: "말할 줄" },
      { ko: "피아노를 칠 줄 몰라요.", en: "I don't know how to play the piano.", romaji: "pi-a-no-reul chil jul mol-la-yo", blankWord: "칠 줄" },
      { ko: "젓가락을 쓸 줄 알아요.", en: "I know how to use chopsticks.", romaji: "jeot-ga-ra-geul sseul jul a-ra-yo", blankWord: "쓸 줄" }
    ]
  },

  {
    id: "4.17",
    level: 4,
    title: "Cannot (못)",
    point: "못 V · V-지 못하다",
    grammar: {
      summary: "How to say you 'can't' do something (inability or external blocking).",
      formation:
        "Two ways, same meaning:\n" +
        "• 못 + verb (right before it):  못 가요,  못 먹어요\n" +
        "• verb stem + 지 못하다:  가지 못해요,  먹지 못해요 (a bit more formal)\n" +
        "하다-verbs split: 수영(을) 못 해요.",
      explanation:
        "못 says you can't — because of inability or something stopping you: 매운 음식을 못 먹어요 " +
        "= 'I can't eat spicy food'. It sits directly before the verb. The longer 지 못하다 form " +
        "means the same thing.",
      notes: [
        "못 goes immediately before the verb: 못 가요.",
        "하다-verbs split the 못: 운동 못 해요 / 운동을 못 해요.",
        "지 못하다 is the longer equivalent: 가지 못해요 = 못 가요."
      ]
    },
    pitfalls: [
      "Place 못 right before the verb, not at the end.",
      "With 하다-verbs say 못 해요 (split), e.g. 수영 못 해요.",
      "못 (can't) is different from 안 (don't/won't): 안 먹어요 = 'I don't eat'."
    ],
    vocab: [
      { ko: "못", en: "cannot", romaji: "mot", pos: "adverb", note: "goes before the verb" },
      { ko: "맵다", en: "to be spicy", romaji: "maep-da", pos: "adjective", note: "매운 음식" },
      { ko: "잠", en: "sleep (noun)", romaji: "jam", pos: "noun", note: "잠을 자다" },
      { ko: "수영", en: "swimming", romaji: "su-yeong", pos: "noun", note: "" },
      { ko: "만나다", en: "to meet", romaji: "man-na-da", pos: "verb", note: "" },
      { ko: "바쁘다", en: "to be busy", romaji: "ba-ppeu-da", pos: "adjective", note: "바빠서 = because busy" },
      { ko: "다", en: "all / everything", romaji: "da", pos: "adverb", note: "" },
      { ko: "어제", en: "yesterday", romaji: "eo-je", pos: "noun", note: "" }
    ],
    sentences: [
      { ko: "오늘 못 가요.", en: "I can't go today.", romaji: "o-neul mot ga-yo", blankWord: "못 가요" },
      { ko: "매운 음식을 못 먹어요.", en: "I can't eat spicy food.", romaji: "mae-un eum-si-geul mot meo-geo-yo", blankWord: "못 먹어요" },
      { ko: "어제 잠을 못 잤어요.", en: "I couldn't sleep last night.", romaji: "eo-je ja-meul mot ja-sseo-yo", blankWord: "못 잤어요" },
      { ko: "저는 수영을 못 해요.", en: "I can't swim.", romaji: "jeo-neun su-yeong-eul mot hae-yo", blankWord: "못 해요" },
      { ko: "바빠서 친구를 만나지 못했어요.", en: "I couldn't meet my friend because I was busy.", romaji: "ba-ppa-seo chin-gu-reul man-na-ji mot-hae-sseo-yo", blankWord: "만나지 못했어요" },
      { ko: "시간이 없어서 다 못 했어요.", en: "I couldn't finish it all because there was no time.", romaji: "si-ga-ni eop-seo-seo da mot hae-sseo-yo", blankWord: "못 했어요" }
    ]
  },

  {
    id: "4.18",
    level: 4,
    title: "While doing",
    point: "V-(으)면서",
    grammar: {
      summary: "How to say you do two things at the same time ('while doing X').",
      formation:
        "Stem + (으)면서:\n" +
        "• vowel/ㄹ stem → 면서   (가다 → 가면서)\n" +
        "• consonant stem → 으면서 (먹다 → 먹으면서)\n" +
        "Same subject does both actions together.",
      explanation:
        "(으)면서 links two simultaneous actions by the SAME person: 음악을 들으면서 공부해요 = " +
        "'I study while listening to music'. The main action goes at the end.",
      notes: [
        "Same subject for both actions.",
        "ㄷ-irregular: 듣다 → 들으면서, 걷다 → 걸으면서.",
        "Don't confuse with 면 안 되다 (must not) from Lesson 4.2."
      ]
    },
    pitfalls: [
      "Use 으 only after a consonant: 가면서, 먹으면서.",
      "Both actions must share the same subject.",
      "ㄷ-irregular verbs change: 듣다 → 들으면서."
    ],
    vocab: [
      { ko: "텔레비전", en: "television", romaji: "tel-le-bi-jeon", pos: "noun", note: "" },
      { ko: "걷다", en: "to walk", romaji: "geot-da", pos: "verb", note: "ㄷ-irregular: 걸어요" },
      { ko: "노래하다", en: "to sing", romaji: "no-rae-ha-da", pos: "verb", note: "" },
      { ko: "춤을 추다", en: "to dance", romaji: "chu-meul chu-da", pos: "phrase", note: "" },
      { ko: "웃다", en: "to smile / laugh", romaji: "ut-da", pos: "verb", note: "" },
      { ko: "인사하다", en: "to greet", romaji: "in-sa-ha-da", pos: "verb", note: "" },
      { ko: "듣다", en: "to listen", romaji: "deut-da", pos: "verb", note: "ㄷ-irregular: 들어요" },
      { ko: "마시다", en: "to drink", romaji: "ma-si-da", pos: "verb", note: "" }
    ],
    sentences: [
      { ko: "음악을 들으면서 공부해요.", en: "I study while listening to music.", romaji: "eu-ma-geul deu-reu-myeon-seo gong-bu-hae-yo", blankWord: "들으면서" },
      { ko: "밥을 먹으면서 텔레비전을 봐요.", en: "I watch TV while eating.", romaji: "ba-beul meo-geu-myeon-seo tel-le-bi-jeo-neul bwa-yo", blankWord: "먹으면서" },
      { ko: "걸으면서 전화해요.", en: "I talk on the phone while walking.", romaji: "geo-reu-myeon-seo jeon-hwa-hae-yo", blankWord: "걸으면서" },
      { ko: "노래하면서 춤을 춰요.", en: "I dance while singing.", romaji: "no-rae-ha-myeon-seo chu-meul chwo-yo", blankWord: "노래하면서" },
      { ko: "웃으면서 인사했어요.", en: "She greeted me with a smile.", romaji: "u-seu-myeon-seo in-sa-hae-sseo-yo", blankWord: "웃으면서" },
      { ko: "커피를 마시면서 책을 읽어요.", en: "I read a book while drinking coffee.", romaji: "keo-pi-reul ma-si-myeon-seo chae-geul il-geo-yo", blankWord: "마시면서" }
    ]
  },

  {
    id: "4.19",
    level: 4,
    title: "Decide to",
    point: "V-기로 하다",
    grammar: {
      summary: "How to say you've decided (or agreed) to do something.",
      formation:
        "Verb stem + 기로 하다  (no vowel change):\n" +
        "• 가다 → 가기로 하다,  끊다 → 끊기로 하다,  하다 → 하기로 하다\n" +
        "Usually past: 기로 했어요 ('(I've) decided to').",
      explanation:
        "기로 하다 expresses a decision or resolution: 운동하기로 했어요 = 'I decided to exercise'. " +
        "It's almost always used in the past tense to report the decision you made. It can also " +
        "mean a mutual agreement ('we decided/agreed to').",
      notes: [
        "Most natural in the past: 기로 했어요.",
        "Built from the 기 nominaliser + 로.",
        "Works for resolutions and for mutual agreements."
      ]
    },
    pitfalls: [
      "It's 기로 하다 — no tense on the first verb (운동하기로, not 운동했기로).",
      "Normally reported in the past: 했어요.",
      "Different from 게 되다 (ended up): 기로 하다 is YOUR decision."
    ],
    vocab: [
      { ko: "끊다", en: "to quit / cut off", romaji: "kkeun-ta", pos: "verb", note: "담배를 끊다" },
      { ko: "매일", en: "every day", romaji: "mae-il", pos: "adverb", note: "" },
      { ko: "일기", en: "diary", romaji: "il-gi", pos: "noun", note: "일기를 쓰다" },
      { ko: "쓰다", en: "to write", romaji: "sseu-da", pos: "verb", note: "" },
      { ko: "다이어트", en: "diet", romaji: "da-i-eo-teu", pos: "noun", note: "" },
      { ko: "운동하다", en: "to exercise", romaji: "un-dong-ha-da", pos: "verb", note: "" },
      { ko: "만나다", en: "to meet", romaji: "man-na-da", pos: "verb", note: "" },
      { ko: "담배", en: "cigarette", romaji: "dam-bae", pos: "noun", note: "" }
    ],
    sentences: [
      { ko: "내일부터 운동하기로 했어요.", en: "I decided to exercise starting tomorrow.", romaji: "nae-il-bu-teo un-dong-ha-gi-ro hae-sseo-yo", blankWord: "운동하기로" },
      { ko: "담배를 끊기로 했어요.", en: "I decided to quit smoking.", romaji: "dam-bae-reul kkeun-ki-ro hae-sseo-yo", blankWord: "끊기로" },
      { ko: "한국에서 공부하기로 했어요.", en: "I decided to study in Korea.", romaji: "han-gu-ge-seo gong-bu-ha-gi-ro hae-sseo-yo", blankWord: "공부하기로" },
      { ko: "우리 7시에 만나기로 했어요.", en: "We decided to meet at 7.", romaji: "u-ri il-gop-si-e man-na-gi-ro hae-sseo-yo", blankWord: "만나기로" },
      { ko: "매일 일기를 쓰기로 했어요.", en: "I decided to write a diary every day.", romaji: "mae-il il-gi-reul sseu-gi-ro hae-sseo-yo", blankWord: "쓰기로" },
      { ko: "다이어트를 하기로 했어요.", en: "I decided to go on a diet.", romaji: "da-i-eo-teu-reul ha-gi-ro hae-sseo-yo", blankWord: "하기로" }
    ]
  },

  {
    id: "4.20",
    level: 4,
    title: "Have done before",
    point: "V-(으)ㄴ 적이 있다/없다",
    grammar: {
      summary: "How to talk about experience: 'have done / have never done' something.",
      formation:
        "Stem + (으)ㄴ 적이 있다 (have done) / 없다 (have never):\n" +
        "• vowel/ㄹ stem → ㄴ 적이   (가다 → 간 적이)\n" +
        "• consonant stem → 은 적이  (먹다 → 먹은 적이)\n" +
        "e.g. 한국에 간 적이 있어요 (I've been to Korea).",
      explanation:
        "적 means an instance/occasion, so 간 적이 있어요 = 'there's a time I went' = 'I've been'. " +
        "Use the past-style (으)ㄴ modifier on the verb. 있다 = have done, 없다 = have never.",
      notes: [
        "Use the (으)ㄴ form: 간 적이, 먹은 적이.",
        "적 is spaced: 본 적이 있어요.",
        "있다 = have the experience · 없다 = never."
      ]
    },
    pitfalls: [
      "Use the past modifier (으)ㄴ: 먹은 적이 (not 먹는 적이).",
      "Keep the space: 간 적이 있어요.",
      "있다/없다 flips the meaning: have done vs never done."
    ],
    vocab: [
      { ko: "적", en: "time / occasion (experience)", romaji: "jeok", pos: "noun", note: "used in 적이 있다/없다" },
      { ko: "한복", en: "hanbok (Korean dress)", romaji: "han-bok", pos: "noun", note: "" },
      { ko: "입다", en: "to wear", romaji: "ip-da", pos: "verb", note: "" },
      { ko: "타다", en: "to ride / take", romaji: "ta-da", pos: "verb", note: "" },
      { ko: "늦다", en: "to be late", romaji: "neut-da", pos: "verb", note: "" },
      { ko: "비행기", en: "airplane", romaji: "bi-haeng-gi", pos: "noun", note: "" },
      { ko: "영화", en: "movie", romaji: "yeong-hwa", pos: "noun", note: "" },
      { ko: "김치", en: "kimchi", romaji: "gim-chi", pos: "noun", note: "" }
    ],
    sentences: [
      { ko: "한국에 간 적이 있어요.", en: "I've been to Korea before.", romaji: "han-gu-ge gan jeo-gi i-sseo-yo", blankWord: "간 적이" },
      { ko: "김치를 먹은 적이 있어요?", en: "Have you ever eaten kimchi?", romaji: "gim-chi-reul meo-geun jeo-gi i-sseo-yo", blankWord: "먹은 적이" },
      { ko: "그 영화를 본 적이 있어요.", en: "I've seen that movie before.", romaji: "geu yeong-hwa-reul bon jeo-gi i-sseo-yo", blankWord: "본 적이" },
      { ko: "비행기를 탄 적이 없어요.", en: "I've never taken an airplane.", romaji: "bi-haeng-gi-reul tan jeo-gi eop-seo-yo", blankWord: "탄 적이" },
      { ko: "한복을 입은 적이 있어요.", en: "I've worn hanbok before.", romaji: "han-bo-geul i-beun jeo-gi i-sseo-yo", blankWord: "입은 적이" },
      { ko: "늦은 적이 없어요.", en: "I've never been late.", romaji: "neu-jeun jeo-gi eop-seo-yo", blankWord: "늦은 적이" }
    ]
  }
];

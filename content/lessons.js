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
  }
];

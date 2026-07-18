// Hand-written. TTMIK Level 4-5 lesson list verified 2026-07-19 against
// https://courses.talktomeinkorean.com/core-grammar-level-4-non + core-grammar-level-5-non (official TTMIK curriculum)
// cross-checked with the archived official TTMIK Level 4/5 PDF books:
//   https://tulcealibrary.ro/wp-content/uploads/2020/11/Talk-To-Me-In-Korean-%E2%80%93-Level-4.pdf
//   https://tulcealibrary.ro/wp-content/uploads/2020/11/Talk-To-Me-In-Korean-%E2%80%93-Level-5.pdf
// Both levels = 30 lessons each (60 total). Dedup status computed over content/ttmik-sentences.js
// (1,596 studied L1-3 sentences): status=known if forward-tagged OR pattern in >=5 sentences,
// compressed if 3-4, else new. Word Builder / spacing / contraction / drill lessons carry no
// surface grammar pattern, so they are counted as new by design.
// Dedup fragments used (point: fragments -> hits):
//   4.01 -(으)면 -(으)ㄹ수록: 수록 -> 0
//   4.02 -(으)ㄹ래요?: ㄹ래요 을래요 할래 갈래 볼래 줄래 살래 올래 먹을래 마실래 탈래 놀래 -> 1
//   4.03 -(으)ㄹ 리가 없다: 리가 없 -> 0
//   4.04 -지요 / -죠: 지요 죠 -> 3
//   4.05 당신: 당신 -> 2
//   4.07 괜찮아요: 괜찮 -> 10
//   4.08 -아/어도 되다: 도 돼 도 되 -> 5
//   4.09 -(으)면 안 되다: 면 안 돼 면 안 되 -> 0
//   4.10 사이에, 사이에서, 중에, 중에서: 사이에 중에서 -> 3
//   4.11 아무나, 아무도, 아무거나, 아무것도: 아무 -> 2
//   4.12 -아/어 보다: 해 봤 해 보 해 봐 해 볼 아 봤 어 봤 아 봐 어 봐 아 볼 어 볼 아 보 어 보 -> 1
//   4.14 가끔, 자주, 별로, 맨날, 항상: 가끔 자주 별로 맨날 항상 -> 15
//   4.15 아무 + noun + (이)나/도: 아무 -> 2
//   4.18 가장, 제일, 최고: 가장 제일 최고 최상 -> 2
//   4.19 덜: 덜  -> 1
//   4.24 훨씬: 훨씬 -> 0
//   4.25 -(으)ㄹ + 명사: 할 거 할 것 갈 거 갈 것 을 거 을 것 볼 거 줄 거 먹을 것 -> 77
//   4.26 -(으)ㄴ + 명사: 한 것 한 거 은 것 한 적 했던 갔던 봤던 -> 10
//   4.27 -(으)ㄴ/(으)ㄹ 것 같다: 것 같 거 같 ㄹ 것 같 ㄴ 것 같 -> 23
//   4.28 -아/어지다: 아졌 어졌 해졌 아져 어져 해져 아지 어지 -> 2
//   4.29 -게 되다: 게 됐 게 되 게 돼 -> 0
//   5.01 -(으)ㄹ 뻔했다: 뻔했 뻔 했 -> 0
//   5.02 -(으)시-: 세요 으셨 십니다 십니까 시네요 -> 118
//   5.03 수고: 수고 -> 2
//   5.04 -나 보다: 나 봐 나 보다 나 봤 -> 0
//   5.05 -(으)ㄴ가 보다: 인가 보 은가 보 ㄴ가 봐 인가 봐 은가 봐 -> 0
//   5.07 -자마자: 자마자 -> 0
//   5.08 -(으)려고 하다: 려고 -> 0
//   5.09 -다가: 다가 -> 0
//   5.10 명사 + -(이)라고 (말하다): 이라고 라고 해 라고 했 라고 불 라고 합니 -> 0
//   5.12 -(이)라는: 이라는 라는 -> 0
//   5.14 -(으)니까: 니까 -> 1
//   5.15 -(이)라도: 이라도 라도 -> 0
//   5.16 -(ㄴ/는)다: 한다 간다 온다 는다 먹는다 마신다 본다 산다 있다. 없다. -> 0
//   5.17 -(ㄴ/는)다고 (말하다): 다고 해 다고 했 ㄴ다고 는다고 -> 0
//   5.18 -(으)ㄴ/는지: 는지 은지 -> 1
//   5.19 동사 + -(으)라고 하다: 으라고 하라고 가라고 오라고 라고 하지 -> 0
//   5.23 -(으)려나 보다: 려나 -> 0
//   5.24 말고, -지 말고: 말고 -> 1
//   5.25 -에 비해서 -는 편이다: 비해서 는 편이 은 편이 편이에요 편이다 편이야 -> 0
//   5.26 대신에, -는 대신에: 대신 -> 0
//   5.27 -잖아(요): 잖아 -> 4
//   5.28 -(으)ㄹ 수밖에 없다: 수밖에 -> 0
//   5.29 -았/었다고, -(으)ㄹ 거라고: 거라고 았다고 해 었다고 해 다고 했 -> 0
export const CURRICULUM = [
  { "id": "4.01", "ttmik": "Level 4 Lesson 1", "title": "The more..., the more...", "point": "-(으)면 -(으)ㄹ수록", "status": "new", "canDo": "I can say that as one thing increases, another increases." },
  { "id": "4.02", "ttmik": "Level 4 Lesson 2", "title": "Do you want to ...?", "point": "-(으)ㄹ래요?", "status": "known", "canDo": "I can casually ask what someone wants to do." },
  { "id": "4.03", "ttmik": "Level 4 Lesson 3", "title": "It can't be ...", "point": "-(으)ㄹ 리가 없다", "status": "new", "canDo": "I can say something is impossible or unlikely to be true." },
  { "id": "4.04", "ttmik": "Level 4 Lesson 4", "title": "Confirming sentence ending", "point": "-지요 / -죠", "status": "compressed", "canDo": "I can add '..., right?' to confirm what I already assume." },
  { "id": "4.05", "ttmik": "Level 4 Lesson 5", "title": "\"당신\" and \"you\"", "point": "당신", "status": "new", "canDo": "I can understand when the word 당신 is really used." },
  { "id": "4.06", "ttmik": "Level 4 Lesson 6", "title": "Word Builder 3", "point": "動 (동)", "status": "new", "canDo": "I can recognize vocabulary built from the hanja 動 (movement)." },
  { "id": "4.07", "ttmik": "Level 4 Lesson 7", "title": "It's okay / I'm okay", "point": "괜찮아요", "status": "known", "canDo": "I can reassure someone or ask if something is fine." },
  { "id": "4.08", "ttmik": "Level 4 Lesson 8", "title": "It's okay to... / You don't have to...", "point": "-아/어도 되다", "status": "known", "canDo": "I can give or ask for permission to do something." },
  { "id": "4.09", "ttmik": "Level 4 Lesson 9", "title": "You shouldn't... / not supposed to...", "point": "-(으)면 안 되다", "status": "new", "canDo": "I can tell someone something is not allowed." },
  { "id": "4.10", "ttmik": "Level 4 Lesson 10", "title": "Among / Between", "point": "사이에, 사이에서, 중에, 중에서", "status": "compressed", "canDo": "I can say something is between or among other things." },
  { "id": "4.11", "ttmik": "Level 4 Lesson 11", "title": "Anybody / Anything / Anywhere (part 1)", "point": "아무나, 아무도, 아무거나, 아무것도", "status": "new", "canDo": "I can talk about 'anyone', 'anything', or 'no one/nothing'." },
  { "id": "4.12", "ttmik": "Level 4 Lesson 12", "title": "To try doing something", "point": "-아/어 보다", "status": "new", "canDo": "I can say I'll try doing something or ask someone to give it a try." },
  { "id": "4.13", "ttmik": "Level 4 Lesson 13", "title": "Word Builder 4", "point": "不 (불)", "status": "new", "canDo": "I can recognize vocabulary built from the hanja 不 (not)." },
  { "id": "4.14", "ttmik": "Level 4 Lesson 14", "title": "Sometimes / Often / Always / Seldom", "point": "가끔, 자주, 별로, 맨날, 항상", "status": "known", "canDo": "I can say how frequently something happens." },
  { "id": "4.15", "ttmik": "Level 4 Lesson 15", "title": "\"Any\" expanded (part 2)", "point": "아무 + noun + (이)나/도", "status": "new", "canDo": "I can combine 아무 with nouns to say 'any-' or 'no-'." },
  { "id": "4.16", "ttmik": "Level 4 Lesson 16", "title": "Spacing in Korean (part 1)", "point": "띄어쓰기", "status": "new", "canDo": "I can apply basic word-spacing rules when writing Korean." },
  { "id": "4.17", "ttmik": "Level 4 Lesson 17", "title": "Word Contractions (part 1)", "point": "축약형", "status": "new", "canDo": "I can understand common spoken contractions." },
  { "id": "4.18", "ttmik": "Level 4 Lesson 18", "title": "Most / Best (superlative)", "point": "가장, 제일, 최고", "status": "new", "canDo": "I can say something is the most or the best." },
  { "id": "4.19", "ttmik": "Level 4 Lesson 19", "title": "Less / Not completely", "point": "덜", "status": "new", "canDo": "I can say something is done less or not fully." },
  { "id": "4.20", "ttmik": "Level 4 Lesson 20", "title": "Sentence Building Drill #1", "point": "복습 / 문장 만들기", "status": "new", "canDo": "I can combine Level 4 grammar to build longer sentences." },
  { "id": "4.21", "ttmik": "Level 4 Lesson 21", "title": "Spacing in Korean (part 2)", "point": "띄어쓰기", "status": "new", "canDo": "I can apply more advanced word-spacing rules." },
  { "id": "4.22", "ttmik": "Level 4 Lesson 22", "title": "Word Builder 5", "point": "場 (장)", "status": "new", "canDo": "I can recognize vocabulary built from the hanja 場 (place)." },
  { "id": "4.23", "ttmik": "Level 4 Lesson 23", "title": "Word Contractions (part 2)", "point": "축약형", "status": "new", "canDo": "I can understand more spoken contractions." },
  { "id": "4.24", "ttmik": "Level 4 Lesson 24", "title": "Much (more) / Much (less)", "point": "훨씬", "status": "new", "canDo": "I can emphasize a big difference with 'much more/less'." },
  { "id": "4.25", "ttmik": "Level 4 Lesson 25", "title": "-(으)ㄹ + noun (future noun group)", "point": "-(으)ㄹ + 명사", "status": "known", "canDo": "I can attach a future-tense clause in front of a noun." },
  { "id": "4.26", "ttmik": "Level 4 Lesson 26", "title": "-(으)ㄴ + noun (past noun group)", "point": "-(으)ㄴ + 명사", "status": "known", "canDo": "I can attach a past-tense clause in front of a noun." },
  { "id": "4.27", "ttmik": "Level 4 Lesson 27", "title": "I think ...", "point": "-(으)ㄴ/(으)ㄹ 것 같다", "status": "known", "canDo": "I can soften a statement into 'I think...' about past, present, or future." },
  { "id": "4.28", "ttmik": "Level 4 Lesson 28", "title": "To become + adjective", "point": "-아/어지다", "status": "new", "canDo": "I can say something becomes / gets more (adjective)." },
  { "id": "4.29", "ttmik": "Level 4 Lesson 29", "title": "To gradually/eventually get to...", "point": "-게 되다", "status": "new", "canDo": "I can say I ended up or came to do something." },
  { "id": "4.30", "ttmik": "Level 4 Lesson 30", "title": "Sentence Building Drill #2", "point": "복습 / 문장 만들기", "status": "new", "canDo": "I can combine more Level 4 grammar into natural sentences." },
  { "id": "5.01", "ttmik": "Level 5 Lesson 1", "title": "Almost did", "point": "-(으)ㄹ 뻔했다", "status": "new", "canDo": "I can say I almost did something but didn't." },
  { "id": "5.02", "ttmik": "Level 5 Lesson 2", "title": "Honorific suffix -(으)시-", "point": "-(으)시-", "status": "known", "canDo": "I can raise the verb to show respect to the subject." },
  { "id": "5.03", "ttmik": "Level 5 Lesson 3", "title": "Good work", "point": "수고", "status": "new", "canDo": "I can thank someone for their effort appropriately." },
  { "id": "5.04", "ttmik": "Level 5 Lesson 4", "title": "I guess / I assume (part 1)", "point": "-나 보다", "status": "new", "canDo": "I can guess about an action based on what I observe." },
  { "id": "5.05", "ttmik": "Level 5 Lesson 5", "title": "I guess / I assume (part 2)", "point": "-(으)ㄴ가 보다", "status": "new", "canDo": "I can guess about a state or description based on evidence." },
  { "id": "5.06", "ttmik": "Level 5 Lesson 6", "title": "Word Builder 6", "point": "文 (문)", "status": "new", "canDo": "I can recognize vocabulary built from the hanja 文 (writing)." },
  { "id": "5.07", "ttmik": "Level 5 Lesson 7", "title": "As soon as ...", "point": "-자마자", "status": "new", "canDo": "I can say one action happens right after another." },
  { "id": "5.08", "ttmik": "Level 5 Lesson 8", "title": "About to / Planning to ...", "point": "-(으)려고 하다", "status": "new", "canDo": "I can express intention or that something is about to happen." },
  { "id": "5.09", "ttmik": "Level 5 Lesson 9", "title": "While doing, and then ...", "point": "-다가", "status": "new", "canDo": "I can say I switched from one action to another mid-way." },
  { "id": "5.10", "ttmik": "Level 5 Lesson 10", "title": "(To say) that something is + noun", "point": "명사 + -(이)라고 (말하다)", "status": "new", "canDo": "I can quote or label something as a certain noun." },
  { "id": "5.11", "ttmik": "Level 5 Lesson 11", "title": "Sentence Building Drill 3", "point": "복습 / 문장 만들기", "status": "new", "canDo": "I can combine Level 5 grammar to build longer sentences." },
  { "id": "5.12", "ttmik": "Level 5 Lesson 12", "title": "Noun that is called ...", "point": "-(이)라는", "status": "new", "canDo": "I can describe a noun as 'the one called...'." },
  { "id": "5.13", "ttmik": "Level 5 Lesson 13", "title": "Word Builder 7", "point": "會 (회)", "status": "new", "canDo": "I can recognize vocabulary built from the hanja 會 (gathering)." },
  { "id": "5.14", "ttmik": "Level 5 Lesson 14", "title": "Since / Because / As", "point": "-(으)니까", "status": "new", "canDo": "I can give a reason with 'since / because'." },
  { "id": "5.15", "ttmik": "Level 5 Lesson 15", "title": "At least / Instead / It might not be the best but...", "point": "-(이)라도", "status": "new", "canDo": "I can suggest a second-best option with 'at least / even'." },
  { "id": "5.16", "ttmik": "Level 5 Lesson 16", "title": "Narrative present tense", "point": "-(ㄴ/는)다", "status": "new", "canDo": "I can use the plain narrative form for writing and narration." },
  { "id": "5.17", "ttmik": "Level 5 Lesson 17", "title": "To say that ...", "point": "-(ㄴ/는)다고 (말하다)", "status": "new", "canDo": "I can report what someone says in the plain form." },
  { "id": "5.18", "ttmik": "Level 5 Lesson 18", "title": "Whether or not", "point": "-(으)ㄴ/는지", "status": "new", "canDo": "I can express 'whether or not' inside a sentence." },
  { "id": "5.19", "ttmik": "Level 5 Lesson 19", "title": "To tell someone to do something", "point": "동사 + -(으)라고 하다", "status": "new", "canDo": "I can report a command someone gave." },
  { "id": "5.20", "ttmik": "Level 5 Lesson 20", "title": "Sentence Building Drill 4", "point": "복습 / 문장 만들기", "status": "new", "canDo": "I can combine more Level 5 grammar into natural sentences." },
  { "id": "5.21", "ttmik": "Level 5 Lesson 21", "title": "Word Contractions - object marker", "point": "축약형 (part 3) 목적격 조사", "status": "new", "canDo": "I can understand contracted object markers in speech." },
  { "id": "5.22", "ttmik": "Level 5 Lesson 22", "title": "Word Builder 8", "point": "食 (식)", "status": "new", "canDo": "I can recognize vocabulary built from the hanja 食 (food/eat)." },
  { "id": "5.23", "ttmik": "Level 5 Lesson 23", "title": "It seems like / I assume", "point": "-(으)려나 보다", "status": "new", "canDo": "I can guess about something that might happen." },
  { "id": "5.24", "ttmik": "Level 5 Lesson 24", "title": "Not A but B / Don't do THIS but THAT", "point": "말고, -지 말고", "status": "new", "canDo": "I can correct with 'not this, but that'." },
  { "id": "5.25", "ttmik": "Level 5 Lesson 25", "title": "Compared to / Relatively", "point": "-에 비해서 -는 편이다", "status": "new", "canDo": "I can compare and say something tends to be relatively so." },
  { "id": "5.26", "ttmik": "Level 5 Lesson 26", "title": "Instead of ...", "point": "대신에, -는 대신에", "status": "new", "canDo": "I can say I do one thing instead of another." },
  { "id": "5.27", "ttmik": "Level 5 Lesson 27", "title": "You know / Isn't it / You see", "point": "-잖아(요)", "status": "compressed", "canDo": "I can remind the listener of something we both know." },
  { "id": "5.28", "ttmik": "Level 5 Lesson 28", "title": "To have no other choice but to ...", "point": "-(으)ㄹ 수밖에 없다", "status": "new", "canDo": "I can say I have no choice but to do something." },
  { "id": "5.29", "ttmik": "Level 5 Lesson 29", "title": "They said they had done / would do", "point": "-았/었다고, -(으)ㄹ 거라고", "status": "new", "canDo": "I can report past and future statements second-hand." },
  { "id": "5.30", "ttmik": "Level 5 Lesson 30", "title": "Sentence Building Drill 5", "point": "복습 / 문장 만들기", "status": "new", "canDo": "I can combine Level 5 grammar into longer natural sentences." },
];

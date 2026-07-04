/* vocab-usage.js — per-word usage guide for lesson vocabulary.
 *
 * Keyed by the word exactly as it appears in lessons.js / words5k.js, so the
 * same store can grow to cover Core 5k words later with no code changes.
 * Fields:
 *   s   example sentence (Korean, uses grammar at/below the lessons' level)
 *   se  example sentence (English)
 *   u   usage note — when/how the word is used, nuance, register, common mistakes
 *   p   common phrases/collocations: [[korean, english], ...]
 */
window.VOCAB_USAGE = {
  "가다": {
    s: "내일 병원에 가야 돼요.",
    se: "I have to go to the hospital tomorrow.",
    u: "Movement away from the speaker. Destination takes 에 (장소에 가다); to go 'to do something' use -(으)러 가다.",
    p: [["학교에 가다", "to go to school"], ["보러 가다", "to go to see"], ["잘 가요!", "goodbye! (to someone leaving)"]]
  },
  "먹다": {
    s: "아침을 안 먹어서 지금 배고파요.",
    se: "I didn't eat breakfast, so I'm hungry now.",
    u: "General 'eat' — also used for soup and medicine in casual speech (약을 먹다, not 마시다). Honorific form is 드시다 when talking about elders.",
    p: [["밥을 먹다", "to eat (a meal)"], ["약을 먹다", "to take medicine"], ["나이를 먹다", "to get older (idiom)"]]
  },
  "자다": {
    s: "어제 늦게 자서 오늘 피곤해요.",
    se: "I went to bed late yesterday, so I'm tired today.",
    u: "'To sleep'. 잠을 자다 is the full form ('sleep a sleep'). Honorific is 주무시다. '잘 자요' = good night (casual-polite).",
    p: [["잠을 자다", "to sleep"], ["늦게 자다", "to go to bed late"], ["푹 자다", "to sleep deeply"]]
  },
  "사다": {
    s: "동생 생일 선물을 사러 백화점에 가요.",
    se: "I'm going to the department store to buy my younger sibling's birthday present.",
    u: "'To buy'. 사 주다 = buy for someone; in casual speech '내가 살게' means 'my treat / I'll pay'.",
    p: [["선물을 사다", "to buy a present"], ["표를 사다", "to buy a ticket"], ["밥을 사다", "to treat someone to a meal"]]
  },
  "일어나다": {
    s: "매일 아침 여섯 시에 일어나요.",
    se: "I get up at six every morning.",
    u: "'To get up / wake up and rise'; also 'to happen' for events (사고가 일어나다). Different from 깨다 (to wake, eyes open).",
    p: [["일찍 일어나다", "to get up early"], ["자리에서 일어나다", "to stand up from one's seat"], ["사고가 일어나다", "for an accident to happen"]]
  },
  "공부하다": {
    s: "시험 때문에 매일 도서관에서 공부해요.",
    se: "Because of the exam, I study at the library every day.",
    u: "공부 (studying) + 하다. '한국어를 공부하다' or '한국어 공부를 하다' are both fine.",
    p: [["열심히 공부하다", "to study hard"], ["시험 공부", "studying for an exam"]]
  },
  "약": {
    s: "감기에 걸려서 약을 먹어야 돼요.",
    se: "I caught a cold, so I have to take medicine.",
    u: "'Medicine'. You EAT medicine in Korean: 약을 먹다 (never 마시다). 약국 = pharmacy.",
    p: [["약을 먹다", "to take medicine"], ["감기약", "cold medicine"], ["약국", "pharmacy"]]
  },
  "표": {
    s: "기차 표를 미리 사는 게 좋아요.",
    se: "It's good to buy train tickets in advance.",
    u: "'Ticket' for transport/movies/shows. 티켓 is also common. -표 also means 'chart/table' in words like 시간표 (timetable).",
    p: [["표를 사다", "to buy a ticket"], ["영화표", "movie ticket"], ["시간표", "timetable"]]
  },
  "일찍": {
    s: "내일 일찍 일어나야 돼서 지금 잘 거예요.",
    se: "I have to get up early tomorrow, so I'm going to sleep now.",
    u: "Adverb 'early' (before the usual time). Opposite: 늦게. Don't confuse with 빨리 (quickly, at high speed).",
    p: [["일찍 일어나다", "to get up early"], ["일찍 오다", "to come early"], ["아침 일찍", "early in the morning"]]
  },
  "지금": {
    s: "지금 뭐 하고 있어요?",
    se: "What are you doing now?",
    u: "'Now, at this moment'. 요즘 = 'these days' (a broader period). 이제 = 'now (from now on)', implying a change.",
    p: [["지금 바로", "right now"], ["지금부터", "from now on"], ["지금까지", "until now"]]
  },
  "앉다": {
    s: "여기에 앉아도 돼요?",
    se: "May I sit here?",
    u: "'To sit'. Place takes 에: 의자에 앉다. Polite invitation: 앉으세요 ('please sit'). Pronounced [안따].",
    p: [["자리에 앉다", "to take a seat"], ["앉으세요", "please have a seat"]]
  },
  "찍다": {
    s: "여기서 사진을 찍으면 안 돼요.",
    se: "You must not take photos here.",
    u: "'To take (a photo)', also to stamp, dip (sauce), or tap a transit card. 사진을 찍다 is the set phrase for photography.",
    p: [["사진을 찍다", "to take a photo"], ["도장을 찍다", "to stamp a seal"], ["소스에 찍다", "to dip in sauce"]]
  },
  "피우다": {
    s: "건물 안에서 담배를 피우면 안 돼요.",
    se: "You must not smoke inside the building.",
    u: "'To smoke' (cigarettes), literally 'to make bloom/burn'. 담배를 피우다 is the correct collocation — not 담배를 마시다.",
    p: [["담배를 피우다", "to smoke a cigarette"], ["꽃을 피우다", "to bloom flowers"]]
  },
  "늦다": {
    s: "차가 막혀서 수업에 늦었어요.",
    se: "Traffic was bad, so I was late for class.",
    u: "'To be late'. What you're late FOR takes 에: 학교에 늦다. As an adverb use 늦게 (늦게 자다 = go to bed late).",
    p: [["수업에 늦다", "to be late for class"], ["늦게 일어나다", "to get up late"], ["늦지 마세요", "don't be late"]]
  },
  "들어가다": {
    s: "지금 교실에 들어가야 돼요.",
    se: "I have to go into the classroom now.",
    u: "들다 (enter) + 가다 (go): to go in, viewed from outside. From the inside looking at someone entering, use 들어오다 (come in).",
    p: [["집에 들어가다", "to go home / go inside"], ["회사에 들어가다", "to join a company"], ["들어가도 돼요?", "may I come in?"]]
  },
  "사진": {
    s: "제주도에서 찍은 사진을 보여 주세요.",
    se: "Please show me the photos you took on Jeju Island.",
    u: "'Photo(graph)'. Always pairs with 찍다 for taking one. 사진을 잘 받다 = to be photogenic (idiom).",
    p: [["사진을 찍다", "to take a photo"], ["가족 사진", "family photo"], ["증명사진", "ID photo"]]
  },
  "담배": {
    s: "건강 때문에 담배를 끊기로 했어요.",
    se: "I decided to quit smoking for my health.",
    u: "'Cigarette / tobacco'. Smoke = 피우다; quit = 끊다 (lit. 'cut off') — the same verb used for quitting alcohol.",
    p: [["담배를 피우다", "to smoke"], ["담배를 끊다", "to quit smoking"]]
  },
  "여기": {
    s: "여기에서 사진을 찍어도 돼요?",
    se: "May I take a photo here?",
    u: "'Here' (near the speaker). Series: 여기 (here) / 거기 (there, near listener) / 저기 (over there, far from both).",
    p: [["여기요!", "excuse me! (calling staff)"], ["여기저기", "here and there"]]
  },
  "수영하다": {
    s: "여름에 바다에서 수영할 수 있어요.",
    se: "In summer you can swim in the sea.",
    u: "수영 (swimming) + 하다. Place takes 에서: 수영장에서 수영하다. The noun alone works with 하다 split: 수영을 하다.",
    p: [["수영을 배우다", "to learn to swim"], ["수영장", "swimming pool"]]
  },
  "운전하다": {
    s: "피곤할 때 운전하면 안 돼요.",
    se: "You must not drive when you're tired.",
    u: "운전 (driving) + 하다. 'Can drive' = 운전할 수 있다 or 운전할 줄 알다 (know how to). Driver's license = 운전면허증.",
    p: [["운전을 배우다", "to learn to drive"], ["운전면허", "driver's license"], ["음주 운전", "drunk driving"]]
  },
  "읽다": {
    s: "자기 전에 책을 읽는 것을 좋아해요.",
    se: "I like reading books before going to bed.",
    u: "'To read'. Pronounced [익따]; 읽어요 sounds like [일거요]. 책을 읽다 = read a book; for reading aloud, 소리 내서 읽다.",
    p: [["책을 읽다", "to read a book"], ["소리 내서 읽다", "to read aloud"]]
  },
  "오다": {
    s: "친구가 우리 집에 놀러 왔어요.",
    se: "A friend came over to my house to hang out.",
    u: "Movement toward the speaker. Also used for weather: 비가 오다 (to rain), 눈이 오다 (to snow). '어서 오세요' = welcome!",
    p: [["놀러 오다", "to come over to hang out"], ["비가 오다", "to rain"], ["어서 오세요", "welcome (to a shop)"]]
  },
  "만들다": {
    s: "주말에 친구하고 김치를 만들어 봤어요.",
    se: "On the weekend I tried making kimchi with a friend.",
    u: "'To make' — food, objects, plans, even friends (친구를 만들다). ㄹ-verb: 만드니까, 만드는, 만듭니다 drop the ㄹ.",
    p: [["음식을 만들다", "to make food"], ["친구를 만들다", "to make friends"], ["시간을 만들다", "to make time"]]
  },
  "맵다": {
    s: "이 김치가 너무 매워서 못 먹겠어요.",
    se: "This kimchi is so spicy I can't eat it.",
    u: "'To be spicy'. ㅂ-irregular: 매워요, 매운 음식. 맵다 is heat-spicy; strong non-chili flavors use other words.",
    p: [["매운 음식", "spicy food"], ["매운맛", "spicy flavor"], ["너무 맵다", "to be too spicy"]]
  },
  "음식": {
    s: "한국 음식 중에서 뭐가 제일 맛있어요?",
    se: "Among Korean foods, what's the most delicious?",
    u: "'Food, dish' — prepared food. Groceries/ingredients are 식품 or 재료; a restaurant's cuisine is 요리.",
    p: [["한국 음식", "Korean food"], ["음식을 만들다", "to make food"], ["음식점", "restaurant"]]
  },
  "내일": {
    s: "내일 시간이 있으면 같이 영화 볼까요?",
    se: "If you have time tomorrow, shall we watch a movie together?",
    u: "'Tomorrow'. Series: 어제 (yesterday) / 오늘 (today) / 내일 (tomorrow) / 모레 (day after tomorrow). '내일 봐요' = see you tomorrow.",
    p: [["내일 아침", "tomorrow morning"], ["내일 봐요", "see you tomorrow"]]
  },
  "피곤하다": {
    s: "요즘 일이 많아서 항상 피곤해요.",
    se: "These days I have a lot of work, so I'm always tired.",
    u: "'To be tired (fatigued)'. It's an adjective — 'I'm tired' is just 피곤해요. Sleepy is different: 졸리다.",
    p: [["너무 피곤하다", "to be exhausted"], ["피곤해 보여요", "you look tired"]]
  },
  "비가 오다": {
    s: "비가 올 때 집에서 영화 보는 것을 좋아해요.",
    se: "I like watching movies at home when it rains.",
    u: "Literally 'rain comes' — the normal way to say 'it rains'. Also 비가 내리다 (slightly more formal/literary). Heavy rain: 비가 많이 오다.",
    p: [["비가 많이 오다", "to rain a lot"], ["비가 그치다", "for rain to stop"], ["소나기", "rain shower"]]
  },
  "배고프다": {
    s: "점심을 못 먹어서 지금 너무 배고파요.",
    se: "I couldn't eat lunch, so I'm really hungry now.",
    u: "배 (stomach) + 고프다: 'to be hungry'. ㅡ-drop: 배고파요. Full = 배부르다. Casual exclamation: 아, 배고파!",
    p: [["배가 고프다", "to be hungry"], ["배고파 죽겠어요", "I'm starving (idiom)"]]
  },
  "타다": {
    s: "여기서 버스를 타면 학교까지 갈 수 있어요.",
    se: "If you take the bus here, you can get to school.",
    u: "'To ride/board' any transport (에/을 both heard; 버스를 타다 standard). Also to ski (스키를 타다) and 'to burn' (different homonym).",
    p: [["버스를 타다", "to take the bus"], ["지하철을 타다", "to take the subway"], ["자전거를 타다", "to ride a bike"]]
  },
  "택시": {
    s: "늦어서 택시를 타고 왔어요.",
    se: "I was late, so I came by taxi.",
    u: "Loanword 'taxi'. Catch one with 잡다 (택시를 잡다), ride with 타다. Fare = 택시비.",
    p: [["택시를 타다", "to take a taxi"], ["택시를 잡다", "to catch a taxi"], ["택시비", "taxi fare"]]
  },
  "날씨": {
    s: "오늘 날씨가 좋으니까 산책하러 갈까요?",
    se: "The weather is nice today, so shall we go for a walk?",
    u: "'Weather'. 날씨가 좋다/나쁘다 = good/bad weather. Forecast = 일기예보. Small talk starter: 날씨가 참 좋네요!",
    p: [["날씨가 좋다", "the weather is nice"], ["날씨가 춥다", "the weather is cold"], ["일기예보", "weather forecast"]]
  },
  "산책하다": {
    s: "저녁을 먹은 후에 공원에서 산책해요.",
    se: "After eating dinner, I take a walk in the park.",
    u: "산책 (a stroll) + 하다. Leisurely walking for pleasure — different from 걷다 (the physical act of walking). 산책하러 가다 = go for a walk.",
    p: [["산책하러 가다", "to go for a walk"], ["개를 산책시키다", "to walk the dog"]]
  },
  "시간": {
    s: "요즘 너무 바빠서 운동할 시간이 없어요.",
    se: "These days I'm so busy I have no time to exercise.",
    u: "'Time' and also 'hour' as a counter (두 시간 = two hours). 시간이 있다/없다 = to have/not have time. Clock time uses 시 (세 시 = 3 o'clock).",
    p: [["시간이 없다", "to have no time"], ["시간을 지키다", "to be punctual"], ["한 시간", "one hour"]]
  },
  "영화": {
    s: "주말에 친구하고 영화를 보러 갔어요.",
    se: "On the weekend I went to see a movie with a friend.",
    u: "'Movie'. Watch = 보다 (영화를 보다). Theater = 영화관/극장.",
    p: [["영화를 보다", "to watch a movie"], ["영화관", "movie theater"], ["공포 영화", "horror movie"]]
  },
  "도착하다": {
    s: "기차가 서울에 도착하면 전화해 주세요.",
    se: "Please call me when the train arrives in Seoul.",
    u: "'To arrive'. Destination takes 에: 집에 도착하다. Opposite: 출발하다 (to depart).",
    p: [["집에 도착하다", "to arrive home"], ["도착 시간", "arrival time"], ["출발하다", "to depart (opposite)"]]
  },
  "누르다": {
    s: "이 버튼을 누르면 문이 열려요.",
    se: "If you press this button, the door opens.",
    u: "'To press/push (a button)'. 르-irregular: 눌러요. Also 'like' on social media: 좋아요를 누르다.",
    p: [["버튼을 누르다", "to press a button"], ["초인종을 누르다", "to ring the doorbell"], ["좋아요를 누르다", "to hit 'like'"]]
  },
  "버튼": {
    s: "빨간 버튼을 누르면 안 돼요.",
    se: "You must not press the red button.",
    u: "Loanword 'button' (machine/device). A clothing button is usually 단추.",
    p: [["버튼을 누르다", "to press a button"], ["시작 버튼", "start button"]]
  },
  "열리다": {
    s: "이 문은 자동으로 열려요.",
    se: "This door opens automatically.",
    u: "Passive of 열다: the door opens (by itself / is opened). You open something = 열다; something opens = 열리다. Also 'to be held' for events.",
    p: [["문이 열리다", "for a door to open"], ["행사가 열리다", "for an event to be held"]]
  },
  "아프다": {
    s: "머리가 아파서 약을 먹었어요.",
    se: "My head hurt, so I took medicine.",
    u: "'To hurt / be sick'. The body part is the subject: 배가 아파요 (my stomach hurts). ㅡ-drop: 아파요. To elders, 편찮으시다 is the honorific.",
    p: [["머리가 아프다", "to have a headache"], ["배가 아프다", "to have a stomachache"], ["마음이 아프다", "to be heartbroken"]]
  },
  "끝나다": {
    s: "수업이 끝난 후에 뭐 할 거예요?",
    se: "What are you going to do after class ends?",
    u: "'To end' (intransitive) — the thing ends by itself: 수업이 끝나다. To finish something yourself = 끝내다: 숙제를 끝내다.",
    p: [["수업이 끝나다", "for class to end"], ["일이 끝나다", "for work to finish"], ["끝났어요!", "it's over!"]]
  },
  "전화하다": {
    s: "도착하자마자 전화할게요.",
    se: "I'll call you as soon as I arrive.",
    u: "전화 (telephone) + 하다: to make a call. The person you call takes 에게/한테: 친구한테 전화하다. Receive a call = 전화를 받다.",
    p: [["친구한테 전화하다", "to call a friend"], ["전화를 받다", "to answer the phone"], ["전화번호", "phone number"]]
  },
  "재미있다": {
    s: "이 게임이 너무 재미있어서 밤늦게까지 했어요.",
    se: "This game is so fun that I played until late at night.",
    u: "재미 (fun) + 있다 (exists) = interesting/fun. Opposite: 재미없다 (boring). Spoken fast it sounds like 재밌다.",
    p: [["재미있는 영화", "a fun movie"], ["재미없다", "to be boring (opposite)"], ["재밌어요", "it's fun (casual spelling)"]]
  },
  "벌써": {
    s: "벌써 12시예요? 시간이 정말 빨라요.",
    se: "It's already 12 o'clock? Time flies.",
    u: "'Already' — with surprise that it happened sooner than expected. 이미 also means 'already' but is neutral, without surprise.",
    p: [["벌써 끝났어요?", "it's over already?"], ["벌써 일 년", "a whole year already"]]
  },
  "옷": {
    s: "날씨가 추우니까 따뜻한 옷을 입으세요.",
    se: "The weather is cold, so wear warm clothes.",
    u: "'Clothes'. Wear/put on = 입다, take off = 벗다. Pronounced [옫]; 옷을 = [오슬].",
    p: [["옷을 입다", "to wear clothes"], ["옷을 벗다", "to take off clothes"], ["옷 가게", "clothing store"]]
  },
  "학생": {
    s: "저는 아직 학생이라서 돈이 별로 없어요.",
    se: "I'm still a student, so I don't have much money.",
    u: "'Student'. 대학생 = university student, 유학생 = international student. Teachers may address young people as 학생.",
    p: [["대학생", "university student"], ["유학생", "international student"], ["학생증", "student ID"]]
  },
  "사람": {
    s: "그 사람은 정말 친절한 것 같아요.",
    se: "That person seems really kind.",
    u: "'Person'. Nationality + 사람 = person from there: 한국 사람. Counter: 명 or (polite) 분 — 세 사람 = 세 명.",
    p: [["한국 사람", "Korean person"], ["좋은 사람", "a good person"], ["사람이 많다", "to be crowded"]]
  },
  "비싸다": {
    s: "이 가방은 예쁘지만 너무 비싸요.",
    se: "This bag is pretty but too expensive.",
    u: "'To be expensive'. Opposite: 싸다 (cheap). 값이 비싸다 = the price is high (never 높다 for prices of goods in casual speech).",
    p: [["너무 비싸다", "to be too expensive"], ["비싼 가방", "an expensive bag"], ["싸다", "to be cheap (opposite)"]]
  },
  "따뜻하다": {
    s: "봄이 되니까 날씨가 점점 따뜻해져요.",
    se: "Spring is coming, so the weather is gradually getting warmer.",
    u: "'To be warm' — weather, drinks, hearts (따뜻한 사람 = a warm-hearted person). Hot = 뜨겁다 (touch) / 덥다 (weather).",
    p: [["따뜻한 물", "warm water"], ["따뜻한 사람", "a warm-hearted person"], ["마음이 따뜻하다", "to be kind-hearted"]]
  },
  "바쁘다": {
    s: "요즘 시험 때문에 너무 바빠요.",
    se: "These days I'm so busy because of exams.",
    u: "'To be busy'. ㅡ-drop: 바빠요. '바쁘신데 감사합니다' = thanks for your time (polite set phrase).",
    p: [["일이 바쁘다", "to be busy with work"], ["바쁘게 살다", "to live a busy life"]]
  },
  "건강하다": {
    s: "건강해지려면 매일 운동해야 돼요.",
    se: "If you want to get healthy, you have to exercise every day.",
    u: "건강 (health) + 하다: 'to be healthy'. 건강하세요! = stay healthy (a common farewell to elders). 건강에 좋다 = good for your health.",
    p: [["건강에 좋다", "to be good for health"], ["건강 검진", "health checkup"], ["건강하세요", "stay healthy!"]]
  },
  "깨끗하다": {
    s: "방을 청소해서 지금 아주 깨끗해요.",
    se: "I cleaned my room, so it's very clean now.",
    u: "'To be clean' — places, water, even a clean conscience. Opposite: 더럽다 (dirty). Pronounced [깨끄타다].",
    p: [["깨끗한 물", "clean water"], ["깨끗하게 청소하다", "to clean thoroughly"], ["더럽다", "to be dirty (opposite)"]]
  },
  "예쁘다": {
    s: "그 옷을 입으니까 정말 예뻐 보여요.",
    se: "You look really pretty wearing those clothes.",
    u: "'To be pretty'. ㅡ-drop: 예뻐요. For men, 잘생기다 (handsome) is more usual. 예뻐하다 = to cherish/adore someone.",
    p: [["예쁜 옷", "pretty clothes"], ["예뻐 보이다", "to look pretty"]]
  },
  "점점": {
    s: "한국어가 점점 재미있어져요.",
    se: "Korean is gradually getting more fun.",
    u: "'Gradually, more and more'. Pairs naturally with -아/어지다 (become): 점점 좋아져요 = it keeps getting better.",
    p: [["점점 좋아지다", "to gradually improve"], ["점점 더", "more and more"]]
  },
  "요즘": {
    s: "요즘 어떻게 지내요?",
    se: "How are you doing these days?",
    u: "'These days, lately' — the recent period including now. Wider than 지금 (this instant). 요즘 어때요? = how's it going lately?",
    p: [["요즘 바쁘다", "to be busy these days"], ["요즘 어때요?", "how are things lately?"]]
  },
  "운동하다": {
    s: "건강을 위해서 아침마다 운동해요.",
    se: "I exercise every morning for my health.",
    u: "운동 (exercise/sports) + 하다. Covers workouts and playing sports generally; a specific sport often takes 하다 too (축구하다).",
    p: [["운동하러 가다", "to go work out"], ["운동을 시작하다", "to start exercising"]]
  },
  "때": {
    s: "어릴 때 피아노를 배웠어요.",
    se: "I learned piano when I was young.",
    u: "'The time when...'. V-(으)ㄹ 때 = when doing; N 때 = at the time of (시험 때 = during exams). 때때로 = from time to time.",
    p: [["어릴 때", "when (I) was young"], ["시험 때", "during exam time"], ["그때", "at that time"]]
  },
  "어리다": {
    s: "어릴 때 제주도에 산 적이 있어요.",
    se: "I lived on Jeju Island when I was young.",
    u: "'To be young (a child)' — younger than roughly teens, or younger than the speaker. For 'youthful' adults use 젊다.",
    p: [["어린 아이", "a young child"], ["어릴 때", "in childhood"], ["젊다", "to be young (adult, compare)"]]
  },
  "우산": {
    s: "비가 올 것 같으니까 우산을 가져가세요.",
    se: "It looks like it will rain, so take an umbrella.",
    u: "'Umbrella' (우 = rain). Carry/take = 가져가다, open = 쓰다/펴다: 우산을 쓰다 = to hold up an umbrella.",
    p: [["우산을 쓰다", "to use an umbrella"], ["우산을 가져가다", "to take an umbrella"]]
  },
  "심심하다": {
    s: "주말에 심심하면 같이 게임할래요?",
    se: "If you're bored on the weekend, want to play a game together?",
    u: "'To be bored' (nothing to do). A boring THING is 재미없다/지루하다 — 심심하다 describes the person, not the movie.",
    p: [["심심해 죽겠어요", "I'm bored to death"], ["심심할 때", "when bored"]]
  },
  "음악": {
    s: "공부할 때 음악을 들으면서 해요.",
    se: "When I study, I do it while listening to music.",
    u: "'Music'. Listen = 듣다 (음악을 듣다). Song = 노래. K-pop in Korean is 케이팝 or 가요 for Korean pop generally.",
    p: [["음악을 듣다", "to listen to music"], ["클래식 음악", "classical music"]]
  },
  "듣다": {
    s: "매일 한국 노래를 들으면서 공부해요.",
    se: "I study while listening to Korean songs every day.",
    u: "'To listen/hear'. ㄷ-irregular: 들어요, 들으면, but 듣고/듣기. Also 'to take (a class)': 수업을 듣다. 말을 듣다 = to obey.",
    p: [["음악을 듣다", "to listen to music"], ["수업을 듣다", "to take a class"], ["말을 잘 듣다", "to be obedient"]]
  },
  "가져가다": {
    s: "우산을 가져가는 게 좋을 것 같아요.",
    se: "I think it'd be good to take an umbrella.",
    u: "가지다 (have) + 가다 (go): to take something along (away from here). Bring toward the speaker = 가져오다.",
    p: [["우산을 가져가다", "to take an umbrella"], ["가져오다", "to bring (opposite direction)"]]
  },
  "살다": {
    s: "저는 서울에 산 지 3년 됐어요.",
    se: "I've lived in Seoul for three years.",
    u: "'To live' — reside (서울에 살다) and be alive. ㄹ-verb: 사니까, 사는, 삽니다. 살아요 also answers 'how are you' idioms (잘 살다 = live well).",
    p: [["서울에 살다", "to live in Seoul"], ["혼자 살다", "to live alone"], ["잘 살다", "to live well"]]
  },
  "이를 닦다": {
    s: "자기 전에 꼭 이를 닦아야 돼요.",
    se: "You must brush your teeth before going to bed.",
    u: "이 (teeth) + 닦다 (polish/wipe): to brush teeth. 양치하다 is a common one-word equivalent. 닦다 also wipes windows, shines shoes.",
    p: [["이를 닦다", "to brush one's teeth"], ["양치하다", "to brush teeth (synonym)"], ["구두를 닦다", "to shine shoes"]]
  },
  "손": {
    s: "밥을 먹기 전에 손을 씻으세요.",
    se: "Wash your hands before eating.",
    u: "'Hand'. Rich in idioms: 손이 크다 (generous, lit. big hands), 손을 잡다 (hold hands / join forces).",
    p: [["손을 씻다", "to wash hands"], ["손을 잡다", "to hold hands"], ["손이 크다", "to be generous (idiom)"]]
  },
  "씻다": {
    s: "집에 들어오자마자 손을 씻어요.",
    se: "I wash my hands as soon as I come home.",
    u: "'To wash' (body parts, fruit, dishes informally). Whole-body shower = 샤워하다; hair = 감다 (머리를 감다, not 씻다!).",
    p: [["손을 씻다", "to wash hands"], ["과일을 씻다", "to wash fruit"], ["머리를 감다", "to wash hair (special verb)"]]
  },
  "나가다": {
    s: "잠깐 밖에 나갔다 올게요.",
    se: "I'll step outside for a moment and come back.",
    u: "'To go out' (exit, from inside). Out toward speaker = 나오다. 나가 주세요 = please leave (strong!). Also 'to enter (a contest)'.",
    p: [["밖에 나가다", "to go outside"], ["집에서 나가다", "to leave the house"], ["대회에 나가다", "to enter a competition"]]
  },
  "창문": {
    s: "더우니까 창문을 열어 주세요.",
    se: "It's hot, so please open the window.",
    u: "'Window' (창 also used alone). Open/close = 열다/닫다. Car window is usually just 창문 too.",
    p: [["창문을 열다", "to open the window"], ["창문을 닫다", "to close the window"], ["창가 자리", "window seat"]]
  },
  "닫다": {
    s: "추우면 창문을 닫아도 돼요.",
    se: "If you're cold, you may close the window.",
    u: "'To close' (doors, windows, books). A shop closing (for the day/forever) = 문을 닫다. Passive: 닫히다 (문이 닫혔어요).",
    p: [["문을 닫다", "to close the door / shut down shop"], ["뚜껑을 닫다", "to close a lid"]]
  },
  "결정하다": {
    s: "어느 대학에 갈지 아직 결정 못 했어요.",
    se: "I haven't decided yet which university to go to.",
    u: "결정 (decision) + 하다. 'Decide to do' commonly uses -기로 하다 instead: 가기로 했어요 = I decided to go.",
    p: [["결정을 내리다", "to make a decision"], ["-기로 결정하다", "to decide to do"]]
  },
  "수업": {
    s: "수업이 끝난 후에 도서관에 갈 거예요.",
    se: "I'm going to the library after class ends.",
    u: "'Class (session)'. Take a class = 수업을 듣다 (lit. listen). 수업 시간 = class time. The subject/course itself is 과목.",
    p: [["수업을 듣다", "to take a class"], ["수업이 있다", "to have class"], ["수업 시간", "class time"]]
  },
  "숙제": {
    s: "숙제를 다 한 후에 게임해도 돼요.",
    se: "You may play games after finishing all your homework.",
    u: "'Homework'. Do = 하다, submit = 내다 (숙제를 내다 also means teacher assigns it — context decides!).",
    p: [["숙제를 하다", "to do homework"], ["숙제를 내다", "to hand in homework"], ["숙제가 많다", "to have lots of homework"]]
  },
  "게임": {
    s: "동생하고 게임을 하면서 놀았어요.",
    se: "I played games with my younger sibling.",
    u: "Loanword 'game' (video/board). Play = 하다: 게임을 하다, never 놀다 alone with 게임. 게임에 이기다/지다 = win/lose a game.",
    p: [["게임을 하다", "to play a game"], ["게임에 이기다", "to win a game"], ["모바일 게임", "mobile game"]]
  },
  "샤워하다": {
    s: "운동한 후에 샤워해요.",
    se: "I take a shower after exercising.",
    u: "샤워 (shower) + 하다. Full bath = 목욕하다. 샤워를 하다 with the object marker is equally fine.",
    p: [["샤워를 하다", "to take a shower"], ["목욕하다", "to take a bath (compare)"]]
  },
  "저녁": {
    s: "오늘 저녁에 같이 밥 먹을래요?",
    se: "Want to eat together this evening?",
    u: "Both 'evening' and 'dinner' — 저녁을 먹다 = eat dinner. Same double duty as 아침 (morning/breakfast) and 점심 (noon/lunch).",
    p: [["저녁을 먹다", "to eat dinner"], ["저녁에", "in the evening"], ["저녁 식사", "dinner (formal)"]]
  },
  "만나다": {
    s: "내일 몇 시에 만날까요?",
    se: "What time shall we meet tomorrow?",
    u: "'To meet'. The person takes 을/를 or 하고: 친구를 만나다. Also 'to date': 만나는 사람 있어요? = are you seeing someone?",
    p: [["친구를 만나다", "to meet a friend"], ["만나서 반갑습니다", "nice to meet you"], ["우연히 만나다", "to run into by chance"]]
  },
  "후에": {
    s: "수업 후에 뭐 할 거예요?",
    se: "What will you do after class?",
    u: "'After' — N 후에 (수업 후에) or V-(으)ㄴ 후에 (먹은 후에). Synonym: 다음에/뒤에. Opposite: 전에 (before).",
    p: [["수업 후에", "after class"], ["먹은 후에", "after eating"], ["그 후에", "after that"]]
  },
  "입다": {
    s: "오늘 뭘 입을지 아직 못 정했어요.",
    se: "I still haven't decided what to wear today.",
    u: "'To wear' — but only for clothes on the body! Shoes/socks = 신다, hats/glasses = 쓰다, accessories = 하다, watches = 차다.",
    p: [["옷을 입다", "to wear clothes"], ["한번 입어 보세요", "try it on"], ["신다/쓰다", "wear shoes / wear hats (compare)"]]
  },
  "제주도": {
    s: "제주도에 가 본 적이 있어요?",
    se: "Have you ever been to Jeju Island?",
    u: "Korea's largest island, a top vacation spot — like Korea's Hawaii. -도 = island. Famous for 한라산, beaches, and tangerines (귤).",
    p: [["제주도에 가다", "to go to Jeju"], ["제주도 여행", "Jeju trip"]]
  },
  "한번": {
    s: "이 김치를 한번 먹어 보세요.",
    se: "Give this kimchi a try.",
    u: "Literally 'one time', but usually a softener: 'just give it a try' — 한번 해 보세요. As a literal count, write 한 번 (with space).",
    p: [["한번 해 보세요", "give it a try"], ["한번 더", "one more time"], ["언제 한번 만나요", "let's meet sometime"]]
  },
  "다시": {
    s: "잘 못 들었어요. 다시 말해 주세요.",
    se: "I didn't hear well. Please say it again.",
    u: "'Again, once more'. 다시 한번 = one more time. 또 also means 'again' but often with mild annoyance (또?! = again?!).",
    p: [["다시 한번", "once again"], ["다시 시작하다", "to start over"], ["또", "again (compare)"]]
  },
  "김치": {
    s: "한국 사람들은 밥을 먹을 때 김치를 먹어요.",
    se: "Koreans eat kimchi with their meals.",
    u: "Korea's iconic fermented vegetable dish, usually cabbage. Make it (in bulk, in late autumn) = 김장하다. Kimchi stew = 김치찌개.",
    p: [["김치를 담그다", "to make kimchi"], ["김치찌개", "kimchi stew"], ["김장", "annual kimchi-making"]]
  },
  "책": {
    s: "요즘 읽고 있는 책이 정말 재미있어요.",
    se: "The book I'm reading these days is really interesting.",
    u: "'Book'. Read = 읽다, counter = 권: 책 두 권 = two books. Bookstore = 서점/책방.",
    p: [["책을 읽다", "to read a book"], ["책 한 권", "one book"], ["책상", "desk (book-table)"]]
  },
  "열다": {
    s: "더워서 창문을 열었어요.",
    se: "It was hot, so I opened the window.",
    u: "'To open' (transitive — you open it). It opens by itself = 열리다. Also to open/hold an event: 파티를 열다. ㄹ-verb.",
    p: [["문을 열다", "to open the door"], ["가게를 열다", "to open a shop"], ["파티를 열다", "to throw a party"]]
  },
  "돕다": {
    s: "친구가 이사할 때 도와줬어요.",
    se: "I helped my friend when they moved.",
    u: "'To help'. ㅂ-irregular: 도와요, 도와주다. In practice almost always 도와주다 (help + give). 도움 = help (noun).",
    p: [["도와주세요", "please help me"], ["일을 돕다", "to help with work"], ["도움이 되다", "to be helpful"]]
  },
  "말하다": {
    s: "천천히 말해 주세요.",
    se: "Please speak slowly.",
    u: "말 (speech) + 하다: to speak/tell. Tell someone = 한테 말하다. Honorific: 말씀하시다 (their speech) / 말씀드리다 (my speech to them).",
    p: [["천천히 말하다", "to speak slowly"], ["사실을 말하다", "to tell the truth"], ["말씀하세요", "please go ahead (honorific)"]]
  },
  "들다": {
    s: "가방이 무거우면 제가 들어 드릴게요.",
    se: "If the bag is heavy, I'll carry it for you.",
    u: "'To hold/lift/carry (in hand)'. Busy homonym: 마음에 들다 (to like), 돈이 들다 (to cost), 잠이 들다 (fall asleep). ㄹ-verb.",
    p: [["가방을 들다", "to carry a bag"], ["마음에 들다", "to be to one's liking"], ["돈이 들다", "to cost money"]]
  },
  "천천히": {
    s: "천천히 드세요.",
    se: "Eat slowly / take your time.",
    u: "'Slowly'. 천천히 하세요 = take your time. Opposite: 빨리 (quickly). Doubled 천천히 천천히 for emphasis in casual talk.",
    p: [["천천히 말하다", "to speak slowly"], ["천천히 드세요", "take your time eating"], ["빨리", "quickly (opposite)"]]
  },
  "좀": {
    s: "물 좀 주세요.",
    se: "Please give me some water.",
    u: "Contraction of 조금 (a little), but mostly a politeness softener in requests: 문 좀 닫아 주세요. Dropping it can sound blunt.",
    p: [["좀 주세요", "please give me some"], ["좀 도와주세요", "please help me out"], ["조금", "a little (full form)"]]
  },
  "문": {
    s: "나갈 때 문을 닫아 주세요.",
    se: "Please close the door when you leave.",
    u: "'Door/gate'. 문을 열다/닫다 = open/close. A shop 'closing down' is also 문을 닫다. 대문 = main gate, 창문 = window (lit. window-door).",
    p: [["문을 열다", "to open the door"], ["문을 닫다", "to close the door"], ["문 앞에서", "in front of the door"]]
  },
  "보다": {
    s: "지하철이 버스보다 더 빨라요.",
    se: "The subway is faster than the bus.",
    u: "The comparison particle 'than' — attaches to the thing compared against: A가 B보다 크다 = A is bigger than B. Often paired with 더 (more).",
    p: [["버스보다 빠르다", "faster than the bus"], ["생각보다", "than expected"], ["누구보다", "more than anyone"]]
  },
  "더": {
    s: "조금 더 천천히 말해 주세요.",
    se: "Please speak a little more slowly.",
    u: "'More'. Pairs with 보다 in comparisons; alone it means 'additionally': 더 주세요 = give me more. Opposite: 덜 (less).",
    p: [["더 주세요", "more, please"], ["더 많이", "even more"], ["덜", "less (opposite)"]]
  },
  "제일": {
    s: "한국 음식 중에서 김치찌개를 제일 좋아해요.",
    se: "Among Korean foods, I like kimchi stew the most.",
    u: "'The most / number one' (superlative). 가장 is the slightly more formal synonym; 제일 is more conversational.",
    p: [["제일 좋아하다", "to like the most"], ["제일 크다", "to be the biggest"], ["세상에서 제일", "the best in the world"]]
  },
  "차": {
    s: "따뜻한 차 한 잔 드릴까요?",
    se: "Shall I get you a cup of warm tea?",
    u: "'Tea' — and a homonym for 'car' (자동차). Context decides: 차를 마시다 (drink tea) vs 차를 타다 (ride a car). Green tea = 녹차.",
    p: [["차를 마시다", "to drink tea"], ["녹차", "green tea"], ["차 한 잔", "a cup of tea"]]
  },
  "춥다": {
    s: "겨울이 되니까 점점 추워져요.",
    se: "Winter is coming, so it's getting colder and colder.",
    u: "'To be cold' (weather / feeling cold). ㅂ-irregular: 추워요, 추운 날씨. A cold OBJECT is 차갑다 (차가운 물 = cold water).",
    p: [["날씨가 춥다", "the weather is cold"], ["추운 겨울", "cold winter"], ["차갑다", "cold to the touch (compare)"]]
  },
  "빠르다": {
    s: "KTX가 제일 빠른 기차예요.",
    se: "The KTX is the fastest train.",
    u: "'To be fast'. 르-irregular: 빨라요. Adverb = 빨리 (quickly). Opposite: 느리다 (slow). Time flying: 시간이 빠르다.",
    p: [["빠른 기차", "a fast train"], ["시간이 빠르다", "time flies"], ["느리다", "to be slow (opposite)"]]
  },
  "기차": {
    s: "부산까지 기차를 타고 갔어요.",
    se: "I went to Busan by train.",
    u: "'Train' (intercity). Subway = 지하철. Korea's high-speed rail = KTX. Take/ride = 타다; station = 기차역.",
    p: [["기차를 타다", "to take a train"], ["기차역", "train station"], ["기차표", "train ticket"]]
  },
  "가을": {
    s: "가을이 되면 단풍이 정말 예뻐요.",
    se: "When autumn comes, the fall leaves are really pretty.",
    u: "'Autumn/fall'. Seasons: 봄, 여름, 가을, 겨울. 가을이 되다 = autumn comes. Famous phrase: 독서의 계절 (season of reading).",
    p: [["가을이 되다", "for autumn to come"], ["가을 날씨", "autumn weather"], ["단풍", "autumn leaves"]]
  },
  "기다리다": {
    s: "친구를 30분 동안 기다렸어요.",
    se: "I waited for my friend for 30 minutes.",
    u: "'To wait'. The person/thing waited for takes 을/를 (NOT 을 위해): 버스를 기다리다. 잠깐만 기다리세요 = just a moment.",
    p: [["버스를 기다리다", "to wait for the bus"], ["잠깐만 기다리세요", "please wait a moment"], ["기대하다", "to look forward to (compare)"]]
  },
  "청소하다": {
    s: "주말마다 방을 청소해요.",
    se: "I clean my room every weekend.",
    u: "청소 (cleaning) + 하다 — tidying/cleaning spaces. Washing dishes = 설거지하다; laundry = 빨래하다. Vacuum = 청소기.",
    p: [["방을 청소하다", "to clean one's room"], ["청소기", "vacuum cleaner"], ["대청소", "big/spring cleaning"]]
  },
  "일하다": {
    s: "형은 은행에서 일해요.",
    se: "My older brother works at a bank.",
    u: "일 (work) + 하다. Workplace takes 에서: 회사에서 일하다. 일 alone = work/task/matter — 일이 있어요 can mean 'I have something to do'.",
    p: [["회사에서 일하다", "to work at a company"], ["열심히 일하다", "to work hard"], ["일이 많다", "to have much work"]]
  },
  "동생": {
    s: "제 동생은 저보다 세 살 어려요.",
    se: "My younger sibling is three years younger than me.",
    u: "'Younger sibling' (either sex). Specify with 여동생 (sister) / 남동생 (brother). Also used for younger close friends.",
    p: [["여동생", "younger sister"], ["남동생", "younger brother"], ["동생이 있어요", "I have a younger sibling"]]
  },
  "사실": {
    s: "사실 저는 매운 음식을 잘 못 먹어요.",
    se: "Actually, I can't really eat spicy food.",
    u: "'Fact' as a noun; sentence-initially it works like 'actually / to be honest'. 사실은... = the truth is...",
    p: [["사실은", "actually / in fact"], ["사실을 말하다", "to tell the truth"], ["사실이에요?", "is that true?"]]
  },
  "알다": {
    s: "그 사람을 어떻게 알아요?",
    se: "How do you know that person?",
    u: "'To know'. ㄹ-verb: 아니까, 아는 사람 (acquaintance). 알겠습니다 = understood; 알았어(요) = got it. Know how to = -(으)ㄹ 줄 알다.",
    p: [["아는 사람", "an acquaintance"], ["알겠습니다", "understood (polite)"], ["알고 있다", "to be aware"]]
  },
  "우연히": {
    s: "길에서 우연히 고등학교 친구를 만났어요.",
    se: "I ran into a high school friend on the street by chance.",
    u: "'By chance, accidentally (of encounters)'. Typically with 만나다/보다. The planned opposite: 일부러 (on purpose).",
    p: [["우연히 만나다", "to meet by chance"], ["우연히 알게 되다", "to find out by chance"], ["우연", "coincidence (noun)"]]
  },
  "배우다": {
    s: "요즘 한국 요리를 배우고 있어요.",
    se: "These days I'm learning Korean cooking.",
    u: "'To learn' — from a teacher/experience. Study by yourself = 공부하다; 배우다 implies being taught. -는 것을 배우다 or N을 배우다.",
    p: [["한국어를 배우다", "to learn Korean"], ["운전을 배우다", "to learn to drive"], ["배울 점", "something to learn from"]]
  },
  "좋아하다": {
    s: "저는 액션 영화 보는 것을 좋아해요.",
    se: "I like watching action movies.",
    u: "'To like' — a VERB, so it takes 을/를: 커피를 좋아해요 (not 커피가!). 좋다 is the adjective ('is good/liked': 커피가 좋아요).",
    p: [["음악을 좋아하다", "to like music"], ["제일 좋아하는", "favorite"], ["좋다", "to be good (compare)"]]
  },
  "줄": {
    s: "저는 김치를 담글 줄 알아요.",
    se: "I know how to make kimchi.",
    u: "Bound noun 'how to': V-(으)ㄹ 줄 알다/모르다 = know/not know how to. Also 'line/queue' (줄을 서다) and 'string'.",
    p: [["할 줄 알다", "to know how to do"], ["할 줄 모르다", "to not know how"], ["줄을 서다", "to stand in line"]]
  },
  "피아노": {
    s: "어릴 때부터 피아노를 쳤어요.",
    se: "I've played piano since I was young.",
    u: "Loanword 'piano'. Play = 치다 (strike) — used for piano, guitar, drums. Wind instruments use 불다 (blow); violin uses 켜다.",
    p: [["피아노를 치다", "to play piano"], ["피아노 학원", "piano academy"]]
  },
  "치다": {
    s: "주말에 친구하고 테니스를 쳐요.",
    se: "I play tennis with a friend on weekends.",
    u: "'To hit/strike' — playing piano/guitar, tennis/golf, clapping (박수를 치다), typing (타자를 치다). Very collocational; learn the pairs.",
    p: [["피아노를 치다", "to play piano"], ["테니스를 치다", "to play tennis"], ["박수를 치다", "to clap"]]
  },
  "젓가락": {
    s: "젓가락을 쓸 줄 알아요?",
    se: "Do you know how to use chopsticks?",
    u: "'Chopsticks'. Korean ones are metal and flat — harder than wooden ones! Spoon = 숟가락; the pair = 수저. Counter: 벌 or 짝.",
    p: [["젓가락을 쓰다", "to use chopsticks"], ["숟가락", "spoon"], ["수저", "spoon & chopsticks set"]]
  },
  "쓰다": {
    s: "이름을 여기에 써 주세요.",
    se: "Please write your name here.",
    u: "Busy homonym: write (편지를 쓰다), use (돈을 쓰다), wear on head (모자를 쓰다), be bitter (맛이 쓰다). ㅡ-drop: 써요.",
    p: [["편지를 쓰다", "to write a letter"], ["돈을 쓰다", "to spend money"], ["모자를 쓰다", "to wear a hat"]]
  },
  "못": {
    s: "저는 수영을 못 해요.",
    se: "I can't swim.",
    u: "'Cannot' — inability/impossibility, before the verb: 못 가요. With 하다-verbs it splits: 운전 못 해요. Compare 안 (choose not to) vs 못 (can't).",
    p: [["못 가다", "can't go"], ["못 먹다", "can't eat"], ["안 vs 못", "won't vs can't (grammar)"]]
  },
  "잠": {
    s: "어제 잠을 잘 못 자서 피곤해요.",
    se: "I couldn't sleep well last night, so I'm tired.",
    u: "'Sleep' (noun). 잠을 자다 = to sleep; 잠이 오다 = to feel sleepy; 잠이 들다 = to fall asleep; 낮잠 = nap.",
    p: [["잠을 자다", "to sleep"], ["잠이 오다", "to get sleepy"], ["낮잠을 자다", "to take a nap"]]
  },
  "수영": {
    s: "수영을 배우고 싶은데 시간이 없어요.",
    se: "I want to learn swimming, but I have no time.",
    u: "'Swimming' (noun). Do it = 수영하다 / 수영을 하다. Pool = 수영장; swimsuit = 수영복.",
    p: [["수영을 하다", "to swim"], ["수영장", "swimming pool"], ["수영복", "swimsuit"]]
  },
  "다": {
    s: "숙제를 다 했어요?",
    se: "Did you finish all your homework?",
    u: "'All, completely' — before the verb: 다 먹었어요 = I ate it all. 다 왔어요 = we're almost there (idiom!). 모두/전부 are noun-like synonyms.",
    p: [["다 먹다", "to eat everything"], ["다 왔어요", "we're almost there"], ["다 같이", "all together"]]
  },
  "어제": {
    s: "어제 뭐 했어요?",
    se: "What did you do yesterday?",
    u: "'Yesterday'. No particle needed: 어제 갔어요. Series: 그저께 (day before) / 어제 / 오늘 / 내일. 어젯밤 = last night.",
    p: [["어제 저녁", "yesterday evening"], ["어젯밤", "last night"], ["그저께", "the day before yesterday"]]
  },
  "텔레비전": {
    s: "저녁을 먹으면서 텔레비전을 봐요.",
    se: "I watch TV while eating dinner.",
    u: "'Television'. Everyone says 티비(TV) in conversation. Watch = 보다; turn on/off = 켜다/끄다.",
    p: [["텔레비전을 보다", "to watch TV"], ["티비를 켜다", "to turn on the TV"], ["티비를 끄다", "to turn off the TV"]]
  },
  "걷다": {
    s: "날씨가 좋아서 학교까지 걸어서 갔어요.",
    se: "The weather was nice, so I walked to school.",
    u: "'To walk'. ㄷ-irregular: 걸어요, 걸으면, but 걷고/걷기. 걸어서 가다 = go on foot. Don't confuse with 걸다 (to hang/call).",
    p: [["걸어서 가다", "to go on foot"], ["많이 걷다", "to walk a lot"], ["산책하다", "to stroll (compare)"]]
  },
  "노래하다": {
    s: "노래방에서 세 시간 동안 노래했어요.",
    se: "We sang for three hours at karaoke.",
    u: "노래 (song) + 하다. 노래를 부르다 (sing a song, lit. 'call') is at least as common. Karaoke = 노래방 (song room).",
    p: [["노래를 부르다", "to sing a song"], ["노래방", "karaoke room"], ["노래를 잘하다", "to sing well"]]
  },
  "춤을 추다": {
    s: "그 가수는 노래하면서 춤을 춰요.",
    se: "That singer dances while singing.",
    u: "춤 (dance) + 추다 (the dedicated verb for dancing) — a set pair like 잠을 자다. Just 춤추다 works as one word too.",
    p: [["춤을 잘 추다", "to dance well"], ["춤을 배우다", "to learn to dance"]]
  },
  "웃다": {
    s: "그 영화를 보면서 많이 웃었어요.",
    se: "I laughed a lot watching that movie.",
    u: "'To smile / laugh' — one verb for both. Smile broadly = 활짝 웃다; burst out laughing = 웃음이 터지다. Opposite: 울다 (cry).",
    p: [["활짝 웃다", "to smile brightly"], ["웃음", "laughter (noun)"], ["울다", "to cry (opposite)"]]
  },
  "인사하다": {
    s: "한국에서는 어른에게 고개를 숙여서 인사해요.",
    se: "In Korea, you greet elders with a bow.",
    u: "인사 (greeting) + 하다 — covers hello AND goodbye greetings, plus formal introductions. 인사를 드리다 = greet (honorific).",
    p: [["인사를 하다", "to greet"], ["첫인사", "first greeting"], ["인사드리다", "to pay respects (honorific)"]]
  },
  "마시다": {
    s: "아침마다 커피를 한 잔 마셔요.",
    se: "I drink a cup of coffee every morning.",
    u: "'To drink'. Also for air: 공기를 마시다 (breathe fresh air). Medicine is 먹다, soup can be 먹다 — 마시다 is for actual drinking.",
    p: [["커피를 마시다", "to drink coffee"], ["물을 마시다", "to drink water"], ["술을 마시다", "to drink alcohol"]]
  },
  "끊다": {
    s: "새해에는 담배를 끊을 거예요.",
    se: "In the new year I'm going to quit smoking.",
    u: "'To cut off / quit' — smoking/drinking (담배/술을 끊다), hang up the phone (전화를 끊다), sever ties. Pronounced [끈타].",
    p: [["담배를 끊다", "to quit smoking"], ["전화를 끊다", "to hang up"], ["술을 끊다", "to quit drinking"]]
  },
  "매일": {
    s: "매일 아침 한국어를 30분씩 공부해요.",
    se: "I study Korean for 30 minutes every morning.",
    u: "매 (every) + 일 (day): 'every day'. Family: 매주 (weekly), 매달 (monthly), 매년 (yearly). No particle needed.",
    p: [["매일 아침", "every morning"], ["매일매일", "day after day"], ["매주", "every week"]]
  },
  "일기": {
    s: "한국어로 일기를 쓰면 실력이 늘어요.",
    se: "If you write a diary in Korean, your skills improve.",
    u: "'Diary/journal'. Write = 쓰다: 일기를 쓰다. Homonym alert: 일기예보 (weather forecast) uses a different 일기 (日氣).",
    p: [["일기를 쓰다", "to keep a diary"], ["일기장", "diary (the notebook)"]]
  },
  "다이어트": {
    s: "다이어트 때문에 저녁을 조금만 먹어요.",
    se: "Because I'm on a diet, I only eat a little dinner.",
    u: "Loanword 'diet' — in Korean it means weight-loss dieting specifically, not 'what you eat' generally. Do one = 다이어트를 하다.",
    p: [["다이어트를 하다", "to be on a diet"], ["다이어트에 성공하다", "to succeed at dieting"]]
  },
  "적": {
    s: "한복을 입어 본 적이 있어요?",
    se: "Have you ever worn hanbok?",
    u: "Bound noun for experience: V-(으)ㄴ 적이 있다/없다 = have/haven't ever done. Almost always with 아/어 보다: 가 본 적이 있다.",
    p: [["가 본 적이 있다", "to have been (somewhere)"], ["들은 적이 없다", "to have never heard"]]
  },
  "한복": {
    s: "설날에 한복을 입고 사진을 찍었어요.",
    se: "On Lunar New Year I wore hanbok and took photos.",
    u: "Traditional Korean clothing (한 Korea + 복 clothes). Worn on holidays and weddings; rentable at palaces for free entry!",
    p: [["한복을 입다", "to wear hanbok"], ["한복 대여", "hanbok rental"]]
  },
  "비행기": {
    s: "비행기를 타고 제주도에 갔어요.",
    se: "I took a plane to Jeju Island.",
    u: "'Airplane' (비행 flight + 기 machine). Ride = 타다; ticket = 비행기표/항공권; airport = 공항.",
    p: [["비행기를 타다", "to take a plane"], ["비행기표", "plane ticket"], ["공항", "airport"]]
  },
  "아무리": {
    s: "아무리 바빠도 아침은 꼭 먹어요.",
    se: "No matter how busy I am, I always eat breakfast.",
    u: "'No matter how...' — must pair with -아/어도: 아무리 -아/어도. 아무리 그래도 = even so, still.",
    p: [["아무리 바빠도", "no matter how busy"], ["아무리 해도", "no matter what I do"], ["아무리 그래도", "even so"]]
  },
  "배부르다": {
    s: "너무 많이 먹어서 배불러요.",
    se: "I ate too much, so I'm full.",
    u: "배 (stomach) + 부르다 (full): 'to be full'. 르-irregular: 배불러요. Polite after a meal: 잘 먹었습니다 rather than announcing fullness.",
    p: [["배가 부르다", "to be full"], ["배불리 먹다", "to eat one's fill"]]
  },
  "괜찮다": {
    s: "늦어도 괜찮으니까 천천히 오세요.",
    se: "It's okay if you're late, so take your time.",
    u: "'To be okay/fine' — incredibly versatile: it's fine, no thanks (괜찮아요 when offered something), are you OK? (괜찮아요?), pretty good (괜찮은 사람).",
    p: [["괜찮아요?", "are you okay?"], ["괜찮아요", "it's fine / no thanks"], ["괜찮은 사람", "a decent person"]]
  },
  "때문": {
    s: "시험 때문에 스트레스를 많이 받아요.",
    se: "I'm stressed because of the exam.",
    u: "'Because of': N 때문에. With verbs: -기 때문에. Blame nuance when negative; for positive credit use 덕분에 (thanks to).",
    p: [["비 때문에", "because of the rain"], ["너 때문에", "because of you"], ["덕분에", "thanks to (positive version)"]]
  },
  "돈": {
    s: "돈이 없어서 여행을 못 가요.",
    se: "I can't travel because I have no money.",
    u: "'Money'. Spend = 쓰다, earn = 벌다, cost = 들다 (돈이 들다). 돈을 모으다 = to save up.",
    p: [["돈을 벌다", "to earn money"], ["돈을 쓰다", "to spend money"], ["돈이 들다", "to cost money"]]
  },
  "시험": {
    s: "다음 주에 시험이 있어서 공부해야 돼요.",
    se: "I have an exam next week, so I have to study.",
    u: "'Exam/test'. Take = 보다 (시험을 보다 — not 가지다!); pass = 붙다/합격하다; fail = 떨어지다. 시험공부 = exam study.",
    p: [["시험을 보다", "to take an exam"], ["시험에 붙다", "to pass an exam"], ["시험에 떨어지다", "to fail an exam"]]
  },
  "학교": {
    s: "학교까지 걸어서 20분 걸려요.",
    se: "It takes 20 minutes to walk to school.",
    u: "'School'. Go to (attend) = 다니다: 학교에 다니다. Levels: 초등학교, 중학교, 고등학교, 대학교.",
    p: [["학교에 가다", "to go to school"], ["학교에 다니다", "to attend school"], ["대학교", "university"]]
  },
  "시작하다": {
    s: "다음 달부터 운동을 시작하기로 했어요.",
    se: "I decided to start exercising from next month.",
    u: "시작 (start) + 하다. Something starts by itself = 시작되다 (수업이 시작되다). Start doing = -기 시작하다: 배우기 시작했어요.",
    p: [["-기 시작하다", "to start doing"], ["수업이 시작되다", "for class to begin"], ["처음부터 시작하다", "to start from the beginning"]]
  },
  "운동": {
    s: "무슨 운동을 제일 좋아해요?",
    se: "What exercise/sport do you like most?",
    u: "'Exercise/sports' (noun). Do = 하다. Covers both working out and sports. 운동화 = sneakers; 운동장 = sports field.",
    p: [["운동을 하다", "to exercise"], ["운동화", "sneakers"], ["운동장", "playing field"]]
  },
  "소식": {
    s: "고향 친구에게서 좋은 소식을 들었어요.",
    se: "I heard good news from a hometown friend.",
    u: "'News (from someone), word' — personal updates, not TV news (that's 뉴스). 소식을 듣다 = hear from; 소식이 없다 = no word from.",
    p: [["좋은 소식", "good news"], ["소식을 듣다", "to hear news"], ["소식이 없다", "to have heard nothing"]]
  },
  "울다": {
    s: "영화가 너무 슬퍼서 울 뻔했어요.",
    se: "The movie was so sad I almost cried.",
    u: "'To cry'. Also animal sounds: 새가 울다 = birds sing/cry. ㄹ-verb: 우는, 우니까. Opposite: 웃다. 울지 마세요 = don't cry.",
    p: [["울지 마세요", "don't cry"], ["울음", "crying (noun)"], ["아기가 울다", "for a baby to cry"]]
  },
  "물": {
    s: "운동한 후에 물을 많이 마셔야 돼요.",
    se: "You should drink a lot of water after exercising.",
    u: "'Water'. 물 좀 주세요 = water, please. 찬물/뜨거운 물 = cold/hot water. Also liquid generally: 국물 = broth.",
    p: [["물을 마시다", "to drink water"], ["물 좀 주세요", "water, please"], ["국물", "broth/soup liquid"]]
  },
  "식당": {
    s: "이 식당은 김치찌개가 정말 맛있어요.",
    se: "This restaurant's kimchi stew is really delicious.",
    u: "'Restaurant/dining hall' (식 food + 당 hall). 음식점 is a synonym; 레스토랑 implies Western/fancy. 학생 식당 = school cafeteria.",
    p: [["식당에 가다", "to go to a restaurant"], ["학생 식당", "student cafeteria"], ["맛집", "famous good restaurant (slang)"]]
  },
  "서점": {
    s: "서점에서 한국어 책을 한 권 샀어요.",
    se: "I bought a Korean book at the bookstore.",
    u: "'Bookstore' (서 book + 점 shop). Native synonym: 책방. Used bookstore = 중고 서점.",
    p: [["서점에 가다", "to go to the bookstore"], ["중고 서점", "used bookstore"]]
  },
  "학원": {
    s: "동생은 수학 학원에 다녀요.",
    se: "My younger sibling attends a math academy.",
    u: "Private cram school/academy — a huge part of Korean life. Attend = 다니다. 영어 학원, 피아노 학원, etc. No exact English equivalent!",
    p: [["학원에 다니다", "to attend an academy"], ["영어 학원", "English academy"]]
  },
  "다니다": {
    s: "저는 3년 동안 이 회사에 다니고 있어요.",
    se: "I've been working at this company for three years.",
    u: "'To attend / go regularly' — school, work, church, gym. 학교에 다니다 = be enrolled. Also 'go around': 여행을 다니다.",
    p: [["학교에 다니다", "to attend school"], ["회사에 다니다", "to work at a company"], ["교회에 다니다", "to go to church"]]
  },
  "공원": {
    s: "주말마다 공원에서 산책해요.",
    se: "I take a walk in the park every weekend.",
    u: "'Park'. 한강 공원 (Han River Park) is Seoul's favorite hangout — picnics, 치맥 (chicken & beer), bike rides.",
    p: [["공원에서 산책하다", "to walk in the park"], ["한강 공원", "Han River Park"], ["놀이공원", "amusement park"]]
  },
  "정말": {
    s: "이 노래 정말 좋아요!",
    se: "This song is really good!",
    u: "'Really' — both intensifier (정말 맛있어요) and 'really?' (정말요?/정말?). Synonym: 진짜 (more casual). 정말로 = truly.",
    p: [["정말요?", "really? (polite)"], ["정말 감사합니다", "thank you so much"], ["진짜", "really (casual synonym)"]]
  },
  "잘하다": {
    s: "한국어를 정말 잘하시네요!",
    se: "You speak Korean really well!",
    u: "'To do well / be good at': N을/를 잘하다 — 요리를 잘해요 = good at cooking. 잘했어요! = well done! Opposite: 못하다.",
    p: [["한국어를 잘하다", "to be good at Korean"], ["잘했어요!", "well done!"], ["못하다", "to be bad at (opposite)"]]
  },
  "맛있다": {
    s: "이 식당 음식이 다 맛있어요.",
    se: "Everything at this restaurant is delicious.",
    u: "맛 (taste) + 있다: 'to be delicious'. Pronounced [마싣따/마딛따]. Opposite: 맛없다. 맛있게 드세요 = enjoy your meal!",
    p: [["맛있게 드세요", "enjoy your meal"], ["맛있는 음식", "delicious food"], ["맛없다", "to taste bad (opposite)"]]
  },
  "많다": {
    s: "요즘 할 일이 너무 많아요.",
    se: "These days I have too much to do.",
    u: "'To be many/much'. Adverb = 많이 (많이 먹었어요). Pronounced [만타]. Opposite: 적다 (few). 사람이 많다 = crowded.",
    p: [["일이 많다", "to have a lot of work"], ["많이", "a lot (adverb)"], ["적다", "to be few (opposite)"]]
  }
};

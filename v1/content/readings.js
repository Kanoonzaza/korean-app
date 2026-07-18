/* readings.js — graded reading passages for the Reading tab.
 * Shape: { id, level, title, blurb, text (\n = paragraph break),
 *          glossary: { word: meaning }, questions: [{ q, qe, options[4], answer }] }
 * Keep grammar within what the lessons teach; glossary covers likely-new words.
 */
window.READINGS = [
{
  id: "r4-1", level: 4, title: "첫 출근 — The first day of work",
  blurb: "Minsu's nervous first commute on the subway.",
  text: "민수 씨는 오늘 처음으로 회사에 출근하는 날입니다. 아침 일찍 일어나서 샤워를 하고 새 옷을 입었습니다. 회사는 집에서 멀기 때문에 지하철을 타야 합니다.\n출근 시간에는 사람이 아주 많아서 지하철 안이 복잡합니다. 민수 씨는 다음 역에서 내려야 하는데 사람이 너무 많아서 걱정했습니다. 다행히 옆에 있던 아저씨가 길을 비켜 주셨습니다.\n회사에 도착했을 때 시계를 보니 8시 50분이었습니다. 늦지 않아서 정말 다행이었습니다. 민수 씨는 첫날부터 지각하면 안 된다고 생각했기 때문입니다.",
  glossary: {
    "출근하는": "출근하다 — to go to work",
    "복잡합니다": "복잡하다 — to be crowded; complicated",
    "내려야": "내리다 — to get off (a vehicle)",
    "다행히": "fortunately",
    "비켜": "비키다 — to step aside, make way",
    "도착했을": "도착하다 — to arrive",
    "지각하면": "지각하다 — to be late (for work / school)"
  },
  questions: [
    { q: "민수 씨는 왜 지하철을 타야 합니까?", qe: "Why does Minsu have to take the subway?",
      options: ["회사가 집에서 멀기 때문에", "차가 고장 났기 때문에", "지하철이 싸기 때문에", "운동을 하고 싶기 때문에"], answer: 0 },
    { q: "민수 씨는 회사에 몇 시에 도착했습니까?", qe: "What time did he arrive at work?",
      options: ["9시", "8시 50분", "8시", "8시 15분"], answer: 1 },
    { q: "이 글의 내용과 같은 것을 고르십시오.", qe: "Choose the statement that matches the passage.",
      options: ["민수 씨는 오늘 회사에 늦었습니다", "지하철에 사람이 적었습니다", "민수 씨는 지각하지 않았습니다", "민수 씨는 버스를 탔습니다"], answer: 2 }
  ]
},
{
  id: "r4-2", level: 4, title: "건강한 생활 습관 — Healthy habits",
  blurb: "Four small habits that protect your health.",
  text: "건강하게 살고 싶으면 좋은 습관이 필요합니다. 첫째, 물을 자주 마셔야 합니다. 우리 몸의 70%는 물이기 때문입니다. 둘째, 하루에 30분씩 운동을 해야 합니다. 걷기나 자전거 타기처럼 쉬운 운동도 괜찮습니다.\n셋째, 밤에는 일찍 자야 합니다. 잠을 잘 자면 피로가 풀리고 기분도 좋아집니다. 그리고 담배는 피우면 안 됩니다. 담배는 건강에 아주 나쁘기 때문입니다.\n이런 작은 습관들이 모여서 우리의 건강을 지켜 줍니다.",
  glossary: {
    "습관": "habit",
    "피로가": "피로 — fatigue, tiredness",
    "풀리고": "풀리다 — to be relieved, loosen up",
    "피우면": "(담배를) 피우다 — to smoke",
    "지켜": "지키다 — to protect; to keep"
  },
  questions: [
    { q: "이 글에서 말한 좋은 습관이 아닌 것은 무엇입니까?", qe: "Which is NOT a habit mentioned in the passage?",
      options: ["물을 자주 마시기", "커피를 많이 마시기", "일찍 자기", "매일 운동하기"], answer: 1 },
    { q: "왜 물을 자주 마셔야 합니까?", qe: "Why should you drink water often?",
      options: ["물이 맛있기 때문에", "물이 싸기 때문에", "몸의 70%가 물이기 때문에", "의사가 말했기 때문에"], answer: 2 },
    { q: "하루에 얼마 동안 운동을 해야 합니까?", qe: "How long should you exercise each day?",
      options: ["30분", "10분", "1시간", "2시간"], answer: 0 }
  ]
},
{
  id: "r4-3", level: 4, title: "한국의 사계절 — Korea's four seasons",
  blurb: "What each season looks like, and what to watch out for.",
  text: "한국에는 봄, 여름, 가을, 겨울 사계절이 있습니다. 봄에는 날씨가 따뜻하고 꽃이 많이 핍니다. 사람들은 공원에 가서 벚꽃 구경을 합니다.\n여름에는 아주 덥고 비가 많이 옵니다. 특히 7월에는 장마 때문에 우산을 꼭 가지고 다녀야 합니다. 가을에는 하늘이 높고 단풍이 아름답습니다. 등산을 좋아하는 사람들에게 가장 좋은 계절입니다.\n겨울에는 춥고 눈이 옵니다. 눈이 오면 길이 미끄러워서 조심해야 합니다. 여러분은 어느 계절을 가장 좋아하십니까?",
  glossary: {
    "핍니다": "피다 — to bloom",
    "벚꽃": "cherry blossoms",
    "장마": "the summer rainy season",
    "단풍": "autumn leaves / fall colors",
    "미끄러워서": "미끄럽다 — to be slippery",
    "조심해야": "조심하다 — to be careful"
  },
  questions: [
    { q: "7월에 우산을 가지고 다녀야 하는 이유는 무엇입니까?", qe: "Why must you carry an umbrella in July?",
      options: ["눈이 오기 때문에", "장마 때문에", "바람이 불기 때문에", "날씨가 춥기 때문에"], answer: 1 },
    { q: "등산하기에 가장 좋은 계절은 언제입니까?", qe: "Which season is best for hiking?",
      options: ["봄", "여름", "가을", "겨울"], answer: 2 },
    { q: "이 글의 내용과 다른 것을 고르십시오.", qe: "Choose the statement that does NOT match the passage.",
      options: ["봄에는 꽃이 핍니다", "여름에는 덥습니다", "가을에는 단풍이 아름답습니다", "겨울에는 비가 많이 옵니다"], answer: 3 }
  ]
},
{
  id: "r5-1", level: 5, title: "스마트폰과 우리 생활 — Smartphones and us",
  blurb: "Convenience, its costs, and who should be in charge.",
  text: "요즘 우리는 스마트폰 없이 살기 어렵습니다. 아침에 일어나서 밤에 잘 때까지 스마트폰을 손에서 놓지 않는 사람이 많습니다. 스마트폰으로 뉴스를 보고, 음식을 주문하고, 은행 일도 할 수 있습니다. 정말 편리한 세상이 되었습니다.\n하지만 문제도 있습니다. 스마트폰을 너무 오래 보면 눈이 나빠지고 목도 아픕니다. 또 가족이나 친구와 함께 있을 때도 각자 스마트폰만 보는 경우가 많습니다.\n전문가들은 자기 전 30분 동안은 스마트폰을 사용하지 말라고 조언합니다. 스마트폰은 잘 사용하면 좋은 도구지만, 우리가 스마트폰의 주인이 되어야 합니다.",
  glossary: {
    "주문하고": "주문하다 — to order (food, goods)",
    "편리한": "편리하다 — to be convenient",
    "각자": "each person, individually",
    "전문가들은": "전문가 — an expert",
    "조언합니다": "조언하다 — to advise",
    "도구지만": "도구 — a tool",
    "주인": "owner; master"
  },
  questions: [
    { q: "이 글에서 말한 스마트폰의 문제점은 무엇입니까?", qe: "What problem does the passage mention?",
      options: ["값이 너무 비쌉니다", "눈이 나빠지고 목이 아픕니다", "배터리가 빨리 없어집니다", "화면이 너무 작습니다"], answer: 1 },
    { q: "전문가들은 무엇을 조언합니까?", qe: "What do experts advise?",
      options: ["스마트폰을 사지 말 것", "하루 종일 사용하지 말 것", "자기 전 30분 동안 사용하지 말 것", "아침에만 사용할 것"], answer: 2 },
    { q: "이 글의 중심 생각은 무엇입니까?", qe: "What is the main idea of the passage?",
      options: ["스마트폰을 잘 사용해야 한다", "스마트폰을 사면 안 된다", "스마트폰은 문제가 전혀 없다", "스마트폰은 은행 일에만 좋다"], answer: 0 }
  ]
},
{
  id: "r5-2", level: 5, title: "한국의 커피 문화 — Korea's coffee culture",
  blurb: "Why cafés are everywhere, and what people really do there.",
  text: "한국 사람들은 커피를 정말 좋아합니다. 길을 걷다 보면 어디에서나 카페를 쉽게 찾을 수 있습니다. 한국인 한 명이 일 년에 마시는 커피는 평균 400잔이 넘는다고 합니다.\n한국의 카페는 커피만 마시는 곳이 아닙니다. 학생들은 카페에서 공부를 하고, 회사원들은 노트북으로 일을 합니다. 친구를 만나서 이야기하는 장소로도 인기가 많습니다. 그래서 한국의 카페는 크고 자리가 편한 곳이 많습니다.\n하지만 커피를 너무 많이 마시면 잠이 안 올 수 있으니까 오후 늦게는 조심하는 것이 좋습니다.",
  glossary: {
    "평균": "average",
    "회사원들은": "회사원 — an office worker",
    "장소": "a place, venue",
    "인기": "popularity",
    "자리": "a seat, spot"
  },
  questions: [
    { q: "한국인 한 명이 일 년에 마시는 커피는 평균 몇 잔입니까?", qe: "How many cups does one Korean drink per year on average?",
      options: ["100잔쯤", "200잔쯤", "300잔쯤", "400잔 넘게"], answer: 3 },
    { q: "이 글에 나온, 사람들이 카페에서 하는 일이 아닌 것은?", qe: "Which activity at cafés is NOT mentioned?",
      options: ["공부하기", "운동하기", "일하기", "친구와 이야기하기"], answer: 1 },
    { q: "오후 늦게 커피를 조심해야 하는 이유는 무엇입니까?", qe: "Why be careful with coffee late in the afternoon?",
      options: ["값이 더 비싸져서", "카페가 문을 닫아서", "잠이 안 올 수 있어서", "맛이 없어져서"], answer: 2 }
  ]
},
{
  id: "r5-3", level: 5, title: "병원에 간 날 — A day at the clinic",
  blurb: "A sore throat, a doctor's advice, and a small lesson.",
  text: "지난주부터 목이 아프고 기침이 나서 어제 병원에 갔습니다. 병원에는 환자가 많아서 30분쯤 기다려야 했습니다. 제 차례가 되어서 진료실에 들어갔습니다.\n의사 선생님은 목을 보시고 열도 재셨습니다. 감기가 심하다고 하시면서 약을 3일 동안 먹으라고 하셨습니다. 그리고 물을 많이 마시고 푹 쉬어야 한다고 하셨습니다.\n약국에서 약을 받아서 집에 왔습니다. 약을 먹고 하루 종일 잤더니 오늘은 목이 훨씬 덜 아픕니다. 건강이 얼마나 소중한지 아플 때마다 다시 느낍니다.",
  glossary: {
    "기침이": "기침 — a cough",
    "환자가": "환자 — a patient",
    "차례": "one's turn",
    "진료실": "consultation room, doctor's office",
    "재셨습니다": "(열을) 재다 — to take (a temperature)",
    "약국": "pharmacy",
    "소중한지": "소중하다 — to be precious"
  },
  questions: [
    { q: "이 사람은 왜 병원에 갔습니까?", qe: "Why did this person go to the clinic?",
      options: ["머리가 아파서", "목이 아프고 기침이 나서", "배가 아파서", "다리를 다쳐서"], answer: 1 },
    { q: "의사 선생님이 하라고 한 것이 아닌 것은 무엇입니까?", qe: "Which was NOT part of the doctor's advice?",
      options: ["약을 3일 동안 먹을 것", "물을 많이 마실 것", "푹 쉴 것", "운동을 많이 할 것"], answer: 3 },
    { q: "오늘 이 사람의 몸은 어떻습니까?", qe: "How does this person feel today?",
      options: ["목이 훨씬 덜 아픕니다", "더 아픕니다", "열이 많이 납니다", "기침이 심해졌습니다"], answer: 0 }
  ]
}
];

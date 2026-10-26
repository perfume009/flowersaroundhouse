// =====================================================================
//  ВСЁ СОДЕРЖАНИЕ САЙТА ЛЕЖИТ ЗДЕСЬ. Правишь этот файл и заливаешь на GitHub.
// =====================================================================
//
//  Поля игры:
//   n      название                       id    имя страницы: id "churlu" -> churlu.html
//   st     статус: "релиз", "jam", "в разработке" или "планируется"      y   год
//   tags   теги, например ["Godot","3D"]  url   ссылка для кнопки Itch.io ("#" = кнопки нет)
//   img    обложка (файл рядом с index.html)   shots   список скриншотов
//   video  ID ролика на YouTube (например "dQw4w9WgXcQ"), пусто = блока трейлера нет
//   d      короткое описание для карточки    l   полное описание для страницы игры
//   feat   особенности, формат "Заголовок: пояснение" (каждая = отдельный экран)
//   plain:true   убрать «хоррор-фильтр» с карточки
//   artTitle:true   не писать название крупно, если оно уже есть на обложке
//  Тексты d, l и feat пишутся на двух языках: {ru:..., en:...}
//
var GAMES=[
 {
  n: "Escape From Churlu",
  id: "churlu",
  feat: {
   ru: [
    "Атмосфера: тёмный подъезд советской хрущёвки, скрип половиц и глухая деревня",
    "Тайна: нужно разгадать, куда исчезла бабушка",
    "Побег: выбраться из закрытого поместья, пока Чурлу не настиг",
    "Прятки и ключи: прячьтесь и ищите ключи",
    "Звук решает: Чурлу слышит каждый шаг, поэтому шуметь нельзя"
   ],
   en: [
    "Atmosphere: a dark Soviet-era stairwell, creaking floorboards and a remote village",
    "Mystery: find out what happened to your grandmother",
    "Escape: get out of the locked-down estate before Churlu catches you",
    "Hide and seek: hide from him and search for keys",
    "Sound matters: Churlu hears every step, so keep quiet"
   ]
  },
  img: "churlu-1.jpg",
  shots: [
   "churlu-1.jpg",
   "churlu-2.jpg",
   "churlu-3.jpg",
   "churlu-4.jpg"
  ],
  video: "",
  d: {
   ru: "Тёмный подъезд советской хрущёвки, скрип деревянных половиц в глухой деревне и шаги за спиной.",
   en: "A dark Soviet-era stairwell, creaking floorboards in a remote village, and footsteps behind you."
  },
  l: {
   ru: "Тёмный подъезд советской хрущёвки, скрип деревянных половиц в глухой деревне и шаги за спиной. Вам предстоит разгадать тайну исчезновения бабушки и выбраться из закрытого поместья, пока Чурлу не настигнет вас. Прячьтесь, ищите ключи и не издавайте лишнего шума — он слышит каждый ваш шаг.",
   en: "The dark stairwell of a Soviet-era apartment block, creaking wooden floorboards in a remote village, and footsteps behind you. You have to unravel the mystery of your grandmother's disappearance and escape the locked-down estate before Churlu catches you. Hide, search for keys and keep quiet: he hears your every step."
  },
  tags: [
   "Godot",
   "3D"
  ],
  st: "в разработке",
  y: 2026,
  url: "https://flowersaroundhouse.itch.io/escape-from-churlu"
 },
 {
  n: "Grand Theft Churlu Churl-city",
  id: "gtc",
  artTitle: true,
  feat: {
   ru: [],
   en: []
  },
  img: "gtc.jpg",
  plain: true,
  shots: [
   "gtc.jpg"
  ],
  d: {
   ru: "Новый проект в разработке.",
   en: "A new project in development."
  },
  l: {
   ru: "Подробности скоро.",
   en: "More details soon."
  },
  tags: [],
  st: "в разработке",
  y: 2026,
  url: "#"
 },
 {
  n:"Call of Churlu: Modern Elban",
  id:"elban",
  artTitle:true,
  plain:true,
  img:"elban.jpg",
  shots:["elban.jpg"],
  video:"",
  d:{ru:"Будет в разработке когда-нибудь...",en:"Will be in development someday..."},
  l:{ru:"Будет в разработке когда-нибудь...",en:"Will be in development someday..."},
  tags:[],
  st:"планируется",
  y:"",
  url:"#",
  feat:{ru:[],en:[]}
 }
];

var STACK=["Unity", "C#", "Godot", "GDScript", "C++", "JavaScript", "Git", "Aseprite"];   // бегущая строка в «Обо мне»
var LINKS=[["github", "https://github.com/perfume009"], ["itch.io", "https://flowersaroundhouse.itch.io/"], ["telegram", "https://t.me/+Vwn7n2eTDXUzZDgy"]];   // «Контакты» (telegram используется и для кнопки в новостях)
var LOG=[  // «История»: [год, по-русски, по-английски]
 ["2026", "В разработке игра Grand Theft Churlu Churl-city", "Grand Theft Churlu Churl-city is in development"],
 ["2026", "В разработке игра Escape From Churlu", "Escape From Churlu is in development"]
];
var DEVLOG=[  // «Новости разработки», сверху самые свежие
 { d: "21.10.2026", ru: "В разработке игра Grand Theft Churlu Churl-city.", en: "Grand Theft Churlu Churl-city is in development." },
 { d: "12.10.2026", ru: "Запустил сайт. Здесь будут новости разработки Escape From Churlu.", en: "The site is live. Development news for Escape From Churlu will appear here." }
];
var ROLES={ru:["инди-разработчик игр", "пишу код, рисую пиксели, ломаю баги", "flowers around the house, bugs inside"],
 en:["indie game developer", "writing code, drawing pixels, breaking bugs", "flowers around the house, bugs inside"]};   // фразы под названием на главной

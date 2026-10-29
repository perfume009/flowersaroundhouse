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
//   hue    число 0-360: цвет страницы игры (если не указано, берётся из названия)
//   tags   теги; для двух языков пиши так: {ru:"Экшен",en:"Action"}
//   tagline  крупная фраза после описания;  story2  второй абзац истории
//   heroes   герои: name, role, d (на двух языках), img:"файл.jpg" (портрет на весь экран)
//            и pos:"x% y%" (куда «смотреть» в кадре на узком экране, например "70% 40%")
//   soon   сколько «заглушек» под скриншоты показать в галерее. Когда сделаешь скрины,
//          впиши их в shots:[...] и поставь soon:0
//  Тексты d, l и feat пишутся на двух языках: {ru:..., en:...}
//
var GAMES=[
 {
  n: "Escape From Churlu 1.2 beta",
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
  plain: true,
  hue: 330,
  img: "gtc.jpg",
  shots: [],
  soon: 4,
  video: "",
  d: {
   ru: "Три героя. Один город. Ноль шансов на скучную жизнь.",
   en: "Three heroes. One city. Zero chance of a boring life."
  },
  l: {
   ru: "Добро пожаловать в Чурл-Сити — город контрастов, где элитные небоскрёбы Даунтауна соседствуют с хаосом трущоб Эльбана, а в порту под покровом ночи проворачивают свои тёмные делишки контрабандисты.",
   en: "Welcome to Churl City, a city of contrasts where the elite skyscrapers of Downtown stand next to the chaos of the Elban slums, and smugglers run their dark business in the port under cover of night."
  },
  tagline: {
   ru: "Три героя. Один город. Ноль шансов на скучную жизнь.",
   en: "Three heroes. One city. Zero chance of a boring life."
  },
  heroes: [
   {
    name: {
     ru: "Илья Чурлу",
     en: "Ilya Churlu"
    },
    role: {
     ru: "Уличный угонщик",
     en: "Street car thief"
    },
    d: {
     ru: "Из Эльбана. Знает каждый переулок родного района.",
     en: "From Elban. Knows every alley of his home district."
    },
    img: "ilya.jpg",
    pos: "72% 40%"
   },
   {
    name: {
     ru: "Евгений Валянский",
     en: "Evgeny Valyansky"
    },
    role: {
     ru: "Бизнесмен с тёмным прошлым",
     en: "Businessman with a dark past"
    },
    d: {
     ru: "Решает вопросы через старые связи.",
     en: "Solves problems through old connections."
    },
    img: "valyansky.jpg",
    pos: "22% 30%"
   },
   {
    name: {
     ru: "Егор Богдан",
     en: "Egor Bogdan"
    },
    role: {
     ru: "Обычный челик",
     en: "Just an ordinary guy"
    },
    d: {
     ru: "Просто оказался не в том месте не в то время, но теперь вынужден выживать вместе со всеми.",
     en: "He simply ended up in the wrong place at the wrong time, and now has to survive together with everyone else."
    },
    img: "egor.jpg",
    pos: "62% 40%"
   }
  ],
  story2: {
   ru: "Их объединяет одна проблема: долг, из-за которого они влезли в крупную криминальную авантюру. Чтобы расплатиться и остаться в живых, им придётся объединиться. Угоняйте машины, взламывайте склады, уходите от погони и набивайте очки в безумных перестрелках.",
   en: "They share one problem: a debt that dragged them into a major criminal gamble. To pay it off and stay alive, they will have to team up. Steal cars, break into warehouses, escape pursuits and rack up points in crazy shootouts."
  },
  tags: [
   {
    ru: "Экшен",
    en: "Action"
   },
   {
    ru: "Открытый мир",
    en: "Open world"
   },
   {
    ru: "Криминал",
    en: "Crime"
   }
  ],
  st: "в разработке",
  y: 2026,
  url: "#",
  feat: {
   ru: [
    "Островной мегаполис: 3 уникальных района, аэропорт, порт и промышленные зоны.",
    "Три героя — три стиля игры: Переключайтесь между персонажами в любой момент. У каждого своя специализация и уникальная спецспособность.",
    "Аркадный экшен: Море оружия, гранаты и динамичные перестрелки."
   ],
   en: [
    "Island metropolis: 3 unique districts, an airport, a port and industrial zones.",
    "Three heroes, three play styles: Switch between characters at any moment. Each has their own specialty and a unique special ability.",
    "Arcade action: A sea of weapons, grenades and dynamic shootouts."
   ]
  }
 },
 {
  n: "Call of Churlu: Modern Elban",
  id: "elban",
  artTitle: true,
  plain: true,
  img: "elban.jpg",
  shots: [
   "elban.jpg"
  ],
  video: "",
  d: {
   ru: "Будет в разработке когда-нибудь...",
   en: "Will be in development someday..."
  },
  l: {
   ru: "Будет в разработке когда-нибудь...",
   en: "Will be in development someday..."
  },
  tags: [],
  st: "планируется",
  y: "",
  url: "#",
  feat: {
   ru: [],
   en: []
  }
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

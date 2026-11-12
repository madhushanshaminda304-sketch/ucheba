import { OpenDayEvent, Olympiad, RankingItem } from '../types';

export const OPEN_DAY_EVENTS: OpenDayEvent[] = [
  {
    id: 'ev1',
    institutionId: '1',
    institutionName: 'МГУ им. М.В. Ломоносова',
    city: 'Москва',
    title: 'Общеуниверситетский День открытых дверей МГУ',
    date: '29 марта 2026',
    time: '12:00',
    format: 'очно',
    location: 'Главное здание МГУ, Актовый зал',
    registrationUrl: 'https://openday.msu.ru'
  },
  {
    id: 'ev2',
    institutionId: '2',
    institutionName: 'НИУ ВШЭ',
    city: 'Москва',
    title: 'День открытых дверей Факультета компьютерных наук ВШЭ',
    date: '5 апреля 2026',
    time: '11:00',
    format: 'онлайн',
    location: 'YouTube / VK трансляция + чат с деканом',
    registrationUrl: 'https://cs.hse.ru/openday'
  },
  {
    id: 'ev3',
    institutionId: '4',
    institutionName: 'МГТУ им. Н.Э. Баумана',
    city: 'Москва',
    title: 'Большой инженерный день открытых дверей в новом кампусе Бауманки',
    date: '12 апреля 2026',
    time: '10:30',
    format: 'очно',
    location: 'Новый конгресс-центр на набережной Яузы',
    registrationUrl: 'https://bmstu.ru/events'
  },
  {
    id: 'ev4',
    institutionId: '6',
    institutionName: 'Университет ИТМО',
    city: 'Санкт-Петербург',
    title: 'ITMO Open Day: Выбирай IT, ИИ и биотехнологии',
    date: '19 апреля 2026',
    time: '13:00',
    format: 'онлайн',
    location: 'Интерактивный стрим из хакспейса ИТМО',
    registrationUrl: 'https://itmo.ru/openday'
  }
];


export const OLYMPIADS: Olympiad[] = [
  {
    id: 'olymp-1',
    name: 'Всероссийская олимпиада школьников (ВсОШ)',
    organizer: 'Министерство просвещения РФ',
    level: 'ВсОШ',
    subjects: ['Математика', 'Информатика', 'Физика', 'Химия', 'Биология', 'Обществознание', 'Русский язык', 'Английский язык'],
    benefit: 'БВИ (Без вступительных испытаний) во все вузы России на профильные специальности',
    targetGrades: '9–11 классы',
    website: 'https://vserosolimp.edsoo.ru',
    deadline: 'Сентябрь – Апрель ежегодно',
    description: 'Главная олимпиада страны. Победители и призёры заключительного этапа получают абсолютную льготу БВИ с правом зачисления вне конкурса.'
  },
  {
    id: 'olymp-2',
    name: 'Олимпиада школьников «Ломоносов»',
    organizer: 'МГУ имени М.В. Ломоносова',
    level: '1 уровень',
    subjects: ['Математика', 'Информатика', 'Физика', 'Обществознание', 'Химия', 'Право', 'Иностранные языки'],
    benefit: 'БВИ в МГУ и другие ведущие университеты или 100 баллов за профильный ЕГЭ',
    targetGrades: '10–11 классы',
    website: 'https://olymp.msu.ru',
    deadline: 'Отборочный этап: ноябрь-декабрь',
    description: 'Флагманская перечневая олимпиада МГУ. Победа гарантирует максимальные льготы при поступлении в МГУ, СПбГУ, ВШЭ и МФТИ.'
  },
  {
    id: 'olymp-3',
    name: 'Олимпиада «Высшая проба»',
    organizer: 'НИУ ВШЭ',
    level: '1 уровень',
    subjects: ['Экономика', 'Информатика', 'Математика', 'Обществознание', 'Финансовая грамотность', 'Дизайн'],
    benefit: 'БВИ на программы ВШЭ, МФТИ, МГУ или 100 баллов',
    targetGrades: '7–11 классы',
    website: 'https://olymp.hse.ru/mmo',
    deadline: 'Регистрация: октябрь-ноябрь',
    description: 'Крупнейшая многопрофильная олимпиада с уникальными направлениями по анализу данных, экономике и дизайну.'
  },
  {
    id: 'olymp-4',
    name: 'Олимпиада «Физтех»',
    organizer: 'МФТИ (Физтех)',
    level: '1 уровень',
    subjects: ['Физика', 'Математика'],
    benefit: 'БВИ в МФТИ, МГТУ им. Баумана, МИФИ и другие технические вузы',
    targetGrades: '9–11 классы',
    website: 'https://olymp.mipt.ru',
    deadline: 'Отборочный этап: до февраля',
    description: 'Легендарное состязание будущих ученых и инженеров. Нестандартные глубокие задачи по физике и высшей математике.'
  },
  {
    id: 'olymp-5',
    name: 'Олимпиада «Шаг в будущее»',
    organizer: 'МГТУ имени Н.Э. Баумана',
    level: '1 уровень',
    subjects: ['Инженерное дело', 'Физика', 'Информатика', 'Программирование'],
    benefit: 'БВИ на все машиностроительные, IT и ракетно-космические факультеты Бауманки',
    targetGrades: '8–11 классы',
    website: 'https://olymp.bmstu.ru',
    deadline: 'Октябрь – Март',
    description: 'Инженерная олимпиада с защитой научно-исследовательских проектов и решением сложных олимпиадных кейсов.'
  },
  {
    id: 'olymp-6',
    name: 'Открытая олимпиада Университета ИТМО по информатике',
    organizer: 'Университет ИТМО',
    level: '1 уровень',
    subjects: ['Информатика и программирование', 'Математика'],
    benefit: 'БВИ на факультеты IT и ИИ ИТМО, ВШЭ, МФТИ',
    targetGrades: '9–11 классы',
    website: 'https://ec.itmo.ru',
    deadline: 'Декабрь – Февраль',
    description: 'Соревнование от чемпионов мира по программированию. Фокус на спортивном программировании и олимпиадных алгоритмах.'
  }
];


export const RANKINGS: RankingItem[] = [
  {
    rank: 1,
    institutionId: '1',
    institutionName: 'Московский государственный университет имени М.В. Ломоносова',
    abbreviation: 'МГУ',
    city: 'Москва',
    scoreTotal: 98.4,
    qualityScore: 99.2,
    demandScore: 97.5,
    scienceScore: 98.6,
    minBudgetScore: 285
  },
  {
    rank: 2,
    institutionId: '2',
    institutionName: 'НИУ Высшая школа экономики',
    abbreviation: 'НИУ ВШЭ',
    city: 'Москва',
    scoreTotal: 96.8,
    qualityScore: 97.5,
    demandScore: 98.9,
    scienceScore: 94.2,
    minBudgetScore: 290
  },
  {
    rank: 3,
    institutionId: '3',
    institutionName: 'Московский физико-технический институт (МФТИ)',
    abbreviation: 'МФТИ (Физтех)',
    city: 'Москва',
    scoreTotal: 95.9,
    qualityScore: 98.4,
    demandScore: 99.4,
    scienceScore: 98.1,
    minBudgetScore: 298
  },
  {
    rank: 4,
    institutionId: '4',
    institutionName: 'МГТУ имени Н.Э. Баумана',
    abbreviation: 'МГТУ им. Баумана',
    city: 'Москва',
    scoreTotal: 94.2,
    qualityScore: 95.1,
    demandScore: 96.8,
    scienceScore: 91.5,
    minBudgetScore: 265
  },
  {
    rank: 5,
    institutionId: '5',
    institutionName: 'Санкт-Петербургский государственный университет',
    abbreviation: 'СПбГУ',
    city: 'Санкт-Петербург',
    scoreTotal: 93.8,
    qualityScore: 94.6,
    demandScore: 93.2,
    scienceScore: 94.0,
    minBudgetScore: 275
  },
  {
    rank: 6,
    institutionId: '6',
    institutionName: 'Университет ИТМО',
    abbreviation: 'Университет ИТМО',
    city: 'Санкт-Петербург',
    scoreTotal: 92.5,
    qualityScore: 94.0,
    demandScore: 95.8,
    scienceScore: 91.2,
    minBudgetScore: 288
  },
  {
    rank: 7,
    institutionId: '7',
    institutionName: 'Сеченовский Университет',
    abbreviation: '1МГМУ',
    city: 'Москва',
    scoreTotal: 90.7,
    qualityScore: 92.1,
    demandScore: 94.5,
    scienceScore: 88.0,
    minBudgetScore: 280
  },
  {
    rank: 8,
    institutionId: '8',
    institutionName: 'МГИМО МИД России',
    abbreviation: 'МГИМО',
    city: 'Москва',
    scoreTotal: 89.8,
    qualityScore: 91.5,
    demandScore: 96.0,
    scienceScore: 83.4,
    minBudgetScore: 295
  },
  {
    rank: 9,
    institutionId: '10',
    institutionName: 'Новосибирский государственный университет',
    abbreviation: 'НГУ',
    city: 'Новосибирск',
    scoreTotal: 88.4,
    qualityScore: 89.6,
    demandScore: 86.8,
    scienceScore: 93.5,
    minBudgetScore: 260
  },
  {
    rank: 10,
    institutionId: '9',
    institutionName: 'Казанский федеральный университет',
    abbreviation: 'КФУ',
    city: 'Казань',
    scoreTotal: 87.2,
    qualityScore: 88.0,
    demandScore: 85.4,
    scienceScore: 89.0,
    minBudgetScore: 245
  }
];



// ==========================================
// 1. ШКОЛЫ, ЛИЦЕИ И ГИМНАЗИИ РОССИИ
// ==========================================

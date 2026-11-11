# append_data.py
import json

data_code = '''

// ==========================================
// 1. ШКОЛЫ, ЛИЦЕИ И ГИМНАЗИИ РОССИИ
// ==========================================
export const SCHOOLS: School[] = [
  {
    id: 'school-hse-lyceum',
    name: 'Лицей Национального исследовательского университета «Высшая школа экономики»',
    shortName: 'Лицей НИУ ВШЭ',
    type: 'lyceum',
    city: 'Москва',
    district: 'ЦАО / Басманный',
    address: 'г. Москва, 3-й Колобовский пер., д. 8/2',
    metro: 'Трубная / Чистые пруды',
    rankingRank: 1,
    ratingDepartment: 'Грант Мэра Москвы I степени, Топ-1 школ РФ по числу поступивших в ведущие вузы',
    profileClasses: [
      'Математика и информатика (IT-вертикаль)',
      'Экономика и социальные науки',
      'Гуманитарные науки и медиа',
      'Юриспруденция',
      'Естественные науки (биомед)',
      'Дизайн и архитектура'
    ],
    averageEgeScore: 88.6,
    olympiadWinnersCount: 312,
    isTuitionFree: true,
    foundYear: 2013,
    studentCount: 2200,
    phone: '+7 (495) 772-95-90',
    website: 'https://school.hse.ru',
    email: 'lyceum@hse.ru',
    description: 'Ведущий предуниверсарий России с системой индивидуальных учебных планов и университетской академической свободой. Преподавание ведут профессора НИУ ВШЭ.',
    admissionExamInfo: 'Вступительные испытания в 8, 9 и 10 классы: комплексный тест по русскому, математике, иностранному языку + предметные тесты выбранного направления.',
    clubs: ['Клуб дебатов', 'Олимпиадная математика', 'Хакатон-клуб', 'Театральная студия', 'Клуб робототехники']
  },
  {
    id: 'school-bmstu-1580',
    name: 'Бауманская инженерная школа № 1580 при МГТУ им. Н.Э. Баумана',
    shortName: 'Бауманская школа № 1580',
    type: 'lyceum',
    city: 'Москва',
    district: 'ЮАО / Донской',
    address: 'г. Москва, Балаклавский проспект, д. 6А',
    metro: 'Чертановская / Южная',
    rankingRank: 2,
    ratingDepartment: 'Грант Мэра Москвы I степени, Топ-1 школ РФ технического профиля RAEX',
    profileClasses: [
      'Инженерный класс (бауманский профиль)',
      'IT-вертикаль и программирование',
      'Физико-математический класс',
      'Робототехника и мехатроника'
    ],
    averageEgeScore: 86.4,
    olympiadWinnersCount: 245,
    isTuitionFree: true,
    foundYear: 1989,
    studentCount: 3100,
    phone: '+7 (495) 316-50-66',
    website: 'https://lycu1580.mskobr.ru',
    email: '1580@edu.mos.ru',
    description: 'Главная кузница будущих инженеров, конструкторов и IT-разработчиков страны. Прямая интеграция учебного процесса с кафедрами и лабораториями МГТУ им. Баумана.',
    admissionExamInfo: 'Письменные экзамены по физике и математике в 8, 9, 10 и 11 классы в апреле-мае.',
    clubs: ['Лаборатория беспилотников', 'Клуб олимпиадной физики', '3D-моделирование', 'Спортивное программирование']
  },
  {
    id: 'school-sunc-mgu',
    name: 'СУНЦ МГУ — Школа-интернат имени А.Н. Колмогорова',
    shortName: 'СУНЦ МГУ',
    type: 'lyceum',
    city: 'Москва',
    district: 'ЗАО / Фили-Давыдково',
    address: 'г. Москва, ул. Кременчугская, д. 11',
    metro: 'Славянский бульвар',
    rankingRank: 3,
    ratingDepartment: 'Топ-1 в рейтинге лучших школ России по конкурентоспособности выпускников RAEX',
    profileClasses: [
      'Физико-математический',
      'Информатика и компьютерные науки',
      'Химический',
      'Биологический'
    ],
    averageEgeScore: 91.2,
    olympiadWinnersCount: 189,
    isTuitionFree: true,
    foundYear: 1963,
    studentCount: 380,
    phone: '+7 (499) 445-40-54',
    website: 'https://internat.msu.ru',
    email: 'sunc@internat.msu.ru',
    description: 'Легендарная школа академика Колмогорова при МГУ для одаренных детей со всей России. Бесплатное проживание в комфортном интернате, лекции академиков РАН.',
    admissionExamInfo: 'Двухтуровый отбор: 1 тур дистанционно, 2 тур — очная Летняя школа в СУНЦ МГУ с экзаменами.',
    clubs: ['Астрономический кружок', 'Олимпиадное программирование', 'Биохимическая лаборатория', 'Шахматный клуб']
  },
  {
    id: 'school-spb-239',
    name: 'Президентский физико-математический лицей № 239',
    shortName: 'ФМЛ № 239',
    type: 'lyceum',
    city: 'Санкт-Петербург',
    district: 'Центральный район',
    address: 'г. Санкт-Петербург, ул. Кирочная, д. 8',
    metro: 'Чернышевская / Маяковская',
    rankingRank: 4,
    ratingDepartment: 'Абсолютный лидер Всероссийской олимпиады школьников по математике и робототехнике',
    profileClasses: [
      'Углубленная олимпиадная математика',
      'Теоретическая физика',
      'Интеллектуальная робототехника и AI'
    ],
    averageEgeScore: 89.8,
    olympiadWinnersCount: 280,
    isTuitionFree: true,
    foundYear: 1918,
    studentCount: 950,
    phone: '+7 (812) 273-35-25',
    website: 'https://239.ru',
    email: 'school239@mail.ru',
    description: 'Сильнейший физико-математический лицей планеты. Выпускники ежегодно завоевывают золотые медали Международных олимпиад IMO и IPhO.',
    admissionExamInfo: 'Вступительные испытания по математике в 5, 8, 9 и 10 классы в апреле.',
    clubs: ['Центр робототехники', 'Клуб спортивного ориентирования', 'Турклуб', 'Театральная студия «Остров»']
  },
  {
    id: 'school-second',
    name: 'Лицей «Вторая школа» имени В.Ф. Овчинникова',
    shortName: 'Лицей «Вторая школа»',
    type: 'lyceum',
    city: 'Москва',
    district: 'ЮЗАО / Гагаринский',
    address: 'г. Москва, ул. Фотиевой, д. 18',
    metro: 'Ленинский проспект / Воробьёвы горы',
    rankingRank: 5,
    ratingDepartment: 'Грант Мэра Москвы I степени, Топ-3 школ Москвы по математике',
    profileClasses: [
      'Физико-математический класс',
      'Математико-экономический профиль',
      'Прикладная математика и программирование'
    ],
    averageEgeScore: 87.9,
    olympiadWinnersCount: 165,
    isTuitionFree: true,
    foundYear: 1956,
    studentCount: 820,
    phone: '+7 (499) 137-34-44',
    website: 'https://sch2.ru',
    email: 'sch2@edu.mos.ru',
    description: 'Культовая математическая школа Москвы с глубокими традициями академического мышления и сильным научным братством выпускников.',
    admissionExamInfo: 'Письменный и устный экзамены по математике и физике в 6, 7, 8 и 9 классы.',
    clubs: ['Матбои', 'Олимпиадная физика', 'Волейбольный клуб', 'Клуб настольных стратегий']
  },
  {
    id: 'school-cpm',
    name: 'Школа Центра педагогического мастерства (Школа ЦПМ)',
    shortName: 'Школа ЦПМ',
    type: 'state',
    city: 'Москва',
    district: 'СВАО / Марьина Роща',
    address: 'г. Москва, Олимпийский проспект, д. 11, стр. 1',
    metro: 'Марьина Роща / Достоевская',
    rankingRank: 6,
    ratingDepartment: 'Грант Мэра Москвы I степени, рекордсмен по дипломам ВсОШ в 24 предметах',
    profileClasses: [
      'Олимпиадный профиль (все 24 предмета ВсОШ)',
      'Инженерно-технологический',
      'Биохимический',
      'Гуманитарный и социально-экономический'
    ],
    averageEgeScore: 90.1,
    olympiadWinnersCount: 420,
    isTuitionFree: true,
    foundYear: 2019,
    studentCount: 1600,
    phone: '+7 (495) 120-22-30',
    website: 'https://школа-цпм.рф',
    email: 'info@school-cpm.ru',
    description: 'Школа для олимпиадников с гибким гибридным форматом обучения, позволяющим готовиться к финалам Всероса и международным турнирам без потери школьной программы.',
    admissionExamInfo: 'По результатам регионального этапа ВсОШ или очным вступительным тестированиям по профилю.',
    clubs: ['Олимпиадные сборные Москвы', 'Интеллектуальный клуб ЧГК', 'Психологический клуб', 'Йога и стресс-менеджмент']
  },
  {
    id: 'school-57',
    name: 'Пятьдесят седьмая школа (Школа № 57)',
    shortName: 'Школа № 57',
    type: 'gymnasium',
    city: 'Москва',
    district: 'ЦАО / Хамовники',
    address: 'г. Москва, Малый Знаменский пер., д. 7/10',
    metro: 'Кропоткинская / Боровицкая',
    rankingRank: 7,
    ratingDepartment: 'Грант Мэра Москвы I степени, Топ-5 школ Москвы',
    profileClasses: [
      'Специализированный математический класс',
      'Гуманитарный класс',
      'Биологический класс',
      'Экономико-математический класс'
    ],
    averageEgeScore: 88.2,
    olympiadWinnersCount: 140,
    isTuitionFree: true,
    foundYear: 1877,
    studentCount: 1100,
    phone: '+7 (495) 691-85-72',
    website: 'https://sch57.mskobr.ru',
    email: '57@edu.mos.ru',
    description: 'Одна из старейших и наиболее авторитетных интеллектуальных школ столицы. Сильнейшие гуманитарные и математические традиции.',
    admissionExamInfo: 'Вступительные испытания в спецклассы (мат, гум, био) проводятся весной в несколько туров.',
    clubs: ['Киноклуб', 'Литературный альманах', 'Олимпиадная биология', 'Музыкальный ансамбль']
  },
  {
    id: 'school-1535',
    name: 'Лицей № 1535 при Первом МГМУ им. И.М. Сеченова',
    shortName: 'Лицей № 1535',
    type: 'lyceum',
    city: 'Москва',
    district: 'ЦАО / Хамовники',
    address: 'г. Москва, ул. Усачёва, д. 50',
    metro: 'Спортивная / Лужники',
    rankingRank: 8,
    ratingDepartment: 'Грант Мэра Москвы I степени, Топ-1 медико-биологических школ России',
    profileClasses: [
      'Медицинский класс в московской школе (биомед)',
      'Историко-филологический профиль',
      'Социально-гуманитарный профиль',
      'Математика и экономика'
    ],
    averageEgeScore: 87.5,
    olympiadWinnersCount: 155,
    isTuitionFree: true,
    foundYear: 1991,
    studentCount: 1350,
    phone: '+7 (499) 245-56-42',
    website: 'https://lyc1535.mskobr.ru',
    email: '1535@edu.mos.ru',
    description: 'Флагман медицинского и гуманитарного среднего образования Москвы. Практика в клиниках Сеченовского университета.',
    admissionExamInfo: 'Вступительные экзамены по профильным предметам в 7, 8, 9 и 10 классы.',
    clubs: ['Анатомический кружок', 'Французский клуб', 'Юный медик', 'Школьный парламент']
  },
  {
    id: 'school-letovo',
    name: 'Школа «Летово» (Школа-пансион для способных детей)',
    shortName: 'Школа «Летово»',
    type: 'private',
    city: 'Москва',
    district: 'ТиНАО / Сосенское',
    address: 'г. Москва, пос. Сосенское, ул. Зимёнковская, д. 3',
    metro: 'Ольховая / Филатов Луг',
    rankingRank: 9,
    ratingDepartment: 'Топ-1 в мире среди частных школ по результатам International Baccalaureate (IB DP)',
    profileClasses: [
      'Российский государственный аттестат + IB Diploma',
      'STEM (Science, Tech, Engineering, Math)',
      'Social Sciences & Economics',
      'Arts & Humanities'
    ],
    averageEgeScore: 92.4,
    olympiadWinnersCount: 210,
    isTuitionFree: false,
    tuitionPerMonth: 150000,
    foundYear: 2018,
    studentCount: 650,
    phone: '+7 (495) 122-22-22',
    website: 'https://letovo.ru',
    email: 'admissions@letovo.ru',
    description: 'Уникальный кампус мирового уровня на 60 гектарах. Стипендиальный фонд обеспечивает бесплатное обучение для 80% одаренных учеников независимо от дохода семьи.',
    admissionExamInfo: '3-этапный всероссийский отбор: когнитивное тестирование, предметные олимпиады и очные ассесмент-дни.',
    clubs: ['Яхтинг и гребля', 'Оркестр', 'Астрономическая обсерватория', 'Биотех-лаборатория']
  },
  {
    id: 'school-european',
    name: 'Европейская гимназия (European Gymnasium IB World School)',
    shortName: 'Европейская гимназия',
    type: 'private',
    city: 'Москва',
    district: 'ВАО / Сокольники',
    address: 'г. Москва, Сокольнический Вал, д. 28',
    metro: 'Сокольники',
    rankingRank: 10,
    ratingDepartment: 'Авторизованная школа международного бакалавриата IB PYP, MYP, DP',
    profileClasses: [
      'Билингвальная программа (English/Russian)',
      'Международный бакалавриат (IB DP)',
      'Гуманитарно-правовой профиль',
      'Art and Visual Communication'
    ],
    averageEgeScore: 84.2,
    olympiadWinnersCount: 45,
    isTuitionFree: false,
    tuitionPerMonth: 125000,
    foundYear: 1992,
    studentCount: 450,
    phone: '+7 (499) 268-30-57',
    website: 'https://eurogym.ru',
    email: 'info@eurogym.ru',
    description: 'Современная школа с европейскими образовательными ценностями, упором на критическое мышление, свободное владение двумя иностранными языками и проектную деятельность.',
    admissionExamInfo: 'Психолого-педагогическое собеседование и языковое тестирование по английскому языку.',
    clubs: ['Клуб дебатов Model UN', 'Архитектурная мастерская', 'Шахматы', 'Гончарное дело']
  }
];

// ==========================================
// 2. КУРСЫ ДОПОЛНИТЕЛЬНОГО ОБРАЗОВАНИЯ И ДПО
// ==========================================
export const COURSES: Course[] = [
  {
    id: 'course-python-yandex',
    title: 'Python-разработчик: с нуля до первого оффера',
    slug: 'python-developer',
    provider: 'Яндекс Практикум',
    category: 'it',
    durationMonths: 9,
    format: 'online',
    hasJobGuarantee: true,
    diplomaType: 'Диплом о профессиональной переподготовке',
    rating: 4.88,
    reviewsCount: 1420,
    priceTotal: 144000,
    pricePerMonthInstallment: 16000,
    level: 'С нуля',
    tags: ['Python', 'Django', 'PostgreSQL', 'Docker', 'Git', 'API'],
    skillsAcquired: [
      'Разработка backend на Django и FastAPI',
      'Проектирование реляционных баз данных',
      'Контейнеризация сервисов в Docker',
      'Командная разработка и код-ревью'
    ],
    description: 'Интерактивный онлайн-курс с тренажёром кода, код-ревью от практикующих сеньор-разработчиков и поддержкой карьерного центра до трудоустройства.'
  },
  {
    id: 'course-react-netology',
    title: 'Fullstack-разработчик на JavaScript и TypeScript (React + Node.js)',
    slug: 'fullstack-javascript',
    provider: 'Нетология',
    category: 'it',
    durationMonths: 11,
    format: 'online',
    hasJobGuarantee: true,
    diplomaType: 'Диплом о профессиональной переподготовке',
    rating: 4.82,
    reviewsCount: 980,
    priceTotal: 156000,
    pricePerMonthInstallment: 14180,
    level: 'С нуля',
    tags: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Redux', 'MongoDB'],
    skillsAcquired: [
      'Создание SPA-приложений на React 19',
      'Серверная разработка на Express и Node.js',
      'Типизация сложных интерфейсов на TypeScript',
      'Деплой в облачную инфраструктуру'
    ],
    description: 'Комплексная подготовка веб-разработчика полного цикла. 6 практических проектов в портфолио и гарантия возврата денег, если не найдете работу.'
  },
  {
    id: 'course-datascience-skillbox',
    title: 'Профессия Data Scientist с нуля до Middle',
    slug: 'data-scientist',
    provider: 'Skillbox',
    category: 'analytics',
    durationMonths: 12,
    format: 'online',
    hasJobGuarantee: true,
    diplomaType: 'Диплом о профессиональной переподготовке',
    rating: 4.85,
    reviewsCount: 1150,
    priceTotal: 168000,
    pricePerMonthInstallment: 14000,
    level: 'С нуля',
    tags: ['Python', 'Machine Learning', 'Pandas', 'SQL', 'Deep Learning', 'PyTorch'],
    skillsAcquired: [
      'Обучение моделей машинного обучения (Scikit-Learn, XGBoost)',
      'Нейросети и компьютерное зрение на PyTorch',
      'Продвинутый SQL для аналитики больших данных',
      'A/B тестирование и бизнес-метрики'
    ],
    description: 'Освойте самую востребованную профессию в сфере искусственного интеллекта. Практика на реальных данных крупнейших ритейлеров и банков.'
  },
  {
    id: 'course-uxui-bhsad',
    title: 'UX/UI дизайнер цифровых продуктов',
    slug: 'ux-ui-designer',
    provider: 'Skillbox & Британская высшая школа дизайна',
    category: 'design',
    durationMonths: 9,
    format: 'online',
    hasJobGuarantee: true,
    diplomaType: 'Диплом о профессиональной переподготовке',
    rating: 4.91,
    reviewsCount: 840,
    priceTotal: 139000,
    pricePerMonthInstallment: 15440,
    level: 'С нуля',
    tags: ['Figma', 'UI Kit', 'UX Research', 'CJM', 'Прототипирование', 'Design Systems'],
    skillsAcquired: [
      'Проведение глубинных интервью и UX-исследований',
      'Создание дизайн-систем и UI-китов в Figma',
      'Интерактивное прототипирование и анимация',
      'Адаптивный дизайн для веба и мобильных ОС'
    ],
    description: 'Научитесь проектировать удобные и красивые мобильные приложения и веб-сервисы с наставниками из Британской высшей школы дизайна.'
  },
  {
    id: 'course-product-yandex',
    title: 'Управление IT-продуктами (Product Management)',
    slug: 'product-management',
    provider: 'Яндекс Практикум',
    category: 'management',
    durationMonths: 6,
    format: 'online',
    hasJobGuarantee: false,
    diplomaType: 'Удостоверение о повышении квалификации',
    rating: 4.89,
    reviewsCount: 620,
    priceTotal: 125000,
    pricePerMonthInstallment: 20830,
    level: 'Для продолжающих',
    tags: ['Product Management', 'Unit-экономика', 'CustDev', 'Agile/Scrum', 'Product Analytics'],
    skillsAcquired: [
      'Построение продуктовой стратегии и Roadmap',
      'Расчет юнит-экономики и поиск точек роста',
      'Проведение CustDev и проверка продуктовых гипотез',
      'Управление кросс-функциональной командой разработки'
    ],
    description: 'Интенсивная программа для специалистов, желающих перейти в управление цифровыми продуктами или вырасти до Senior Product Manager.'
  },
  {
    id: 'course-marketing-netology',
    title: 'Интернет-маркетолог от Middle до Senior',
    slug: 'internet-marketer',
    provider: 'Нетология',
    category: 'marketing',
    durationMonths: 8,
    format: 'online',
    hasJobGuarantee: true,
    diplomaType: 'Диплом о профессиональной переподготовке',
    rating: 4.79,
    reviewsCount: 750,
    priceTotal: 118000,
    pricePerMonthInstallment: 14750,
    level: 'С нуля',
    tags: ['Контекстная реклама', 'Таргет', 'SEO', 'Веб-аналитика', 'Яндекс Директ', 'SMM'],
    skillsAcquired: [
      'Настройка рекламных кампаний в Яндекс Директ',
      'Сквозная аналитика в Calltouch и Яндекс Метрике',
      'SEO-оптимизация и контент-стратегия',
      'Управление маркетинговыми бюджетами'
    ],
    description: 'Научитесь привлекать клиентов и масштабировать продажи бизнеса. Практика на реальных рекламных бюджетах.'
  },
  {
    id: 'course-english-skyeng',
    title: 'Деловой английский для IT и международных переговоров',
    slug: 'business-english-it',
    provider: 'Skyeng',
    category: 'languages',
    durationMonths: 6,
    format: 'online',
    hasJobGuarantee: false,
    diplomaType: 'Сертификат международного образца CEFR',
    rating: 4.93,
    reviewsCount: 1650,
    priceTotal: 72000,
    pricePerMonthInstallment: 12000,
    level: 'Для продолжающих',
    tags: ['English for IT', 'Business Communication', 'Tech Interviews', 'Presentations'],
    skillsAcquired: [
      'Прохождение технических интервью на английском',
      'Ведение деловой переписки и документации',
      'Презентация проектов перед зарубежными заказчиками',
      'Свободное участие в Daily Standups и ретроспективах'
    ],
    description: 'Индивидуальные уроки с преподавателями-носителями языка, специализирующимися на IT-индустрии и международных контрактах.'
  },
  {
    id: 'course-fin-sf',
    title: 'Финансовый аналитик: финансовое моделирование и инвестиции',
    slug: 'financial-analyst',
    provider: 'SF Education',
    category: 'analytics',
    durationMonths: 7,
    format: 'online',
    hasJobGuarantee: true,
    diplomaType: 'Диплом о профессиональной переподготовке',
    rating: 4.87,
    reviewsCount: 510,
    priceTotal: 129000,
    pricePerMonthInstallment: 18420,
    level: 'С нуля',
    tags: ['Финансовое моделирование', 'DCF', 'LBO', 'M&A', 'Power BI', 'Корпоративные финансы'],
    skillsAcquired: [
      'Построение 3-Statement финансовых моделей',
      'Оценка стоимости бизнеса методами DCF и мультипликаторов',
      'Анализ сделок M&A и инвестиционных проектов',
      'Визуализация отчетности в Power BI'
    ],
    description: 'Глубокая программа для карьеры в инвестиционном банкинге, фондах private equity и корпоративных финансах ведущих холдингов.'
  }
];

// ==========================================
// 3. МАГИСТРАТУРА ВЕДУЩИХ ВУЗОВ РОССИИ
// ==========================================
export const MASTER_PROGRAMS: MasterProgram[] = [
  {
    id: 'master-hse-ml',
    title: 'Машинное обучение и анализ данных (ФКН)',
    universityName: 'Национальный исследовательский университет «Высшая школа экономики»',
    universityAbbr: 'НИУ ВШЭ',
    universityId: '1',
    city: 'Москва',
    fieldCode: '01.04.02 Прикладная математика и информатика',
    budgetPlaces: 45,
    paidPlaces: 30,
    tuitionPerYear: 560000,
    durationYears: 2,
    examFormat: 'Конкурс портфолио + Экзамен по высшей математике и алгоритмам',
    partnerCompanies: ['Яндекс', 'Сбер AI Lab', 'Т-Банк', 'VK'],
    description: 'Флагманская магистерская программа факультета компьютерных наук. Подготовка исследователей и ведущих ML-инженеров мирового уровня.',
    keySkills: ['Deep Learning', 'LLM Architectures', 'Computer Vision', 'Reinforcement Learning', 'Big Data Engineering']
  },
  {
    id: 'master-mgu-ai',
    title: 'Искусственный интеллект и интеллектуальные системы (ВМК)',
    universityName: 'Московский государственный университет имени М.В. Ломоносова',
    universityAbbr: 'МГУ им. Ломоносова',
    universityId: '2',
    city: 'Москва',
    fieldCode: '02.04.02 Фундаментальная информатика и ИТ',
    budgetPlaces: 35,
    paidPlaces: 20,
    tuitionPerYear: 510000,
    durationYears: 2,
    examFormat: 'Письменный вступительный экзамен по прикладной математике и информатике',
    partnerCompanies: ['Лаборатория Касперского', 'Huawei Technologies', 'Сбер'],
    description: 'Фундаментальная подготовка в области теории искусственного интеллекта, математической логики и архитектур высокопроизводительных систем.',
    keySkills: ['Теория сложности алгоритмов', 'Параллельные вычисления CUDA', 'Нейробайесовские методы', 'Computer Vision']
  },
  {
    id: 'master-mipt-quantum',
    title: 'Квантовые технологии и квантовые вычисления',
    universityName: 'Московский физико-технический институт',
    universityAbbr: 'МФТИ (Физтех)',
    universityId: '3',
    city: 'Москва / Долгопрудный',
    fieldCode: '03.04.01 Прикладные математика и физика',
    budgetPlaces: 25,
    paidPlaces: 10,
    tuitionPerYear: 580000,
    durationYears: 2,
    examFormat: 'Устный экзамен по квантовой механике и физике твердого тела',
    partnerCompanies: ['Росатом', 'Российский квантовый центр (РКЦ)', 'Газпромбанк'],
    description: 'Уникальная программа подготовки ученых и разработчиков оборудования для квантовых процессоров и защищенных квантовых коммуникаций.',
    keySkills: ['Квантовая криптография', 'Квантовые алгоритмы', 'Сверхпроводящие кубиты', 'Криогенная электроника']
  },
  {
    id: 'master-bmstu-robotics',
    title: 'Автономные мобильные роботы и мехатроника',
    universityName: 'Московский государственный технический университет имени Н.Э. Баумана',
    universityAbbr: 'МГТУ им. Баумана',
    universityId: '4',
    city: 'Москва',
    fieldCode: '15.04.06 Мехатроника и робототехника',
    budgetPlaces: 30,
    paidPlaces: 15,
    tuitionPerYear: 420000,
    durationYears: 2,
    examFormat: 'Междисциплинарный экзамен по теории автоматического управления и электромеханике',
    partnerCompanies: ['КАМАЗ', 'Ростех', 'Яндекс Беспилотники'],
    description: 'Проектирование и программирование беспилотного транспорта, промышленных манипуляторов и сенсорных систем SLAM.',
    keySkills: ['ROS / ROS2', 'SLAM навигация', 'Проектирование приводов', 'Управление манипуляторами']
  },
  {
    id: 'master-itmo-se',
    title: 'Разработка программного обеспечения и цифровые продукты',
    universityName: 'Национальный исследовательский университет ИТМО',
    universityAbbr: 'Университет ИТМО',
    universityId: '7',
    city: 'Санкт-Петербург',
    fieldCode: '09.04.04 Программная инженерия',
    budgetPlaces: 60,
    paidPlaces: 40,
    tuitionPerYear: 440000,
    durationYears: 2,
    examFormat: 'Конкурс докладов на научной конференции / Экзамен по программированию',
    partnerCompanies: ['ВКонтакте', 'Яндекс', 'Т-Банк', 'Selectel'],
    description: 'Практико-ориентированная магистратура: работа в продуктовых командах IT-гигантов над реальными сервисами с миллионной аудиторией.',
    keySkills: ['Highload Systems', 'Cloud Native & K8s', 'Архитектура микросервисов', 'Product Delivery']
  },
  {
    id: 'master-spbu-fintech',
    title: 'Искусственный интеллект в финансах и корпоративном управлении',
    universityName: 'Санкт-Петербургский государственный университет',
    universityAbbr: 'СПбГУ',
    universityId: '6',
    city: 'Санкт-Петербург',
    fieldCode: '38.04.08 Финансы и кредит',
    budgetPlaces: 20,
    paidPlaces: 25,
    tuitionPerYear: 460000,
    durationYears: 2,
    examFormat: 'Конкурс документов (портфолио)',
    partnerCompanies: ['ВТБ', 'Сбербанк', 'Московская Биржа'],
    description: 'Синергия глубокого финансового анализа и алгоритмического трейдинга. Обучение алгоритмам скоринга и риск-менеджмента.',
    keySkills: ['Quantitative Finance', 'Анализ рынков капитала', 'Скоринговые модели', 'Fintech Law']
  }
];

// ==========================================
// 4. БИЗНЕС-ОБРАЗОВАНИЕ И MBA
// ==========================================
export const MBA_PROGRAMS: MbaProgram[] = [
  {
    id: 'mba-skolkovo-emba',
    title: 'Executive MBA СКОЛКОВО: Стратегическое лидерство и масштаб',
    schoolName: 'Московская школа управления СКОЛКОВО',
    accreditation: ['EQUIS', 'AACSB'],
    durationMonths: 18,
    format: 'Модульный (4 дня в месяц очно + выездные международные модули)',
    experienceRequiredYears: 7,
    tuitionTotal: 8400000,
    city: 'Москва / Сколково',
    description: 'Флагманская программа для собственников крупного бизнеса и топ-менеджеров корпораций. Сильнейший нетворкинг и трансформация бизнес-модели.',
    targetAudience: 'Владельцы бизнеса и C-level руководители с опытом управления от 7 лет.'
  },
  {
    id: 'mba-mgu-strat',
    title: 'Master of Business Administration: Стратегический менеджмент',
    schoolName: 'Высшая школа бизнеса МГУ имени М.В. Ломоносова',
    accreditation: ['AMBA', 'НАСДОБР'],
    durationMonths: 20,
    format: 'Вечерний / Уикенд (пятница вечер + суббота)',
    experienceRequiredYears: 3,
    tuitionTotal: 1850000,
    city: 'Москва',
    description: 'Классическое академическое бизнес-образование с упором на системное мышление, операционную эффективность и лидерские навыки.',
    targetAudience: 'Руководители функциональных подразделений и предприниматели.'
  },
  {
    id: 'mba-ranepa-digital',
    title: 'MBA: Управление цифровой трансформацией бизнеса',
    schoolName: 'Институт бизнеса и делового администрирования (ИБДА) РАНХиГС',
    accreditation: ['AACSB', 'AMBA', 'НАСДОБР'],
    durationMonths: 21,
    format: 'Модульный и смешанный Blended Learning',
    experienceRequiredYears: 3,
    tuitionTotal: 2100000,
    city: 'Москва',
    description: 'Программа первой в России школы, получившей престижнейшую мировую аккредитацию AACSB. Фокус на AI-инструменты в управлении предприятием.',
    targetAudience: 'Директора по цифровизации, IT-директора и топ-менеджеры компаний.'
  },
  {
    id: 'mba-hse-venture',
    title: 'MBA: Управление инвестициями и венчурный бизнес',
    schoolName: 'Высшая школа бизнеса НИУ ВШЭ',
    accreditation: ['AMBA', 'НАСДОБР'],
    durationMonths: 20,
    format: 'Очно-заочный (вечерний и модульный)',
    experienceRequiredYears: 3,
    tuitionTotal: 1950000,
    city: 'Москва',
    description: 'Обучение привлечению венчурных инвестиций, структурированию сделок Private Equity и выводу стартапов на международные рынки.',
    targetAudience: 'Инвестиционные менеджеры, основатели технологических стартапов.'
  },
  {
    id: 'mba-mirbis-general',
    title: 'General MBA: Стратегия и управление компанией',
    schoolName: 'Московская международная высшая школа бизнеса МИРБИС',
    accreditation: ['AMBA', 'НАСДОБР'],
    durationMonths: 18,
    format: 'Выходного дня / Вечерний',
    experienceRequiredYears: 3,
    tuitionTotal: 1250000,
    city: 'Москва',
    description: 'Практико-ориентированная программа подготовки генеральных директоров. 100% преподавателей — действующие предприниматели и консультанты.',
    targetAudience: 'Предприниматели малого и среднего бизнеса, операционные директора.'
  }
];

// ==========================================
// 5. УЧЁБА ЗА РУБЕЖОМ И СТИПЕНДИИ
// ==========================================
export const ABROAD_PROGRAMS: AbroadProgram[] = [
  {
    id: 'abroad-tsinghua-cs',
    country: 'Китай',
    city: 'Пекин',
    institution: 'Tsinghua University (Университет Цинхуа, № 1 в Азии)',
    degree: 'Бакалавриат (BSc)',
    language: 'Английский / Китайский',
    tuitionAnnualUsd: 5800,
    hasScholarship: true,
    scholarshipDetails: 'Chinese Government Scholarship (CSC): полное покрытие обучения, проживание и ежемесячная стипендия 3000 CNY.',
    admissionDeadline: '15 января 2026',
    description: 'Лучший университет Китая и один из мировых технологических лидеров. Обучение по программе Computer Science полностью на английском языке.',
    subjects: ['Computer Science', 'Artificial Intelligence', 'Software Engineering']
  },
  {
    id: 'abroad-mbzuai-ai',
    country: 'ОАЭ',
    city: 'Абу-Даби',
    institution: 'Mohamed bin Zayed University of Artificial Intelligence (MBZUAI)',
    degree: 'Магистратура (MSc)',
    language: 'Английский',
    tuitionAnnualUsd: 0,
    hasScholarship: true,
    scholarshipDetails: '100% Full Scholarship для всех зачисленных студентов: бесплатное обучение, перелёт, проживание в кампусе премиум-класса и стипендия 8000 AED/мес.',
    admissionDeadline: '28 февраля 2026',
    description: 'Первый в мире исследовательский университет, целиком посвященный ИИ. Руководят исследованиями ученые из Carnegie Mellon, Oxford и Stanford.',
    subjects: ['Machine Learning', 'Computer Vision', 'Natural Language Processing']
  },
  {
    id: 'abroad-polimi-arch',
    country: 'Италия',
    city: 'Милан',
    institution: 'Politecnico di Milano (Миланский политехнический университет)',
    degree: 'Бакалавриат (BSc)',
    language: 'Английский',
    tuitionAnnualUsd: 3800,
    hasScholarship: true,
    scholarshipDetails: 'Региональная стипендия DSU: снижение стоимости до 0 € + стипендия до 7000 € в год на проживание по доходу семьи.',
    admissionDeadline: '30 марта 2026',
    description: 'Ведущий архитектурно-инженерный университет Европы. Диплом признается во всех странах мира.',
    subjects: ['Architecture', 'Urban Planning', 'Industrial Product Design']
  },
  {
    id: 'abroad-bocconi-mgmt',
    country: 'Италия',
    city: 'Милан',
    institution: 'Bocconi University',
    degree: 'Магистратура (MSc)',
    language: 'Английский',
    tuitionAnnualUsd: 15500,
    hasScholarship: true,
    scholarshipDetails: 'Bocconi Graduate Merit Award: 100% покрытие стоимости обучения для лучших абитуриентов по результатам GMAT/GRE.',
    admissionDeadline: '15 апреля 2026',
    description: 'Элитный европейский бизнес-университет. Топ-5 рейтинга Financial Times по программам Master in Management и Finance.',
    subjects: ['International Management', 'Finance', 'Economics and Social Sciences']
  },
  {
    id: 'abroad-tum-engineering',
    country: 'Германия',
    city: 'Мюнхен',
    institution: 'Technical University of Munich (TUM)',
    degree: 'Магистратура (MSc)',
    language: 'Английский',
    tuitionAnnualUsd: 4200,
    hasScholarship: true,
    scholarshipDetails: 'Стипендии DAAD и фондов Deutschlandstipendium (300 €/мес).',
    admissionDeadline: '31 мая 2026',
    description: 'Главный технический университет Германии, альма-матер 18 лауреатов Нобелевской премии.',
    subjects: ['Informatics', 'Data Engineering & Analytics', 'Biomedical Computing']
  },
  {
    id: 'abroad-istanbul-med',
    country: 'Турция',
    city: 'Стамбул',
    institution: 'Istanbul University (Стамбульский университет)',
    degree: 'Специалитет (M.D.)',
    language: 'Английский',
    tuitionAnnualUsd: 4500,
    hasScholarship: true,
    scholarshipDetails: 'Государственная программа Türkiye Bursları: бесплатное обучение, общежитие, медицинская страховка и авиабилеты.',
    admissionDeadline: '20 февраля 2026',
    description: 'Обучение общей медицине по международным стандартам USMLE с возможностью дальнейшей ординатуры в клиниках Европы и США.',
    subjects: ['General Medicine', 'Dentistry', 'Pharmacy']
  }
];

// ==========================================
// 6. ПРЕДМЕТНАЯ ПОДГОТОВКА К ЕГЭ (10 ПРЕДМЕТОВ)
// ==========================================
export const SUBJECT_PREP_DATA: Record<string, SubjectPrep> = {
  mathematics: {
    slug: 'mathematics',
    title: 'Профильная математика ЕГЭ 2026',
    tagline: 'Фундаментальный курс подготовки к 80+ и 90+ баллам для поступления на бюджет в ведущие вузы',
    examType: 'ЕГЭ',
    primaryScoreMax: 32,
    examDurationMinutes: 235,
    averageScoreRussia: 62.4,
    ourStudentsAverageScore: 84.8,
    structure: {
      part1Count: 12,
      part2Count: 7,
      passingScore: 39,
      highScoreThreshold: 80
    },
    pitfalls: [
      {
        title: 'Ошибки в ОДЗ и выколотых точках в №13 и №15',
        description: 'Свыше 42% школьников теряют первичные баллы из-за неверного раскрытия ограничений логарифмов и тригонометрии.'
      },
      {
        title: 'Недостаточное обоснование в планиметрии №17 и стереометрии №14',
        description: 'Формальные пробелы в доказательствах теорем Фалеса, Менелая или угла между плоскостями приводят к обнулению критерия за логику.'
      },
      {
        title: 'Потеря корней в задачах с параметром №18',
        description: 'Отсутствие графического исследования и анализа граничных условий параметра a.'
      }
    ],
    curriculum: [
      { moduleNumber: 1, title: 'Уравнения, неравенства и основы тригонометрии', topicsCount: 16, hours: 32 },
      { moduleNumber: 2, title: 'Планиметрия и векторы (базовый и повышенный уровни)', topicsCount: 14, hours: 28 },
      { moduleNumber: 3, title: 'Экономическая математика (кредиты, вклады, оптимизация)', topicsCount: 10, hours: 20 },
      { moduleNumber: 4, title: 'Стереометрия: координатный и классический методы', topicsCount: 12, hours: 24 },
      { moduleNumber: 5, title: 'Параметры: графический и функциональный подходы', topicsCount: 18, hours: 36 },
      { moduleNumber: 6, title: 'Теория чисел и олимпиадные методы в №19', topicsCount: 12, hours: 24 }
    ],
    leadTeacher: {
      name: 'Александр Сергеевич Волков',
      role: 'Руководитель направления математики, эксперт ФИПИ',
      experienceYears: 14,
      graduatesCount: 3840,
      hundredScorersCount: 46,
      bio: 'Выпускник механико-математического факультета МГУ им. Ломоносова, автор сборников заданий для подготовки к ЕГЭ.'
    },
    tariffs: [
      {
        name: 'Стандарт',
        priceMonth: 4490,
        features: [
          '8 онлайн-вебинаров в месяц по 90 минут',
          'Домашние задания с подробными решениями',
          'Проверка куратором за 24 часа',
          'Доступ к интерактивному банку КИМ'
        ]
      },
      {
        name: 'ПРО с куратором',
        priceMonth: 6990,
        isPopular: true,
        features: [
          'Все опции тарифа Стандарт',
          'Персональный наставник — стобалльник',
          'Индивидуальный созвон 1 раз в неделю',
          'Ежемесячный пробный ЕГЭ с проверкой эксперта ФИПИ',
          'Гарантия 80+ баллов при выполнении плана'
        ]
      },
      {
        name: 'Премиум 1 на 1',
        priceMonth: 12900,
        features: [
          'Все опции тарифа ПРО',
          'Индивидуальные уроки с ведущим преподавателем',
          'Индивидуальный план поступления в вуз мечты',
          'Круглосуточный личный чат в Telegram'
        ]
      }
    ]
  },
  russian: {
    slug: 'russian',
    title: 'Русский язык ЕГЭ 2026',
    tagline: 'Идеальная орфография, пунктуация и сочинение на максимум первичных баллов',
    examType: 'ЕГЭ',
    primaryScoreMax: 50,
    examDurationMinutes: 210,
    averageScoreRussia: 68.2,
    ourStudentsAverageScore: 89.2,
    structure: {
      part1Count: 26,
      part2Count: 1,
      passingScore: 40,
      highScoreThreshold: 85
    },
    pitfalls: [
      {
        title: 'Критерий К2 в сочинении: комментарий к проблеме и смысловая связь',
        description: 'Каждый второй выпускник теряет баллы на анализе смысловой связи между двумя иллюстрациями.'
      },
      {
        title: 'Задания №9–12: правописание корней, суффиксов и личных окончаний глаголов',
        description: 'Исключения и правила спряжения глаголов с приставкой вы-.'
      },
      {
        title: 'Пунктуация при сложноподчиненных предложениях в №19–21',
        description: 'Стыки союзов и обособление уточняющих обстоятельств.'
      }
    ],
    curriculum: [
      { moduleNumber: 1, title: 'Орфография: правила и алгоритмы безошибочного письма', topicsCount: 18, hours: 30 },
      { moduleNumber: 2, title: 'Пунктуация: простое и сложное предложения', topicsCount: 16, hours: 26 },
      { moduleNumber: 3, title: 'Грамматические нормы и задания №7–8', topicsCount: 12, hours: 20 },
      { moduleNumber: 4, title: 'Работа с текстом, стилистика и лексика', topicsCount: 10, hours: 18 },
      { moduleNumber: 5, title: 'Сочинение ЕГЭ: формулировка проблемы, позиция автора и К2', topicsCount: 15, hours: 30 }
    ],
    leadTeacher: {
      name: 'Елена Михайловна Романова',
      role: 'Старший эксперт ЕГЭ по русскому языку',
      experienceYears: 18,
      graduatesCount: 5200,
      hundredScorersCount: 78,
      bio: 'Кандидат филологических наук, член экспертной комиссии по проверке сочинений ЕГЭ.'
    },
    tariffs: [
      {
        name: 'Стандарт',
        priceMonth: 3990,
        features: ['8 вебинаров в месяц', 'ДЗ с автопроверкой', 'Чат единомышленников']
      },
      {
        name: 'ПРО с куратором',
        priceMonth: 5990,
        isPopular: true,
        features: ['Все опции Стандарта', 'Проверка 4 сочинений в месяц экспертом', 'Личный тьютор', 'Ежемесячный пробник']
      },
      {
        name: 'Премиум 1 на 1',
        priceMonth: 11500,
        features: ['Все опции ПРО', 'Индивидуальные уроки', 'Неограниченная проверка сочинений', 'Связь 24/7']
      }
    ]
  },
  informatics: {
    slug: 'informatics',
    title: 'Информатика и ИКТ (КЕГЭ) 2026',
    tagline: 'Автоматизация всех 27 задач на Python, электронные таблицы и динамическое программирование',
    examType: 'ЕГЭ',
    primaryScoreMax: 29,
    examDurationMinutes: 235,
    averageScoreRussia: 58.7,
    ourStudentsAverageScore: 86.4,
    structure: {
      part1Count: 23,
      part2Count: 4,
      passingScore: 44,
      highScoreThreshold: 82
    },
    pitfalls: [
      {
        title: 'Неоптимальные алгоритмы в №26 и №27 (O(N^2) вместо O(N log N))',
        description: 'Скрипт зависает на экзаменационных файлах большого объема (до 100 000 строк).'
      },
      {
        title: 'Задание №24 на обработку строк с регулярными выражениями',
        description: 'Ошибки в граничных символах и перекрывающихся подстроках.'
      },
      {
        title: 'Теория игр №19–21 при динамическом числе ходов',
        description: 'Сложности рекурсивного перебора состояний при несимметричных кучах камней.'
      }
    ],
    curriculum: [
      { moduleNumber: 1, title: 'Python для КЕГЭ: синтаксис, списки, множества и словари', topicsCount: 14, hours: 28 },
      { moduleNumber: 2, title: 'Кодирование информации, графы и комбинаторика', topicsCount: 12, hours: 24 },
      { moduleNumber: 3, title: 'Электронные таблицы и поиск данных в текстовых файлах', topicsCount: 10, hours: 20 },
      { moduleNumber: 4, title: 'Теория игр и рекурсивные алгоритмы на Python', topicsCount: 12, hours: 24 },
      { moduleNumber: 5, title: 'Динамическое программирование и задачи повышенной сложности №24–27', topicsCount: 16, hours: 36 }
    ],
    leadTeacher: {
      name: 'Дмитрий Андреевич Соколов',
      role: 'Senior Software Engineer, олимпиадный тренер',
      experienceYears: 10,
      graduatesCount: 2900,
      hundredScorersCount: 62,
      bio: 'Выпускник ВМК МГУ, победитель соревнований по спортивному программированию ACM ICPC.'
    },
    tariffs: [
      {
        name: 'Стандарт',
        priceMonth: 4490,
        features: ['8 онлайн-занятий', 'Тренажёр КЕГЭ с реальной средой тестирования', 'Код-ревью задач']
      },
      {
        name: 'ПРО с куратором',
        priceMonth: 6990,
        isPopular: true,
        features: ['Все опции Стандарта', 'Разбор сложнейших задач №26-27', 'Куратор-стобалльник', 'Пробники каждую неделю']
      },
      {
        name: 'Премиум 1 на 1',
        priceMonth: 12900,
        features: ['Все опции ПРО', 'Персональные занятия по архитектуре алгоритмов', 'План поступления в топовые IT-вузы']
      }
    ]
  },
  physics: {
    slug: 'physics',
    title: 'Физика ЕГЭ 2026',
    tagline: 'Глубокое понимание законов природы, качественные задачи №21 и расчётная часть',
    examType: 'ЕГЭ',
    primaryScoreMax: 45,
    examDurationMinutes: 235,
    averageScoreRussia: 55.3,
    ourStudentsAverageScore: 82.5,
    structure: {
      part1Count: 20,
      part2Count: 6,
      passingScore: 39,
      highScoreThreshold: 78
    },
    pitfalls: [
      {
        title: 'Качественная задача №21: потеря обязательных формул из кодификатора',
        description: 'При правильном выводе эксперты снижают баллы, если не указан фундаментальный закон Ньютона или Фарадея.'
      },
      {
        title: 'Электродинамика и закон электромагнитной индукции в №24',
        description: 'Ошибки с направлением индукционного тока (правило Ленца).'
      },
      {
        title: 'Термодинамика влажного воздуха и насыщенных паров',
        description: 'Смешение понятий относительной влажности и парциального давления.'
      }
    ],
    curriculum: [
      { moduleNumber: 1, title: 'Механика: кинематика, динамика, законы сохранения', topicsCount: 16, hours: 32 },
      { moduleNumber: 2, title: 'Молекулярная физика и термодинамика', topicsCount: 14, hours: 26 },
      { moduleNumber: 3, title: 'Электростатика и законы постоянного тока', topicsCount: 12, hours: 24 },
      { moduleNumber: 4, title: 'Магнитное поле, электромагнитная индукция и оптика', topicsCount: 16, hours: 30 },
      { moduleNumber: 5, title: 'Квантовая и ядерная физика, СТО', topicsCount: 10, hours: 18 }
    ],
    leadTeacher: {
      name: 'Константин Игоревич Смирнов',
      role: 'Преподаватель МФТИ, эксперт Всероссийской олимпиады',
      experienceYears: 16,
      graduatesCount: 2400,
      hundredScorersCount: 38,
      bio: 'Кандидат физико-математических наук, автор научных статей в зарубежных рецензируемых журналах.'
    },
    tariffs: [
      { name: 'Стандарт', priceMonth: 4490, features: ['8 вебинаров в месяц', 'ДЗ с видеоразборами', 'Чат курса'] },
      { name: 'ПРО с куратором', priceMonth: 6990, isPopular: true, features: ['Все опции Стандарта', 'Проверка решений экспертом ФИПИ', 'Личный куратор'] },
      { name: 'Премиум 1 на 1', priceMonth: 12900, features: ['Индивидуальное ведение', 'Подготовка к олимпиадам и ДВИ МГУ'] }
    ]
  },
  social: {
    slug: 'social',
    title: 'Обществознание ЕГЭ 2026',
    tagline: 'Право, экономика, социология и политика без зубрежки с реальными примерами из жизни',
    examType: 'ЕГЭ',
    primaryScoreMax: 58,
    examDurationMinutes: 210,
    averageScoreRussia: 56.4,
    ourStudentsAverageScore: 84.1,
    structure: {
      part1Count: 16,
      part2Count: 9,
      passingScore: 45,
      highScoreThreshold: 80
    },
    pitfalls: [
      {
        title: 'Задание №24 на составление сложного плана с детализацией пунктов',
        description: 'План не засчитывается, если обязательные смысловые пункты не развернуты в подпункты.'
      },
      {
        title: 'Иллюстрация примеров из общественной жизни в №25',
        description: 'Абстрактные примеры типа «Гражданин А пошел в магазин» вместо конкретных кейсов РФ.'
      },
      {
        title: 'Путаница между отраслями права и процессуальными нормами в №15',
        description: 'Смешение административного, уголовного и гражданского процессов.'
      }
    ],
    curriculum: [
      { moduleNumber: 1, title: 'Человек и общество: мировоззрение, познание, культура', topicsCount: 12, hours: 22 },
      { moduleNumber: 2, title: 'Экономика: рынок, налоги, госбюджет, финансовые институты', topicsCount: 16, hours: 30 },
      { moduleNumber: 3, title: 'Социальные отношения: стратификация, конфликты, семья', topicsCount: 10, hours: 18 },
      { moduleNumber: 4, title: 'Политика: государство, партии, формы правления, выборы', topicsCount: 14, hours: 26 },
      { moduleNumber: 5, title: 'Правовое регулирование в РФ: Конституция и Кодексы РФ', topicsCount: 20, hours: 38 }
    ],
    leadTeacher: {
      name: 'Ольга Николаевна Белова',
      role: 'Юрист, эксперт по обществознанию, автор учебных курсов',
      experienceYears: 12,
      graduatesCount: 3100,
      hundredScorersCount: 52,
      bio: 'Выпускница юридического факультета СПбГУ, специалист по конституционному праву РФ.'
    },
    tariffs: [
      { name: 'Стандарт', priceMonth: 3990, features: ['8 занятий в месяц', 'Интерактивные конспекты', 'Автопроверка тестов'] },
      { name: 'ПРО с куратором', priceMonth: 5990, isPopular: true, features: ['Все опции Стандарта', 'Проверка второй части экспертом', 'Банк аргументов для №25'] },
      { name: 'Премиум 1 на 1', priceMonth: 11900, features: ['Индивидуальные занятия', 'Разбор всех кодексов РФ'] }
    ]
  },
  chemistry: {
    slug: 'chemistry',
    title: 'Химия ЕГЭ 2026',
    tagline: 'Органическая и неорганическая химия, расчетные задачи №33 и №34 на максимальный балл',
    examType: 'ЕГЭ',
    primaryScoreMax: 56,
    examDurationMinutes: 210,
    averageScoreRussia: 56.1,
    ourStudentsAverageScore: 83.9,
    structure: {
      part1Count: 28,
      part2Count: 6,
      passingScore: 39,
      highScoreThreshold: 80
    },
    pitfalls: [
      {
        title: 'Сложные ОВР и реакции ионного обмена в №29 и №30',
        description: 'Ошибки в определении степени окисления переходных металлов (хром, марганец).'
      },
      {
        title: 'Расчетные задачи №34 на атомистику и электролиз',
        description: 'Потеря материального баланса в растворах.'
      },
      {
        title: 'Условия протекания реакций в органической химии (катализаторы, температура)',
        description: 'Неправильно указанные побочные продукты.'
      }
    ],
    curriculum: [
      { moduleNumber: 1, title: 'Строение атома, периодический закон, химическая связь', topicsCount: 12, hours: 22 },
      { moduleNumber: 2, title: 'Неорганическая химия: металлы, неметаллы и их соединения', topicsCount: 18, hours: 34 },
      { moduleNumber: 3, title: 'Органическая химия: углеводороды и кислородсодержащие', topicsCount: 16, hours: 30 },
      { moduleNumber: 4, title: 'Химическая кинетика, равновесие и гидролиз', topicsCount: 10, hours: 18 },
      { moduleNumber: 5, title: 'Мастер-класс по решению олимпиадных задач №33–34', topicsCount: 14, hours: 28 }
    ],
    leadTeacher: {
      name: 'Михаил Юрьевич Григорьев',
      role: 'Кандидат химических наук, преподаватель РХТУ им. Менделеева',
      experienceYears: 13,
      graduatesCount: 2100,
      hundredScorersCount: 41,
      bio: 'Победитель всероссийских химических турниров, разработчик лабораторных практикумов.'
    },
    tariffs: [
      { name: 'Стандарт', priceMonth: 4490, features: ['8 вебинаров в месяц', 'ДЗ с подробным ключом'] },
      { name: 'ПРО с куратором', priceMonth: 6990, isPopular: true, features: ['Индивидуальный разбор задач №34', 'Куратор-стобалльник'] },
      { name: 'Премиум 1 на 1', priceMonth: 12900, features: ['Индивидуальная траектория в медвузы (Сеченовка, Пирогов)'] }
    ]
  },
  biology: {
    slug: 'biology',
    title: 'Биология ЕГЭ 2026',
    tagline: 'Цитология, генетика, анатомия и эволюция с подробным попаданием в критерии ФИПИ',
    examType: 'ЕГЭ',
    primaryScoreMax: 57,
    examDurationMinutes: 235,
    averageScoreRussia: 50.8,
    ourStudentsAverageScore: 81.6,
    structure: {
      part1Count: 21,
      part2Count: 7,
      passingScore: 39,
      highScoreThreshold: 78
    },
    pitfalls: [
      {
        title: 'Биология считается самым низкобалльным экзаменом в РФ по статистике ФИПИ',
        description: 'Сверхстрогие закрытые ключи проверки второй части.'
      },
      {
        title: 'Задачи по генетике №28 на сцепленное наследование и кроссинговер',
        description: 'Ошибки в оформлении фенотипов и генотипов родителей.'
      },
      {
        title: 'Эксперименты и анализ научной гипотезы в №23–24',
        description: 'Отрицательный контроль и зависимые/независимые переменные.'
      }
    ],
    curriculum: [
      { moduleNumber: 1, title: 'Биология клетки, биохимия и клеточный цикл', topicsCount: 14, hours: 26 },
      { moduleNumber: 2, title: 'Генетика, селекция и биотехнологии', topicsCount: 16, hours: 30 },
      { moduleNumber: 3, title: 'Ботаника, зоология и микология', topicsCount: 12, hours: 22 },
      { moduleNumber: 4, title: 'Анатомия и физиология человека', topicsCount: 18, hours: 34 },
      { moduleNumber: 5, title: 'Эволюционное учение и экологические закономерности', topicsCount: 14, hours: 26 }
    ],
    leadTeacher: {
      name: 'Анна Викторовна Соколова',
      role: 'Преподаватель биофака МГУ, эксперт ЕГЭ',
      experienceYears: 15,
      graduatesCount: 2600,
      hundredScorersCount: 35,
      bio: 'Автор научно-популярных книг по генетике и пособий для поступающих в медицинские университеты.'
    },
    tariffs: [
      { name: 'Стандарт', priceMonth: 4490, features: ['8 занятий в месяц', 'Интерактивные атласы по анатомии'] },
      { name: 'ПРО с куратором', priceMonth: 6990, isPopular: true, features: ['Проверка второй части экспертом', 'Навык попадания в ключи ФИПИ'] },
      { name: 'Премиум 1 на 1', priceMonth: 12900, features: ['Персональная подготовка для целевиков и олимпиадников'] }
    ]
  },
  history: {
    slug: 'history',
    title: 'История ЕГЭ 2026',
    tagline: 'Хронология от Рюрика до XXI века, карты, культура и аргументация в №20–21',
    examType: 'ЕГЭ',
    primaryScoreMax: 42,
    examDurationMinutes: 210,
    averageScoreRussia: 56.8,
    ourStudentsAverageScore: 84.7,
    structure: {
      part1Count: 12,
      part2Count: 9,
      passingScore: 35,
      highScoreThreshold: 80
    },
    pitfalls: [
      {
        title: 'Работа с исторической картой №8–11',
        description: 'Ошибки в опознавании направлений походов и линий фронтов ВОВ.'
      },
      {
        title: 'Всеобщая история и задание №21 на синхронизацию процессов',
        description: 'Трудности с аргументацией событий истории зарубежных стран.'
      },
      {
        title: 'Вопросы культуры: храмы, памятники, иконы и картины',
        description: 'Определение архитектурного стиля и авторов шедевров.'
      }
    ],
    curriculum: [
      { moduleNumber: 1, title: 'Древняя Русь и Московское царство (IX–XVII вв.)', topicsCount: 16, hours: 30 },
      { moduleNumber: 2, title: 'Российская империя в XVIII — начале XX века', topicsCount: 18, hours: 34 },
      { moduleNumber: 3, title: 'Советская эпоха, Великая Отечественная война и распад СССР', topicsCount: 20, hours: 38 },
      { moduleNumber: 4, title: 'Российская Федерация на современном этапе (1992–2026)', topicsCount: 10, hours: 18 },
      { moduleNumber: 5, title: 'История культуры и историческая география', topicsCount: 14, hours: 26 }
    ],
    leadTeacher: {
      name: 'Павел Дмитриевич Морозов',
      role: 'Историк, научный сотрудник Государственного исторического музея',
      experienceYears: 14,
      graduatesCount: 2200,
      hundredScorersCount: 39,
      bio: 'Выпускник исторического факультета МГУ, лектор образовательных программ.'
    },
    tariffs: [
      { name: 'Стандарт', priceMonth: 3990, features: ['8 вебинаров', 'Интерактивные исторические карты'] },
      { name: 'ПРО с куратором', priceMonth: 5990, isPopular: true, features: ['Проверка развернутых ответов', 'Тренажер по всеобщей истории'] },
      { name: 'Премиум 1 на 1', priceMonth: 11900, features: ['Индивидуальный трек для поступления в МГИМО и ВШЭ'] }
    ]
  },
  english: {
    slug: 'english',
    title: 'Английский язык ЕГЭ 2026',
    tagline: 'Аудирование, чтение, грамматика, эссе по графикам и безупречная устная часть',
    examType: 'ЕГЭ',
    primaryScoreMax: 82,
    examDurationMinutes: 207,
    averageScoreRussia: 65.2,
    ourStudentsAverageScore: 88.5,
    structure: {
      part1Count: 36,
      part2Count: 6,
      passingScore: 30,
      highScoreThreshold: 85
    },
    pitfalls: [
      {
        title: 'Устная часть: описание графиков и сравнение картинок №4',
        description: 'Превышение лимита времени и нарушение плана монолога.'
      },
      {
        title: 'Задание №38: описание проектной работы по таблице/диаграмме',
        description: 'Некорректное сравнение данных и логические ошибки в выводе проблемы.'
      },
      {
        title: 'Словообразование №25–29 и фразовые глаголы',
        description: 'Ошибки в отрицательных приставках и конверсии частей речи.'
      }
    ],
    curriculum: [
      { moduleNumber: 1, title: 'Грамматика и словообразование: времена, пассив, модальные глаголы', topicsCount: 16, hours: 30 },
      { moduleNumber: 2, title: 'Стратегии быстрого аудирования и чтения текстов уровня B2', topicsCount: 14, hours: 26 },
      { moduleNumber: 3, title: 'Электронное письмо другу и проектное эссе №38', topicsCount: 12, hours: 24 },
      { moduleNumber: 4, title: 'Интенсивная тренировка говорения (Speaking Parts 1–4)', topicsCount: 16, hours: 32 }
    ],
    leadTeacher: {
      name: 'Виктория Робертовна Кларк',
      role: 'Носитель языка (Bilingual), сертифицированный тренер Cambridge CELTA',
      experienceYears: 12,
      graduatesCount: 2700,
      hundredScorersCount: 45,
      bio: 'Эксперт по подготовке к международным экзаменам IELTS/TOEFL и российскому ЕГЭ.'
    },
    tariffs: [
      { name: 'Стандарт', priceMonth: 4490, features: ['8 занятий в месяц', 'Интерактивные аудиоматериалы'] },
      { name: 'ПРО с куратором', priceMonth: 6990, isPopular: true, features: ['Проверка устной части голосовыми сообщениями', 'Проверка эссе по критериям'] },
      { name: 'Премиум 1 на 1', priceMonth: 12900, features: ['Индивидуальная практика говорения с носителем языка'] }
    ]
  },
  literature: {
    slug: 'literature',
    title: 'Литература ЕГЭ 2026',
    tagline: 'Глубокий анализ поэтики, цитирование классиков и максимальные баллы за 5 сочинений',
    examType: 'ЕГЭ',
    primaryScoreMax: 48,
    examDurationMinutes: 235,
    averageScoreRussia: 60.1,
    ourStudentsAverageScore: 86.3,
    structure: {
      part1Count: 7,
      part2Count: 5,
      passingScore: 40,
      highScoreThreshold: 82
    },
    pitfalls: [
      {
        title: 'Большое сочинение №11: требование к цитированию и теоретико-литературным понятиям',
        description: 'Снижение баллов при пересказе вместо литературоведческого анализа.'
      },
      {
        title: 'Сопоставительные задания №5 и №10',
        description: 'Некорректное привлечение контекста и искажение авторской позиции.'
      },
      {
        title: 'Речевые и фактические ошибки в именах персонажей',
        description: 'Потеря драгоценных первичных баллов по критериям грамотности.'
      }
    ],
    curriculum: [
      { moduleNumber: 1, title: 'Теория литературы: роды, жанры, тропы, стихотворные размеры', topicsCount: 12, hours: 22 },
      { moduleNumber: 2, title: 'Золотой век: Пушкин, Лермонтов, Гоголь, Грибоедов', topicsCount: 16, hours: 32 },
      { moduleNumber: 3, title: 'Русская классика второй половины XIX века: Толстой, Достоевский, Тургенев', topicsCount: 18, hours: 36 },
      { moduleNumber: 4, title: 'Серебряный век, поэзия и литература XX века: Маяковский, Булгаков, Шолохов', topicsCount: 16, hours: 30 },
      { moduleNumber: 5, title: 'Практикум написания большого сочинения №11', topicsCount: 14, hours: 28 }
    ],
    leadTeacher: {
      name: 'Татьяна Александровна Васильева',
      role: 'Член Союза писателей РФ, старший эксперт ЕГЭ по литературе',
      experienceYears: 17,
      graduatesCount: 1950,
      hundredScorersCount: 54,
      bio: 'Автор критических статей и учебных пособий по подготовке к творческим экзаменам.'
    },
    tariffs: [
      { name: 'Стандарт', priceMonth: 4490, features: ['8 занятий в месяц', 'Списки цитат и тезисов ко всем произведениям кодификатора'] },
      { name: 'ПРО с куратором', priceMonth: 6990, isPopular: true, features: ['Проверка 6 сочинений в месяц', 'Индивидуальные правки стилистики'] },
      { name: 'Премиум 1 на 1', priceMonth: 12900, features: ['Подготовка к ДВИ во ВГИК, ГИТИС, МГУ'] }
    ]
  }
};
'''

with open('c:/Users/DELL/Downloads/ucheba/lib/data.ts', 'a', encoding='utf-8') as f:
    f.write(data_code)

print("Appended SCHOOLS, COURSES, MASTER_PROGRAMS, MBA_PROGRAMS, ABROAD_PROGRAMS, SUBJECT_PREP_DATA successfully!")

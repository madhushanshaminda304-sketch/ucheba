import os
import re

with open('lib/data.ts', 'r', encoding='utf-8') as f:
    text = f.read()

pos_cities = text.find('export const CITIES: CityOption[] = [')
pos_domains = text.find('export const EDUCATIONAL_DOMAINS = [')
pos_inst = text.find('export const INSTITUTIONS: Institution[] = [')
pos_prog = text.find('export const PROGRAMS: Program[] = [')
pos_coll = text.find('export const COLLEGES: College[] = [')
pos_prof = text.find('export const PROFESSIONS: Profession[] = [')
pos_art = text.find('export const ARTICLES: Article[] = [')
pos_events = text.find('export const OPEN_DAY_EVENTS: OpenDayEvent[] = [')
pos_career_q = text.find('export const CAREER_QUESTIONS: CareerQuestion[] = [')
pos_archetype = text.find('export const ARCHETYPE_RESULTS = {')
pos_spec = text.find('export const SPECIALITIES: Speciality[] = [')
pos_olymp = text.find('export const OLYMPIADS: Olympiad[] = [')
pos_training = text.find('export const TRAINING_QUESTIONS: TrainingQuestion[] = [')
pos_rankings = text.find('export const RANKINGS: RankingItem[] = [')
pos_schools = text.find('export const SCHOOLS: School[] = [')
pos_courses = text.find('export const COURSES: Course[] = [')
pos_master = text.find('export const MASTER_PROGRAMS: MasterProgram[] = [')
pos_mba = text.find('export const MBA_PROGRAMS: MbaProgram[] = [')
pos_abroad = text.find('export const ABROAD_PROGRAMS: AbroadProgram[] = [')
pos_subject = text.find('export const SUBJECT_PREP_DATA: Record<string, SubjectPrep> = {')

# 1. reference.ts
ref_content = '''import { CityOption, Article } from '../types';

''' + text[pos_cities:pos_inst] + '\n' + text[pos_art:pos_events] + '\n' + text[pos_archetype:pos_spec]

with open('lib/data/reference.ts', 'w', encoding='utf-8') as f:
    f.write(ref_content.strip() + '\n')
print("Wrote lib/data/reference.ts")

# 2. institutions.ts
inst_content = '''import { Institution, College, School } from '../types';

''' + text[pos_inst:pos_prog] + '\n' + text[pos_coll:pos_prof] + '\n' + text[pos_schools:pos_courses]

with open('lib/data/institutions.ts', 'w', encoding='utf-8') as f:
    f.write(inst_content.strip() + '\n')
print("Wrote lib/data/institutions.ts")

# 3. programs.ts
raw_prog_block = text[pos_prog:pos_coll]
courses_block = text[pos_courses:pos_master]
master_block = text[pos_master:pos_mba]
mba_block = text[pos_mba:pos_abroad]
abroad_block = text[pos_abroad:pos_subject]

# Curricula definitions
cs_curriculum = """[
      { number: 1, title: '1 курс, 1 семестр', subjects: ['Математический анализ I', 'Линейная алгебра и аналитическая геометрия', 'Основы программирования на C++', 'Иностранный язык'] },
      { number: 2, title: '1 курс, 2 семестр', subjects: ['Математический анализ II', 'Дискретная математика', 'Алгоритмы и структуры данных', 'Архитектура ЭВМ и ассемблер'] },
      { number: 3, title: '2 курс, 3 семестр', subjects: ['Теория вероятностей и математическая статистика', 'Объектно-ориентированное программирование (Java/C#)', 'Операционные системы', 'Базы данных (SQL)'] },
      { number: 4, title: '2 курс, 4 семестр', subjects: ['Компьютерные сети', 'Веб-разработка (Frontend/Backend)', 'Тестирование ПО', 'Практика в IT-компании'] },
      { number: 5, title: '3 курс, 5 семестр', subjects: ['Машинное обучение и анализ данных', 'Распределенные и облачные системы', 'Архитектура микросервисов', 'Проектный практикум'] },
      { number: 6, title: '3 курс, 6 семестр', subjects: ['Безопасность программных систем', 'DevOps и CI/CD пайплайны', 'Мобильная разработка', 'Курсовой проект'] },
      { number: 7, title: '4 курс, 7 семестр', subjects: ['Глубокое обучение и нейросети', 'Управление программными проектами (Agile/Scrum)', 'Научно-исследовательский семинар'] },
      { number: 8, title: '4 курс, 8 семестр', subjects: ['Преддипломная производственная практика', 'Подготовка выпускной квалификационной работы (ВКР)', 'Защита диплома'] },
    ]"""

hse_se_curriculum = """[
      { number: 1, title: '1 курс, 1 семестр', subjects: ['Алгебра и геометрия', 'Математический анализ', 'Конструирование программного обеспечения', 'Дискретная математика'] },
      { number: 2, title: '1 курс, 2 семестр', subjects: ['Алгоритмы и структуры данных', 'Введение в разработку ПО', 'Английский язык в IT', 'Линейная оптимизация'] },
      { number: 3, title: '2 курс, 3 семестр', subjects: ['Архитектура вычислительных систем', 'Объектно-ориентированное проектирование', 'Базы данных', 'Теория вероятностей'] },
      { number: 4, title: '2 курс, 4 семестр', subjects: ['Операционные системы', 'Инженерия требований', 'Проектный практикум с ментором из индустрии', 'Экономика программной инженерии'] },
      { number: 5, title: '3 курс, 5 семестр', subjects: ['Тестирование и верификация ПО', 'Архитектура распределенных приложений', 'Веб-сервисы и API', 'Разработка мобильных приложений'] },
      { number: 6, title: '3 курс, 6 семестр', subjects: ['Управление IT-продуктом и процессами разработки', 'DevOps практики', 'Информационная безопасность', 'Производственная практика'] },
      { number: 7, title: '4 курс, 7 семестр', subjects: ['Облачные вычисления', 'Анализ больших данных', 'НИР и подготовка проектного портфолио'] },
      { number: 8, title: '4 курс, 8 семестр', subjects: ['Преддипломная стажировка в технологической компании', 'Подготовка ВКР', 'Публичная защита диплома'] },
    ]"""

prog_header = '''import { Program, MasterProgram, MbaProgram, AbroadProgram, Course } from '../types';

'''

# Process PROGRAMS to enrich with explicit IDs and program-specific curricula
# p1 gets cs_curriculum (official), p4 gets hse_se_curriculum (illustrative), others get null (unavailable)
lines_prog = raw_prog_block.splitlines()
new_prog_lines = []
for line in lines_prog:
    new_prog_lines.append(line)
    if "id: 'p1'," in line:
        new_prog_lines.append("    intakeStatus: 'upcoming',")
        new_prog_lines.append("    intakeYear: 2026,")
        new_prog_lines.append("    campusAddress: 'г. Москва, Ленинские горы, д. 1, 2-й учебный корпус ВМК',")
        new_prog_lines.append("    curriculumStatus: 'official',")
        new_prog_lines.append("    curriculum: " + cs_curriculum + ",")
        new_prog_lines.append("    applicationUrl: 'https://cpk.msu.ru',")
        new_prog_lines.append("    admissionRulesUrl: 'https://cpk.msu.ru/rules',")
        new_prog_lines.append("    budgetThreshold: { minScore: 382, year: 2024, competitionType: 'budget', placesCount: 180, evidence: { verificationStatus: 'demo', sourceName: 'Приказ о зачислении МГУ 2024' } },")
        new_prog_lines.append("    paidThreshold: { minScore: 265, year: 2024, competitionType: 'paid', placesCount: 75, evidence: { verificationStatus: 'demo', sourceName: 'Приказ о зачислении МГУ 2024' } },")
        new_prog_lines.append("    cost: { amount: 440000, currency: 'RUB', period: 'year', evidence: { verificationStatus: 'demo', sourceName: 'Приказ о стоимости обучения МГУ' } },")
        new_prog_lines.append("    evidence: { verificationStatus: 'demo', academicYear: '2024/2025', sourceName: 'Официальный портал ВМК МГУ' },")
    elif "id: 'p4'," in line:
        new_prog_lines.append("    intakeStatus: 'upcoming',")
        new_prog_lines.append("    intakeYear: 2026,")
        new_prog_lines.append("    campusAddress: 'г. Москва, Покровский бульвар, д. 11, корпус R',")
        new_prog_lines.append("    curriculumStatus: 'illustrative',")
        new_prog_lines.append("    curriculum: " + hse_se_curriculum + ",")
        new_prog_lines.append("    applicationUrl: 'https://ba.hse.ru',")
        new_prog_lines.append("    admissionRulesUrl: 'https://ba.hse.ru/rules',")
        new_prog_lines.append("    budgetThreshold: { minScore: 298, year: 2024, competitionType: 'budget', placesCount: 110, evidence: { verificationStatus: 'demo', sourceName: 'Приказ о зачислении НИУ ВШЭ 2024' } },")
        new_prog_lines.append("    paidThreshold: { minScore: 235, year: 2024, competitionType: 'paid', placesCount: 90, evidence: { verificationStatus: 'demo', sourceName: 'Приказ о зачислении НИУ ВШЭ 2024' } },")
        new_prog_lines.append("    cost: { amount: 690000, currency: 'RUB', period: 'year', evidence: { verificationStatus: 'demo', sourceName: 'Приказ о стоимости обучения ВШЭ' } },")
        new_prog_lines.append("    evidence: { verificationStatus: 'demo', academicYear: '2024/2025', sourceName: 'Официальный портал ФКН НИУ ВШЭ' },")
    elif re.match(r"\s+id:\s*'p\d+',", line) and "id: 'p1'" not in line and "id: 'p4'" not in line:
        new_prog_lines.append("    intakeStatus: 'upcoming',")
        new_prog_lines.append("    intakeYear: 2026,")
        new_prog_lines.append("    curriculumStatus: 'unavailable',")
        new_prog_lines.append("    curriculum: null,")
        new_prog_lines.append("    applicationUrl: 'https://priem.ucheba.ru',")
        new_prog_lines.append("    admissionRulesUrl: 'https://priem.ucheba.ru/rules',")
        new_prog_lines.append("    evidence: { verificationStatus: 'demo', academicYear: '2024/2025', sourceName: 'Официальный сайт приёмной комиссии' },")

enriched_prog_block = '\n'.join(new_prog_lines)

prog_content = prog_header + enriched_prog_block + '\n' + courses_block + '\n' + master_block + '\n' + mba_block + '\n' + abroad_block

with open('lib/data/programs.ts', 'w', encoding='utf-8') as f:
    f.write(prog_content.strip() + '\n')
print("Wrote lib/data/programs.ts")

# 4. careers.ts
prof_block = text[pos_prof:pos_art]
spec_block = text[pos_spec:pos_olymp]

# In prof_block, replace string titles in relatedPrograms with explicit program IDs
# prof1 (Software Engineer) -> ['p1', 'p4', 'p8']
# prof2 (Data Scientist) -> ['p1', 'p4']
# prof3 (Surgeon) -> ['p2', 'p7']
# prof4 (Financial Analyst) -> ['p5', 'p10']
# prof5 (Product Designer) -> ['p4', 'p8']
# prof6 (Cybersecurity) -> ['p6', 'p8']
prof_block_updated = prof_block.replace(
    "relatedPrograms: ['09.03.04 Программная инженерия', '01.03.02 Прикладная математика и информатика', '09.03.01 Информатика и вычислительная техника'],",
    "relatedPrograms: ['p1', 'p4', 'p8'],"
).replace(
    "relatedPrograms: ['01.03.02 Прикладная математика и информатика', '02.03.02 Фундаментальная информатика и ИТ'],",
    "relatedPrograms: ['p1', 'p4'],"
).replace(
    "relatedPrograms: ['31.05.01 Лечебное дело', '31.05.02 Педиатрия'],",
    "relatedPrograms: ['p2', 'p7'],"
).replace(
    "relatedPrograms: ['38.03.01 Экономика', '38.03.02 Менеджмент'],",
    "relatedPrograms: ['p5', 'p10'],"
).replace(
    "relatedPrograms: ['09.03.04 Программная инженерия', '54.03.01 Дизайн'],",
    "relatedPrograms: ['p4', 'p8'],"
).replace(
    "relatedPrograms: ['10.05.01 Компьютерная безопасность', '09.03.01 Информатика и вычислительная техника'],",
    "relatedPrograms: ['p6', 'p8'],"
)

careers_content = '''import { Profession, Speciality } from '../types';

''' + prof_block_updated + '\n' + spec_block

with open('lib/data/careers.ts', 'w', encoding='utf-8') as f:
    f.write(careers_content.strip() + '\n')
print("Wrote lib/data/careers.ts")

# 5. events.ts
events_content = '''import { OpenDayEvent, Olympiad, RankingItem } from '../types';

''' + text[pos_events:pos_career_q] + '\n' + text[pos_olymp:pos_training] + '\n' + text[pos_rankings:pos_schools]

with open('lib/data/events.ts', 'w', encoding='utf-8') as f:
    f.write(events_content.strip() + '\n')
print("Wrote lib/data/events.ts")

# 6. interestQuestions.ts
interest_content = '''import { CareerQuestion, TrainingQuestion, SubjectPrep } from '../types';

''' + text[pos_career_q:pos_archetype] + '\n' + text[pos_training:pos_rankings] + '\n' + text[pos_subject:]

with open('lib/data/interestQuestions.ts', 'w', encoding='utf-8') as f:
    f.write(interest_content.strip() + '\n')
print("Wrote lib/data/interestQuestions.ts")

print("All modular data files created successfully!")

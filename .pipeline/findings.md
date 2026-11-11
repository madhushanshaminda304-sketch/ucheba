# Multi-Angle Audit Findings: https://www.ucheba.ru/

## 1. Inventory & Page Map

The ucheba.ru platform is Russia's premier educational portal connecting students with universities, colleges, professions, and test prep.

### Core Routes & Purpose:
1. **Homepage (`/`)**:
   - Hero multi-entity search ("Я хочу поступить") with intent selection (Вуз, Колледж, Специальность, Профессия), city geolocation selector, and subject/EGE score calculator.
   - Domain / Category grid: IT, Economics, Medicine, Law, Engineering, Humanities, Creative/Design, Military/Security, Pedagogy.
   - Top Institutions in National & Industry Rankings (RAEX, Forbes, national ratings).
   - Upcoming Open Doors days (Дни открытых дверей) with registration CTA.
   - Educational articles & guides (Журнал поступления, советы родителям и абитуриентам).
   - Exam simulator links (Тренажеры ЕГЭ/ОГЭ).

2. **Higher Education Institutions Directory (`/for-abiturients/vuz` or `/uz`)**:
   - Faceted search: City/region, budget/paid, minimum passing scores (ЕГЭ), subject requirements (Математика, Информатика, Физика, Обществознание, etc.), university status (государственный / негосударственный), military department (военная кафедра), dormitory availability (общежитие), degree types (бакалавриат, специалитет, магистратура).
   - Institution card: Logo, official name, abbreviation, city, average budget passing score, tuition fee from/to, number of budget/paid spots, tags.

3. **Institution Detail Page (`/uz/:id`)**:
   - Header with university emblem, accreditation, founding year, state status, military chair, dorm badge.
   - Key stats: Average score, tuition range, partner companies, graduate employment rates.
   - Programs tab: Grouped by field/faculty with budget scores, exam requirements, study formats (очная, заочная, очно-заочная).
   - Campus & Facilities tab: Description, address, transport/metro, dormitories.
   - Admission guidelines & Olympiad benefits.
   - Student reviews and Q&A section.

4. **Colleges / Vocational Schools Directory (`/for-abiturients/college`)**:
   - Vocational specialties, 9th vs 11th grade entry, average GPA passing scores (средний балл аттестата), budget availability.

5. **Professions Directory (`/prof`)**:
   - Comprehensive career catalog linked to educational programs.
   - Salary ranges (junior / middle / senior), employment demand, key hard/soft skills.
   - Direct mapping: "Where to study to become X" -> links to specific universities and degree programs.

6. **Career Guidance & Tests (`/for-abiturients/prof` or `/proftest`)**:
   - Interactive psychometric / interest quiz for high school students.
   - Real-time question progression, scoring algorithm, recommendation engine matching test results to career archetypes and university programs.

7. **Comparison Tool (`/compare`)**:
   - Side-by-side comparison matrix for universities or specific educational programs (tuition, budget places, passing scores, location, dormitories).

8. **Favorites & Shortlist (`/favorites`)**:
   - Saved universities, programs, and professions persisted in user session/localStorage.

9. **Educational Journal / Articles (`/for-abiturients/articles` and `/article/:id`)**:
   - Rich reading layout with author credentials, table of contents, related university programs, and discussion.

---

## 2. Design Audit

### Observed Baseline:
- **Typography**: Proxima Nova font family (`font-family: proxima-nova, Arial, Helvetica, sans-serif`). Fallbacks to Arial.
- **Palette**:
  - Primary blue: `#2b59c3` / `#1a44a5` (academic trust, header accents, CTA buttons)
  - Dark text: `#222426` / `#33373d`
  - Light background: `#f5f6f8` / `#ffffff`
  - Accent / Category hues: Plum, Gold, Green, Orange, Cyan for domain badges
  - Borders: `#e5e7eb` / `#e2e5eb`
- **Component Patterns**:
  - CSS-in-JS (styled-components) with layout primitives: `Container`, `Grid`, `GridCol`, `Spacing`, `Button`, `Text`.
  - Multi-select pill filters with active state chips.
  - Card-based layouts with subtle hover elevation.
- **Weaknesses in Current Site**:
  - Layout is slightly cluttered with 2018-era dense font sizing and tight padding.
  - Search inputs on mobile feel cramped.
  - Noticeable layout shift (CLS) during SSR hydration and cookie/location banner injection.
  - High bundle payload due to legacy Next.js chunks and tracking scripts.
  - Opportunity for clean, modern aesthetic: Tailwind CSS, Inter/Plus Jakarta typography, subtle borders, polished badges, and seamless Framer Motion transitions.

---

## 3. Motion Audit

- **Current State**: Very minimal transitions; standard CSS `:hover` brightness shifts on buttons, abrupt dropdown menus, no smooth accordion expanding or interactive filtering transitions.
- **Remake Opportunity**:
  - Smooth filter state transitions (fade & slide-in for cards when changing filters).
  - Elegant modal/drawer for mobile filter controls and city selection.
  - Interactive multi-step animated quiz progression for Career Guidance.
  - Floating comparison dock indicator with expand/collapse animation.

---

## 4. Performance Audit

- **Original Architecture**: Next.js Pages router with Redux Toolkit (`initialState` serialized into `__NEXT_DATA__`).
- **Initial HTML Payload**: ~180KB - 490KB per page with inline JSON state.
- **Remake Target**:
  - Next.js App Router with server components and lightweight client hydration.
  - Initial JS bundle ≤ 200 KB gzipped.
  - Fast client-side filtering without round-trip lag.
  - 0 console errors, instant page transitions.

---

## 5. Unknowns & Edge Cases

- **Third-Party Data Feeds**: The original site queries internal microservices for dynamic user accounts and lead capture.
- **Remake Strategy**: We engineer a comprehensive, realistic, and rich educational dataset of top Russian universities (МГУ, ВШЭ, МФТИ, МГТУ им. Баумана, СПбГУ, etc.), hundreds of accredited degree programs, vocational colleges, career roadmaps, and full search indexing directly embedded in the remake app, paired with local storage for user favorites, comparisons, and test outcomes.

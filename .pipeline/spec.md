# Specification: Ucheba.ru Educational Ecosystem Remake (Complete)

## 1. Product Brief & Architecture
- **Application**: Ucheba.ru Remake — Comprehensive Russian Educational Directory, Exam Prep & Career Advisory Ecosystem
- **Target Profile**: Web Application (`webapp`)
- **Tech Stack**:
  - Framework: Next.js 14 App Router
  - Language: TypeScript (strict mode, 0 errors)
  - Styling: Tailwind CSS with custom design system tokens
  - Icons: Lucide React
  - State Management: React Context with LocalStorage persistence for user profile, scores, saved favorites, and comparison
  - Data Layer: Rich structured educational datasets (`lib/data.ts`) with strict types (`lib/types.ts`)

## 2. Page & Feature Architecture (34+ Routes)

### 2.1 Global Shell & User Hub
- **Header**: Brand logo, city selector modal, ⌘K command palette trigger, comparison and favorites badges, user profile / auth button, and primary navigation.
- **AuthModal (`components/AuthModal.tsx`)**: Modal supporting phone/SMS code verification, email/password auth, and social SSO (VK ID, Gosuslugi, Yandex ID).
- **Personal Cabinet (`/profile`)**: Applicant dashboard featuring live EGE score input, real-time admission probability gauge (Green/Yellow/Red zones), saved target institutions, and registered events.
- **Global Search (`/search`)**: Dedicated multi-entity search engine with entity tab filters and relevance ranking.

### 2.2 Higher & Vocational Education
- **Universities (`/vuz`, `/vuz/[id]`)**: 1240+ institutions, multi-facet filtering, 5-tab university detail (Overview, Programs, Admission rules, Campus/Dorms, Student reviews & Q&A).
- **Program Details (`/program/[id]`)**: Dedicated curriculum view with 8-semester course breakdown and career outcomes.
- **Colleges (`/colleges`, `/colleges/[id]`)**: Vocational colleges with GPA certificate entry rules and specialties.
- **Classifier of Specialties (`/speciality`)**: Official ОКСО codes, exams required, and total budget quotas.
- **National Rankings (`/vuz/rankings`)**: RAEX Top 100 with sub-scores.

### 2.3 Secondary & School Education
- **Schools Catalog (`/school`)**: Leading schools, lyceums, gymnasiums, and private schools of Russia with Department of Education rating tiers.
- **School Profile (`/school/[id]`)**: Profiles with profile classes (IT-вертикаль, инженерный, медицинский), admission rules and exams, clubs, and contacts.

### 2.4 Continuing Education & Advanced Degrees
- **Courses & Continuing Education (`/courses`)**: IT, design, data science, marketing, languages, and management courses with job placement guarantees.
- **Master's Programs (`/master`)**: Graduate programs of leading universities with corporate partner labs (Yandex, Sber, Rosatom).
- **MBA & Executive MBA (`/mba`)**: Business schools with international accreditations (AACSB, EQUIS, AMBA).
- **Study Abroad (`/abroad`)**: International degree programs and 100% full scholarships (CSC China, MBZUAI UAE, DSU Italy).

### 2.5 Career Advisory & Psychometrics
- **Careers Catalog (`/prof`, `/prof/[slug]`)**: High-demand professions with Junior/Middle/Senior salary progression.
- **Career Guidance Quiz (`/proftest`)**: 10-step psychometric test with archetype matching.

### 2.6 Exam Prep & Admissions Guidance
- **Exam Trainer (`/training`)**: Real-time simulator with automated answer checking and explanations for Math, Russian, Informatics, and Social Studies.
- **Admission Tracker (`/admission-tracker`)**: 5-priority simulator calculating automated enrollment.
- **Admission Support (`/admission-support`)**: B2C consulting services and strategy tariffs.
- **Online Prep School (`/ege`)**: Exam prep courses with 80+ score guarantee.
- **10 Subject Hubs (`/ege/[subject]`)**: Mathematics, Russian, Informatics, Physics, Social Studies, Chemistry, Biology, History, English, Literature with 2026 FIPI specs, pitfalls analysis, curriculum, and expert teachers.

### 2.7 Institutional Services & Legal
- **Platform for Tutors (`/for-teachers`)**: Whiteboard sandbox, FIPI task generator, student CRM, and 0% payment processing.
- **Institutional Portal (`/for-clients`)**: University lead generation and analytics.
- **User Agreement (`/agreement`)**: Legal terms and 152-FZ privacy policy.

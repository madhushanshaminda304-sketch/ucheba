# Changelog — Учёба.ру Full Portal Remake

All notable changes to this project are documented in this file.

## [2.2.0] - 2026-11-12 — Honest Guest Workspace, Relational Data Foundation & Integrity Verification
### Added
- **Modular Data Architecture (`lib/data/`)**: Decomposed monolithic data into 8 domain-specific modules (`reference.ts`, `institutions.ts`, `programs.ts`, `careers.ts`, `events.ts`, `interestQuestions.ts`, `lookup.ts`, `integrity.ts`) with backward-compatible re-exports.
- **Automated Data Integrity Audit (`lib/data/integrity.ts`)**: Built-in verification engine detecting duplicate IDs, broken relational references, invalid exam bounds, negative tuition amounts, and broken date formats.
- **Typed Entity Persistence (`SavedEntityRef`)**: Isolated saved entities with composite keys `{type, id, title, subtitle}`, completely preventing ID collisions between universities, degree programs, and colleges. Saving a program bookmarks that specific program.
- **Versioned Local Workspace (`WorkspaceV2`)**: Robust storage engine with schema versioning, strict code-level exam score bounds (0–100), automated pre-migration backups (`ucheba_workspace_backup_*`), and graceful corrupt data recovery with user notifications.
- **Curriculum Authenticity Badges**: Added explicit `Официальный` and `Примерный / иллюстративный` badges for academic curricula on `/program/[id]`, displaying curriculum only when verified program data exists.

### Changed
- **Replaced Fake Authentication (`components/AuthModal.tsx`)**: Completely removed simulated SMS codes (4829), fake password prompts, and simulated social auth. Replaced with an honest Guest Workspace modal explaining local device storage, storage stats, profile naming, and data reset.
- **Honest Admission Threshold Comparisons (`/admission-tracker`, `/profile`)**: Removed misleading "high admission chance" guarantees and algorithmically impossible probability formulas. Replaced with factual historical comparisons against 2024 admission cutoffs with clear disclaimers that 2026 applicant pools determine current results.
- **Semantic Exam Scores**: Refactored unentered exam scores from `0` to `null`. Missing scores now honestly indicate "Недостаточно данных для сопоставления" across profile, tracker, and comparison views.
- **Demo State Form Handlers**: Replaced promises of instant callbacks and consultation submissions across `/admission-support`, `/for-clients`, `/for-teachers`, `/courses`, `/abroad`, `/mba`, and `/events` with honest demo state notifications and direct contact details (hotline and emails).
- **Curriculum Isolation**: Removed the shared computer science curriculum from unrelated degree programs (economics, medicine, architecture); unverified programs now show an informative fallback directing to the university admissions office.

---

## [2.1.0] - 2026-11-11 — Full Portal Analysis, Mobile Optimization & Notification Upgrades
### Added
- **Global Floating Toast System (`components/Toast.tsx`)**: Replaced 100% of thread-blocking browser `window.alert()` popups with responsive, auto-dismissing floating toasts with success, info, and error status icons and accessibility roles.
- **Mobile Bottom Navigation Dock (`components/MobileNav.tsx`)**: Thumb-zone bottom dock for screens < 1024px with quick navigation to Home, Universities, Global Search (`⌘K`), Favorites (with real-time item counter badge), and Personal Cabinet / Auth trigger.
- **Educational Ecosystem Showcase**: Homepage section detailing all 8 tiers of education (Higher Ed, Vocational/Colleges, Secondary Schools & Lyceums, Continuing Education & IT Courses, Master's Degree, MBA, Study Abroad, Private Tutoring).
- **Expanded Hero Search Tabs**: Added "Школы и лицеи" and "Курсы и ДПО" directly into the homepage hero search widget alongside "Вузы", "Колледжи", and "Профессии".

### Changed
- **Cross-Catalog Geolocation Synchronization**: Synchronized the global city selection modal with catalog-level filter states in `/vuz`, `/colleges`, `/school`, and `/events`. Changing city in either the header modal or catalog selector automatically syncs across the entire application.
- **Mobile Menu City Selector**: Added dedicated city indicator and change trigger inside the mobile navigation drawer.
- **Layout Bottom Padding**: Added responsive `pb-16 lg:pb-0` to the root layout main tag to ensure content is never obscured by the mobile bottom dock.

### Fixed
- Replaced hardcoded `alert()` popups in Study Abroad grant applications (`/abroad`), Admission Tracker 5-choice limit (`/admission-tracker`), IT Course enrollment (`/courses`), MBA curriculum requests (`/mba`), and Event calendar registrations (`/events`).
- Fixed missing React Server Component client boundaries in exam preparation modules.

---

## [2.0.0] - 2026-11-10 — Complete Educational Ecosystem
### Added
- 34+ distinct routes covering universities, colleges, schools, master's degrees, MBA, study abroad, career atlas, psychometric test, exam prep simulator, 10 dedicated subject hubs, admission tracker, client portal, tutor sandbox, and user cabinet.
- RAEX Top 100 university rankings hub with sub-scores.
- Interactive psychometric career guidance test (`/proftest`).
- Interactive exam task simulator (`/training`).
- 53 prerendered static pages with 0 TypeScript compilation errors.

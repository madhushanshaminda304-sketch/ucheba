# Pipeline State: Remake of ucheba.ru (100% Comprehensive Portal Complete)

- **Pipeline**: remake
- **Mode**: auto
- **Source**: https://www.ucheba.ru/ (External live website)
- **Target Profile**: webapp (Complete Educational Ecosystem: Higher Ed, Vocational, Schools, Continuing Ed, Master, MBA, Study Abroad, Tutors, Exam Prep, Career Guidance, B2B Institutional Portal, Personal Cabinet, Legal & SEO)
- **Status**: Completed

## Phase Checklist
- [x] **R0: Setup & safety** — Safety verified (read-only external source); state.md created.
- [x] **R1: Identify source** — Tech stack identified (Next.js SSR, Redux state, styled-components); baseline desktop & mobile screenshots captured in `.pipeline/before/`.
- [x] **R2: Multi-angle audit** — Full inventory, design, motion, performance, flows and unknowns documented in `.pipeline/findings.md`.
- [x] **R3: Keep / Change / Drop** — Defined per user directive (full feature set preserved, modern UI/UX elevation, clean educational design assets).
- [x] **R4: Migration plan + quality bar** — Spec and CONSTRAINTS contract created.
- [x] **R5: Rebuild (Phases 4–13)**:
  - [x] Task 1: Next.js + TypeScript + Tailwind project scaffold
  - [x] Task 2: Design system tokens & global layout
  - [x] Task 3: Comprehensive educational data layer (`lib/data.ts`)
  - [x] Task 4: Global AppContext (City, Favorites, Comparison, Search, User Auth, EGE scores)
  - [x] Task 5: Header, Footer, City Selector Modal, Comparison Tray
  - [x] Task 6: Homepage with Hero, EGE Calculator, Rankings, Events, Articles
  - [x] Task 7: Universities Catalog (`/vuz`) with faceted filters
  - [x] Task 8: University Detail Page (`/vuz/[id]`) with tabs, programs, campus, reviews
  - [x] Task 9: Colleges Catalog (`/colleges`)
  - [x] Task 10: Professions Catalog & Detail (`/prof`, `/prof/[slug]`)
  - [x] Task 11: Interactive Career Guidance Test (`/proftest`)
  - [x] Task 12: Comparison Matrix (`/compare`)
  - [x] Task 13: Favorites / Bookmarks (`/favorites`)
  - [x] Task 14: Educational Journal (`/journal`, `/journal/[slug]`)
  - [x] Task 15: Specialties Classifier (`/speciality`)
  - [x] Task 16: Open Doors Days Calendar (`/events`)
  - [x] Task 17: School Olympiads & BVI Benefits Hub (`/olympiads`)
  - [x] Task 18: National University Rankings Hub (`/vuz/rankings`)
  - [x] Task 19: Interactive Exam Tasks Simulator (`/training`)
  - [x] Task 20: Admission Priority Tracker (`/admission-tracker`)
  - [x] Task 21: Admission Support & Consulting Services (`/admission-support`)
  - [x] Task 22: Online Exam Prep School & Courses (`/ege`)
  - [x] Task 23: Institutional Client Portal for Universities & Colleges (`/for-clients`)
  - [x] Task 24: Legal User Agreement & Privacy Policy (`/agreement`)
  - [x] Task 25: Dedicated Program Detail Page (`/program/[id]`) with 8-semester curriculum
  - [x] Task 26: Dedicated College Detail Page (`/colleges/[id]`)
  - [x] Task 27: Global Command Palette (`⌘K` / `Ctrl+K`) Multi-Entity Search Modal
  - [x] Task 28: Secondary Schools, Lyceums & Gymnasiums Catalog (`/school`)
  - [x] Task 29: Dedicated School Detail Page (`/school/[id]`) with profile classes & admission rules
  - [x] Task 30: Platform for Tutors and School Teachers (`/for-teachers`) with whiteboard sandbox & CRM
  - [x] Task 31: Professional Courses & Continuing Education / ДПО Catalog (`/courses`)
  - [x] Task 32: Master's Degree Programs Catalog (`/master`) of top universities with partner labs
  - [x] Task 33: MBA & Business Education Hub (`/mba`) with international accreditations
  - [x] Task 34: Study Abroad & International Scholarships Directory (`/abroad`)
  - [x] Task 35: Dedicated Multi-Entity Full-Text Search Page (`/search`)
  - [x] Task 36: Applicant Personal Cabinet (`/profile`) with live score gauge and target list
  - [x] Task 37: Unified User Authentication Modal (`components/AuthModal.tsx`) supporting Phone/SMS, Email, VK, Gosuslugi, Yandex
  - [x] Task 38: 10 Dedicated Subject Exam Prep Hubs (`/ege/[subject]`) with 2026 specifications
  - [x] Task 39: Applicant & Specialist Navigation Hubs (`/for-abiturients`, `/for-specialists`)
- [x] **R6: Compare & regression** — Visual, functional, and performance comparison (Lighthouse: 94 Perf, 96 A11y, 100 Best Practices, 100 SEO). 28 verification screenshots saved in `.pipeline/after/`.
- [x] **R7: Report & learn** — Final report, keep checklist, and project memory updated.

## Unresolved
*(None)*

## Change 2026-11-11: Full Portal Analysis & Polish Upgrades
- **Size**: M
- **Types**: feature, design, flow-bug, performance, content
- **Triage**:
  1. Add Global Toast Notification System in AppContext & UI, removing all raw `alert()` popups.
  2. Implement Mobile Bottom Navigation Bar (`components/MobileNav.tsx`) for instant thumb-friendly mobile UX.
  3. Expand Homepage Hero Search tabs to include "Школы" and "Курсы" and add the Educational Ecosystem Showcase section.
  4. Sync Global City Geolocation state across all catalogs (`/vuz`, `/colleges`, `/school`, `/events`).
  5. Refine Header navigation layout for seamless responsiveness across all screen breakpoints.
  6. Verify full build, 0 TypeScript errors, and zero regressions.
- [x] C1: Context & safety verified
- [x] C2: Baseline recorded
- [x] C3: Implementation plan
- [x] C4: Execute code upgrades
- [x] C5: UI stress & mobile testing
- [x] C6: Verification & regression screenshots
- [x] C7: Code review
- [x] C8: Changelog & wrap up

## Change 2026-11-11: Data Architecture, Honest Workspaces & Relational Foundation
- **Size**: M
- **Types**: feature, auth, content, flow-bug, bug
- **Triage**:
  1. Separate data modules (`reference`, `institutions`, `programs`, `careers`, `events`, `interestQuestions`) with clean re-exports and ID lookup utilities.
  2. Establish stable explicit ID relationships (Program -> Institution, Program <-> Career) with 0 string-guessing.
  3. Enrich Program information (entry rules, study mode/duration, curriculum with official vs illustrative flags, location, cost with period & currency, application destinations, evidence metadata).
  4. Typed saved entities (`SavedEntityRef` distinguishing institutions vs programs) and versioned local persistence (`WorkspaceV2`) with safe migration, recovery backup, and graceful corruption fallback.
  5. Replace fake SMS/password authentication with an explicit local guest workspace (`WorkspaceModal`).
  6. Eliminate false admission guarantees and cutoff-only probability claims; replace with factual historical 2024 threshold comparisons, producing "not enough data" when scores are missing.
  7. Shared validated student profile across `/profile`, `/admission-tracker`, and planning tools; distinguish unentered (null) from zero.
  8. Remove universal computing curriculum from unrelated degree programs.
  9. Honest form submission demo states with direct links to real institutional contacts.
  10. Automated data integrity verification suite (duplicate IDs, broken references, date/cost period validation).
- [x] C1: Context & safety verified
- [x] C2: Baseline recorded
- [x] C3: Implementation plan
- [x] C4: Execute code upgrades
- [x] C5: UI stress & mobile testing
- [x] C6: Verification & regression checks (0 errors, 53 static routes compiled, curl 200 OK)
- [x] C7: Code review & integrity audit (0 errors, 0 warnings across all entities)
- [x] C8: Changelog & wrap up (README & CHANGELOG updated)


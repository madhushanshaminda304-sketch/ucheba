# Changelog — Учёба.ру Full Portal Remake

All notable changes to this project are documented in this file.

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

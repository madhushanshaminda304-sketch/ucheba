# CONSTRAINTS.md - Quality Contract

## 1. Zero Tolerance
- 0 console errors or warnings on page load and interactive flows.
- 0 TypeScript compilation or type errors (`tsc --noEmit`).
- 0 broken links or non-functional navigation buttons.
- No deleted, skipped, or stubbed tests.

## 2. Accessibility & Standards
- WCAG 2.2 AA compliance across all components.
- Full keyboard navigability (Tab, Enter, Escape, Arrow keys).
- Clear visible focus states on all interactive elements.
- Semantic HTML structure: exactly one `<h1>` per page, appropriate `<nav>`, `<main>`, `<section>`, `<article>`, `<header>`, `<footer>`.
- Unique `<title>` and `<meta name="description">` per page.

## 3. Performance Budget
- Lighthouse Mobile Performance: ≥ 90 (Webapp ≥ 80).
- Lighthouse Accessibility: ≥ 95.
- Lighthouse Best Practices: ≥ 95.
- Lighthouse SEO: ≥ 95.
- Core Web Vitals:
  - Largest Contentful Paint (LCP) ≤ 2.5s.
  - Cumulative Layout Shift (CLS) ≤ 0.1.
  - Interaction to Next Paint (INP) ≤ 200ms.
- Initial JS Bundle: ≤ 200 KB gzipped.

## 4. Design & Typography
- No raw default browser system fonts or unstyled states.
- Consistent typography scale using modern clean font stack (`Inter`, `system-ui`, `sans-serif`).
- High-contrast accessible color palette (`#1e40af`, `#0f172a`, `#3b82f6`, `#f8fafc`).
- Responsive layout verified at 375px (mobile), 768px (tablet), and 1440px (desktop).

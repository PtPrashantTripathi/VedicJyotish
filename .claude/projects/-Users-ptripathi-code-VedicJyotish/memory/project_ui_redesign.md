---
name: project-ui-redesign
description:
    Status of the full website redesign — what's done, what CSS vars exist,
    which pages use the new theme
metadata:
    type: project
---

Full UI redesign completed across all pages. Design system uses CSS custom
properties defined in `src/style/global.css`.

**Design tokens:** `--c-primary: #D4480A`, `--c-maroon: #7D1B2E`,
`--c-gold: #C49A0A`, `--c-bg: #FDF6EC`, `--c-surface: #FFF`,
`--c-warm: #FFF8F0`, `--c-border: #E8D5C0`, `--c-border-s: #C8A88C`,
`--c-text: #1A1208`, `--c-text-2: #5C4033`, `--c-text-m: #8B7355`

**Completed redesigns:**

- `src/pages/Home/index.tsx` — saffron banner, card grid
- `src/pages/KundliResult/index.tsx` — maroon/saffron header, tabs,
  fmtDate/fmtTime
- `src/pages/KundliForm/index.tsx` — gradient header, saffron focus styles,
  `useLang()` i18n
- `src/pages/Panchang/index.tsx` — gradient header, saffron tabs (4 tabs), card
  redesign
- `src/pages/MonthlyCalendar/index.tsx` — gradient header, calendar grid with
  tithi on cells
- `src/pages/KundliMatching/index.tsx` — **complete rewrite** with full
  Ashtakoot backend
- `src/pages/Settings/index.tsx` — language select wired to
  `session.storageValues.language`
- `src/components/base/FormInput.tsx` — saffron focus ring via onFocus/onBlur
  inline style
- `src/components/Navigation.tsx` — 6-item bottom nav (MonthlyCalendar added)
- `src/components/Header.tsx` — maroon gradient, ॐ badge
- `src/components/Footer.tsx` — returns null (replaced by bottom nav)
- `src/components/VimsottariDasa.tsx` — 3-level Maha→Antar→Pratyantar accordion

**New files:**

- `src/i18n/index.ts` — `useLang()` hook, reads
  `session.storageValues.language`, returns `t(key)` for Hindi/English
- `src/utils/formatDate.ts` — `fmtDate`, `fmtTime`, `fmtDateTime`,
  `fmtDuration`, `fmtDateRange`
- `src/services/calcAshtakoot/index.ts` — full 8-koot Ashtakoot Guna Milap (36
  pts)

**Why:** User requested Android app-like UI inspired by AstroSage, traditional
Indian aesthetic. All pages now use the same saffron/maroon/cream palette.

**How to apply:** Always use CSS custom properties (var(--c-primary) etc.)
instead of Tailwind color classes for new UI. Use `useLang()` from
`src/i18n/index.ts` for bilingual text.

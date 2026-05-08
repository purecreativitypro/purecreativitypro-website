# Website Polish Playbook — Phases 4–6

> A reusable checklist and implementation guide for taking any website from "functional" to "premium." Apply these phases after your core pages and routing are built.

---

## Phase 4: UI/UX Polish

### 4.1 Page Transitions
- [ ] Add route-based page transitions (fade, slide, or crossfade)
- [ ] Use `AnimatePresence` (Framer Motion) or CSS transitions around `<Routes>`
- [ ] Ensure transitions don't break scroll position (reset to top on navigation)

```tsx
// React Router + Framer Motion pattern
<AnimatePresence mode="wait">
  <Routes location={location} key={location.pathname}>
    <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
  </Routes>
</AnimatePresence>
```

### 4.2 Scroll-Triggered Animations
- [ ] Create a reusable `ScrollReveal` component using `whileInView` (Framer Motion)
- [ ] Support props: `direction`, `delay`, `distance`, `blur`, `scale`, `threshold`
- [ ] Respect `prefers-reduced-motion` via `useReducedMotion()`
- [ ] Wrap key elements: section headings, card grids, CTAs, testimonials
- [ ] Use staggered delays for card groups (`delay={i * 0.1}`)

```tsx
// ScrollReveal usage
<ScrollReveal direction="up" distance={30} blur={4}>
  <h2>Section Heading</h2>
</ScrollReveal>

// Staggered cards
{items.map((item, i) => (
  <ScrollReveal key={i} direction="left" delay={i * 0.12}>
    <Card {...item} />
  </ScrollReveal>
))}
```

### 4.3 Mobile Navigation
- [ ] Hamburger menu with smooth open/close animation
- [ ] Full-screen overlay on mobile (not a tiny dropdown)
- [ ] Body scroll lock when menu is open
- [ ] Close on navigation (link click)
- [ ] `aria-label` on toggle button

### 4.4 Scroll-to-Top
- [ ] Auto-scroll to top on route change
- [ ] Floating scroll-to-top button (appears after scrolling 300px+)
- [ ] Smooth scroll behavior

### 4.5 Footer
- [ ] Consistent footer across all pages
- [ ] Accept `theme` prop for per-page color theming
- [ ] Social links with hover effects
- [ ] Copyright with current year `new Date().getFullYear()`
- [ ] Navigation links to all pages

### 4.6 Micro-Interactions
- [ ] Hover effects on cards (border glow, scale, color shift)
- [ ] Button press feedback (`active:scale-95`)
- [ ] Link underline animations
- [ ] Loading states (skeleton screens or spinners)

---

## Phase 5: Analytics & Tracking

### 5.1 Firebase Analytics Setup
- [ ] Install Firebase SDK: `npm install firebase`
- [ ] Initialize Firebase in `lib/firebase.ts`
- [ ] Call `getAnalytics(app)` in the init file
- [ ] Add Firebase config from `firebase_get_sdk_config`

```ts
// lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = { /* from Firebase console */ };
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
```

### 5.2 Page View Tracking
- [ ] Create a `ScrollToTopNav` component that hooks into router
- [ ] Log `page_view` events on every route change
- [ ] Include page title and path in event data

```ts
import { logEvent } from 'firebase/analytics';
import { useLocation } from 'react-router-dom';

useEffect(() => {
  logEvent(analytics, 'page_view', {
    page_path: location.pathname,
    page_title: document.title,
  });
}, [location]);
```

### 5.3 Custom Event Tracking (Optional)
- [ ] CTA button clicks
- [ ] Form submissions
- [ ] External link clicks
- [ ] Scroll depth milestones (25%, 50%, 75%, 100%)

---

## Phase 6: Accessibility & Performance

### 6.1 Accessibility Checklist (WCAG AA)

#### Landmarks & Structure
- [ ] `<main id="main-content">` wrapping primary content
- [ ] `<nav>` for navigation with `aria-label`
- [ ] `<header>` and `<footer>` semantic elements
- [ ] Single `<h1>` per page with proper heading hierarchy (h1 → h2 → h3)
- [ ] `lang` attribute on `<html>` tag

#### Color & Contrast
- [ ] All text ≥ 4.5:1 contrast ratio against background (normal text)
- [ ] Large text (18px+ bold or 24px+ regular) ≥ 3:1
- [ ] Avoid `text-zinc-500` or lower on dark backgrounds → use `text-zinc-400` minimum
- [ ] Avoid `text-white/60` or lower opacity → use `text-zinc-300` or higher
- [ ] Test with Chrome DevTools → Rendering → "Emulate vision deficiencies"

#### Typography
- [ ] Minimum font size: 12px (ideally 14px+ for body text)
- [ ] Line height ≥ 1.5 for body text
- [ ] Sufficient letter spacing for readability

#### Images
- [ ] Descriptive `alt` text on all `<img>` elements
- [ ] Decorative images use `alt=""`
- [ ] Alt text should describe the content/context, not just "image of X"

#### Interactive Elements
- [ ] All buttons/links have accessible names
- [ ] `aria-label` on icon-only buttons
- [ ] Focus indicators visible (don't remove `outline`)
- [ ] Touch targets ≥ 44×44px on mobile

#### Forms (if applicable)
- [ ] Labels on all form inputs
- [ ] Error messages linked to fields via `aria-describedby`
- [ ] Required fields marked with `aria-required`

### 6.2 Performance Optimization

#### Font Loading
- [ ] Use `preconnect` for font CDNs
- [ ] Load Google Fonts with non-blocking pattern:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="preload" as="style"
  href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" />
<link rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
  media="print" onload="this.media='all'" />
<noscript>
  <link rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" />
</noscript>
```

#### Images
- [ ] Use `loading="lazy"` on below-fold images
- [ ] Specify `width` and `height` (or aspect-ratio) to prevent CLS
- [ ] Use modern formats (WebP/AVIF) where possible
- [ ] Responsive images with `srcSet` for different viewport sizes

#### JavaScript
- [ ] Code-split routes with `React.lazy()` + `Suspense`
- [ ] Tree-shake unused imports
- [ ] Analyze bundle with `npx vite-bundle-visualizer`

#### Build Config
- [ ] Tailwind `content` array scoped to source dirs only (NOT `./**/*`)
- [ ] Add `"type": "module"` to `package.json` if using ESM
- [ ] Enable gzip/brotli compression on hosting (Firebase does this automatically)

```js
// tailwind.config.js — CORRECT
content: [
  "./index.html",
  "./components/**/*.{js,ts,jsx,tsx}",
  "./pages/**/*.{js,ts,jsx,tsx}",
  "./App.tsx",
]

// WRONG — scans node_modules, 20x slower builds
content: ["./**/*.{js,ts,jsx,tsx}"]
```

#### DNS & CDN
- [ ] `dns-prefetch` for external domains
- [ ] `preconnect` for critical external resources

### 6.3 SEO Finalization

#### Meta Tags
- [ ] Unique `<title>` per page (50–60 chars)
- [ ] Unique `<meta name="description">` per page (150–160 chars)
- [ ] `<meta name="viewport">` with `width=device-width, initial-scale=1`
- [ ] Open Graph tags: `og:title`, `og:description`, `og:image`, `og:url`
- [ ] Twitter Card tags: `twitter:card`, `twitter:title`, `twitter:description`

#### Structured Data
- [ ] Organization schema on homepage
- [ ] Service schema on service pages
- [ ] FAQ schema on pages with Q&A sections
- [ ] Validate at: https://validator.schema.org/

#### Crawlability
- [ ] `sitemap.xml` in `/public` listing all pages
- [ ] `robots.txt` in `/public` with `Sitemap:` directive
- [ ] Canonical URLs on each page

```xml
<!-- public/sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.yourdomain.com/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- one <url> per page -->
</urlset>
```

```
# public/robots.txt
User-agent: *
Allow: /
Sitemap: https://www.yourdomain.com/sitemap.xml
```

---

## Verification

### Automated Testing
- [ ] Run Lighthouse via [PageSpeed Insights](https://pagespeed.web.dev/)
- [ ] Target scores: Performance ≥90, Accessibility ≥90, Best Practices ≥90, SEO ≥90
- [ ] Test both **Mobile** and **Desktop**
- [ ] Fix all "Errors" first, then "Warnings"

### Manual Checks
- [ ] Navigate all pages on mobile (check touch targets, text readability)
- [ ] Keyboard-only navigation (Tab through all interactive elements)
- [ ] Screen reader test (VoiceOver on Mac: Cmd+F5)
- [ ] Check sitemap.xml and robots.txt load at their URLs
- [ ] Verify Firebase Analytics events in Firebase Console → Analytics → DebugView

---

## Quick Reference: Common Fixes

| Issue | Fix |
|-------|-----|
| "Document does not have a main landmark" | Wrap routes in `<main id="main-content">` |
| "Background/foreground contrast insufficient" | Boost text to `zinc-400`+ on dark backgrounds |
| "Document has no `<h1>`" | Add an `<h1>` to every page |
| "Image elements do not have alt" | Add descriptive `alt` text |
| "Links do not have discernible name" | Add `aria-label` to icon-only links |
| Render-blocking Google Fonts | Use `media="print" onload` pattern |
| Slow Tailwind builds | Scope `content` array, exclude `node_modules` |
| Missing sitemap | Add `public/sitemap.xml` |

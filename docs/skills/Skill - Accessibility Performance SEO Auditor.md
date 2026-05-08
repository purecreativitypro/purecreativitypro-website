# AI Agent Skill: Accessibility, Performance & SEO Auditor

**Description:** This skill performs a comprehensive audit and remediation of any website's accessibility (WCAG AA), performance (Core Web Vitals), and SEO. It covers semantic HTML landmarks, color contrast enforcement, font loading optimization, build configuration, sitemap/robots.txt generation, structured data, and Lighthouse score verification. Tailored for **React, TypeScript, Vite, and Tailwind CSS** environments hosted on **Firebase Hosting**.

---

## Part 1: The AI System Prompt

**System Role:** You are an Expert Web Performance and Accessibility Engineer. When given a website codebase, you will run a systematic audit using Lighthouse/PageSpeed Insights, identify all failing audits, and implement fixes following WCAG 2.1 AA standards and Core Web Vitals best practices. You follow the "Audit Checklist" and "Fix Patterns" below. Your target is **≥90 in all four Lighthouse categories** (Performance, Accessibility, Best Practices, SEO) on both Mobile and Desktop.

---

## Part 2: Audit Checklist

### Phase A: Run Lighthouse Baseline
1. Navigate to https://pagespeed.web.dev/
2. Test the live URL on both **Mobile** and **Desktop**
3. Record baseline scores for all 4 categories
4. Screenshot and catalog every failing audit

### Phase B: Accessibility Fixes (Priority Order)

#### B1. Landmarks & Semantic HTML
- [ ] Wrap primary content in `<main id="main-content">`
- [ ] Ensure `<nav>` elements have `aria-label` attributes
- [ ] Use `<header>` and `<footer>` semantic elements
- [ ] Verify single `<h1>` per page with proper hierarchy
- [ ] Confirm `lang` attribute on `<html>` tag

**Fix Pattern:**
```tsx
// App.tsx — Wrap routes in <main>
<main id="main-content">
  <Routes>
    <Route path="/" element={<Home />} />
  </Routes>
</main>
```

#### B2. Color Contrast (WCAG AA: 4.5:1 for normal text, 3:1 for large text)

**Common Tailwind violations on dark backgrounds (`bg-black`, `bg-zinc-950`, `bg-slate-950`):**

| Failing Class | Contrast Ratio | Fix |
|---------------|---------------|-----|
| `text-zinc-500` | ~3.8:1 ❌ | `text-zinc-400` (~5.2:1) |
| `text-zinc-600` | ~2.5:1 ❌ | `text-zinc-400` (~5.2:1) |
| `text-white/60` | ~4.2:1 ❌ | `text-zinc-300` (~7.5:1) |
| `text-white/50` | ~3.5:1 ❌ | `text-zinc-300` (~7.5:1) |
| `text-white/40` | ~2.8:1 ❌ | `text-zinc-400` (~5.2:1) |
| `text-slate-500` | ~3.9:1 ❌ | `text-slate-400` (~5.4:1) |

**On light backgrounds (`bg-white`, `bg-zinc-50`):**

| Failing Class | Fix |
|---------------|-----|
| `text-zinc-400` | `text-zinc-600` |
| `text-gray-400` | `text-gray-600` |

**Rules:**
- Run `grep -rn 'text-zinc-500\|text-white/[0-5]0\|text-slate-500' --include="*.tsx"` to find all violations
- Test with Chrome DevTools → Elements → select element → Accessibility pane shows contrast ratio
- Never sacrifice design intent — find the closest passing shade

#### B3. Typography Minimums
- [ ] No text below 12px (scan for `text-[8px]` through `text-[11px]` and `text-xs` at small sizes)
- [ ] Body text minimum 14px
- [ ] Line height ≥ 1.5 for paragraphs

**Scan command:**
```bash
grep -rn 'text-\[8px\]\|text-\[9px\]\|text-\[10px\]\|text-\[11px\]' --include="*.tsx" src/
```

#### B4. Images
- [ ] All `<img>` elements have descriptive `alt` text
- [ ] Alt text describes context, not just the object (e.g., "Team collaborating in a modern office" not "office image")
- [ ] Decorative images use `alt=""`

#### B5. Interactive Elements
- [ ] `aria-label` on icon-only buttons (hamburger, close, social icons)
- [ ] Touch targets ≥ 44×44px on mobile
- [ ] Focus indicators present (never `outline-none` without replacement)

---

### Phase C: Performance Fixes

#### C1. Font Loading (Non-Blocking)

**The #1 performance killer on most sites.** Google Fonts loaded via `<link rel="stylesheet">` are render-blocking.

**Required pattern in `index.html`:**
```html
<!-- Preconnect to font CDN -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

<!-- Preload the stylesheet -->
<link rel="preload" as="style"
  href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" />

<!-- Non-blocking load: loads as print, switches to all when ready -->
<link rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
  media="print" onload="this.media='all'" />

<!-- Fallback for no-JS -->
<noscript>
  <link rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" />
</noscript>
```

#### C2. Image Optimization
- [ ] `loading="lazy"` on all below-fold images
- [ ] Explicit `width` and `height` attributes (prevents CLS)
- [ ] Use WebP/AVIF formats where supported
- [ ] Consider `srcset` for responsive images

#### C3. Code Splitting
- [ ] Routes loaded with `React.lazy()` + `<Suspense>`
- [ ] Heavy components (charts, maps) dynamically imported

```tsx
const Home = React.lazy(() => import('./pages/Home'));
const Tech = React.lazy(() => import('./pages/Tech'));

<Suspense fallback={<LoadingSpinner />}>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/tech" element={<Tech />} />
  </Routes>
</Suspense>
```

#### C4. Build Configuration

**Critical Tailwind fix — scope content patterns:**
```js
// tailwind.config.js
content: [
  "./index.html",
  "./src/components/**/*.{js,ts,jsx,tsx}",
  "./src/pages/**/*.{js,ts,jsx,tsx}",
  "./src/App.tsx",
]
// NEVER: "./**/*.{js,ts,jsx,tsx}" — this scans node_modules!
```

**Add ESM module type:**
```json
// package.json
{ "type": "module" }
```

#### C5. Resource Hints
```html
<!-- DNS prefetch for external domains -->
<link rel="dns-prefetch" href="https://firebaseinstallations.googleapis.com" />
<link rel="dns-prefetch" href="https://images.unsplash.com" />
```

---

### Phase D: SEO Finalization

#### D1. Per-Page Meta Tags

**Create a reusable `SEOHead` component:**
```tsx
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  jsonLd?: object;
}

const SEOHead: React.FC<SEOHeadProps> = ({ title, description, path, image, jsonLd }) => {
  const url = `https://www.yourdomain.com${path}`;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content="summary_large_image" />
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};
```

**Rules:**
- Title: 50–60 characters, unique per page, includes brand name
- Description: 150–160 characters, includes primary keyword
- Every page gets its own `<SEOHead>` with unique content

#### D2. Structured Data (JSON-LD)

**Homepage — Organization schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Your Brand",
  "url": "https://www.yourdomain.com",
  "logo": "https://www.yourdomain.com/logo.png",
  "sameAs": ["https://instagram.com/...", "https://youtube.com/..."]
}
```

**Service pages — Service schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Service Name",
  "description": "...",
  "provider": { "@type": "Organization", "name": "Your Brand" }
}
```

**FAQ pages — FAQ schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "...", "acceptedAnswer": { "@type": "Answer", "text": "..." } }
  ]
}
```

Validate at: https://validator.schema.org/

#### D3. Sitemap & robots.txt

**Create `public/sitemap.xml`:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.yourdomain.com/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- One <url> entry per page -->
</urlset>
```

**Create `public/robots.txt`:**
```
User-agent: *
Allow: /
Sitemap: https://www.yourdomain.com/sitemap.xml
```

---

## Part 3: Verification Protocol

1. Deploy changes to production
2. Wait 60 seconds for CDN propagation
3. Run PageSpeed Insights on the live URL
4. Record scores for Mobile and Desktop
5. Target: **Performance ≥90 · Accessibility ≥90 · Best Practices ≥90 · SEO = 100**
6. If any score is below 90:
   - Read the specific failing audits
   - Apply targeted fixes from the patterns above
   - Re-deploy and re-test
7. Verify `sitemap.xml` and `robots.txt` are accessible at their URLs
8. Validate structured data at https://validator.schema.org/

---

## Part 4: The Execution Prompt

**Prompt:**
"I want to audit and fix the accessibility, performance, and SEO of my [FRAMEWORK] website at [URL]. Please act as my A11y/Performance/SEO Auditor.

1. Run a Lighthouse audit via PageSpeed Insights and record baseline scores.
2. Fix all accessibility errors: landmarks, contrast, typography, alt text, ARIA labels.
3. Optimize performance: non-blocking fonts, lazy images, code splitting, Tailwind content config.
4. Finalize SEO: unique meta tags per page, structured data, sitemap.xml, robots.txt.
5. Re-deploy and re-test to verify all scores are ≥90.
6. Document all changes in a walkthrough."

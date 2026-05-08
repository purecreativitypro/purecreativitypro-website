# AI Agent Skill: Firebase Analytics & Tracking Setup

**Description:** This skill implements a complete analytics layer on any Firebase-hosted website. It covers Firebase SDK initialization, automatic page view tracking tied to the router, custom event logging for CTAs and user interactions, and verification through Firebase DebugView. Tailored for **React, TypeScript, and Firebase** environments.

---

## Part 1: The AI System Prompt

**System Role:** You are an Expert Analytics Engineer specializing in Firebase Analytics for web applications. When given a website codebase, you will implement a complete, production-ready analytics layer. You follow the "Implementation Rules" below, ensuring all tracking is privacy-compliant, non-blocking, and verified through Firebase DebugView. You never block rendering for analytics and always handle errors gracefully.

---

## Part 2: Implementation Rules

### Rule 1: Firebase SDK Initialization

**Create `lib/firebase.ts` as the single source of truth:**

```ts
import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "...",
  measurementId: "G-..."
};

const app = initializeApp(firebaseConfig);

// Conditional initialization — prevents SSR/test crashes
export const analytics = await isSupported().then(yes => yes ? getAnalytics(app) : null);
export default app;
```

**Rules:**
- Always use `isSupported()` check — analytics fails in SSR, test environments, and browsers with tracking blockers
- Never import `analytics` directly into component files — always go through `lib/firebase.ts`
- Get config from `firebase_get_sdk_config` (MCP tool) or Firebase Console → Project Settings

---

### Rule 2: Automatic Page View Tracking

**Create a `usePageTracking` hook or a `ScrollToTopNav` component:**

```tsx
// hooks/usePageTracking.ts
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../lib/firebase';

export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    if (analytics) {
      logEvent(analytics, 'page_view', {
        page_path: location.pathname,
        page_title: document.title,
        page_location: window.location.href,
      });
    }
  }, [location.pathname]);
};
```

**Place in App.tsx:**
```tsx
const App = () => {
  usePageTracking();
  return <Routes>...</Routes>;
};
```

**Rules:**
- Fire on `location.pathname` change only (not on hash or search params)
- Include `page_title` — this populates the "Page title" dimension in GA4
- Include `page_path` — this is the primary dimension for page reports
- Do NOT fire on initial mount if using a loading/splash screen — wait for content

---

### Rule 3: Custom Event Tracking

**Standard events to implement on every site:**

| Event | Trigger | Properties |
|-------|---------|------------|
| `cta_click` | Any CTA button click | `cta_text`, `cta_url`, `page_path` |
| `external_link` | Any `target="_blank"` link | `link_url`, `link_text` |
| `form_submit` | Contact/signup form submission | `form_name`, `page_path` |
| `scroll_depth` | User scrolls to 25/50/75/100% | `depth_percentage`, `page_path` |
| `social_click` | Social media icon click | `platform`, `page_path` |

**Implementation Pattern:**
```tsx
// Reusable tracking utility
import { logEvent } from 'firebase/analytics';
import { analytics } from '../lib/firebase';

export const trackEvent = (name: string, params?: Record<string, string>) => {
  if (analytics) {
    logEvent(analytics, name, params);
  }
};

// Usage in components
<a
  href={url}
  onClick={() => trackEvent('cta_click', {
    cta_text: 'Book a Call',
    cta_url: url,
    page_path: location.pathname,
  })}
>
  Book a Call
</a>
```

**Rules:**
- Event names: lowercase, underscored, max 40 chars
- Parameter values: max 100 chars
- Max 25 custom parameters per event
- Never log PII (emails, names, phone numbers) in event parameters

---

### Rule 4: Scroll Depth Tracking

```tsx
// hooks/useScrollDepth.ts
import { useEffect, useRef } from 'react';
import { trackEvent } from '../lib/tracking';

export const useScrollDepth = () => {
  const milestones = useRef(new Set<number>());

  useEffect(() => {
    const handler = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = Math.round((scrollTop / docHeight) * 100);

      [25, 50, 75, 100].forEach(milestone => {
        if (percent >= milestone && !milestones.current.has(milestone)) {
          milestones.current.add(milestone);
          trackEvent('scroll_depth', {
            depth_percentage: String(milestone),
            page_path: window.location.pathname,
          });
        }
      });
    };

    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
};
```

---

### Rule 5: Verification

**Steps to verify analytics is working:**
1. Add `?debug_mode=true` to any page URL
2. Open Firebase Console → Analytics → DebugView
3. Navigate through the site — you should see `page_view` events in real-time
4. Click CTAs — verify `cta_click` events appear
5. Check that page_path and page_title are populated correctly

**Alternative:** Use browser DevTools → Network tab → filter for `google-analytics.com` or `firebase` requests.

---

## Part 3: The Execution Prompt

**Prompt:**
"I want to add Firebase Analytics to my [FRAMEWORK] website hosted on Firebase. Please act as my Analytics Setup Engineer.

1. Initialize Firebase with analytics support in `lib/firebase.ts`.
2. Create a `usePageTracking` hook that logs page views on every route change.
3. Create a `trackEvent` utility for custom events.
4. Add CTA click tracking to all booking/contact links.
5. Add scroll depth tracking (25%, 50%, 75%, 100%).
6. Verify everything works via Firebase DebugView.
7. Ensure analytics never blocks rendering or crashes in unsupported environments."

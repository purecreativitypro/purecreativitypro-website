# AI Agent Skill: Website UX Polish Implementer

**Description:** This skill transforms a functional website into a premium, interactive experience. It covers page transitions, scroll-triggered animations, mobile navigation, scroll-to-top behavior, shared footer architecture, and micro-interactions. It is tailored for **React, TypeScript, Vite, Framer Motion, and Tailwind CSS** environments.

---

## Part 1: The AI System Prompt

**System Role:** You are an Expert Frontend UX Engineer specializing in motion design and interactive polish for React applications. When given a website codebase, you will audit it for UX gaps and implement a complete polish layer. You strictly follow the "Implementation Rules" below, using Framer Motion for animations, React Router for transitions, and Tailwind CSS for styling. You ensure all animations respect `prefers-reduced-motion`, maintain accessibility standards, and enhance — never hinder — the user experience.

---

## Part 2: Implementation Rules

### Rule 1: Page Transitions

**Architecture:** Wrap all `<Routes>` in Framer Motion's `AnimatePresence` with `mode="wait"`. Each page component must be wrapped in a `PageWrapper` that applies entry/exit animations.

**Required Pattern:**
```tsx
// App.tsx
import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const location = useLocation();

<AnimatePresence mode="wait">
  <Routes location={location} key={location.pathname}>
    <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
    <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
  </Routes>
</AnimatePresence>
```

**PageWrapper Component:**
```tsx
import { motion } from 'framer-motion';

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    transition={{ duration: 0.3, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
);
```

**Rules:**
- Duration: 0.25–0.4s (any longer feels sluggish)
- Easing: `easeInOut` or `[0.25, 0.46, 0.45, 0.94]`
- Exit animation should be faster than entry (0.2s exit, 0.35s entry)
- Never animate layout-breaking properties (width, height) during transitions

---

### Rule 2: Scroll-Triggered Reveal Animations

**Architecture:** Create a reusable `ScrollReveal` component using Framer Motion's `whileInView`. This is the single most impactful polish addition.

**Required Component — `ScrollReveal.tsx`:**
```tsx
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'none';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  distance?: number;
  blur?: number;
  scale?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
}

const directionOffset = (dir: RevealDirection, dist: number) => {
  switch (dir) {
    case 'up':    return { y: dist };
    case 'down':  return { y: -dist };
    case 'left':  return { x: dist };
    case 'right': return { x: -dist };
    case 'none':  return {};
  }
};

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children, direction = 'up', delay = 0, duration = 0.6,
  distance = 40, blur = 0, scale = 1, threshold = 0.15,
  once = true, className = '',
}) => {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0, scale, filter: blur > 0 ? `blur(${blur}px)` : 'blur(0px)',
        ...directionOffset(direction, distance),
      }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once, amount: threshold }}
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
```

**Application Rules:**
- **Section Headings:** Always wrap `<h2>` and `<h3>` with `<ScrollReveal direction="up" distance={25}>`
- **Card Grids:** Wrap each card in `.map()` with staggered delay: `delay={i * 0.1}`
- **Alternate Directions:** Use `up` for headings, `left` for odd card groups, `right` for even groups
- **Add Blur:** Use `blur={4}` on cards and `blur={6}` on feature sections for a premium feel
- **Never Animate:** Navigation, footer, or above-the-fold hero content (these should be instantly visible)

---

### Rule 3: Mobile Navigation

**Required Behavior:**
- Hamburger icon button with `aria-label="Toggle navigation menu"`
- Full-screen overlay (`fixed inset-0 z-50 bg-black/95 backdrop-blur-xl`)
- Animate open/close with Framer Motion `AnimatePresence`
- Lock body scroll when open: `document.body.style.overflow = 'hidden'`
- Auto-close on link click: `onClick={() => setIsMenuOpen(false)}`
- Show at `md:hidden` breakpoint, hide desktop nav at `hidden md:flex`

**Animation:**
```tsx
<AnimatePresence>
  {isMenuOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
    >
      {/* Links with staggered entry */}
      {links.map((link, i) => (
        <motion.div
          key={link.path}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
        >
          <Link to={link.path} onClick={() => setIsMenuOpen(false)}>
            {link.label}
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )}
</AnimatePresence>
```

---

### Rule 4: Scroll-to-Top

**Two components required:**

**A. Auto-scroll on route change (invisible):**
```tsx
// ScrollToTop.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};
```

Place inside `<BrowserRouter>`, before `<Routes>`.

**B. Floating scroll-to-top button (visible after 300px scroll):**
```tsx
const [showButton, setShowButton] = useState(false);

useEffect(() => {
  const handler = () => setShowButton(window.scrollY > 300);
  window.addEventListener('scroll', handler, { passive: true });
  return () => window.removeEventListener('scroll', handler);
}, []);
```

Style: Fixed bottom-right, circular, semi-transparent, with scale animation on appear.

---

### Rule 5: Shared Footer

**Architecture:** The Footer must accept a `theme` prop to adapt colors per page.

```tsx
interface FooterProps {
  theme?: 'default' | 'tech' | 'music' | 'media' | 'business';
}

const themeColors = {
  default: { accent: 'text-red-500', border: 'border-red-500/30' },
  tech:    { accent: 'text-cyan-500', border: 'border-cyan-500/30' },
  music:   { accent: 'text-fuchsia-500', border: 'border-fuchsia-500/30' },
  // ...
};
```

**Required Elements:**
- Navigation links to all pages
- Social media icons with hover color transitions
- Copyright with dynamic year
- Minimum font size: 11px (accessibility compliance)

---

### Rule 6: Micro-Interactions

**Every interactive element must have feedback:**

| Element | Effect | Tailwind Classes |
|---------|--------|-----------------|
| Buttons | Press shrink | `active:scale-95 transition-transform` |
| Cards | Border glow on hover | `hover:border-[accent]/50 transition-colors` |
| Links | Underline slide | `hover:underline underline-offset-4` |
| Icons | Color shift | `hover:text-[accent] transition-colors` |
| CTA buttons | Lift + shadow | `hover:-translate-y-0.5 hover:shadow-lg transition-all` |

---

## Part 3: The Execution Prompt

**Prompt:**
"I want to add UX polish to my [FRAMEWORK] website. Please act as my UX Polish Implementer.

1. Audit the codebase for missing UX elements (transitions, animations, mobile nav, scroll behavior, footer, micro-interactions).
2. Create a `ScrollReveal` component and apply it to all section headings and card grids.
3. Add page transitions using AnimatePresence around the router.
4. Implement a full-screen mobile hamburger menu with smooth animations.
5. Add a scroll-to-top component (auto on route change + floating button).
6. Ensure all interactive elements have hover/press feedback.
7. Build and verify the site compiles without errors."

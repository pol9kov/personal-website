# Component Documentation

Complete guide to all components in the portfolio website.

## Component Architecture

This project follows a component-based architecture with clear separation of concerns:

```
components/
├── ui/            # Reusable UI primitives
├── sections/      # Page-specific sections
├── shared/        # Layout components
└── case-studies/  # Case studies specific components
```

## Design Principles

1. **Server Components First** - Default to Server Components for performance
2. **Client Components Only When Needed** - Use `'use client'` only for interactivity
3. **Composition Over Inheritance** - Build complex UIs from simple components
4. **Props Interface** - Always export TypeScript interfaces for props

---

## UI Components (`components/ui/`)

### Button

**Location:** `components/ui/Button.tsx`

**Type:** Server Component

**Purpose:** Reusable button with multiple variants

**Props:**
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}
```

**Variants:**
- `primary` - Blue solid background
- `secondary` - Gray outline
- `outline` - Transparent with border

**Usage:**
```tsx
<Button variant="primary" size="lg">
  Get Started
</Button>
```

**Dark Mode:** Fully supported with `dark:` variants

---

## Section Components (`components/sections/`)

### Hero

**Location:** `components/sections/Hero.tsx`

**Type:** Server Component

**Purpose:** Landing page main section with profile photo and gradient name

**Features:**
- Profile photo with responsive sizing
- Gradient text for name (blue → cyan)
- Inline CSS styles for cross-browser gradient support
- Functional CTA buttons linking to GitHub and Telegram
- Responsive layout (stacked on mobile, horizontal on desktop)

**Key Implementation Details:**

```tsx
// Gradient text uses inline styles for browser compatibility
<h2
  className="text-4xl font-bold sm:text-5xl md:text-6xl"
  style={{
    background: 'linear-gradient(to right, rgb(37, 99, 235), rgb(6, 182, 212))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    display: 'inline-block',
    paddingBottom: '8px',
    lineHeight: '1.3'
  }}
>
  Egor Polyakov
</h2>
```

**Technical Notes:**
- `paddingBottom: '8px'` prevents descender clipping (g, y letters)
- `lineHeight: '1.3'` ensures proper text spacing
- `display: 'inline-block'` required for gradient to work correctly
- Profile photo uses Next.js Image with `priority` flag for LCP optimization

**Dark Mode:** Background transitions from `white` to `gray-950`

---

## Shared Components (`components/shared/`)

### Header

**Location:** `components/shared/Header.tsx`

**Type:** Client Component (`'use client'`)

**Purpose:** Main navigation with theme toggle

**Features:**
- Sticky navigation
- Theme toggle button
- Mobile-responsive menu
- Logo with brand gradient

**Dark Mode:** Fully integrated with global theme context

### Footer

**Location:** `components/shared/Footer.tsx`

**Type:** Server Component

**Purpose:** Site footer with social links

**Recent Changes:**
- Updated Contact link styling for consistency
- Changed from `font-semibold text-gray-900 dark:text-white` to `text-gray-600 dark:text-gray-400`
- All links now have uniform styling

**Usage:**
```tsx
<Footer />
```

---

## Case Studies Components (`components/case-studies/`)

### CaseStudyCard

**Location:** `components/case-studies/CaseStudyCard.tsx`

**Type:** Client Component (`'use client'`)

**Purpose:** Interactive card for case study listings with GitHub link

**Why Client Component?**
The onClick handler for the GitHub icon requires client-side interactivity. This was extracted from the Server Component page to properly handle event handlers in Next.js App Router.

**Props:**
```typescript
interface CaseStudyCardProps {
  study: CaseStudy;
}
```

**Features:**
- Clickable card linking to case study detail page
- GitHub icon button (stops propagation to prevent card click)
- Tag display
- Hover effects

**Key Implementation:**
```tsx
// GitHub icon with onClick to stop propagation
<a
  href={study.githubUrl}
  target="_blank"
  rel="noopener noreferrer"
  onClick={(e) => e.stopPropagation()}
  className="..."
>
  {/* GitHub SVG icon */}
</a>
```

**Dark Mode:** Full support with hover state transitions

**Migration Note:**
Previously this logic was inline in `app/case-studies/page.tsx` as a Server Component, which caused runtime errors with event handlers. Now properly separated as a Client Component.

---

## Component Patterns

### Server vs Client Components

**Use Server Component when:**
- No interactivity needed
- Fetching data
- Accessing backend resources
- SEO-critical content

**Use Client Component when:**
- Using hooks (useState, useEffect, etc.)
- Event handlers (onClick, onChange, etc.)
- Browser APIs (localStorage, window, etc.)
- Third-party interactive libraries

**Example - Server Component:**
```tsx
// components/sections/Hero.tsx
export function Hero({ className }: HeroProps) {
  return <section>...</section>;
}
```

**Example - Client Component:**
```tsx
// components/case-studies/CaseStudyCard.tsx
'use client';

export function CaseStudyCard({ study }: CaseStudyCardProps) {
  return (
    <Link onClick={(e) => /* client-side handler */}>
      ...
    </Link>
  );
}
```

### Props Interface Pattern

All components export their props interface:

```tsx
export interface ComponentNameProps {
  // Required props
  title: string;

  // Optional props
  className?: string;
  variant?: 'primary' | 'secondary';
}

export function ComponentName({ title, className, variant = 'primary' }: ComponentNameProps) {
  // ...
}
```

### Styling Pattern

Components use Tailwind CSS with the `cn()` utility for conditional classes:

```tsx
import { cn } from "@/lib/utils/cn";

<div className={cn(
  "base classes",
  "dark:dark-mode-classes",
  variant === 'primary' && "variant-specific-classes",
  className
)}>
```

### Dark Mode Pattern

All components support dark mode using Tailwind's `dark:` prefix:

```tsx
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
```

---

## Testing Components

Components are tested through E2E tests focusing on:
- Visual appearance in light/dark modes
- User interactions
- Responsive behavior

See [TESTING-STRATEGY.md](./TESTING-STRATEGY.md) for details.

---

## Adding New Components

When creating a new component:

1. **Choose location:**
   - `ui/` for reusable primitives
   - `sections/` for page-specific sections
   - `shared/` for layout components
   - Create new category if needed

2. **Create component file:**
   ```tsx
   // components/ui/NewComponent.tsx
   export interface NewComponentProps {
     // props definition
   }

   export function NewComponent({ ...props }: NewComponentProps) {
     // implementation
   }
   ```

3. **Add to index (if in ui/):**
   ```tsx
   // components/ui/index.ts
   export * from './NewComponent';
   ```

4. **Document here:**
   - Add section to this file
   - Include props interface
   - Explain design decisions
   - Show usage examples

5. **Write tests:**
   - Add E2E test if component has interactions
   - Test dark mode variants

---

## Changelog

### 2025-11-27
- **Hero:** Added gradient text styling with inline CSS for cross-browser support
- **Hero:** Added profile photo with responsive sizing
- **Hero:** Made CTA buttons functional with real links
- **CaseStudyCard:** Created new Client Component for case study cards
- **CaseStudyCard:** Extracted from `app/case-studies/page.tsx` to properly handle onClick events
- **Footer:** Updated Contact link styling for consistency

### 2025-11-13
- Initial component documentation created
- Documented all existing components
- Established component patterns

---

**Last Updated:** 2025-11-27
**Maintained by:** Project contributors

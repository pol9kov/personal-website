# Architecture Overview

## High-Level Design

This portfolio uses Next.js 15 App Router with a component-based architecture optimized for performance and developer experience.

```
┌─────────────────────────────────────┐
│          app/ (App Router)          │
│  ┌─────────────────────────────┐   │
│  │  Server Components (default)│   │
│  │  - Static content           │   │
│  │  - SEO metadata             │   │
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │  Client Components          │   │
│  │  - Animations (Framer)      │   │
│  │  - Interactive elements     │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│      components/ (UI Library)       │
│  ├── ui/        Primitives          │
│  ├── sections/  Page blocks         │
│  └── shared/    Layout              │
└─────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│      lib/ (Utils & Types)           │
│  - TypeScript types                 │
│  - Helper functions                 │
│  - Constants                        │
└─────────────────────────────────────┘
```

## Codemap: Where's the Thing That Does X?

**Q: Where's routing?**
A: `app/` directory (App Router convention)

**Q: Where's the Hero section?**
A: `components/sections/Hero.tsx`

**Q: Where are reusable UI components?**
A: `components/ui/` (Button, Card, etc.)

**Q: Where are TypeScript types?**
A: `lib/types.ts`

**Q: Where's styling configuration?**
A: `tailwind.config.ts`

## Key Architecture Decisions

### 1. Server Components by Default

**Decision:** All components are Server Components unless they need interactivity.

**Why:**

- Reduces JS bundle size (target: <100KB vs 200KB+ with Client Components)
- Faster initial page load
- Better SEO (fully rendered HTML)

**Trade-off:** More explicit `'use client'` directives needed

**Example:**

```typescript
// ✅ Server Component (default)
export default async function ProjectsSection() {
  const projects = await fetchProjects()
  return <ProjectsList projects={projects} />
}

// ✅ Client Component (explicit)
'use client'
export function AnimatedHero() {
  return <motion.div>...</motion.div>
}
```

### 2. Colocation of Components

**Decision:** Components live next to where they're used.

**Why:**

- Easier to find related code
- Clear ownership
- Reduces cognitive load

**Structure:**

```
app/
  page.tsx              # Homepage
  about/
    page.tsx           # About page
    _components/       # About-specific components
      Timeline.tsx
components/
  sections/            # Shared across pages
    Hero.tsx
  ui/                  # Primitives
    Button.tsx
```

### 3. Image Optimization Strategy

**Decision:** All images use `next/image` with WebP format.

**Why:**

- Automatic responsive images
- Lazy loading out of the box
- WebP reduces size by ~30%

**Implementation:**

```typescript
<Image
  src="/hero.jpg"
  alt="Hero background"
  width={1920}
  height={1080}
  priority // Only for above-fold images
  placeholder="blur"
/>
```

**Target Impact:** LCP <2.5s

## Component Patterns

### Composition Pattern

```typescript
// Flexible, composable components
<Card>
  <Card.Header>
    <Card.Title>Project Name</Card.Title>
  </Card.Header>
  <Card.Content>Description</Card.Content>
</Card>
```

### Props Interface Pattern

```typescript
// Always explicit interfaces
interface ButtonProps {
  variant: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  children: React.ReactNode;
}

export function Button({ variant, size = "md", ...props }: ButtonProps) {
  // Implementation
}
```

## Performance Budget

- **First Load JS:** <100KB
- **Total Bundle:** <500KB
- **LCP:** <2.5s
- **FID:** <100ms
- **CLS:** <0.1

## Future Architecture Considerations

- **Blog System:** Plan to add MDX support for blog posts
- **CMS Integration:** Considering Notion API for content management
- **i18n:** May add internationalization later

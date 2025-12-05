# Personal Website

<div align="center">

### 🌐 **[View Live Site →](https://egor-polyakov.vercel.app)**

[![Live Demo](https://img.shields.io/badge/Live_Demo-egor--polyakov.vercel.app-blue?style=for-the-badge&logo=vercel)](https://egor-polyakov.vercel.app)

*Visit the live site*

---

</div>

Personal website / landing page built with Next.js 15, showcasing technical skills through code quality and architectural decisions.

## 🎯 Project Goals

This isn't just a landing page—it's a demonstration of:

- Production-ready code architecture
- Performance optimization (Lighthouse 95+)
- Accessibility compliance (WCAG 2.1 AA)
- Modern React patterns (Server Components)
- Professional Git workflow

## 🛠️ Tech Stack & Rationale

### Next.js 15

**Why:** Latest App Router, Server Components for performance, built-in optimizations

**Alternatives considered:**

- Astro (rejected - less interactive, smaller ecosystem)
- Remix (rejected - smaller community, less tooling)

### TypeScript (strict mode)

**Why:** Type safety prevents runtime errors, better IDE support

### Tailwind CSS

**Why:** Rapid development, consistent design system, small bundle

**Alternatives considered:**

- CSS Modules (rejected - more boilerplate)
- Styled Components (rejected - runtime cost)

### Framer Motion

**Why:** Declarative animations, performance-optimized, great DX

### next-intl

**Why:** Server-component-first i18n, type-safe translations

### Vercel Analytics

**Why:** Zero-config analytics, no performance impact, GDPR-compliant

## 🌍 Features

### Internationalization

- Full Russian and English support
- Language preference saved to cookie
- Locale-aware Open Graph images

### Analytics & Tracking

- Vercel Analytics integration
- UTM short links for tracking traffic sources:
  - `/go/telegram`, `/go/linkedin`, `/go/twitter`
  - `/go/email`, `/go/resume`, `/go/hh`

## 📊 Performance Metrics

Target metrics:

- **Lighthouse Score:** ≥95 (mobile + desktop)
- **First Contentful Paint:** <1.5s
- **Time to Interactive:** <2.5s
- **Bundle Size:** <100KB (first load JS)

## 🏗️ Architecture Decisions

### Why Server Components by default?

Most portfolio content is static. Server Components reduce JS bundle and improve initial load time.

### Why ISR for dynamic content?

Content changes rarely but needs freshness. ISR provides best balance between performance and updates.

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed technical architecture.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
app/              # Next.js App Router
components/
  ├── ui/        # Reusable components (Button, Card)
  ├── sections/  # Page sections (Hero, Projects)
  └── shared/    # Layout components (Header, Footer)
lib/             # Utilities, types, constants
```

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed codemap.

## 📖 Documentation

- **[Changelog](./CHANGELOG.md)** - Version history and release notes
- **[Roadmap](./ROADMAP.md)** - Project roadmap and current progress
- **[Architecture Guide](./ARCHITECTURE.md)** - Technical architecture and design decisions
- **[Contributing Guide](./CONTRIBUTING.md)** - Commit format and workflow
- **[AI Development Rules](./CLAUDE.md)** - Rules for AI coding assistants
- **[Complete Documentation Index](./docs/README.md)** - All available documentation

## 🤝 Contributing

This is a personal portfolio, but if you want to suggest improvements:

1. Fork the repo
2. Create feature branch
3. Follow guidelines in [CONTRIBUTING.md](./CONTRIBUTING.md)
4. Submit PR

## 📝 License

MIT

# Personal Website Roadmap

**Last Updated**: 2025-11-13

---

## 🎯 Project Vision

Personal website / landing page that showcases technical skills through code quality, performance, and user experience.

---

## 📊 Current Status: Phase 2 - Core Features

**Progress**: 40% complete overall

---

## Phase 1: Foundation ✅ COMPLETE

**Goal**: Basic website structure with modern stack

### Completed Features
- ✅ Next.js 15 setup with App Router
- ✅ TypeScript strict mode
- ✅ Tailwind CSS v4
- ✅ Git workflow (commitlint, husky)
- ✅ Basic component library (Button, Card)
- ✅ Basic sections (Hero, Projects, Skills, Contact)
- ✅ Server Components by default
- ✅ Responsive layout
- ✅ Documentation structure (CLAUDE.md, CONTRIBUTING.md)

**Duration**: ~2 weeks
**Status**: ✅ Shipped

---

## Phase 2: Core Features ⏳ IN PROGRESS

**Goal**: Essential UX features and visual polish

### 2.1 Theme System ✅ COMPLETE
**Branch**: `feature/dark-mode` (ready to merge)

- ✅ Dark mode toggle
- ✅ LocalStorage persistence
- ✅ Cross-tab synchronization
- ✅ Tailwind v4 dark mode config
- ✅ All sections styled
- ✅ E2E tests (4/4 passing)
- ✅ No hydration errors
- ✅ No icon flicker

**Commits**: 4 commits
**Duration**: 2 hours
**Status**: ✅ Complete, awaiting merge

---

### 2.2 Real Content 📍 NEXT UP

**Goal**: Replace placeholder content with real projects/skills

**Tasks**:
- [ ] Add real project data (3-5 projects)
- [ ] Add project screenshots/videos
- [ ] Add GitHub stats integration
- [ ] Add real skills with proficiency levels
- [ ] Add real social links
- [ ] Update SEO metadata

**Estimated Duration**: 3-4 hours
**Priority**: HIGH

---

### 2.3 Contact Form 📅 PLANNED

**Goal**: Working contact form with email delivery

**Tasks**:
- [ ] Form validation (zod)
- [ ] Email service (Resend or SendGrid)
- [ ] Success/error states
- [ ] Rate limiting
- [ ] Spam protection

**Estimated Duration**: 2-3 hours
**Priority**: MEDIUM

---

### 2.4 Animations 📅 PLANNED

**Goal**: Smooth page transitions and micro-interactions

**Tasks**:
- [ ] Framer Motion setup
- [ ] Page transition animations
- [ ] Scroll animations for sections
- [ ] Hover effects for cards/buttons
- [ ] Loading states

**Estimated Duration**: 4-5 hours
**Priority**: MEDIUM

---

## Phase 3: Advanced Features 📅 FUTURE

**Goal**: Unique features that set portfolio apart

### 3.1 Internationalization (i18n)
- [ ] Setup next-intl for Next.js 15 App Router
- [ ] Configure i18n routing (/en/, /ru/)
- [ ] Create translation files (en.json, ru.json)
- [ ] Translate all pages and components
- [ ] Translate case studies data
- [ ] Add language switcher to Header
- [ ] Test language switching and persistence

**Estimated Duration**: 6-8 hours
**Priority**: HIGH (requested by user)

---

### 3.2 Blog (Optional)
- [ ] MDX setup
- [ ] Blog posts with syntax highlighting
- [ ] RSS feed
- [ ] Tags/categories

**Estimated Duration**: 6-8 hours

---

### 3.3 Analytics Dashboard
- [ ] Vercel Analytics integration
- [ ] Custom events tracking
- [ ] Public stats page

**Estimated Duration**: 3-4 hours

---

### 3.3 Interactive Resume
- [ ] Downloadable PDF
- [ ] Interactive timeline
- [ ] Filterable by skills

**Estimated Duration**: 4-5 hours

---

## Phase 4: Performance & SEO 📅 FUTURE

**Goal**: Lighthouse 95+, perfect SEO

### 4.1 Performance Optimization
- [ ] Image optimization (next/image)
- [ ] Code splitting
- [ ] Lazy loading
- [ ] Bundle size < 100KB
- [ ] Lighthouse 95+ on mobile/desktop

**Estimated Duration**: 4-6 hours

---

### 4.2 SEO & Accessibility
- [ ] Semantic HTML review
- [ ] ARIA labels
- [ ] Keyboard navigation
- [ ] Screen reader testing
- [ ] Open Graph tags
- [ ] Sitemap.xml
- [ ] robots.txt

**Estimated Duration**: 3-4 hours

---

## Phase 5: Deployment & Monitoring 📅 FUTURE

**Goal**: Production-ready deployment

### 5.1 Deployment
- [ ] Deploy to Vercel
- [ ] Custom domain setup
- [ ] SSL certificate
- [ ] Environment variables

**Estimated Duration**: 1-2 hours

---

### 5.2 Monitoring
- [ ] Error tracking (Sentry)
- [ ] Uptime monitoring
- [ ] Performance monitoring

**Estimated Duration**: 2-3 hours

---

## 📈 Progress Tracking

### Overall Progress
```
Phase 1: Foundation        ████████████████████ 100%
Phase 2: Core Features     ████░░░░░░░░░░░░░░░░  25%
Phase 3: Advanced          ░░░░░░░░░░░░░░░░░░░░   0%
Phase 4: Performance       ░░░░░░░░░░░░░░░░░░░░   0%
Phase 5: Deployment        ░░░░░░░░░░░░░░░░░░░░   0%
```

### Current Sprint
**Focus**: Dark Mode (Phase 2.1)
**Status**: ✅ Complete
**Next**: Real Content (Phase 2.2)

---

## 🎯 Milestones

### M1: MVP ✅ COMPLETE
- Basic portfolio structure
- All sections present
- Responsive design
- **Shipped**: Week 1

### M2: Dark Mode ✅ COMPLETE
- Theme toggle working
- All sections styled
- Tested and documented
- **Shipped**: Week 2

### M3: Content Complete ⏳ IN PROGRESS
- Real projects
- Real skills
- Working contact form
- **Target**: Week 3

### M4: Production Ready 📅 PLANNED
- Performance optimized
- SEO complete
- Deployed to production
- **Target**: Week 4

---

## 📍 Current Position

**We are here**:
```
Website Roadmap
├── Phase 1: Foundation ✅
├── Phase 2: Core Features ⏳
│   ├── 2.1 Theme System ✅  ← JUST COMPLETED
│   ├── 2.2 Real Content 📍 ← YOU ARE HERE
│   ├── 2.3 Contact Form 📅
│   └── 2.4 Animations 📅
├── Phase 3: Advanced Features 📅
├── Phase 4: Performance & SEO 📅
└── Phase 5: Deployment 📅
```

**Latest Work**: Dark mode implementation (feature/dark-mode branch)

**Next Task**: Add real project content

---

## 🔄 Recent Changes

### 2025-11-13 (Today)
- ✅ Implemented dark mode toggle
- ✅ Fixed hydration errors
- ✅ Fixed icon flicker
- ✅ Created E2E tests
- ✅ Updated documentation
- ✅ Removed showcase page (user decision)

### Previous
- ✅ Basic portfolio structure
- ✅ Component library setup
- ✅ Documentation framework

---

## 💡 Decisions Log

### Why No Showcase Page?
**Decision**: Remove showcase, keep it simple
**Reason**: User feedback - "нафиг щоукейз, Только Dark Mode"
**Impact**: -590 lines, simpler codebase
**Date**: 2025-11-13

### Why Tailwind v4?
**Decision**: Use Tailwind CSS v4
**Reason**: Latest features, better performance
**Impact**: Different dark mode config syntax
**Date**: Project start

### Why Server Components Default?
**Decision**: Use Server Components by default
**Reason**: Better performance, smaller bundle
**Impact**: Need "use client" for interactive components
**Date**: Project start

---

## 🎓 Learning Notes

### Tailwind v4 Dark Mode
Use `@theme { --dark-mode: class; }` instead of config file

### Hydration Errors
Always match server/client initial state, use useEffect for localStorage

### Testing Strategy
Test boundaries (E2E) not coverage (unit tests)

---

## 📚 Related Documentation

- [README.md](./README.md) - Project overview
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Technical decisions
- [CLAUDE.md](./CLAUDE.md) - AI workflow rules
- [docs/SESSION-SUMMARY.md](./docs/SESSION-SUMMARY.md) - Current session notes
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Contribution guide

---

**Next Steps**: Add real project content (Phase 2.2)

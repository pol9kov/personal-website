# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.4.0] - 2025-12-05

### Added
- **Internationalization (i18n)**: Full Russian language support
  - Added next-intl for locale management
  - Language switcher in header
  - Cookie-based language preference persistence
  - All content translated to Russian
- **Dynamic Open Graph Images**: Locale-aware social preview cards
  - Profile photo with gradient styling
  - Localized name, title, and experience text
  - 1200x630 resolution for optimal sharing
- **Analytics**: Vercel Analytics integration
  - Page view tracking across the site
  - Uses `@vercel/analytics/next` for Next.js optimization
- **UTM Short Links**: Tracking links for different channels
  - `/go/telegram` - Telegram shares
  - `/go/linkedin` - LinkedIn shares
  - `/go/twitter` - Twitter/X shares
  - `/go/email` - Email signature
  - `/go/resume` - Resume document links
  - `/go/hh` - HeadHunter job board (redirects to Russian locale)
- **Footer**: Added email contact link

### Changed
- **Resume Button**: Consistent PDF format label

### Fixed
- **OG Images**: Proper async params handling for Next.js 15
- **OG Images**: Increased line-height to prevent letter clipping

## [0.3.0] - 2025-11-27

### Added
- **Hero Section**: Added profile photo with responsive sizing (components/sections/Hero.tsx:51-59)
- **Hero Section**: Added gradient text for name "Egor Polyakov" with blue-to-cyan gradient
  - Uses inline CSS styles for cross-browser compatibility
  - Added `paddingBottom: '8px'` to prevent descender clipping
  - Added `lineHeight: '1.3'` for proper text spacing
- **Hero Section**: Made CTA buttons functional
  - "View Projects" links to GitHub repositories
  - "Contact Me" links to Telegram
- **Case Studies**: Created CaseStudyCard client component (components/case-studies/CaseStudyCard.tsx)
  - Extracted from page component to properly handle onClick events
  - Added GitHub repository link display with icon
- **Case Studies**: Added GitHub URL to Website Builder case study
- **Documentation**: Created comprehensive component documentation (docs/COMPONENTS.md)
  - Component architecture and patterns
  - Props interfaces and usage examples
  - Server vs Client Component guidelines
  - Dark mode implementation patterns

### Changed
- **Footer**: Updated Contact link styling for consistency
  - Changed from `font-semibold text-gray-900 dark:text-white`
  - To `text-gray-600 dark:text-gray-400`
- **Case Studies Page**: Converted to use CaseStudyCard client component
  - Resolves Next.js App Router Server Component event handler error

### Fixed
- **Case Studies Page**: Fixed Server Component error with onClick handlers
  - Created separate client component for interactive card elements
- **Hero Section**: Fixed gradient text clipping issues
  - Proper handling of descenders (g, y letters)
  - Cross-browser gradient rendering

### Documentation
- Created COMPONENTS.md with detailed component documentation
- Updated docs/README.md with links to new documentation
- Added changelog to track project changes

## [0.2.0] - 2025-11-13

### Added
- **Global Theme System**: Implemented dark mode for entire site
  - Cross-tab synchronization using localStorage events
  - Theme toggle button in header
  - Suppressed hydration warning for SSR/CSR mismatch
- **Sections**: Connected Contact section to global theme
- **Testing**: Added comprehensive dark mode E2E tests
  - User journey testing (toggle, reload, persistence)
  - Visual testing across all sections
- **Documentation**:
  - Created TESTING-STRATEGY.md explaining boundary-focused testing approach
  - Created CLAUDE-MD-OPTIMIZATION.md for AI development rules
  - Created docs/README.md as documentation index

### Changed
- **Theme Context**: Enhanced with cross-tab synchronization
- **All Components**: Added dark mode styling with `dark:` variants
- **Tests**: Migrated to boundary-focused testing strategy (40-50% coverage target)

### Fixed
- **Theme Hydration**: Suppressed harmless hydration warning for dark mode class
  - Added suppressHydrationWarning to html element in layout.tsx

## [0.1.0] - 2025-11-08

### Added
- **Project Setup**: Initial Next.js 15 project with TypeScript
- **Tech Stack**:
  - Next.js 15 with App Router
  - TypeScript in strict mode
  - Tailwind CSS v4
  - Playwright for E2E testing
- **Components**:
  - Hero section with minimal design
  - Skills section with tech stack display
  - Header with navigation
  - Footer with social links
  - Button component with variants
- **Pages**:
  - Home page with Hero and Skills sections
  - Case Studies listing page
  - Case Study detail pages with dynamic routing
  - About page (placeholder)
  - Contact page (placeholder)
- **Dark Mode**: Initial dark mode implementation (theme toggle only)
- **Case Studies**: Three detailed case studies
  - AI Infrastructure & RAG System (2024)
  - Cross-Platform Mobile Platform (2023)
  - Dynamic Website Builder Platform (2015)
- **Documentation**:
  - README.md with project overview
  - CLAUDE.md with AI development rules
  - CONTRIBUTING.md with commit guidelines
  - ARCHITECTURE.md (planned)
  - ROADMAP.md (planned)

### Development Setup
- ESLint configured with strict rules
- TypeScript strict mode enabled
- Playwright E2E testing setup
- Git workflow with feature branches

---

## Version History

- **0.4.0** - i18n (Russian), OG images, Vercel Analytics, UTM tracking links
- **0.3.0** - Hero section enhancements, case studies improvements, component documentation
- **0.2.0** - Global dark mode, cross-tab sync, comprehensive testing
- **0.1.0** - Initial release with core features

---

**Note**: This changelog started on 2025-11-27. Previous changes are documented retrospectively based on git history.

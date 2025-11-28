# AI Development Rules

<critical>
MUST decompose to atomic (<5min, <50 lines) before executing
MUST run: npm run type-check && npm run lint && npm test before commits
MUST test boundaries (Server/Client, reusable, interactive) not coverage
MUST use feature branches: git checkout -b feature/name
FORBIDDEN: `any`, committing to main, `<img>`, `<div onClick>`
</critical>

## Task Decomposition

**Atomic task:** <5min | <50 lines | clear pass/fail | independent commit

**Process:** Analyze → Decompose → Recurse → Execute atomic

**Stop decomposing when:** Single file | <100 lines | Single concept | Clear commit msg

**Git:** Feature branch → atomic commits → squash to main

## Tech Stack Rules

| Category   | Required                           | Forbidden                                    |
| ---------- | ---------------------------------- | -------------------------------------------- |
| TypeScript | Explicit types                     | `any`                                        |
| Next.js 15 | Server Components, App Router      | Client default, `<img>`, `<div onClick>`     |
| Testing    | Boundaries, 40-50% coverage        | 80% coverage goal, static sections           |
| Styling    | Tailwind with `dark:` variants     | Missing dark mode                            |
| Security   | Validate input                     | `eval()`, `dangerouslySetInnerHTML`          |

## Pre-Commit Checklist

```bash
npm run type-check && npm run lint && npm test
```

- ✅ Test created and verified
- ✅ Complete user journey tested
- ❌ Never say "try it" without testing

## Documentation

**When creating docs:** File → docs/README.md → Link from parent → Reference in CLAUDE.md

## Quick Reference

- [README.md](./README.md) - Project context
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Commit format
- [docs/TESTING-STRATEGY.md](./docs/TESTING-STRATEGY.md) - Testing strategy
- [docs/COMPONENTS.md](./docs/COMPONENTS.md) - Component guide
- [CHANGELOG.md](./CHANGELOG.md) - Version history

---

**Last Updated:** 2025-11-27

# AI Development Rules

<critical>
MUST decompose tasks until atomic (<5min, <50 lines) before executing
MUST run: npm run type-check && npm run lint && npm test before commits
MUST test boundaries (Server/Client, reusable components, interactions) not line coverage
MUST use feature branches: git checkout -b feature/name BEFORE first commit
FORBIDDEN: TypeScript `any` type (CI enforced)
FORBIDDEN: Committing directly to main branch
</critical>

## Recursive Task Decomposition (MANDATORY)

**Before executing ANY task:** Analyze → Decompose → Recurse → Stop at ATOMIC

**Atomic task:** <5min | <50 lines | clear pass/fail | independent commit

### Example

❌ **Bad:** "Create hero section" → start coding

✅ **Good:** "Hero section" → [Structure, Layout, Content, Interactions, Performance] → [Props interface, Component type, Layout strategy] → [Required props, Optional props, JSDoc, Export] → ✅ "List required props" (ATOMIC)

### My Workflow

When you give me a task:

1. I respond: "Breaking this down..."
2. Show decomposition tree (3+ levels)
3. Ask: "Should I decompose further or start?"
4. Execute ONLY atomic tasks
5. After each atomic: Test → Verify → Commit
6. Move to next atomic task

**Git workflow:** Feature branch → atomic commits → squash to main (clean history)

**Warning Signs (stop decomposing ❌):**
Multiple files | Diff >100 lines | Multiple concepts | Unclear commit msg | Test covers multiple features

---

## Tech Stack

| Category      | ✅ REQUIRED                                 | ❌ FORBIDDEN                                              |
| ------------- | ------------------------------------------- | --------------------------------------------------------- |
| TypeScript    | Explicit types always                       | `any`                                                     |
| Next.js 15    | App Router, Server Components, `next/image` | Client default, `<img>`, `<div onClick>` (use `<button>`) |
| Testing       | Boundaries, reusable, interactive (40-50%)  | 80% coverage goal, testing static sections                |
| Performance   | Lighthouse ≥95, Bundle <100KB               | -                                                         |
| Security      | Validate all input                          | `eval()`, `dangerouslySetInnerHTML`                       |
| Accessibility | `alt` on images, semantic HTML              | -                                                         |

## Workflow Checklist

**Before presenting to user:**
- ✅ Create test and run it yourself
- ✅ Verify complete user journey end-to-end
- ❌ NEVER say "try it" without testing first

**Before commit:**

```bash
npm run type-check && npm run lint && npm test
```

## Documentation Workflow

**When creating documentation:**

❌ **Bad:** Create file → (done, no links) → File forgotten, context lost

✅ **Good:** Create file → Add to docs/README.md → Link from parent → Reference in CLAUDE.md if AI-relevant → Discoverable, connected, used

## Anti-Patterns

- ❌ Executing before decomposing
- ❌ Stopping decomposition too early
- ❌ Large diffs (>100 lines)
- ❌ `any` / `<img>` / `<div onClick>`
- ❌ Missing `dark:` variants (Tailwind v4: `@theme { --dark-mode: class; }`)

---

**See also:**

- [README.md](./README.md) - Project context
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Commit format
- [docs/](./docs/README.md) - Complete documentation index
- [docs/TESTING-STRATEGY.md](./docs/TESTING-STRATEGY.md) - Testing boundaries strategy
- [docs/CLAUDE-MD-OPTIMIZATION.md](./docs/CLAUDE-MD-OPTIMIZATION.md) - How this file was optimized

---

**Last Updated:** 2025-11-13

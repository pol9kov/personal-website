# Contributing Guidelines

## Git Workflow

### Branch Strategy

**Development Flow:**
1. Create feature branch from `main`
2. Make atomic commits (small, focused changes)
3. Test locally with pre-commit hooks
4. When feature complete → squash merge to `main` with single, detailed commit

**Benefits:**
- Feature branch: Fast iteration, easy rollback, detailed history
- Main branch: Clean history, one commit per feature, easy to review

### Branch Naming

- `feature/hero-animation` - new features
- `fix/mobile-layout` - bug fixes
- `refactor/types-cleanup` - refactoring
- `perf/image-optimization` - performance

### Commit Message Format

Use Conventional Commits with context:

```
type(scope): what changed

Why: reasoning behind decision
- Alternative: X (rejected because Y)
- Trade-off: chose A over B
Impact: measurable result
```

#### Good Examples:

```
feat(hero): add 3D background with Three.js

Why: Differentiate from typical portfolios with unique visual
- Alternative: CSS animations (rejected - not impressive enough)
- Trade-off: +50KB bundle acceptable for wow factor
Impact: Lighthouse still 96, creates memorable first impression
```

```
perf(images): convert all images to WebP

Why: PNG images caused slow mobile load (LCP 3.2s)
- Alternative: lazy loading only (rejected - still heavy)
- Trade-off: Safari <14 needs fallback (added)
Impact: LCP improved from 3.2s to 1.8s, Lighthouse 78→94
```

#### Bad Examples:

```
❌ fix hero
❌ update images
❌ done
```

### Pull Request Process

1. Ensure all tests pass: `npm test`
2. Run type checking: `npm run type-check`
3. Run Lighthouse audit (≥95)
4. Include in PR description:
   - What changed
   - Why (link to issue if applicable)
   - Screenshots (before/after)
   - Performance impact
   - Tested on: mobile/tablet/desktop

## Code Style

### Write Self-Explanatory Code

❌ Bad:

```typescript
// Check if user is premium
if (u.p === "premium" || u.t > Date.now()) {
}
```

✅ Good:

```typescript
function hasPremiumAccess(user: User): boolean {
  const isPaidUser = user.plan === "premium";
  const hasActiveTrial = user.trialExpiry > Date.now();
  return isPaidUser || hasActiveTrial;
}

if (hasPremiumAccess(user)) {
}
```

### Comments: Only for WHY

Comments should explain decisions, not code:

✅ Good:

```typescript
// Using ISR instead of SSG because content updates daily
// but doesn't need real-time accuracy. Revalidate every 60s
// balances freshness with performance.
export const revalidate = 60;
```

❌ Bad:

```typescript
// Set revalidate to 60
export const revalidate = 60;
```

## Testing

Run tests before committing:

```bash
npm test
```

Test responsive design at:

- 375px (mobile)
- 768px (tablet)
- 1024px (laptop)
- 1920px (desktop)

## Questions?

Open an issue or contact via email.

# Testing Strategy Analysis

## Executive Summary

**Problem**: Runtime error (Server Component with onClick) wasn't caught by our test suite.

**Root Cause**: `npm test` exits 0 with no real tests → useless quality gate.

**Solution**: Implement **Minimal Viable Test Strategy** focused on boundaries and critical paths, not strict TDD.

---

## Error Analysis: Why Tests Didn't Catch This

### The Error
```
Event handlers cannot be passed to Client Component props.
<button onClick={...}>
```

### What We Had
| Tool | Status | Why It Failed |
|------|--------|---------------|
| TypeScript | ✓ Passed | Can't catch React runtime constraints |
| ESLint | ✓ Passed | No default rule for Server/Client boundaries |
| Tests | ✓ Passed | `echo "No tests yet" && exit 0` (useless) |
| Pre-commit | ✓ Passed | Ran all above, all passed |

### What Would Have Caught It
1. **Component unit test** - Button with onClick would fail to render
2. **Integration test** - Contact section would throw runtime error
3. **Custom ESLint rule** - `eslint-plugin-react-server-components` (doesn't exist yet)
4. **Manual testing** - We caught it this way

**Key Insight**: TypeScript can't catch **React framework constraints** (Server/Client boundaries). Need runtime tests.

---

## TDD Boundaries: When to Test, When to Skip

### Research Findings

| Source | Recommendation | Portfolio Application |
|--------|----------------|----------------------|
| Next.js Best Practices 2025 | 80%+ test coverage | Too high for MVP/portfolio |
| Minimal Viable Test Strategy | Test critical paths only | ✅ Perfect fit |
| Testing Pyramid | Unit → Integration → E2E | Focus on Unit + Integration |
| React Testing Philosophy | "Mock as little as possible" | Avoid over-mocking |

### Testing Pyramid for Portfolio

```
        /\
       /E2E\         ← SKIP (overkill for portfolio)
      /------\
     /        \
    /Integration\    ← TEST (Server/Client boundaries, user flows)
   /------------\
  /              \
 /   Unit Tests   \  ← TEST (reusable components: Button, Card)
/------------------\
```

**Target Coverage**: 40-50% (not 80%) - Focus on **boundaries** not **lines**.

---

## Practical Testing Strategy

### ✅ What to Test (Boundaries & Critical Paths)

| Category | Components | Why Test | Test Type |
|----------|-----------|----------|-----------|
| **UI Components** | Button, Card | Reused everywhere, public API | Unit |
| **Interactive Sections** | Contact (onClick) | User-facing, runtime errors | Integration |
| **Server/Client Boundaries** | Any component with events | Framework constraint | Integration |
| **Utils** | cn(), future helpers | Pure functions, easy to test | Unit |

### ❌ What to Skip (Static Content)

| Category | Components | Why Skip |
|----------|-----------|----------|
| **Static Sections** | Hero, Projects, Skills | No interactivity, just JSX |
| **Layout** | Header, Footer | Simple links, no state |
| **Constants** | projects.ts, skills.ts | Just data, no logic |

**Principle**: Test **behavior**, not **markup**. Test **boundaries**, not **implementations**.

---

## Recommended Testing Stack

### Tools (Based on 2025 Research)

```typescript
// package.json
{
  "devDependencies": {
    "vitest": "^3.0.0",              // Faster than Jest, better TS support
    "@vitest/ui": "^3.0.0",          // Visual test UI
    "playwright": "^1.50.0",         // Real browser testing
    "@testing-library/react": "^16.0.0",  // User-centric testing
    "@testing-library/user-event": "^14.5.2",
    "jsdom": "^25.0.0"               // Lightweight DOM for unit tests
  }
}
```

### Why Vitest over Jest?
- 5-10x faster (ES modules native, no transpilation)
- Better TypeScript support (no @types/jest needed)
- Compatible with Vite/Next.js build system
- Playwright integration for Server Component testing

### Why Playwright over Cypress?
- Tests run in real browser (catches Server Component errors)
- Component testing mode (between unit & E2E)
- Better performance, less flaky

---

## Test Examples

### ❌ Bad: Testing Implementation Details
```typescript
// DON'T test internal state or class names
test('Button has correct class names', () => {
  render(<Button variant="primary" />);
  expect(button).toHaveClass('bg-blue-600'); // ❌ Fragile, implementation detail
});
```

### ✅ Good: Testing Behavior
```typescript
// DO test user-visible behavior
test('Button calls onClick when clicked', async () => {
  const handleClick = vi.fn();
  render(<Button onClick={handleClick}>Click me</Button>);

  await userEvent.click(screen.getByText('Click me'));
  expect(handleClick).toHaveBeenCalledOnce(); // ✅ Tests behavior
});
```

### ✅ Good: Testing Server/Client Boundaries
```typescript
// DO test that interactive components are Client Components
test('Contact section renders with onClick handlers', () => {
  // This would fail if Contact is Server Component with onClick
  render(<Contact />);

  const emailButton = screen.getByText('Send Email');
  expect(emailButton).toBeInTheDocument();

  // Try to click (would throw if Server Component)
  fireEvent.click(emailButton);
  // If no error, button is properly a Client Component
});
```

---

## TDD vs Pragmatic Testing

### Strict TDD Approach (NOT Recommended for Portfolio)
```
1. Write failing test
2. Write minimal code to pass
3. Refactor
4. Repeat for every function/component
```

**Why not?**
- Portfolio has limited scope (5-10 components)
- Most components are static (Hero, Projects display)
- Over-testing wastes time on presentational code
- TDD works best for complex business logic

### Pragmatic "Test the Boundaries" Approach (✅ Recommended)
```
1. Build component
2. Ask: "Is this reused OR interactive OR a boundary?"
3. If YES → write test
4. If NO → skip test
5. Run tests in pre-commit hook
```

**Why yes?**
- Focus on high-value tests (boundaries, reusable, interactive)
- Skip low-value tests (static sections, one-off components)
- Faster development, same error prevention
- 40-50% coverage catches 80% of real errors (Pareto principle)

---

## Automated Detection: ESLint Rules

### Custom Rule for Server/Client Boundaries

**Problem**: No official ESLint plugin for Server Component violations.

**Solution**: Custom ESLint rule to detect event handlers in Server Components.

```javascript
// .eslintrc.js - Custom rule
module.exports = {
  rules: {
    'no-event-handlers-in-server-components': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Disallow event handlers in files without "use client"',
        },
      },
      create(context) {
        let hasUseClient = false;

        return {
          Program(node) {
            // Check if file has "use client" directive
            const firstNode = node.body[0];
            hasUseClient = firstNode?.expression?.value === 'use client';
          },

          JSXAttribute(node) {
            // Detect onClick, onChange, etc. without "use client"
            if (!hasUseClient && /^on[A-Z]/.test(node.name.name)) {
              context.report({
                node,
                message: 'Event handlers require "use client" directive',
              });
            }
          },
        };
      },
    },
  },
};
```

**Alternative**: Wait for official `eslint-plugin-react-server-components` (in development).

---

## Implementation Plan

### Phase 1: Foundation (This PR)
1. ✅ Install Vitest + React Testing Library
2. ✅ Configure vitest.config.ts
3. ✅ Update package.json scripts
4. ✅ Add example test for Button component

### Phase 2: Critical Path Tests (Next PR)
1. Test Button component (variants, onClick, disabled)
2. Test Contact section (Server/Client boundary)
3. Test cn() utility function

### Phase 3: Automation (Future PR)
1. Add custom ESLint rule for Server/Client boundaries
2. Add Playwright for integration tests
3. Add test coverage reporting

---

## Updated Pre-commit Hook Strategy

### Before (Useless)
```bash
npm test  # Exits 0 with no tests
```

### After (Effective)
```bash
npm run type-check  # TypeScript errors
npm run lint        # ESLint errors + custom Server/Client rule
npm test            # Vitest tests (will fail if violations found)
```

**Result**: Real quality gate that catches runtime errors.

---

## Measuring Success

### Metrics That Matter
- ✅ **Boundary coverage** (all Server/Client boundaries tested)
- ✅ **Critical path coverage** (all user interactions tested)
- ✅ **Zero Server Component violations** (ESLint catches)
- ❌ **Line coverage %** (vanity metric, ignore)

### Definition of Done
- [ ] Button component has unit tests
- [ ] Contact section has integration test
- [ ] ESLint catches Server/Client violations
- [ ] Pre-commit hook blocks bad commits
- [ ] Tests run in <5 seconds (Vitest speed)

---

## Conclusion

**Not Strict TDD** → **Test the Boundaries**

Focus on:
1. **Reusable components** (Button, Card) - Unit tests
2. **Interactive sections** (Contact, forms) - Integration tests
3. **Server/Client boundaries** - Framework constraint tests
4. **Skip static content** (Hero, Projects, Footer)

**Target**: 40-50% coverage, catching 80% of real errors.

**Tools**: Vitest (unit) + Playwright (integration) + Custom ESLint (static analysis).

**Result**: Fast tests, real error prevention, minimal maintenance.

---

## References

- [Next.js Testing Best Practices 2025](https://strapi.io/blog/react-and-nextjs-in-2025-modern-best-practices)
- [Minimal Viable Test Strategy](https://www.richard-seidl.com/en/blog/minimal-test-strategy)
- [Component Testing with Playwright and Vitest](https://www.thecandidstartup.org/2025/01/06/component-test-playwright-vitest.html)
- [React Testing Library Philosophy](https://testing-library.com/docs/guiding-principles/)

---

**Last Updated**: 2025-11-13
**Created by**: AI analysis of Server Component error
**Status**: Approved, ready for implementation

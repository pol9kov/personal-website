# Library / Utilities

Shared utilities, types, constants, and helper functions.

## Structure

```
lib/
├── utils/       # Utility functions (formatDate, clsx, etc.)
├── types/       # TypeScript type definitions
├── constants/   # App-wide constants
├── hooks/       # Custom React hooks
└── api/         # API client functions
```

## Examples

- `utils/cn.ts` - Tailwind class name helper
- `types/project.ts` - Project data types
- `constants/routes.ts` - App route constants
- `hooks/useMediaQuery.ts` - Responsive breakpoint hook

## Guidelines

- **Pure functions** - No side effects when possible
- **Well-typed** - Strict TypeScript types
- **Tested** - Unit tests for complex logic
- **Documented** - JSDoc comments for public APIs
- **Tree-shakeable** - Named exports, no barrel files

# Development Standards

## 1. Folder Conventions
- Use `kebab-case` for all folder names (e.g., `design-system`, `transaction-list`).
- Group files by feature (Feature-Sliced Design).
- `index.ts` files should be used as public APIs for folders (barrel exports), exposing only what is necessary for other modules to consume.

## 2. File Naming Conventions
- React components: `PascalCase.tsx` (e.g., `Button.tsx`, `TransactionTable.tsx`).
- Custom hooks: `camelCase.ts` with a `use` prefix (e.g., `useAuth.ts`, `useClickOutside.ts`).
- Utilities, constants, and helpers: `camelCase.ts` (e.g., `formatCurrency.ts`, `constants.ts`).
- Type definitions: `types.ts` or `[FeatureName].types.ts`.
- Styles (if using CSS modules): `[ComponentName].module.css`.

## 3. Component Naming
- Components should have descriptive, noun-based names.
- Prefix domain-specific components with the domain if necessary for clarity (e.g., `DashboardWidget` vs `Widget`).
- Avoid generic names like `Item` or `Container` unless they are tightly scoped inside a module.

## 4. Import Ordering
Enforce standard import ordering via ESLint (`eslint-plugin-import` or `eslint-plugin-simple-import-sort`):
1. React and third-party libraries (e.g., `react`, `next`, `lodash`).
2. Absolute path imports pointing to internal modules (e.g., `@/features`, `@/core`).
3. Relative imports for localized files (e.g., `../components/Button`, `./styles.module.css`).

## 5. Coding Conventions
- **Strict Typing:** Use TypeScript strictly. Avoid `any`. Use `unknown` if the type is truly unknown.
- **Functional Components:** Use React Functional Components with Hooks. No Class components.
- **Props Interfaces:** Name props as `[ComponentName]Props` (e.g., `ButtonProps`).
- **Destructuring:** Destructure props in the function signature.
- **Early Returns:** Use early returns to avoid deep nesting and improve readability.
- **No Inline Functions in JSX:** Unless trivial, extract inline functions to `useCallback` or normal handlers to avoid unnecessary re-renders.

## 6. Reusable Component Strategy
- Components in the `design-system` must be pure and receive all data via props.
- They must not fetch their own data or have domain-specific logic.
- Domain-specific reusable components (e.g., `UserAvatar`) can live in `shared/components` if used across features.

## 7. Feature Organization
Inside `features/[feature-name]`:
- `components/`: UI components specific to this feature.
- `api/`: API calls specific to this feature.
- `store/` or `state/`: Local state or Zustand slices for the feature.
- `types.ts`: Domain models.
- `index.ts`: Barrel export.

## 8. Git Branching Strategy
- `main`: Stable production-ready code.
- `develop`: Integration branch for active development.
- `feature/[ticket-id]-[short-desc]`: For new features (e.g., `feature/FIN-123-add-transactions-table`).
- `bugfix/[ticket-id]-[short-desc]`: For non-critical fixes.
- `hotfix/[ticket-id]-[short-desc]`: For critical production fixes.

## 9. Commit Conventions
Follow Conventional Commits:
- `feat:` A new feature.
- `fix:` A bug fix.
- `docs:` Documentation only changes.
- `style:` Changes that do not affect the meaning of the code (white-space, formatting).
- `refactor:` A code change that neither fixes a bug nor adds a feature.
- `test:` Adding missing tests.
- `chore:` Changes to the build process or auxiliary tools.

## 10. Documentation Standards
- Every complex utility function must have a JSDoc comment explaining its parameters, return value, and edge cases.
- `README.md` files must exist at the root of `src/` and in major architectural folders to explain their purpose to new developers.

## 11. Versioning Strategy
- Semantic Versioning (SemVer): `MAJOR.MINOR.PATCH`.
- Major: Breaking UI/UX flow or architectural changes.
- Minor: New features.
- Patch: Bug fixes and minor adjustments.

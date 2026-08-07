# Project Architecture

## Overview
The Finly architecture follows a scalable, feature-first approach (Feature Sliced Design inspired), utilizing modern web frameworks (such as Next.js App Router or Vite + React). This ensures high cohesion within features and low coupling across the application, making it maintainable and extensible.

## Core Principles
1. **Separation of Concerns:** Business logic, UI components, and state management are strictly separated.
2. **Modularity:** Code is grouped by feature rather than strictly by file type.
3. **Scalability:** The architecture supports the addition of new features without requiring a structural rewrite.

## Directory Structure

```text
src/
├── app/                  # Application routing and root layouts (Next.js App Router)
├── assets/               # Static assets (images, icons, fonts)
├── config/               # Global configuration files, environment variable validation
├── core/                 # Core functionality
│   ├── api/              # Base API client configuration, interceptors
│   ├── auth/             # Authentication logic, guards, session management
│   ├── constants/        # Application-wide constants
│   ├── contexts/         # Global React contexts
│   ├── store/            # Global state management configuration (Zustand/Redux)
│   └── theme/            # Theme configuration, Design System tokens
├── design-system/        # Reusable, completely stateless UI components
│   ├── atoms/            # Buttons, Inputs, Typography
│   ├── molecules/        # Form fields, Search bars
│   └── organisms/        # Complex tables, Modals, Navigation bars
├── features/             # Feature-specific modules (Feature-Sliced Design)
│   ├── dashboard/        # Dashboard-specific logic, components, types
│   ├── transactions/     # Transactions logic, views, services
│   └── analytics/        # Analytics charts, data formatting
├── shared/               # Shared utilities and helpers across features
│   ├── hooks/            # Generic custom hooks (e.g., useClickOutside, useDebounce)
│   ├── lib/              # Wrapper libraries (e.g., date-fns, axios wrappers)
│   ├── types/            # Global TypeScript types and interfaces
│   └── utils/            # Helper functions (e.g., formatting currency)
└── tests/                # Global test setup and E2E tests
```

## Architectural Decisions

### 1. Feature-First Organization (`src/features`)
Instead of having a global `components` folder with hundreds of disconnected files, components, state, and API calls that belong specifically to a feature (like `transactions`) live inside that feature's directory. This encapsulates logic and makes scaling manageable.

### 2. Strict Design System (`src/design-system`)
All generic UI components live here. They must be completely free of business logic. A `Button` component here should not know about "Transactions" or "Submitting forms"; it only receives props.

### 3. Separation of API and State
API services (fetching data) and State management (storing data) are decoupled. We utilize a server-state management tool (like React Query or SWR) alongside a client-state manager (like Zustand) to handle UI state without conflating the two.

### 4. Path Aliasing
Absolute imports will be configured via `tsconfig.json` (e.g., `@/features`, `@/design-system`) to prevent long relative paths (`../../../`).

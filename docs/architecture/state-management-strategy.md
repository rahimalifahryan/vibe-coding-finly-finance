# State Management Strategy

## Overview
Finly handles complex financial data, necessitating a strict separation between different types of state to ensure performance and predictability. We categorize state into four distinct domains.

## 1. Server State (Data Fetching & Caching)
**Tooling:** React Query or SWR.
- **Definition:** Data that originates from our APIs (e.g., list of transactions, user profile, analytics data).
- **Strategy:** 
  - Never store server responses in global client state (like Redux/Zustand).
  - Use a caching library to handle fetching, caching, synchronization, background updates, and pagination.
  - Rely on stale-while-revalidate patterns to ensure the UI feels instantaneous while remaining up to date.
- **Why:** Reduces boilerplate, handles loading/error states automatically, and prevents data staleness.

## 2. Global Client State
**Tooling:** Zustand (or Redux Toolkit if specifically requested by the enterprise).
- **Definition:** Application-wide UI state that does not belong to the server but must be shared across disparate components.
- **Examples:**
  - Sidebar collapsed/expanded state.
  - Active global modal (e.g., "Add Transaction" modal triggered from anywhere).
  - Multi-step wizard data (before submission to the server).
- **Strategy:**
  - Keep the global store as small as possible.
  - Use modular slices (e.g., `createUISlice`, `createWizardSlice`) if using Zustand to maintain organization.

## 3. Local Component State
**Tooling:** React `useState`, `useReducer`.
- **Definition:** Ephemeral state strictly required by a single component or its direct children.
- **Examples:**
  - Form input values (before submission).
  - Dropdown open/close state.
  - Active tab in a localized view.
- **Strategy:**
  - Always prefer local state over global state. Prop-drill if it's only 1-2 levels deep.
  - Use `useReducer` for complex localized state machines.

## 4. Authentication State
**Tooling:** NextAuth.js (if Next.js) or a custom Context + Secure Cookies.
- **Definition:** The user's session data, JWT token, and RBAC (Role-Based Access Control) claims.
- **Strategy:**
  - Store JWT tokens securely (e.g., `httpOnly` cookies). Never store them in `localStorage` due to XSS vulnerabilities.
  - Expose a `useAuth` hook that provides `user`, `isAuthenticated`, and `logout()` methods.
  - Authentication state wraps the entire application and dictates route access.

## 5. Theme State & Persistent Storage
**Tooling:** LocalStorage / CSS Variables / `next-themes`.
- **Definition:** User preferences like Dark/Light mode or language selection that must persist across sessions.
- **Strategy:**
  - Read from `localStorage` on initialization.
  - Apply class names to the HTML `<body>` or root element to toggle CSS variables.
  - Prevent FOUC (Flash of Unstyled Content) by injecting a small blocking script in the document `<head>` (native to Next.js).

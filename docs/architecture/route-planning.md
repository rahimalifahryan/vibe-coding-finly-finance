# Route Planning

## Overview
This document defines the routing architecture for Finly. It specifies the logical page structure, access control (public vs. protected), and layout strategies. No actual pages are implemented yet.

## Route Architecture

### Public Routes
These routes do not require authentication.
- `/login`: User authentication via credentials or SSO.
- `/register`: New user onboarding.
- `/forgot-password`: Password recovery flow.
- `/reset-password`: Token-based password reset.

### Protected Routes
These routes require a valid session/token. If unauthenticated, the user is redirected to `/login`.

#### Dashboard (Root)
- `/`: The main dashboard overview (KPIs, recent activity).

#### Transactions
- `/transactions`: Full list of transactions.
- `/transactions/[id]`: Detailed view of a specific transaction.

#### Analytics
- `/analytics`: High-level financial reporting.
- `/analytics/cash-flow`: Detailed cash-flow charting.
- `/analytics/budget`: Budget vs. Actuals reporting.

#### Settings
- `/settings`: General user settings (Profile).
- `/settings/security`: Password changes, 2FA setup.
- `/settings/preferences`: Theme, currency, notifications.
- `/settings/billing`: Subscription management (if applicable).

## Authentication Flow
1. User accesses a Protected Route.
2. The router's middleware (e.g., Next.js Middleware) checks for a valid JWT or session cookie.
3. If invalid, HTTP 302 Redirect to `/login?callbackUrl=...`
4. After successful login, the auth state is updated globally, and the user is redirected back to their intended destination.

## Layout Strategy
To maximize reuse and prevent unnecessary re-renders, the application uses Nested Layouts.

1. **`AuthLayout`:** Used for public routes. Contains branding, a centered form container, and possibly a marketing sidebar/graphic.
2. **`AppLayout`:** Used for protected routes.
   - Contains the global `Sidebar` (navigation).
   - Contains the global `Navbar` (search, user profile, notifications).
   - Acts as an Error Boundary for the main content area.
3. **`SettingsLayout` (Nested under AppLayout):**
   - Contains a secondary navigation pane specifically for moving between Profile, Security, and Preferences, while the main Sidebar remains intact.

# Component Planning

## Overview
This document outlines the planned reusable components for the Finly application. These components are to be built purely based on the future Figma design system. They must be stateless, highly customizable via props, and contain no domain-specific business logic.

## Core Elements (Atoms)

### 1. `Button`
- **Purpose:** Primary interaction element for forms, submissions, and critical actions.
- **Expected Responsibilities:** Render as a button or an anchor link. Handle loading states (show spinner, disable click), handle icons (left/right).
- **Props:** `variant`, `size`, `isLoading`, `leftIcon`, `rightIcon`, `disabled`, `onClick`.

### 2. `Input`
- **Purpose:** Standard text entry.
- **Expected Responsibilities:** Forward refs, display validation errors, support leading/trailing icons.
- **Props:** `type`, `label`, `error`, `hint`, `leadingIcon`.

### 3. `Badge` / `Tag`
- **Purpose:** Highlight statuses or categories (e.g., "Completed", "Income").
- **Expected Responsibilities:** Display short text with semantic colors.
- **Props:** `color`, `variant` (solid/outline), `children`.

### 4. `Avatar`
- **Purpose:** Display user profile pictures or initials.
- **Expected Responsibilities:** Fallback to initials if image fails to load.
- **Props:** `src`, `name`, `size`.

## Complex Elements (Molecules & Organisms)

### 5. `Modal` / `Dialog`
- **Purpose:** Display critical overlays that require user attention.
- **Expected Responsibilities:** Focus trapping, escape key to close, backdrop click to close, accessible ARIA roles.
- **Props:** `isOpen`, `onClose`, `title`, `children`, `footer`.

### 6. `Table` (Data Grid)
- **Purpose:** Display large datasets like transactions.
- **Expected Responsibilities:** Render columns, handle sort direction clicks, render pagination controls.
- **Props:** `columns` (accessor and header configs), `data`, `onSort`, `isLoading`, `emptyState`.

### 7. `ChartWrapper`
- **Purpose:** A uniform container for various financial charts (Line, Bar, Doughnut).
- **Expected Responsibilities:** Standardize tooltip styles, axes formatting, and legend positioning across the app. Provide loading skeletons when data is fetching.
- **Props:** `type`, `data`, `options`, `isLoading`.

### 8. `StatisticCard`
- **Purpose:** Display KPI metrics on the dashboard (e.g., "Total Balance").
- **Expected Responsibilities:** Show a value, label, an icon, and a trend indicator (up/down).
- **Props:** `title`, `value`, `trend` (positive/negative/neutral), `trendValue`.

### 9. `EmptyState`
- **Purpose:** Displayed when a table or list has no data.
- **Expected Responsibilities:** Show an illustration/icon, title, description, and an optional action button.
- **Props:** `icon`, `title`, `description`, `actionButton`.

### 10. `LoadingSkeleton`
- **Purpose:** Improve perceived performance during data fetching.
- **Expected Responsibilities:** Render animated placeholder blocks.
- **Props:** `type` (text, circular, rectangular), `width`, `height`.

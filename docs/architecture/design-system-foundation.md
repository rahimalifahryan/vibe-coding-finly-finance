# Design System Foundation

## Overview
This document specifies the foundational tokens and component standards for the Finly Design System. The implementation will wait for the Figma designs, but these tokens will form the basis of the styling structure (using CSS Variables, Tailwind, or styled-components).

## 1. Tokens

### Colors
- **Brand/Primary:** TBD (Main interactive elements)
- **Secondary:** TBD (Secondary actions, highlights)
- **Background:** Application backgrounds, card backgrounds, modal backdrops
- **Surface:** Component surfaces (elevated cards, dropdowns)
- **Text:** 
  - Primary (High contrast)
  - Secondary (Medium contrast)
  - Disabled (Low contrast)
- **Semantic:**
  - Success (Positive trends, completed actions)
  - Warning (Alerts, pending states)
  - Danger/Error (Destructive actions, negative trends, validation errors)
  - Info (Informational messages)
- **Borders:** Subtle dividers, input borders.

### Typography
- **Font Family:** Primary Sans-Serif (TBD, e.g., Inter, Roboto).
- **Scale:**
  - Display (h1, h2, h3) - Dashboard headers
  - Body (Large, Base, Small) - General text
  - Micro - Tooltips, small badges
- **Weights:** Regular (400), Medium (500), Semi-bold (600), Bold (700).

### Spacing
A 4px or 8px baseline grid system.
- `xs` (4px), `sm` (8px), `md` (16px), `lg` (24px), `xl` (32px), `2xl` (48px).

### Radius
- `sm` (4px) - Checkboxes, small tags.
- `md` (8px) - Inputs, buttons, standard cards.
- `lg` (12px-16px) - Large modal windows, featured widgets.
- `full` (9999px) - Avatars, pill buttons.

### Elevation & Shadows
- `level-1`: Hover states, dropdowns.
- `level-2`: Modals, sticky headers.
- `level-3`: Tooltips, popovers.

### Opacity
- `hover`: 0.8
- `disabled`: 0.5
- `backdrop`: 0.4 (for modal overlays)

### Motion & Animation
- **Durations:** `fast` (150ms), `normal` (250ms), `slow` (350ms).
- **Easings:** `ease-in-out` for standard transitions, `ease-out` for entering elements, `ease-in` for exiting elements.

## 2. Component Standards

### Buttons
- **Variants:** Primary, Secondary, Outline, Ghost, Danger.
- **Sizes:** Small, Medium, Large, Icon-only.
- **States:** Default, Hover, Active, Disabled, Loading.
- **Responsibility:** Trigger actions, do not contain routing logic internally unless polymorphic (e.g., `as={Link}`).

### Inputs & Forms
- **Elements:** Text Input, Password, Select/Dropdown, Checkbox, Radio, Switch/Toggle.
- **States:** Default, Focus, Error, Disabled, Read-only.
- **Structure:** Label, Input control, Hint/Error text.

### Data Display
- **Tables:** Must support sorting, pagination, empty states, and loading skeletons.
- **Cards:** Container for widgets, containing a Header, Body, and optional Footer.
- **Badges/Tags:** For status indicators (e.g., "Completed", "Pending").

### Feedback & Overlays
- **Dialogs/Modals:** Must trap focus, close on escape, and handle backdrop clicks.
- **Toasts/Snackbars:** Temporary notifications with success, error, or info variants.
- **Tooltips:** Show contextual info on hover/focus without blocking interaction.
- **Empty States:** Clear messaging with a call-to-action when data is missing.
- **Loading States:** Skeletons preferred over spinners for initial page loads.

### Navigation
- **Sidebar:** Collapsible, active state indicators.
- **Tabs:** Horizontal navigation within a view.

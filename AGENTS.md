# AGENTS.md

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Wiki Knowledge Base
Path: ~/path/to/vault

When you need context not already in this project:
1. Read wiki/hot.md first (recent context cache)
2. If not enough, read wiki/index.md
3. If you need domain details, read the relevant domain sub-index
4. Only then drill into specific wiki pages

Do NOT read the wiki for general coding questions or tasks unrelated to sureplay-mvp.

Behavioral and coding guidelines for this project. Merge with project-specific instructions as needed.

---

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them — don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

---

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

---

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it — don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

---

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

## 5. SOLID Principles — Strict Adherence

Every component, function, hook, and module must follow SOLID:

- **S — Single Responsibility:** One reason to change. A component does one thing. A function does one thing. If a component has more than ~100 lines or more than ~3 responsibilities, split it.
- **O — Open/Closed:** Open for extension, closed for modification. Use composition, not inheritance. Extend behavior via props and higher-order patterns, not by editing existing code.
- **L — Liskov Substitution:** Any subtype must be substitutable for its base type. If you have a `ButtonProps` interface, all button variants must satisfy it without breaking consumers.
- **I — Interface Segregation:** No fat interfaces. Split props into focused interfaces. A component should never receive props it doesn't use.
- **D — Dependency Inversion:** Depend on abstractions, not concretions. Inject dependencies via props or context. Never hard-wire implementation details into components.

---

## 6. KISS — Keep It Simple, Stupid

- Favor readability over cleverness.
- Avoid premature optimization.
- Prefer explicit over implicit.
- If a junior dev can't read it in 30 seconds, rewrite it.
- No magic numbers, no magic strings, no hidden side effects.

---

## 7. TypeScript — Explicit, Verbose, Zero Inference

### 7.1 Every Variable Must Have an Explicit Type

```typescript
// ❌ BAD — implicit type
const user = { name: "Alice", age: 30 };

// ✅ GOOD — explicit type
interface User {
  name: string;
  age: number;
}
const user: User = { name: "Alice", age: 30 };
```

### 7.2 All Functions Must Be Arrow Functions with Explicit Types

```typescript
// ❌ BAD — regular function, no return type
function getUser(id: string) {
  return users.find(u => u.id === id);
}

// ✅ GOOD — arrow function, explicit param types, explicit return type
const getUser = (id: string): User | undefined => {
  return users.find((user: User): boolean => user.id === id);
};
```

### 7.3 Props, Inputs, and Outputs Must Be Explicitly Typed

```typescript
// ❌ BAD — inline props, no explicit interface
const UserCard = ({ name, age, onClick }) => { ... };

// ✅ GOOD — explicit interface, typed props
interface UserCardProps {
  name: string;
  age: number;
  onClick: (userId: string) => void;
}

const UserCard: React.FC<UserCardProps> = (props: UserCardProps): React.ReactElement => {
  const { name, age, onClick } = props;
  // ...
};
```

### 7.4 Never Shove Large Objects Into Props

**ALWAYS** create a typed props variable and pass that to components.

```typescript
// ❌ BAD — large object dumped into props
<Component data={user} config={settings} theme={theme} handlers={handlers} />

// ✅ GOOD — create a typed props object
interface ComponentProps {
  data: User;
  config: AppConfig;
  theme: Theme;
  handlers: ComponentHandlers;
}

const componentProps: ComponentProps = {
  data: user,
  config: settings,
  theme: theme,
  handlers: handlers,
};

<Component {...componentProps} />
```

---

## 8. TSDoc — Every Function, Component, Hook, and Type Must Be Documented

```typescript
/**
 * Fetches a user by their unique identifier.
 *
 * @param id - The unique identifier of the user to fetch.
 * @returns The user object if found, otherwise `undefined`.
 * @throws {NetworkError} If the network request fails.
 *
 * @example
 * ```typescript
 * const user = await getUser("user-123");
 * ```
 */
const getUser = async (id: string): Promise<User | undefined> => {
  // implementation
};
```

**Required TSDoc tags:**
- `@param` for every parameter
- `@returns` for the return value
- `@throws` if the function can throw
- `@example` for non-trivial functions

---

## 9. React Performance — memo, useCallback, useMemo

### 9.1 Extensive and Careful Use of `useCallback`

Every callback passed as a prop must be wrapped in `useCallback` with explicit dependency arrays.

```typescript
// ❌ BAD — inline callback, new reference every render
<button onClick={() => handleClick(id)} />

// ✅ GOOD — memoized callback
const handleClick = useCallback((id: string): void => {
  setSelectedId(id);
}, []);

<button onClick={() => handleClick(user.id)} />
```

### 9.2 Extensive and Careful Use of `React.memo`

Every component that receives props should be wrapped in `React.memo` unless it is a leaf component with no props.

```typescript
// ❌ BAD — unmemoized component
const UserCard = (props: UserCardProps): React.ReactElement => { ... };

// ✅ GOOD — memoized component
const UserCard = React.memo((props: UserCardProps): React.ReactElement => {
  // ...
});

UserCard.displayName = "UserCard";
```

### 9.3 Careful Use of `useMemo`

Use `useMemo` for expensive computations and derived state.

```typescript
const filteredUsers = useMemo((): User[] => {
  return users.filter((user: User): boolean => user.isActive);
}, [users]);
```

---

## 10. State Management — Prefer Zustand Over useState

### 10.1 Reduce In-Component `useState`

Before adding `useState` to a component, ask: "Could this live in a Zustand store?"

**Rules:**
- Global or shared state → **Zustand store**
- UI-only, component-local state (e.g., hover, focus) → `useState` is acceptable
- Derived state → compute from Zustand store, never duplicate

### 10.2 Zustand Store Pattern

```typescript
// stores/userStore.ts
import { create } from "zustand";

interface UserState {
  users: User[];
  selectedUserId: string | null;
  setUsers: (users: User[]) => void;
  selectUser: (id: string | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  selectedUserId: null,
  setUsers: (users: User[]): void => set({ users }),
  selectUser: (id: string | null): void => set({ selectedUserId: id }),
}));
```

---

## 11. Error Boundaries — Full Use, Everywhere

### 11.1 Every Route and Major Feature Must Be Wrapped

```typescript
// components/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Catches JavaScript errors anywhere in its child component tree.
 *
 * @param props - The component props.
 * @returns The error boundary component.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    // Log to error tracking service
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback ?? <div>Something went wrong.</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

### 11.2 Usage Pattern

```typescript
<ErrorBoundary fallback={<ErrorFallback />}>
  <FeatureComponent />
</ErrorBoundary>
```

---

## 12. Styling — Tailwind + CSS Variables, No Magic Numbers

### 12.1 Read the Global Styles File

**ALWAYS** read `global/styles.css` (or equivalent) before writing any styles. All design tokens, colors, spacing, and typography are defined there.

### 12.2 No Floating Numbers

**NEVER** use arbitrary Tailwind values or raw CSS numbers. Everything must reference Tailwind defaults or CSS variables.
Example:
```css
/* global/styles.css */
:root {
  /* Colors */
  --color-primary: #3b82f6;
  --color-secondary: #64748b;
  --color-background: #ffffff;
  --color-surface: #f8fafc;
  --color-text: #0f172a;
  --color-text-muted: #64748b;
  --color-border: #e2e8f0;
  --color-error: #ef4444;
  --color-success: #22c55e;

  /* Spacing — binary scale */
  --space-1: 0.25rem;   /* 4px  */
  --space-2: 0.5rem;    /* 8px  */
  --space-4: 1rem;      /* 16px */
  --space-8: 2rem;      /* 32px */
  --space-16: 4rem;     /* 64px */
  --space-32: 8rem;     /* 128px */
  --space-64: 16rem;    /* 256px */

  /* Typography */
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px — Tailwind default */
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;

  /* Breakpoints */
  --breakpoint-phone: 640px;
  --breakpoint-tablet: 768px;
  --breakpoint-desktop: 1024px;
  --breakpoint-wide: 1280px;
}
```

### 12.3 Binary Spacing Scale

Margins and paddings must follow the binary scale: `1, 2, 4, 8, 16, 32, 64, 128` (in Tailwind units: `0.25rem, 0.5rem, 1rem, 2rem, 4rem, 8rem, 16rem`).

```typescript
// ❌ BAD — arbitrary values
<div className="p-[13px] m-[27px] gap-[9px]" />

// ✅ GOOD — Tailwind defaults or CSS variables
<div className="p-4 m-8 gap-2" />
<div style={{ padding: "var(--space-4)" }} />
```

### 12.4 Responsive Typography

```css
/* global/styles.css */
@media (max-width: 640px) {
  :root {
    font-size: 12px; /* Phones */
  }
}

@media (min-width: 641px) and (max-width: 1024px) {
  :root {
    font-size: 14px; /* Tablets */
  }
}

@media (min-width: 1025px) {
  :root {
    font-size: 16px; /* Desktop — Tailwind default */
  }
}
```

### 12.5 Tailwind Configuration Must Point to CSS Variables

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        text: "var(--color-text)",
        "text-muted": "var(--color-text-muted)",
        border: "var(--color-border)",
        error: "var(--color-error)",
        success: "var(--color-success)",
      },
      spacing: {
        "1": "var(--space-1)",
        "2": "var(--space-2)",
        "4": "var(--space-4)",
        "8": "var(--space-8)",
        "16": "var(--space-16)",
        "32": "var(--space-32)",
        "64": "var(--space-64)",
      },
      fontSize: {
        xs: "var(--font-size-xs)",
        sm: "var(--font-size-sm)",
        base: "var(--font-size-base)",
        lg: "var(--font-size-lg)",
        xl: "var(--font-size-xl)",
        "2xl": "var(--font-size-2xl)",
        "3xl": "var(--font-size-3xl)",
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## 13. UI Design Principles

### 13.1 The Front/Home Page Defines the Overall Styling

The home page is the canonical reference for:
- Color usage
- Spacing rhythm
- Typography hierarchy
- Component patterns
- Animation style

**Before creating any new page or component, study the home page.**

### 13.2 Don't Clutter, Don't Overdo

- One primary action per screen.
- Whitespace is not empty space — it's breathing room.
- If a user needs a tooltip to understand a UI element, the UI is wrong.
- Every element must earn its place. If removing it doesn't hurt, remove it.

### 13.3 Be Simple, Be Well Thought Out, Be Intentional

- Every color choice has a reason.
- Every spacing value has a reason.
- Every component exists because it's needed, not because it's nice to have.
- If you can't explain why something is there, it shouldn't be.

### 13.4 Best UI Guidelines

- Follow established patterns (Figma, Material, Apple HIG).
- Consistent alignment — everything aligns to a grid.
- Visual hierarchy through size, weight, and color — never through decoration.
- Accessible by default: WCAG 2.1 AA minimum for contrast, keyboard navigation, and screen readers.

---

## 14. File and Folder Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Primitive components (Button, Input, Card)
│   ├── layout/         # Layout components (Header, Footer, Sidebar)
│   └── features/       # Feature-specific components
├── hooks/              # Custom React hooks
├── stores/             # Zustand stores
├── types/              # Global TypeScript types and interfaces
├── utils/              # Utility functions
├── lib/                # Third-party library configurations
├── styles/             # Global styles and CSS variables
├── pages/              # Page components (or app/ for Next.js App Router)
└── services/           # API and external service integrations
```

---

## 15. Import Order

```typescript
// 1. React and framework imports
import React, { useCallback, useMemo } from "react";

// 2. Third-party libraries
import { create } from "zustand";

// 3. Absolute imports (aliases)
import { Button } from "@/components/ui/Button";
import { useUserStore } from "@/stores/userStore";

// 4. Relative imports
import { formatDate } from "../utils/date";

// 5. Type-only imports
import type { User, UserCardProps } from "@/types";
```

---

## 16. Naming Conventions

| Category | Convention | Example |
|----------|-----------|---------|
| Components | PascalCase | `UserCard`, `ErrorBoundary` |
| Hooks | camelCase, prefix `use` | `useUserStore`, `useDebounce` |
| Stores | camelCase, prefix `use` | `useUserStore` |
| Types/Interfaces | PascalCase | `User`, `UserCardProps` |
| Constants | UPPER_SNAKE_CASE | `API_BASE_URL`, `MAX_RETRY_COUNT` |
| Functions | camelCase, arrow functions | `getUser`, `handleClick` |
| Boolean props | prefix `is`, `has`, `should` | `isLoading`, `hasError`, `shouldRender` |
| Event handlers | prefix `handle` | `handleClick`, `handleSubmit` |

---

## 17. Code Review Checklist

Before marking any task as complete, verify:

- [ ] All variables have explicit types
- [ ] All functions are arrow functions with explicit return types
- [ ] All props have explicit interfaces
- [ ] No large objects are passed directly as props
- [ ] All functions have TSDoc comments
- [ ] All callbacks use `useCallback`
- [ ] All components use `React.memo` where appropriate
- [ ] State is in Zustand, not `useState`, unless purely local
- [ ] Error boundaries wrap every route and major feature
- [ ] No magic numbers — all values come from Tailwind or CSS variables
- [ ] Binary spacing scale is followed
- [ ] Responsive typography matches the spec (12px phone, 14px tablet, 16px desktop)
- [ ] Home page styling is referenced and followed
- [ ] SOLID principles are respected
- [ ] KISS principle is respected
- [ ] No clutter, no over-engineering

---

**These guidelines are working if:** the codebase is predictable, maintainable, performant, and every line of code has a clear, intentional reason to exist.

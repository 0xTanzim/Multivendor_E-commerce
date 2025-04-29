# 🧠 Copilot / VS Code Agent Instructions for Monorepo E-Commerce Platform

These are strict, professional-grade coding standards and architectural rules for GitHub Copilot (or any similar AI agent) to follow **without deviation**. This project is a **Next.js + Turborepo monorepo** designed using **OOP, clean architecture, and single responsibility principles**. Follow this to ensure code suggestions fully align with our architecture.

---

## 📌 CORE PRINCIPLES TO ALWAYS FOLLOW

✅ **Follow Existing Code Pattern:**

- You **must follow existing repository/service structure**.
- Avoid reinventing logic/structure. Study `@repo/core`, `@repo/backend-services`, and `@repo/backend-repository`.
- Always use existing DI pattern via `@repo/core/container` with `tsyringe`.

✅ **No Garbage Code:**

- All code must be clean, maintainable, readable.
- Avoid commented-out logic, unused variables, or unstructured functions.
- Do not generate code that mixes concerns or responsibilities.

✅ **Always Apply SRP (Single Responsibility Principle):**

- Each class, function, component must do **one thing only**.
- If something does more, break it into smaller parts/components.

✅ **Code Must Be Predictable:**

- Do not invent your own way of fetching data, instantiating classes, handling errors.
- Always extend from `BaseService`, `BaseRepository`, and register via `tsyringe`.

✅ **Use Best Practices for All Layers:**

- Use `DTOs` from `@repo/types`, not inline `any` types.
- Map DB schema properly via Prisma schema files.
- Handle errors using centralized `@repo/common/error` classes only.

✅ **Be Consistent With Imports and Structure:**

- Import internal packages using `@repo/*`
- Follow the layering pattern: `controller (API route)` → `service` → `repository` → `Prisma delegate`

✅ **Use TypeScript Strictly:**

- Avoid `any`, `unknown`, or dynamic typing. Type all function params and returns properly.
- Use utility types and generic inference when dealing with `TModel` and `TRepository` in Base classes.

✅ **Apply Dependency Injection Rigorously:**

- Use `@injectable()`, `@inject()`, and register new dependencies using `tsyringe`.
- Never use `new Class()` directly. Always `container.resolve(SomeService)`.

✅ **No Logic Inside Components (React):**

- Never fetch or mutate data directly inside a UI component.
- Use services/hooks that encapsulate logic.

✅ **Use Next.js Features Properly:**

- Always prioritize **Server-Side Rendering (SSR)** for `page.tsx` files.

- Minimize `client` usage — only for interaction-heavy or browser-specific features.

- Extract and reuse **React Design Patterns** (like HOC, Compound Components, Render Props, Context Provider Pattern) where complexity demands it.

- Implement **layouts** using `app/layout.tsx` structure to share layout logic.

---

## 📦 Monorepo Structure Summary

- `apps/web` → Next.js app with SSR/CSR mix
- `packages/backend-repository` → Prisma + Repo abstraction
- `packages/backend-services` → Business logic layer
- `packages/core` → Base classes, DI container, shared interfaces
- `packages/database` → Prisma schema split by domain
- `packages/types` → Shared DTOs & types
- `packages/common` → Error handling, shared utilities
- `packages/redux` → RTK slices for client-side state

---

## 🧱 React Component Creation Rules (Rewritten & Improved)

### ✅ Create a Component When:

- UI is reused in 2+ places
- JSX exceeds 60 lines
- Logic is complex (multiple conditions, effects, or 3+ hooks)
- There is a distinct **semantic role** (e.g. `CartItem`, `ProductHeader`, `TrainingStep`)
- There is a **separation between visual structure and logic** (SRP)

### ❌ Do NOT Create a Component When:

- It's used once and is simple
- It’s only a styled element with no interaction or logic
- It just wraps one HTML tag (like a span with a class)

### ✅ Composition Best Practice

```tsx
<Card>
  <CardHeader title="Order Summary" />
  <CardBody>
    <ProductList items={products} />
  </CardBody>
</Card>
```

> 🧼 Break large JSX trees into semantic chunks. Use composition over nesting.

### 🧠 Clean Up Every Component

- Extract inner logic to hooks if needed
- Avoid inline conditionals that clutter JSX
- Avoid defining functions inside render blocks (move to top or hooks)

---

## 🎨 TailwindCSS Best Practices

- Prefer utility classes inline
- Use `classNames()` or template literals for dynamic styles
- Avoid overuse of `@apply`, prefer components for repeated patterns
- Define all custom design tokens in `tailwind.config.ts`

---

## ⚙️ Next.js Directives and Lazy Loading

### `"use client"` Usage

| Directive        | When to Use                                      |
| ---------------- | ------------------------------------------------ |
| `client:load`    | For navbar, modal toggles, and authentication UI |
| `client:idle`    | For non-critical footers, tooltips, banners      |
| `client:only`    | Components using `window`, `localStorage`, etc.  |
| `client:visible` | Lazy-hydrate below-the-fold components           |

Use `dynamic(() => import(...))` for:

- Modals
- Charts (e.g., `WeeklySalesChart`)
- Side panels

---

## 🚀 TurboRepo Instructions

### Dependency Rules

- Declare `@repo/*` dependencies in `package.json` using `workspace:*`
- Never import app code into another app
- Never depend on a package outside your declared boundaries

### Scripts and Pipelines

- Define build/lint/test in `turbo.json`
- Use `turbo run` to run commands across apps/packages
- Leverage `dependsOn` and `outputs` correctly

### Examples

```bash
# Run all builds
pnpm turbo run build

# Build just the backend services
pnpm turbo run build --filter=@repo/backend-services
```

### Testing and CI

- Tests should exist in `/test` or `__tests__` folders inside packages
- Use mocked repositories/services in unit tests
- CI scripts run `build`, `lint`, and `test` using `pnpm turbo run`

---

## ✅ Agent Behavior Checklist

| ✅ Must Do                                      | ❌ Never Do                             |
| ----------------------------------------------- | --------------------------------------- |
| Follow our BaseService & BaseRepository pattern | Skip DI or use new Class()              |
| Use clean, named imports                        | Use relative paths across packages      |
| Create SRP-based components                     | Mix UI, logic, and data in one file     |
| Inject dependencies with `tsyringe`             | Invent alternate patterns               |
| Export only domain-specific logic from `types`  | Export everything or use `any` types    |
| Prioritize SSR using Server Components          | Turn every page into a client component |

---

## 📈 Future Extensions (Optional)

- Create `@repo/guards` for RBAC decorators
- Add global `LoggerService` via DI
- Build command/query handler system
- Introduce `EventEmitter` or RabbitMQ-based pub/sub
- Add `Zod`-based runtime validation layer

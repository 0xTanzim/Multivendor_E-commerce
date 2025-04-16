# Copilot Instructions

This document provides guidelines for using GitHub Copilot (or similar VS Code agents) effectively in our Next.js project with a Turborepo monorepo setup. Follow these best practices to ensure clean, maintainable, and performant code.

## Component Creation Guidelines

### When to Create a New Component

Create a new React component when:

- **Reusable UI**: The UI element will be reused in multiple places (e.g., a `Button` or `Card` component).
- **Code Length**: A section of UI exceeds 100 lines of JSX/TSX.
- **Single Responsibility**: A section has a distinct responsibility or purpose (e.g., a `FormHeader` for form titles and actions).
- **Complex Logic**: The logic becomes complex, involving more than 3 state variables or hooks (e.g., a form with validation).
- **Interaction Patterns**: The component has a specific interaction pattern, such as a dropdown, modal, or carousel.

### When NOT to Create a New Component

Avoid creating components when:

- **One-Time Use**: The component is used only once and is simple (under 40 lines of code).
- **Too Granular**: The component is overly specific with no special behavior (e.g., a single styled `<button>` without logic).
- **File Size Focus**: Breaking a component just to make files smaller without a functional reason.

### Single Responsibility Principle (SRP)

Every component should have a single, clear responsibility. For example:

- A `Card` component should only handle layout and styling.
- A `CardHeader` component should manage the header content and actions.
- Avoid mixing unrelated logic (e.g., data fetching and UI rendering) in one component.

## Tailwind Best Practices

- **Utility-First**: Use Tailwind's utility classes directly in JSX/TSX for most styling (e.g., `<div className="p-4 bg-blue-500 rounded-md">`).
- **Extract Reusable Patterns**: For repeated Tailwind patterns, create a component instead of custom CSS classes (e.g., a `Card` component for a common card layout).
- **Group Classes for Complex Components**: Use template literals to group Tailwind classes for readability:
  ```tsx
  const cardStyles = 'p-4 border rounded-lg shadow-md bg-white';
  return <div className={cardStyles}>...</div>;
  ```
- **Use @apply Sparingly**: Only use Tailwind's `@apply` directive for highly reused patterns in `apps/web/src/style/main.scss`, and prefer components otherwise.
- **Consistent Design System**: Define spacing, colors, and typography in `tailwind.config.ts` for consistency (e.g., `theme.extend.colors` for brand colors).

## Component Composition Example

### Bad: Overly Nested and Complex

Avoid deeply nested JSX with inline styling that mixes responsibilities:

```tsx
<div className="p-4 border rounded-lg shadow-md">
  <div className="flex flex-col space-y-4">
    <div className="bg-gray-100 p-3 rounded">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">{title}</h3>
        {isEditable && (
          <div className="flex space-x-2">
            <button className="px-2 py-1 bg-blue-500 text-white rounded">
              Edit
            </button>
            <button className="px-2 py-1 bg-red-500 text-white rounded">
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
</div>
```

### Good: Flatter, Component-Based Approach

Break down the UI into components with single responsibilities:

```tsx
<Card>
  <CardHeader>
    <h3 className="text-lg font-bold">{title}</h3>
    {isEditable && <ActionButtons actions={['edit', 'delete']} />}
  </CardHeader>
</Card>
```

- `Card`: Handles the outer layout and styling (padding, border, shadow).
- `CardHeader`: Manages the header section (title and actions).
- `ActionButtons`: Encapsulates the edit/delete buttons and their logic.

## Next.js "use client" Directives

Add `"use client"` directives only where necessary in Next.js components:

- **client:load**: Hydrate the component immediately on page load (e.g., for critical interactive components like `Navbar`).
- **client:idle**: Hydrate once the browser is idle (e.g., for non-critical components like a `Footer`).
- **client:visible**: Hydrate when the component is visible in the viewport (e.g., for a `ProductImageCarousel` below the fold).
- **client:only**: Render only on the client-side, never server-side (e.g., for components relying on browser APIs like `window`).

### Example

```tsx
'use client';

import { useEffect, useState } from 'react';

export function ClientOnlyComponent() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <div>Rendered only on the client</div>;
}
```

## Lazy Loading for Heavier Components

Implement lazy loading for heavy React components to improve performance:

- Use `client:only` for components that don’t need server-side rendering (SSR).
- Use Next.js dynamic imports with `React.lazy` for components like modals or charts:

### Example

```tsx
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('../components/HeavyComponent'), {
  ssr: false, // Disable SSR
  loading: () => <div>Loading...</div>,
});

export function ParentComponent() {
  return (
    <div>
      <HeavyComponent />
    </div>
  );
}
```

- Place heavy components in `apps/web/src/components` and ensure they are only loaded when needed (e.g., `WeeklySalesChart.tsx` in `apps/web/src/app/(back-office)/dashboard/_components`).

## Turborepo Best Practices

Since this project uses Turborepo for managing our monorepo, follow these rules to ensure consistency, scalability, and efficient builds across `apps` and `packages`.

### Dependency Management

- **Explicit Dependencies**: Define all dependencies in the `package.json` of the respective package or app (e.g., `apps/web/package.json`, `packages/database/package.json`). Avoid relying on implicit dependencies from the root `package.json`.
- **Workspace Dependencies**: Use Turborepo workspaces to reference internal packages. For example, in `apps/web/package.json`, reference a package like `@repo/database` as a dependency:
  ```json
  "dependencies": {
    "@repo/database": "workspace:*"
  }
  ```
- **Avoid Circular Dependencies**: Ensure there are no circular dependencies between packages (e.g., `packages/backend-services` should not depend on `apps/web`). Use `pnpm` to catch these issues during installation.

### Scripts and Pipelines

- **Define Scripts in `turbo.json`**: Use `turbo.json` to define build, lint, and dev pipelines for all packages and apps. For example:
  ```json
  {
    "pipeline": {
      "build": {
        "dependsOn": ["^build"],
        "outputs": ["dist/**"]
      },
      "lint": {
        "dependsOn": ["^lint"]
      },
      "dev": {
        "cache": false
      }
    }
  }
  ```
- **Consistent Scripts Across Packages**: Ensure each package has consistent scripts (e.g., `build`, `lint`, `test`) in its `package.json`. For example, in `packages/database/package.json`:
  ```json
  "scripts": {
    "build": "tsc",
    "lint": "eslint . --ext .ts"
  }
  ```
- **Run Scripts with Turbo**: Use `turbo run` to execute scripts across the monorepo, leveraging Turborepo's caching and parallelization. For example:
  ```bash
  turbo run build --filter=web
  ```

### Package Boundaries

- **Separation of Concerns**: Each package in `packages` should have a single responsibility:
  - `packages/database`: Handles database schema and Prisma client.
  - `packages/backend-services`: Contains business logic and services.
  - `packages/redux`: Manages state with Redux slices and store.
- **No Direct App-to-App Imports**: Apps like `apps/web` should not import from other apps. Instead, share code through packages (e.g., `packages/common` for shared utilities).
- **Export Only What’s Needed**: In each package, only export what’s necessary in `index.ts`. For example, in `packages/utils/src/index.ts`:
  ```ts
  export * from './convert';
  export * from './data-generate';
  export * from './date';
  ```

### TypeScript and Linting

- **Centralized TypeScript Config**: Use the shared TypeScript configurations in `tooling/typescript-config` (e.g., `base.json`, `nextjs.json`) to ensure consistency across packages. Reference them in each `tsconfig.json`:
  ```json
  {
    "extends": "../../tooling/typescript-config/nextjs.json",
    "compilerOptions": {
      "outDir": "dist"
    }
  }
  ```
- **Centralized ESLint Config**: Use the shared ESLint configurations in `tooling/eslint-config` (e.g., `nextjs.js`) to enforce linting rules across all packages. Reference them in `.eslintrc` files or the root `eslint.config.mjs`.
- **Type Safety Across Packages**: When generating code, ensure TypeScript types are exported from `packages/types` and used consistently (e.g., `packages/types/src/product/product.ts` for product-related types).

### Testing and CI/CD

- **Add Tests in Packages**: Place tests in a `test` directory within each package (e.g., `packages/backend-services/src/test`). Use Turborepo to run tests across all packages:
  ```bash
  turbo run test
  ```
- **CI/CD with GitHub Actions**: Update `.github/workflows/build.yml` to run Turborepo commands for linting, building, and testing. For example:
  ```yaml
  jobs:
    build:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v3
        - uses: pnpm/action-setup@v2
          with:
            version: 8
        - run: pnpm install
        - run: pnpm turbo run build lint test
  ```

### Performance and Caching

- **Leverage Turborepo Caching**: Use Turborepo’s caching to avoid rebuilding unchanged packages. Ensure `outputs` in `turbo.json` are correctly set for each pipeline (e.g., `dist/**` for `build`).
- **Optimize Build Order**: Use `dependsOn` in `turbo.json` to ensure dependent packages are built first (e.g., `packages/database` before `packages/backend-services`).

# Contributing Guidelines

## Setup & Development

**Prerequisites**: Node.js 18+ and npm

**Install & Run**

```bash
npm install          # Install dependencies
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Build for production
npm run lint         # Run ESLint
npm start            # Start production server
```

## Code Standards

### Formatting & Linting

- **Formatter**: Prettier with Tailwind CSS plugin (auto-sorts classes)
- **Linter**: ESLint with Next.js/TypeScript configs
- **Before committing**: Ensure `npm run lint` passes with no errors
- Use `"use client"` directive for client-side components

### TypeScript

- Maintain strict mode (`"strict": true`)
- Define types in `src/types/index.ts` for shared types
- Use path aliases: `@/components`, `@/config`, `@/hooks`, `@/utils`
- Avoid `any` types; use unions or generics instead

### Naming Conventions

- **Components**: PascalCase (`MyComponent.tsx`)
- **Utilities & Hooks**: camelCase (`useWindowDimensions.tsx`)
- **Files**: kebab-case except for React components
- **Config exports**: camelCase objects (`siteConfig`, `pageParents`)

## Project Organization

**Adding Pages**

1. Create directory under `src/app/[section]/[feature]/`
2. Add `page.tsx` with `"use client"` and metadata export
3. Update `src/config/site.ts` with page route
4. Add navbar/breadcrumb entries if needed

**Creating Components**

1. Place reusable components in `src/components/`
2. Export as default or named export
3. Use `@heroui/react` components for UI
4. Style with Tailwind utility classes
5. Add TypeScript prop interfaces

**Configuration Changes**

1. Update `src/config/site.ts` for routes, labels, branding
2. Update `src/config/data.ts` for dates, URLs, registration periods
3. Keep configuration centralized—avoid hardcoding values in components

## Styling & Components

- **Tailwind CSS v4**: Mobile-first responsive design (`sm:`, `md:`, `lg:`, etc.)
- **HeroUI v3 Components**: Use for buttons, alerts, tables, forms
- **No direct CSS**: Avoid CSS files except `src/styles/globals.css` and `fonts.ts`
- **Responsive Hooks**: Use `useWindowDimensions()` for viewport tracking
- **Class Sorting**: Prettier auto-sorts Tailwind classes alphabetically

## Common Patterns

**Reusable Tables**

- Use `dynamicTable.tsx` for generic data display
- Import specific table components like `allTimeIndividualsTable.tsx`
- Keep table logic separate from styling

**Link Components**

- Use `BaseLink` for internal/external links with consistent styling
- Use `ButtonLink` for button-styled links
- Prefer these over native `<a>` or `<Link>` tags

**External Integrations**

- Store URLs in `src/config/data.ts` under `urls` object
- Use `ButtonLink` with `isExternal={true}` prop
- Link to Athletic.net, RunnerSpace, Google Forms from config

**Responsive Layouts**

- Use custom `useWindowDimensions()` hook for viewport changes
- Test on mobile, tablet, desktop breakpoints
- Use `useUserAgent()` for browser-specific logic (Firefox checks)

## Before Committing

1. **Lint**: Run `npm run lint` and fix all errors
2. **Type Check**: Verify TypeScript compiles without errors
3. **Build Test**: Run `npm run build` locally to catch issues
4. **Review**: Check that all Tailwind classes are properly sorted
5. **Test**: Verify responsive behavior at multiple breakpoints

## Performance Best Practices

- Keep components lightweight; extract logic to custom hooks
- Use Next.js Image component for images in `public/`
- Leverage static generation for configuration-driven content
- Minimize client-side interactivity; prefer server-side rendering
- Use Vercel Analytics to monitor Core Web Vitals

## Structure for New Features

1. Create page under `src/app/[section]/[feature]/page.tsx`
2. Add route to `src/config/site.ts`
3. Create reusable components in `src/components/` if needed
4. Add configuration data to `src/config/` if required
5. Update navigation/breadcrumbs in related components
6. Test responsive behavior and ESLint compliance

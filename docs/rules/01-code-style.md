# Code Style & TypeScript Standards
> **Always On**

## TypeScript
- Strict mode enabled in all packages. Never use `any` — use `unknown` + type guards if needed.
- Prefer `interface` for object shapes that may be extended; `type` for unions, primitives, and computed types.
- Never use `enum` — use `as const` objects or string union types instead.
- All function parameters and return types must be explicitly typed.
- Use optional chaining (`?.`) and nullish coalescing (`??`) over manual null checks.

## Naming Conventions
- **Files/folders**: kebab-case (`auth-middleware.ts`, `payment-card.tsx`)
- **Components**: PascalCase (`PaymentCard.tsx`)
- **Variables/functions**: camelCase (`getUserById`, `isLoading`)
- **Constants**: SCREAMING_SNAKE_CASE (`MAX_PLAYERS`, `FIREBASE_PROJECT_ID`)
- **Types/Interfaces**: PascalCase (`PaymentStatus`, `CreateGroupDto`)
- **Boolean variables**: prefix with `is`, `has`, `can`, `should` (`isLoading`, `hasError`, `canConfirm`)

## React / React Native
- Functional components only. No class components.
- Always use named exports for components. No default exports except for Next.js pages/layouts.
- Keep components small — if JSX exceeds ~80 lines, extract sub-components.
- Custom hooks for any logic shared between 2+ components (prefix with `use`).
- Never put business logic inside components — use hooks and services.

## Formatting
- 2-space indentation
- Single quotes for strings
- Trailing commas in multi-line objects/arrays
- Prettier config is the source of truth — never override with inline comments

## Imports Order (enforced by ESLint)
1. Node built-ins
2. External packages
3. Internal packages (`@sportspay/*`)
4. Relative imports (`../`, `./`)
5. Type-only imports last (`import type { ... }`)

## Error Handling
- Always handle errors explicitly — no silent `catch (e) {}`
- API Routes: return structured JSON `{ error: string, code?: string }` with correct HTTP status
- Never expose internal error details (stack traces, DB errors) to the client
- Log errors with context: `console.error('[payments] generate failed:', error)`

## Comments
- Write comments to explain **why**, not **what**
- JSDoc for all exported functions in `packages/shared`
- TODO comments must include author and ticket: `// TODO(@username): fix after #123`

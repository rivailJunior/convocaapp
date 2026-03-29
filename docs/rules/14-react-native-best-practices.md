# React Native Best Practices
> **Always On** — Read this before creating any new screen or component in `packages/app`.

## Component Architecture

- Split every screen into small, focused components. If a section of JSX can be named, extract it.
- Before creating a component, check `src/components/` — reuse what already exists.
- Keep screen files (`app/*.tsx`) thin: import components and hooks, compose them, nothing else.

```tsx
// app/event-details.tsx — screen is just composition
export default function EventDetailsScreen() {
  const { event, isLoading } = useEventDetails();

  if (isLoading) return <LoadingIndicator />;

  return (
    <ScreenShell>
      <EventHeader event={event} />
      <AttendanceList eventId={event.id} />
      <EventActions event={event} />
    </ScreenShell>
  );
}
```

## Props Over Mocks

- Never hardcode data inside components. Always receive values through props.
- Define a props type for every component that accepts external data.
- The caller is responsible for passing the correct props — the component only renders.

```tsx
// Good
type EventCardProps = {
  title: string;
  date: string;
  playerCount: number;
};

export function EventCard({ title, date, playerCount }: EventCardProps) {
  return ( /* ... */ );
}

// Bad — hardcoded data inside component
export function EventCard() {
  const title = 'Futebol de Quarta'; // never do this
}
```

## Types Over Interfaces

- Use `type` for all shapes: props, state, function signatures, API responses.
- Reserve `interface` only when you explicitly need declaration merging (rare).

```tsx
// Preferred
type PlayerSlotProps = {
  variant: 'a' | 'b';
};

// Avoid
interface PlayerSlotProps {
  variant: 'a' | 'b';
}
```

## Hooks Out of the Screen

- Extract all stateful logic, effects, and derived data into custom hooks.
- Hooks live in `src/hooks/` and are prefixed with `use`.
- Screens call hooks and pass results to components — no `useState`/`useEffect` in screen files.

```tsx
// src/hooks/useOnboarding.ts
export function useOnboarding(totalSlides: number) {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const isLastSlide = activeIndex === totalSlides - 1;

  const goToNext = () => { /* ... */ };
  const goBack = () => { /* ... */ };

  return { activeIndex, flatListRef, isLastSlide, goToNext, goBack };
}
```

## Minimal Comments

- Code should be self-explanatory through naming. Avoid comments that describe what the code does.
- Only comment to explain **why** something non-obvious exists.
- Never leave commented-out code.

```tsx
// Bad
// This is the header view
<View className="flex-row items-center justify-between px-4 h-14">

// Good — only when intent is unclear
{/* Offset bottom padding to account for the fixed action bar */}
<View className="pb-48">
```

## Styling & Design System

- Use NativeWind (Tailwind classes via `className`). Never use `StyleSheet.create`.
- Reference the design tokens in `tailwind.config.js` — never hardcode hex colors.
- Follow the surface hierarchy for depth: `surface` → `surface-container-low` → `surface-container-lowest`.
- No 1px borders. Use tonal background shifts to create boundaries.
- No pure black (`#000`). Use `text-on-surface` for text.
- No `secondary-fixed` / lime for body text — it's action-only.
- Use asymmetric spacing for forward motion (e.g., `mt-4 mb-12`).
- Cards: `rounded-xl`, no borders, `p-4` internal spacing.
- Lists: no dividers — use `gap-6` between items.

## File & Naming

- Files: kebab-case (`page-indicator.tsx`, `event-card.tsx`).
- Components: PascalCase (`PageIndicator`, `EventCard`).
- Hooks: camelCase prefixed with `use` (`useOnboarding`, `useEventDetails`).
- Constants: SCREAMING_SNAKE_CASE (`TOTAL_SLIDES`, `SCREEN_WIDTH`).
- Booleans: prefix with `is`, `has`, `can`, `should`.

## Folder Structure

```
packages/app/
├── app/                  # Screens (routes) — thin composition only
├── src/
│   ├── components/       # Reusable UI components grouped by feature
│   │   ├── onboarding/
│   │   ├── event/
│   │   └── shared/       # Cross-feature components (buttons, indicators)
│   ├── hooks/            # Custom hooks
│   └── services/         # API clients, external integrations
```

## Checklist Before Creating a New Screen

1. Search `src/components/` for existing components you can reuse.
2. Define the data shape as `type` — props for each component.
3. Extract all logic into a custom hook in `src/hooks/`.
4. Build small components that receive props — no internal mocks.
5. Compose everything in the screen file under `app/`.
6. Use design tokens from `tailwind.config.js` — no raw hex values.
7. Remove unnecessary comments. Name things clearly instead.

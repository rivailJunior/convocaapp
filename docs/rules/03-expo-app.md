# Expo App Rules & Best Practices
> **Always On** — Read this before creating any new screen, component, or service in `packages/app`.

## Expo Router (File-based Navigation)

- Every file inside `app/` is automatically a route. Name files by what they represent.
- Route groups: `(auth)` for unauthenticated screens, `(admin)` for admin-only, `(user)` for members, `(shared)` for both.
- Use `_layout.tsx` inside each group for the navigator (Stack, Tabs).
- Typed routes enabled — always use `router.push('/path')` with the correct path string.

## Authentication Gate

- `app/_layout.tsx` (root layout) handles the auth gate: redirect to `/(auth)` if no session, else to `/(admin)` or `/(user)` based on role.
- Check `adminGroupIds.length > 0` to determine if user is an admin.
- Use `expo-secure-store` to persist the Firebase token — never `AsyncStorage` for sensitive data.

## Google Sign-In

```ts
import { GoogleSignin } from '@react-native-google-signin/google-signin'

GoogleSignin.configure({ webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID })

const { idToken } = await GoogleSignin.signIn()
const credential = GoogleAuthProvider.credential(idToken)
await signInWithCredential(auth, credential)
```
- Never use `signInWithPopup` or `signInWithRedirect` in React Native — use the native SDK above.

## API Communication

- All HTTP calls go through `services/api.ts` (Axios instance with base URL + token interceptor).
- The interceptor automatically attaches the Firebase JWT to every request.
- Never hardcode the API base URL — use `process.env.EXPO_PUBLIC_API_URL`.

## Real-Time (Firestore onSnapshot)

- Only use `onSnapshot` for the event attendance list — this is the only real-time feature.
- Always unsubscribe in the `useEffect` cleanup.

## Styling (App-Specific)

- No `StyleSheet.create`.
- NativeWind v4: import `{ cssInterop }` for third-party components that need Tailwind support.
- Follow the surface hierarchy for depth: `surface` → `surface-container-low` → `surface-container-lowest`.
- No 1px borders. Use tonal background shifts to create boundaries.
- No pure black (`#000`). Use `text-on-surface` for text.
- No `secondary-fixed` / lime for body text — it's action-only.
- Cards: `rounded-xl`, no borders, `p-4` internal spacing.
- Lists: no dividers — use `gap-6` between items.

## React Query Setup

- `QueryClient` configured in root `_layout.tsx` with `staleTime: 1000 * 60` (1 min default).
- Each resource has its own hook in `packages/shared`: `useGroups`, `usePayments`, `useEvent`.
- Mutation hooks (`useMutation`) must invalidate relevant queries on success.

## WhatsApp Integration

- Use `whatsappLink()` from `@sportspay/utils` to generate the URL.
- Open with `Linking.openURL(url)` — always wrap in try/catch.
- Never assume WhatsApp is installed — show a fallback (copy link) if `Linking.canOpenURL` returns false.

## Deep Linking

- Scheme: `sportspay://` for native app links.
- Firebase Dynamic Links handle the app-not-installed fallback to the web page.
- Handle incoming links in root `_layout.tsx` with `expo-linking`.

## Platform-Specific Code

- Use `.ios.tsx` / `.android.tsx` extensions only as last resort.
- Prefer `Platform.OS === 'ios'` inside a single file for minor differences.

## Folder Structure

```
packages/app/
├── app/                  # Screens (routes) — thin composition only
├── src/
│   ├── components/       # Reusable UI components grouped by feature
│   │   ├── onboarding/
│   │   ├── event/
│   │   └── shared/       # Cross-feature components (buttons, indicators)
│   └── services/         # API clients, external integrations
```

## Checklist Before Creating a New Screen

1. Search `src/components/` for existing components you can reuse.
2. Define the data shape as `type` in `packages/shared` — props for each component.
3. Extract all logic into custom hooks in `packages/shared`.
4. Build small components that receive props — no internal mocks.
5. Compose everything in the screen file under `app/`.
6. Use NativeWind classes exclusively — no `StyleSheet.create`, no inline styles.
7. Reference design tokens from `tailwind.config.js` — no raw hex values.
8. No comments. Name things clearly instead.

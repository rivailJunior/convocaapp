# Expo App Package Rules
> **Glob**: `packages/app/**`

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

// Configure once in root _layout.tsx
GoogleSignin.configure({ webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID })

// Sign in
const { idToken } = await GoogleSignin.signIn()
const credential = GoogleAuthProvider.credential(idToken)
await signInWithCredential(auth, credential)
```
- Never use `signInWithPopup` or `signInWithRedirect` in React Native — use the native SDK above.

## API Communication
- All HTTP calls go through `services/api.ts` (Axios instance with base URL + token interceptor).
- The interceptor automatically attaches the Firebase JWT to every request:
```ts
instance.interceptors.request.use(async (config) => {
  const token = await auth.currentUser?.getIdToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})
```
- Never hardcode the API base URL — use `process.env.EXPO_PUBLIC_API_URL`.

## Real-Time (Firestore onSnapshot)
- Only use `onSnapshot` for the event attendance list — this is the only real-time feature.
- Always unsubscribe in the `useEffect` cleanup:
```ts
useEffect(() => {
  const unsub = onSnapshot(query, (snap) => { ... })
  return () => unsub()
}, [eventId])
```

## Styling (NativeWind)
- Use Tailwind class strings via NativeWind. Never use `StyleSheet.create`.
- NativeWind v4: import `{ cssInterop }` for third-party components that need Tailwind support.
- Common pattern: `className="flex-1 bg-white p-4"`

## React Query Setup
- `QueryClient` configured in root `_layout.tsx` with `staleTime: 1000 * 60` (1 min default).
- Each resource has its own hook: `useGroups`, `usePayments`, `useEvent`.
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

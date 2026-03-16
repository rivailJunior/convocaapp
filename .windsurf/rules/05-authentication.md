# Authentication Rules
> **Glob**: `packages/**` — **Model Decision**: apply when working on login, auth, user sessions

## Strategy
- **MVP**: Google OAuth only via Firebase Auth.
- **Phase 2**: Facebook OAuth (requires Meta app review — do not implement until approved).
- **NEVER**: SMS OTP, email/password, phone auth. These are removed from scope.

## Google OAuth — App (React Native)
```ts
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin'
import { GoogleAuthProvider, signInWithCredential } from '@react-native-firebase/auth'

// 1. Configure once at app startup (_layout.tsx)
GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID, // from Google Cloud Console
})

// 2. Sign in function
async function signInWithGoogle() {
  await GoogleSignin.hasPlayServices()
  const { idToken } = await GoogleSignin.signIn()
  const credential = GoogleAuthProvider.credential(idToken)
  const userCredential = await signInWithCredential(firebaseAuth, credential)
  return userCredential.user
}
```

## Google OAuth — Web (Next.js)
```ts
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { firebaseAuth } from '@/lib/firebase-client'

async function signInWithGoogle() {
  const provider = new GoogleAuthProvider()
  const result = await signInWithPopup(firebaseAuth, provider)
  return result.user
}
```

## Post-Login: Create/Update User Document
After every successful login, call `POST /api/auth/register` to upsert the user doc in Firestore:
```ts
await apiClient.post('/api/auth/register', {
  name: user.displayName,
  email: user.email,
  avatarUrl: user.photoURL,
})
```
The API Route uses `setDoc` with `{ merge: true }` — safe to call on every login.

## Token Management (App)
- Store the Firebase JWT in `expo-secure-store` under key `'auth_token'`.
- Refresh token before API calls: `await auth.currentUser?.getIdToken(true)`.
- On logout: call `GoogleSignin.signOut()` AND `firebaseAuth.signOut()` AND delete from SecureStore.

## Auth Guard (App — root `_layout.tsx`)
```ts
const { user, loading } = useAuth()

if (loading) return <SplashScreen />
if (!user) return <Redirect href="/(auth)/login" />
```

## Auth Guard (Web — `middleware.ts`)
```ts
export async function middleware(request: NextRequest) {
  const token = request.cookies.get('firebase_token')?.value
  if (!token && request.nextUrl.pathname.startsWith('/(admin)')) {
    return NextResponse.redirect(new URL('/(auth)/login', request.url))
  }
}
export const config = { matcher: ['/(admin)/:path*'] }
```

## User Profile Data
- `name`: from Google display name (editable by user later)
- `email`: from Google account (read-only, identifier)
- `avatarUrl`: from Google photo URL initially, replaceable with S3 upload
- `phone`: NOT collected during signup. Optional field user can add in settings.

## What NOT to Do
- Never redirect to a phone/OTP screen after Google sign-in.
- Never ask for email and password.
- Never implement Firebase `sendSignInLinkToEmail`.
- Never use `signInWithRedirect` in the app (use native SDK).

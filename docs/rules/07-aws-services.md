# AWS Services
> **Glob**: `packages/web/**`
> **Model Decision**: apply when working on file uploads, cron jobs, environment variables, deployment

## S3 — File Storage
Used for: user avatars, group avatars.

### Upload Flow (pre-signed URL)
The client NEVER uploads through the API. The API generates a pre-signed URL and the client uploads directly to S3:

```ts
// 1. App/Web calls: POST /api/upload
// Body: { filename: 'avatar.jpg', contentType: 'image/jpeg', scope: 'avatars' }
// Returns: { uploadUrl: string, publicUrl: string }

// 2. Client uploads directly to S3
await fetch(uploadUrl, {
  method: 'PUT',
  body: file,
  headers: { 'Content-Type': contentType }
})

// 3. Client saves publicUrl to user/group document via PATCH /api/auth/me or PATCH /api/groups/:id
```

### S3 Key Structure
```
avatars/users/{uid}/{timestamp}.jpg
avatars/groups/{groupId}/{timestamp}.jpg
```

### Pre-signed URL Generation
```ts
// lib/s3.ts
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const s3 = new S3Client({ region: process.env.AWS_REGION })

export async function generateUploadUrl(key: string, contentType: string) {
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  })
  return getSignedUrl(s3, command, { expiresIn: 300 }) // 5 min expiry
}
```

## EventBridge Scheduler — Cron Jobs
Cron jobs are NOT handled in Next.js code. They are AWS EventBridge rules that call API endpoints.

### Scheduled Jobs
| Job | Cron Expression | Endpoint |
|-----|----------------|----------|
| Generate monthly payments | `0 8 1 * ? *` (1st of month, 08:00 BRT) | `POST /api/cron/generate-payments` |
| Generate recurring events | `0 7 ? * MON *` (Every Monday, 07:00 BRT) | `POST /api/cron/generate-events` |
| Overdue payment alerts | `0 9 5,15 * ? *` (5th and 15th, 09:00 BRT) | `POST /api/cron/overdue-alerts` |
| Cleanup expired invites | `0 3 ? * SUN *` (Every Sunday, 03:00 BRT) | `POST /api/cron/cleanup-invites` |

### Cron Endpoint Protection
```ts
// All /api/cron/** routes must start with this check
const secret = req.headers.get('x-cron-secret')
if (secret !== process.env.CRON_SECRET) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}
```

## AWS Amplify Hosting
- Next.js 14 with App Router is fully supported — SSR, ISR, and API Routes all work.
- Environment variables are set in the Amplify console (or `amplify.yml`).
- Never commit `.env.local` — use Amplify env vars for staging/prod.
- Preview deployments: every PR gets a unique URL automatically.

## Environment Variables Reference
```
# Firebase Admin (API Routes)
FIREBASE_ADMIN_SDK_JSON='{...}'   ← full service account JSON as string

# Asaas
ASAAS_API_KEY=...
ASAAS_BASE_URL=https://sandbox.asaas.com/api/v3   ← change to prod before launch
ASAAS_WEBHOOK_SECRET=...

# AWS
AWS_REGION=sa-east-1
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
S3_BUCKET_NAME=sportspay-uploads

# Cron
CRON_SECRET=...   ← random 32-char string, same in EventBridge config

# Public (exposed to browser/app)
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_GOOGLE_MAPS_KEY=...
EXPO_PUBLIC_API_URL=https://sportspay.app
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=...
```

import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { getMessaging } from 'firebase-admin/messaging';

function getFirebaseAdmin() {
  if (getApps().length > 0) {
    const app = getApps()[0]!;
    return {
      db: getFirestore(app),
      auth: getAuth(app),
      messaging: getMessaging(app),
    };
  }

  const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK_JSON ?? '{}');

  const app = initializeApp({
    credential: cert(serviceAccount),
  });

  return {
    db: getFirestore(app),
    auth: getAuth(app),
    messaging: getMessaging(app),
  };
}

export const { db, auth, messaging } = getFirebaseAdmin();

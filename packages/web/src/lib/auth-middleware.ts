import type { NextRequest } from 'next/server';

import { auth, db } from './firebase-admin';

interface VerifiedUser {
  uid: string;
  email?: string;
}

export async function verifyToken(req: NextRequest): Promise<VerifiedUser> {
  const authorization = req.headers.get('Authorization');

  if (!authorization?.startsWith('Bearer ')) {
    throw new Error('Missing or invalid Authorization header');
  }

  const token = authorization.split('Bearer ')[1];

  if (!token) {
    throw new Error('Token not found');
  }

  const decoded = await auth.verifyIdToken(token);

  return {
    uid: decoded.uid,
    email: decoded.email,
  };
}

export async function requireGroupAdmin(uid: string, groupId: string): Promise<void> {
  const groupDoc = await db.collection('groups').doc(groupId).get();

  if (!groupDoc.exists) {
    throw new Error('Group not found');
  }

  const group = groupDoc.data();
  const isAdmin = group?.adminId === uid;
  const isCoAdmin = Array.isArray(group?.coAdminIds) && group.coAdminIds.includes(uid);

  if (!isAdmin && !isCoAdmin) {
    throw new Error('User is not an admin of this group');
  }
}

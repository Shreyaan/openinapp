// utils/firebaseConfig.js
import { initializeApp, cert, getApps } from 'firebase-admin/app';

const firebaseAdminConfig = {
  credential: cert({
    project_id: process.env.FIREBASE_PROJECT_ID,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    private_key: process.env.FIREBASE_PRIVATE_KEY,
    type: 'service_account',
  } as any),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
};

export function customInitApp() {
  if (getApps().length <= 0) {
    initializeApp(firebaseAdminConfig);
  }
}

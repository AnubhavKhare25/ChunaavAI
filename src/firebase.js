import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getPerformance } from "firebase/performance";
import { getRemoteConfig, fetchAndActivate } from "firebase/remote-config";

/**
 * Powered by Firebase Analytics
 * Performance tracked using Firebase Performance Monitoring
 * Data handled via Firebase Firestore and Remote Config
 */

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_GA_ID
};

const app = initializeApp(firebaseConfig);

// Initialize Core Services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

// Initialize Analytics (Safe for SSR/Non-browser environments)
let analyticsInstance = null;
if (typeof window !== 'undefined') {
  try {
    analyticsInstance = getAnalytics(app);
  } catch (err) {
    console.warn("Analytics initialization failed:", err);
  }
}
export const analytics = analyticsInstance;

// Initialize Performance Monitoring
export const perf = typeof window !== 'undefined' ? getPerformance(app) : null;

// Initialize Remote Config
export const remoteConfig = typeof window !== 'undefined' ? getRemoteConfig(app) : null;
if (remoteConfig) {
  // Set fetch interval to 1 hour for free tier efficiency
  remoteConfig.settings.minimumFetchIntervalMillis = 3600000;
  fetchAndActivate(remoteConfig).catch(err => console.warn("Remote Config activation failed:", err));
}

export default app;

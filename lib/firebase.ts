import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported, logEvent as firebaseLogEvent, type Analytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBEoFUftQshcQTJY43aORRR0CT3YYOxji0",
  authDomain: "purecreativitypro.firebaseapp.com",
  projectId: "purecreativitypro",
  storageBucket: "purecreativitypro.firebasestorage.app",
  messagingSenderId: "631883342829",
  appId: "1:631883342829:web:8811e7a5529c998daa3de4",
  measurementId: "G-DC02RDT0NV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (only in browser environments that support it)
let analytics: Analytics | null = null;

isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});

// Helper to log custom events safely
export const logEvent = (eventName: string, params?: Record<string, string | number | boolean>) => {
  if (analytics) {
    firebaseLogEvent(analytics, eventName, params);
  }
};

// Log page views — called from the route-change hook
export const logPageView = (path: string, title: string) => {
  if (analytics) {
    firebaseLogEvent(analytics, 'page_view', {
      page_path: path,
      page_title: title,
    });
  }
};

export { app, analytics };

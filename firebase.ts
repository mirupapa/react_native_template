import * as firebase from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_APP_ID,
  FIREBASE_SENDER_ID,
  FIRE_BASE_MEASUREMENT_ID,
} from '@env'

// Initialize Firebase
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIRE_BASE_MEASUREMENT_ID,
}

const app = firebase.initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export { app, db, auth }

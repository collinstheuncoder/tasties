import firebase from "firebase";
import "firebase/firestore";

const config = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DB_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MSG_ID
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth;
const db = firebase.firestore();
const storage = firebase.storage();

const settings = {};

db.settings(settings);

export { auth, db, storage };

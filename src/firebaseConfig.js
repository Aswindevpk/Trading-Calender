import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZc92M4sVqEY2zkQFW_HZf0A_E4s3xmuY",
  authDomain: "calender-test-a6ece.firebaseapp.com",
  projectId: "calender-test-a6ece",
  storageBucket: "calender-test-a6ece.appspot.com",
  messagingSenderId: "601838519568",
  appId: "1:601838519568:web:cf128998302c2343b65195"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;

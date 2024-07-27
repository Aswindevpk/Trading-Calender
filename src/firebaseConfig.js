import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCZc92M4sVqEY2zkQFW_HZf0A_E4s3xmuY",
//   authDomain: "calender-test-a6ece.firebaseapp.com",
//   projectId: "calender-test-a6ece",
//   storageBucket: "calender-test-a6ece.appspot.com",
//   messagingSenderId: "601838519568",
//   appId: "1:601838519568:web:cf128998302c2343b65195"
// };

const firebaseConfig = {
  apiKey: "AIzaSyDe2dwHWZE5xld4I7rA6VWK3KOabIU_K58",
  authDomain: "trading-calender-6975d.firebaseapp.com",
  projectId: "trading-calender-6975d",
  storageBucket: "trading-calender-6975d.appspot.com",
  messagingSenderId: "969463158452",
  appId: "1:969463158452:web:63aa26cba6058d299469e1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;

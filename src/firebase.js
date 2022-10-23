import { getFirestore} from 'firebase/firestore';
import "firebase/auth"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getStorage } from "firebase/storage";





const firebaseConfig = {
    apiKey: "AIzaSyBNA-RICjWAt7d1A48IdtBcHOsh97_tBEU",
    authDomain: "disney-cc98e.firebaseapp.com",
    projectId: "disney-cc98e",
    storageBucket: "disney-cc98e.appspot.com",
    messagingSenderId: "634556578007",
    appId: "1:634556578007:web:aaac4ff636210944c1d892",
    measurementId: "G-620SEQQR0R"
  };

  
  
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = getFirestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  const storage = getStorage(firebaseApp);


export {auth, provider, storage };
export default db;

import Firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDagVw4Nk68UmT1n6n3R18KTxf6YZjAifc",
  authDomain: "sweettooth-e6c49.firebaseapp.com",
  databaseURL: "https://sweettooth-e6c49.firebaseio.com",
  projectId: "sweettooth-e6c49",
  storageBucket: "sweettooth-e6c49.appspot.com",
  messagingSenderId: "274067395902",
  appId: "1:274067395902:web:9508bca93552600766886f",
  measurementId: "G-YG1G8G8QZ1"
};



let app = Firebase.initializeApp(config);
export const db = app.database();

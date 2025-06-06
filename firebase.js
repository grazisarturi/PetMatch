import firebase from "firebase/compat/app";
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBu5Oclq6Jo49qbjTKoaudo6exgRjlwjHk",
    authDomain: "petmatch-2931c.firebaseapp.com",
    projectId: "petmatch-2931c",
    storageBucket: "petmatch-2931c.firebasestorage.app",
    messagingSenderId: "347078972376",
    appId: "1:347078972376:web:817bdd30942bf0c7f798ad"
};
if(!firebase.apps.length){
firebase.initializeApp(firebaseConfig)
}
export{firebase}
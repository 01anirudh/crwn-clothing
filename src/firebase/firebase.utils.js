import firebase from 'firebase/app'; 
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyB4McT6mkroYHkibKw1MuboKpkjz3WGHCU",
    authDomain: "crwn-db-79372.firebaseapp.com",
    projectId: "crwn-db-79372",
    storageBucket: "crwn-db-79372.appspot.com",
    messagingSenderId: "426430966354",
    appId: "1:426430966354:web:8feca8054907c907e74d8b",
    measurementId: "G-4H9Q958RPV"
  };

export const createUserProfileDocument = async (userAuth,addtionalData)=>{
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  // console.log(snapShot);

  if(!snapShot.exists){
    const {displayName,email} = userAuth;
    const createdAt = new Date();

    try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...addtionalData
        })
    }catch(error){
console.log('error creating user ',error.message);
    }
  }
  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
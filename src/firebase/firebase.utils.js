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

export const addCollectionAndDocouments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef,obj);
  });

  return await batch.commit();
}

export const convertCollectionsSnapshotToMap=collectionSnapshot => {
      const transformedCollections = collectionSnapshot.docs.map(docSnapshot => {
        const { title,items } = docSnapshot.data();

        return {
          routeName:encodeURI(title.toLowerCase()),
          id:docSnapshot.id,
          title,
          items
        }
      })

      return transformedCollections.reduce( (accumulator,collection)=>{
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
      },{})
}

firebase.initializeApp(config);

export const getCurrentUser = () => {
  return new Promise((resolve,reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth=>{
      unsubscribe();
      resolve(userAuth);  
    },reject)
  })
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const config = {
  apiKey: "AIzaSyB4McT6mkroYHkibKw1MuboKpkjz3WGHCU",
  authDomain: "crwn-db-79372.firebaseapp.com",
  projectId: "crwn-db-79372",
  storageBucket: "crwn-db-79372.appspot.com",
  messagingSenderId: "426430966354",
  appId: "1:426430966354:web:8feca8054907c907e74d8b",
  measurementId: "G-4H9Q958RPV"
};

const app = initializeApp(config);
const auth = getAuth(app);
const firestore = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// export const createUserProfileDocument = async (userAuth, addtionalData) => {
//   if (!userAuth) return;

//   const userRef = doc(firestore, `users/${userAuth.uid}`);

//   const snapShot = await getDoc(userRef);

//   if (!snapShot.exists()) {
//     const { displayName, email } = userAuth;
//     const createdAt = new Date();

//     try {
//       await setDoc(userRef, {
//         displayName,
//         email,
//         createdAt,
//         ...addtionalData
//       })
//     } catch (error) {
//       console.log('error creating user ', error.message);
//     }
//   }
//   return userRef;
// }

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(firestore, collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = doc(collectionRef);
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
}

export const convertCollectionsSnapshotToMap = (collectionSnapshot) => {
  const transformedCollections = collectionSnapshot.docs.map(docSnapshot => {
    const { title, items } = docSnapshot.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: docSnapshot.id,
      title,
      items
    }
  })

  return transformedCollections.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {})
}

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject)
  })
}

googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

export { auth, firestore };
export default app;


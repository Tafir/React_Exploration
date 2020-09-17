import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDcYL9G9QAFX-895_SQKCVq4n7yi6UIfzg",
    authDomain: "crwn-db-aeb78.firebaseapp.com",
    databaseURL: "https://crwn-db-aeb78.firebaseio.com",
    projectId: "crwn-db-aeb78",
    storageBucket: "crwn-db-aeb78.appspot.com",
    messagingSenderId: "1047421235147",
    appId: "1:1047421235147:web:f4daa988bb84f968e0504e"
  };

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth){
    return;
  } else {
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists){
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user', error.message);

      }
    }

    return userRef;
  }
}

firebase.initializeApp(firebaseConfig);

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey)

  const batch = firestore.batch();
  objectsToAdd.forEach(object => { 
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, object);
  });

  return await batch.commit();
}

export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const {title, items} = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,

    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator
  }, {})
}

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged( userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  })
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
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

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
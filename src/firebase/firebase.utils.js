import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAphT4wRKkk33Z1kvlz1wSzdseouRWkUBI",
    authDomain: "my-store-c991f.firebaseapp.com",
    databaseURL: "https://my-store-c991f.firebaseio.com",
    projectId: "my-store-c991f",
    storageBucket: "my-store-c991f.appspot.com",
    messagingSenderId: "882018574620",
    appId: "1:882018574620:web:aa933af63a295725f3dad9",
    measurementId: "G-ZDVPZ46MX3"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get();

    if(!snapshot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch(error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCr4Iv-vwRfNxmI57da5ZUSEAQ3-XOaZEY",
    authDomain: "react-firebase-auth-7a60f.firebaseapp.com",
    databaseURL: "https://react-firebase-auth-7a60f.firebaseio.com",
    projectId: "react-firebase-auth-7a60f",
    storageBucket: "react-firebase-auth-7a60f.appspot.com",
    messagingSenderId: "1004900662845"
};

firebase.initializeApp(config);

export default firebase;
export const db = firebase.database();
export const auth = firebase.auth();
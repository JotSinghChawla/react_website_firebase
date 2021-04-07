import { config } from "./config";
import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/firestore';

firebase.initializeApp(config);

export const auth = firebase.auth();

export const fireauth = firebase.auth;              // To call different method for loggin in like google, facebook, etc

// const settings = {timestampsInSnapshots: true};              // Decrated after Version 8.0
// firebase.firestore().settings(settings);

export const firestore = firebase.firestore();

export const firebasestore = firebase.firestore;            // IDK why - ?

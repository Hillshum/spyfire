import firebase from 'firebase'
const firebaseConfig = {
  apiKey: "AIzaSyD0DH7UPPGYJuuSNoLZmVnfpYnSbCwB_r0",
  authDomain: "spyfall-127c6.firebaseapp.com",
  databaseURL: "https://spyfall-127c6.firebaseio.com",
  projectId: "spyfall-127c6",
  storageBucket: "spyfall-127c6.appspot.com",
  messagingSenderId: "707568045960"
}

firebase.initializeApp(firebaseConfig)

export const database = firebase.database()
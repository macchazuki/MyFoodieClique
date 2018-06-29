import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyBNCVYaTyEnUhFOSBrRiAUsM3L5wAtioes",
  authDomain: "myfoodieclique.firebaseapp.com",
  databaseURL: "https://myfoodieclique.firebaseio.com",
  projectId: "myfoodieclique",
  storageBucket: "myfoodieclique.appspot.com",
  messagingSenderId: "850916794068"
};

var fire = firebase.initializeApp(config);
export const auth = firebase.auth();
export default fire;
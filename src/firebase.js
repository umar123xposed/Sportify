/* eslint-disable */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getToken, onMessage, getMessaging } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

  apiKey: "AIzaSyBfL_1SlS5a5_yPWpp8f1iDwKYoXcgjD1I",
  authDomain: "sport-me-id.firebaseapp.com",
  projectId: "sport-me-id",
  storageBucket: "sport-me-id.firebasestorage.app",
  messagingSenderId: "28431260653",
  appId: "1:28431260653:web:30bf372f7b33f0a12d65e4",
};

const vapidkey = "BKAe5GybB5kISY73mxnFQ-6uwVdlSHEd-LmtpztsgHmubzVmihWDuT4TuIDNjZsI89AQrZ3UgdUUbPVumwOZkOc"


// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app)
//const analytics = getAnalytics(app);

export const requestPermission = () => {
  // console.log("req permission")
  // return Notification.requestPermission()
  //   .then((permission) => {
  //     if (permission === 'granted') {
  //       console.log('Notification permission granted.');
  //       return getToken(messaging, { vapidKey: vapidkey });
  //     }
  //     else {
  //       console.log('Notification not granted');
  //       // throw new Error('Notification not granted');
  //     }
  //   })
  //   .catch((err) => {
  //     console.log('Error getting FCM token:', err);
  //     // throw err;
  //   })

}
requestPermission()

// export const onMessageListener = () =>
//   new Promise(resolve => {
//     onMessage(messaging, (payload) => {
//       resolve(payload)
//     })
//   })

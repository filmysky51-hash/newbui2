// Scripts for firebase and messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

const firebaseConfig = {
 apiKey: "AIzaSyCJRUp-c9_zeqT6RTjrqf81MOZyI53QZqI",
  authDomain: "filmysky-3454b.firebaseapp.com",
  databaseURL: "https://filmysky-3454b-default-rtdb.firebaseio.com",
  projectId: "filmysky-3454b",
  storageBucket: "filmysky-3454b.firebasestorage.app",
  messagingSenderId: "146408648284",
  appId: "1:146408648284:web:b8cb1891a533a24119c099",
  measurementId: "G-GT8CLQYYL4"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjy34SzFABKNaF50DvBLeFHbjCjRqKfBLD0fmolpFBNbYQhdw7DBtadjYpkGheVCObdpH9eqvKlSOVR3usOvgRv_sTLUGs2XeCYf9dBch0Thf_gEOD4BCIHJw5yxoRv_HT_zSic9icIukLddZ2Qktx54sFh7g0o6FjIyflj5KXzlH6ssXOhgptqTP27-v0/s1600/download-removebg-preview.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
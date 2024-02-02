// This a service worker file for receiving push notifitications.
// See `Access registration token section` @ https://firebase.google.com/docs/cloud-messaging/js/client#retrieve-the-current-registration-token

// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');


// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyBeJ0sjge2mvIcJi2bo_UmZ2v735txjXEo",
    authDomain: "chat-91876.firebaseapp.com",
    projectId: "chat-91876",
    storageBucket: "chat-91876.appspot.com",
    messagingSenderId: "1012929722581",
    appId: "1:1012929722581:web:b1496a454a51a59c0c8a5c"
  };


firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

// Handle incoming messages while the app is not in focus (i.e in the background, hidden behind other tabs, or completely closed).
messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
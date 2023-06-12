/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
// This a service worker file for receiving push notifitications.
// See `Access registration token section` @ https://firebase.google.com/docs/cloud-messaging/js/client#retrieve-the-current-registration-token

// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/5.5.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.5.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyBo0U1OMSkx3mdjs0KGaTGcafqOgDUY1Sg",
  authDomain: "push-notification-6787b.firebaseapp.com",
  projectId: "push-notification-6787b",
  storageBucket: "push-notification-6787b.appspot.com",
  messagingSenderId: "181960348200",
  appId: "1:181960348200:web:77424b9db7e691df44db1d",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

// Handle incoming messages while the app is not in focus (i.e in the background, hidden behind other tabs, or completely closed).
messaging.onBackgroundMessage(function(payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

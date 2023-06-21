import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route, Redirect } from "react-router-dom";
import Notification from "./components/Notification";
import toast, { Toaster } from "react-hot-toast";
import { onMessageListener, messaging } from "./firebase";
import { getToken } from "firebase/messaging";
import UserForm from "./components/UserForm";
import MasterForm from "./components/MasterForm";
import { Typography } from "@mui/material";

// const RequestForToken = async () => {
//   const [token, setToken] = useState("");

//   try {
//     const currentToken = await getToken(messaging, {
//       vapidKey: process.env.REACT_APP_VAPID_KEY,
//     });

//     if (currentToken) {
//       console.log("current token for client: ", currentToken);
//       setToken(currentToken);
//     } else {
//       // Show permission request UI
//       console.log(
//         "No registration token available. Request permission to generate one."
//       );
//     }
//   } catch (err) {
//     console.log("An error occurred while retrieving token. ", err);
//   }
// };

function App() {
  const [token, setToken] = useState("");

  const [notification, setNotification] = useState({ title: "", body: "" });

  const requestForToken = () => {
    return getToken(messaging, {
      vapidKey: process.env.REACT_APP_VAPID_KEY,
      // Vapid key of your firebase account
    })
      .then((currentToken) => {
        if (currentToken) {
          console.log("current token for client: ", currentToken);
          setToken(currentToken);

          // Perform any other necessary action with the token
        } else {
          // Show permission request UI
          console.log(
            "No registration token available. Request permission to generate one."
          );
        }
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
      });
  };

  // This is the body of the notification that will be displayed
  const notify = () => toast.success(<ToastDisplay />);
  function ToastDisplay() {
    return (
      <div>
        <p>
          <b>{notification?.title}</b>
        </p>
        <p>{notification?.body}</p>
      </div>
    );
  }

  async function requestPermissionMessage() {
    const permission = await Notification.requestPermission();
    let access;
    if (permission === "granted") {
      access = "granted";
      // Generate Token
      return access;

      // Send this token  to server ( db)
    } else if (permission === "denied") {
      access = "denied";
      return access;
    }
  }

  useEffect(() => {
    if (!notification?.title) {
      // const requestAccess = requestPermissionMessage();
      // if (requestAccess === "granted") {
      requestForToken();
      // } else {
      // alert("You denied the notification");
      // }
      // Upon initial loading, a request for the user's token is made
    } else {
      console.log("Background Message");
      // Show Notification based on any change on the website i.e. after the post request
      notify();
    }
  }, [onMessageListener]);

  onMessageListener()
    .then((payload) => {
      setNotification({
        title: payload?.notification?.title,
        body: payload?.notification?.body,
      });
    })
    .catch((err) => console.log("failed: ", err));

  return (
    <div className="App">
      {/* {token && <Typography variant="body2">{token}</Typography>} */}
      <Routes>
        <Route path="/register" element={<UserForm token={token} />} />
        <Route path="/master-form" element={<MasterForm />} />
      </Routes>
    </div>
  );
}

export default App;

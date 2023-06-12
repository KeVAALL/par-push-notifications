import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { onMessageListener, messaging } from "../firebase";
import { getToken } from "firebase/messaging";
import { Box, Button, Stack, Typography } from "@mui/material";

const Notification = () => {
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [token, setToken] = useState("");

  const sendMessage = () => {
    fetch("https://fcm.googleapis.com/fcm/send", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          // Within the Project Settings, you will find the authorization (Server) key for Cloud Messaging
          `key=${process.env.REACT_APP_AUTHORIZATION_KEY}`,
      },
      method: "POST",
      body: JSON.stringify(body),
    })
      .then(function(res) {
        console.log(res);
      })
      .catch(function(res) {
        console.log(res);
      });
  };

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

  const body = {
    to: token,
    notification: {
      body: "nth number of leads",
      title: "New Leads Added!!",
    },
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

  useEffect(() => {
    if (!notification?.title) {
      // Upon initial loading, a request for the user's token is made
      requestForToken();
    } else {
      // Show Notification based on any change on the website i.e. after the post request
      notify();
    }
  }, [notification]);

  onMessageListener()
    .then((payload) => {
      setNotification({
        title: payload?.notification?.title,
        body: payload?.notification?.body,
      });
    })
    .catch((err) => console.log("failed: ", err));

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Stack spacing={5}>
        {token && <Typography variant="body2">{token}</Typography>}
        <Box>
          <Button variant="outlined" onClick={sendMessage}>
            Send Message
          </Button>
        </Box>
      </Stack>
    </>
  );
};

export default Notification;

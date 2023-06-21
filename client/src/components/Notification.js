// import React, { useState, useEffect } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import { onMessageListener, messaging } from "../firebase";
// import { getToken } from "firebase/messaging";
// import { Box, Button, Stack, Typography } from "@mui/material";

// export const RequestForToken = async () => {};

// const Notification = () => {

//   const sendMessage = () => {
//     fetch("https://fcm.googleapis.com/fcm/send", {
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         Authorization:
//           // Within the Project Settings, you will find the authorization (Server) key for Cloud Messaging
//           `key=${process.env.REACT_APP_AUTHORIZATION_KEY}`,
//       },
//       method: "POST",
//       body: JSON.stringify(body),
//     })
//       .then(function (res) {
//         console.log(res);
//       })
//       .catch(function (res) {
//         console.log(res);
//       });
//   };

//   // const body = {
//   //   to: token,
//   //   notification: {
//   //     body: "nth number of leads",
//   //     title: "New Leads Added!!",
//   //   },
//   // };

//   return (
//     <>
//       <Toaster position="bottom-right" reverseOrder={false} />
//       <Stack spacing={5}>
//         {token && <Typography variant="body2">{token}</Typography>}
//         <Box>
//           <Button variant="outlined" onClick={sendMessage}>
//             Send Message
//           </Button>
//         </Box>
//       </Stack>
//     </>
//   );
// };

// export default Notification;

const express = require("express");
const dayjs = require("dayjs");
const cors = require("cors");
const db = require("./database");
const firebase = require("firebase-admin");
const { getMessaging } = require("firebase-admin/messaging");
const serviceAccount = require("./push-notification.json");
const PORT = 4000;

const app = express();
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
});

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  const role = "user";
  const { name, email, token } = req.body;

  const now = dayjs();
  const dateToday = now.format("YYYY-MM-DD HH:mm:ss");
  let topic = `${now.format("YYYY-MM-DD")}${name.split(" ").join("")}`;
  console.log(topic);

  getMessaging()
    .subscribeToTopic(token, topic)
    .then((response) => {
      // See the MessagingTopicManagementResponse reference documentation
      // for the contents of response.
      console.log("Successfully subscribed to topic:", response);
    })
    .catch((error) => {
      console.log("Error subscribing to topic:", error);
    });

  db.query(
    `INSERT INTO user_form (name, email, role, date, registration_token, topic)
    VALUES ('${name}', '${email}', '${role}', '${dateToday}', '${token}', '${topic}' );`,
    (error, result) => {
      if (error) {
        res.send(error);
      } else {
        console.log(result);
        res.send(result);
      }
    }
  );
});

app.get("/getUsers", async (req, res) => {
  db.query(`SELECT * FROM user_form`, (error, result) => {
    if (error) {
      res.send(error);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

app.post("/assign", async (req, res) => {
  const role = "user";

  const { task, selectedUser } = req.body;
  console.log(selectedUser);
  db.query(
    "SELECT topic FROM `user_form` WHERE ?? = ?",
    ["name", selectedUser.name],
    (error, result) => {
      if (error) {
        res.send(error);
      } else {
        console.log(result[0].topic);

        getMessaging()
          .send({
            data: {
              score: "850",
              time: "2:45",
            },
            topic: `/topics/${result[0].topic}`,
          })
          .then((response) => {
            // Response is a message ID string.
            console.log("Successfully sent message:", response);
          })
          .catch((error) => {
            console.log("Error sending message:", error);
          });

        res.send(result);
      }
    }
  );
});

app.listen(PORT, function () {
  console.log("Listening....");
  //   console.log(db);
});

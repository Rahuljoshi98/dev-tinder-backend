const express = require("express");

const app = express();

app.get("/home", (req, res) => {
  console.log(req.query);
  res.send(req.query);
});

app.get("/home/:user_id/:user_name", (req, res) => {
  console.log(req.params);
  res.send(req.params);
});

app.use((req, res) => {
  if (req.url === "/home") {
    res.send("You are in Home Page");
  } else {
    res.send("Hello from rahul");
  }
});

app.listen(3000, "localhost", () => {
  console.log("server is running in port no 3000....");
});

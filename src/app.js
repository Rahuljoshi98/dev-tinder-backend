const express = require("express");
const { connectDb } = require("./config/database");
const { UserModel } = require("./models/user");

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    const userData = req.body;
    // creating the instance of user
    const user = new UserModel(userData);
    await user.save();
    res.send("data added successfully");
  } catch (error) {
    res.status(400).send("Error saving the data");
  }
});

connectDb()
  .then(() => {
    console.log("database connected successfully");
    app.listen(3000, "localhost", () => {
      console.log("server is running in port no 3000....");
    });
  })
  .catch((error) => {
    console.log(error);
  });

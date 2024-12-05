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
    res.status(400).send("Error saving the data" + error.message);
  }
});

app.get("/users", async (req, res) => {
  const userId = req.body.user_id;
  const data = await UserModel.findById(userId);
  res.send(data);
});

app.delete("/users", async (req, res) => {
  const userId = req.body.user_id;
  try {
    const data = await UserModel.findById(userId);
    if (!data) {
      return res.status(400).send("User Not Found");
    }
    // const deletedUsers = await UserModel.deleteMany({
    //   firstName: "rahul",
    //   age: { $gte: 20 },
    // });
    // console.log("deletedUsers", deletedUsers);
    await UserModel.findByIdAndDelete(userId);
    res.send("User Deleted Successfully");
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

app.patch("/users", async (req, res) => {
  const userId = req.body.user_id;
  const updatedData = { ...req.body };
  if (updatedData?.newEmail) {
    updatedData.emailId = updatedData?.newEmail;
  }
  try {
    const data = await UserModel.findOneAndUpdate(
      { emailId: req.body.emailId },
      updatedData
    );
    res.send("User Updated Successfully");
  } catch (error) {
    res.status(400).send("Something went wrong");
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

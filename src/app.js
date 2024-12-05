const express = require("express");
const { connectDb } = require("./config/database");
const { UserModel } = require("./models/user");
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("./utils/validation");

const app = express();
app.use(express.json());

app.post("/login", async (req, res) => {
  const { password, emailId } = req.body;
  try {
    const user = await UserModel.findOne({ emailId: emailId });
    if (!user) {
      throw new Error(" Invalid Credentials");
    }
    const isValidUser = await bcrypt.compare(password, user.password);
    console.log("isValidUser", isValidUser);
    if (!isValidUser) {
      throw new Error(" Invalid Credentials");
    }
    res.send("Logged In Successfully");
  } catch (error) {
    res.status(400).send("Something went wrong" + error.message);
  }
});

app.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = { ...req.body };
    userData.password = hashedPassword;
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
    res.status(400).send("Something went wrong" + error.message);
  }
});

app.patch("/users/:userId", async (req, res) => {
  const { userId } = req.params;
  const updatedData = req.body;
  // const updatedData = { ...req.body };
  // if (updatedData?.newEmail) {
  //   updatedData.emailId = updatedData?.newEmail;
  // }
  try {
    const allowedFields = ["password", "photoUrl", "about", "skills", "gender"];
    const isAllowed = Object.keys(req.body)?.every((k) =>
      allowedFields.includes(k)
    );
    if (!isAllowed) {
      throw new Error(" Not Allowed");
    }
    if (updatedData?.skills?.length > 10) {
      throw new Error("skills length should be less than 10");
    }
    const data = await UserModel.findByIdAndUpdate(userId, updatedData, {
      runValidators: true,
    });
    res.send("User Updated Successfully");
  } catch (error) {
    res.status(400).send("Something went wrong" + error.message);
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

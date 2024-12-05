const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
      minLength: 2,
      maxLength: 50,
    },
    lastName: {
      type: String,
      minLength: 2,
      maxLength: 50,
    },
    emailId: {
      type: String,
      require: true,
      unique: true,
      lowercae: true,
      trim: true,
    },
    password: {
      type: String,
      require: true,
      minLength: 8,
      maxLength: 25,
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        const gen = value.toLowerCase().trim();
        if (!["male", "female", "other"].includes(gen)) {
          throw new Error("Gender data is not valid");
        }
      },
      lowercase: true,
    },
    photoUrl: {
      type: String,
      default:
        "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=",
    },
    about: {
      type: String,
      default: "Default about",
      maxLength: "60",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = { UserModel };

const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://2000rahuljoshi:givemereason@namastenode.1c6on.mongodb.net/",
    {
      dbName: "devTinder",
    }
  );
};

module.exports = { connectDb };

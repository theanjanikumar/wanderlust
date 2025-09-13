const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

// Set up MongoDB connection string
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// Connect to MongoDB using Mongoose
main()
  .then(() => {
    console.log("connect to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({ ...obj, owner: "68bd4f7b46b303087993eafc"}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}

initDB();
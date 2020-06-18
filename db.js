const mongoose = require("mongoose");

const MONGOURI = ""; //ADD YOUR MONGOURI HERE from MongoDB Atlas

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, { useNewUrlParser: true });
    console.log("Successfully connected to MongoDB");
  } 
  catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;
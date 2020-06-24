const mongoose = require("mongoose");

const MONGOURI = "mongodb://raunak:mokhasi@logincluster-shard-00-00-v0ove.mongodb.net:27017,logincluster-shard-00-01-v0ove.mongodb.net:27017,logincluster-shard-00-02-v0ove.mongodb.net:27017/mongoLoginDB?ssl=true&replicaSet=loginCluster-shard-0&authSource=admin&retryWrites=true&w=majority";

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
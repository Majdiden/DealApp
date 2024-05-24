const mongoose = require("mongoose");
const { db } = require("../config.js");

const dbURI = db.url;
module.exports.connect = async () => {
  try {
    const conn = await mongoose.connect(dbURI);
    console.log("Mongo db connected", conn.connection.host);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

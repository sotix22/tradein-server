const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StorageImei = new Schema({
  Imei: {
    type: String,
  },
  Title: {
    type: String,
  },
  Code:{
    type:String
  }
});

module.exports = mongoose.model("StorageImei", StorageImei);

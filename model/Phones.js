const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Phones = new Schema({
  Code: {
    type: String,
    required: true,
  },
  Company: {
    type: String,
  },
  Status: {
    type: Boolean,
    required: true,
  },
  Model: {
    type: String,
    required: true,
  },
  TypeDevice: {
    type: Object,
  },
  Color: {
    type: Array,
  },
  IMEI: {
    type: Array,
  },
  Price: {
    type: Object,
  },
  Impress: {
    type: Boolean
  },
  Facelock: {
    type: Boolean
  }
});

module.exports = mongoose.model("Phones", Phones);

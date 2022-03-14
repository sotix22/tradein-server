const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Users = new Schema({
  Login: {
    type: String,
    required: true,
    minlength: 3,
  },
  Password: {
    type: String,
    required: true,
    min: 1,
    max: 100,
  },
  Role: {
    type: Number,
    required: true,
    default: 2,
  },
  FirstName: {
    type: String,
    required: false,
  },
  LastName: {
    type: String,
    required: false,
  },
  SecondName: {
    type: String,
    required: false,
  },
  Age: {
    type: Date,
    required: false,
  },
  Retail: {
    type: String,
    required: false,
  },
  IdRetail: {
    type: String,
    required: false,
  },
  IdFace: {
    type: String,
  },
});

module.exports = mongoose.model("User", Users);

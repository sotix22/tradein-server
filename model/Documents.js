const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Document = new Schema({
  //Номер документа
  Count: {
    type: Number,
    required: true,
    unique: true,
  },
  Date: {
    type: String,
  },
  idRequest: {
    type: String,
    required: true,
    unique: true,
  },
  Request: {
    type: Object,
  },
  Client: {
    type: Object,
  },
});

module.exports = mongoose.model("Document", Document);

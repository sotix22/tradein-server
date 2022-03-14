const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Requests = new Schema({
  DataCreateRequest: {
    type: Date,
    required: true,
    default: () => Date.now(),
  },
  //Дата создания в миллисекундах
  DataCreateRequestMil: {
    type: Number,
    required: true,
    default: () => {
      let milliseconds = new Date().getTime();
      return milliseconds;
    },
  },
  Price: {
    type: Number,
    required: true,
    min: 1,
  },
  IniciatorId: {
    type: String,
    required: true,
  },
  Iniciator: {
    type: String,
    required: true,
  },
  Client: {
    type: Object,
  },
  PhoneClient: {
    type: Number,
    required: false,
  },
  DeviceId: {
    type: String,
    required: true,
  },
  DeviceTitle: {
    type: String,
    required: true,
  },
  IMEI: {
    type: String,
    required: true,
  },
  Retail: {
    type: String,
    required: true,
  },
  RetailId: {
    type: String,
    required: true,
  },
  Status: {
    type: Number,
    default: 0,
  },
  // 0 - В ожидании
  // 1 - Подтверждено
  // 2 - Не Подтверждено
  // 3 -

  Comments: {
    type: String,
  },
  Rate: {
    type: Object,
  },
  RateRang: {
    type: String,
  },
  Color: {
    type: String,
  },
});

module.exports = mongoose.model("Requests", Requests);

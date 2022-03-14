var express = require("express");
var router = express.Router();
const TypeDevice = require("../model/TypeDevice");
const StorageIMEI = require("../model/StorageImei");
const Phones = require("../model/Phones");
const e = require("express");

var router = express.Router();

/* GET home page. */

router.get("/getTypeDevice", function (req, res, next) {
  TypeDevice.find({}).then((result) => {

    if (result.length != 0) {

      res.status(201).send(result);
    } else {

      res.status(200).send("Список Устройств не отобразился");
    }
  });
});

router.post("/getDeviceByImei", (req, res, next) => {
  const { IMEI } = req.body;
  let partialToMatch = new RegExp(IMEI, "i");

  Phones.find({
    IMEI: partialToMatch,
    Status: true,
  })
    .limit(10)
    .sort("Model")
    .then((result) => {

      if (result.length > 0) {
        res.status(200).send(result);
      } else {
        res.status(404).send("По Данному IMEI Устройство не найдено");
      }
    })
    .catch((e) => {
      res.status(404).send(e);
    });
});

module.exports = router;

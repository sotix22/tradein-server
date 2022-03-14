var express = require("express");
var Device = require("../model/Phones");
var router = express.Router();

/* GET home page. */

router.post("/ratedevice", function (req, res, next) {
  let rateResult = 0;
  let device = {
    Color: "",
    IMEI: "",
    _id: "",
    Code: "",
    Model: "",
    TypeDevice: "",
    Price: "",
    Login: "",
    Retail: "",
    CodeRetail: "",
    Rate: "",
  };
  const { info, resultRate, user } = req.body;
  if (resultRate.dPower.value) {
    for (key in resultRate) {
      if (typeof resultRate[key].value != Boolean) {
        rateResult = rateResult + Number(resultRate[key].value);
      }
    }
  } else {
    rateResult = 100;
  }
  if (rateResult <= 1) {
    Device.findOne({ Code: info.CodeNomenclature }).then((result) => {
      (device.Color = info.Color),
        (device.IMEI = info.IMEI),
        (device._id = result._id),
        (device.Code = result.Code),
        (device.Model = result.Model),
        (device.TypeDevice = result.TypeDevice),
        (device.Price = result.Price["000000002"]),
        (device.Login = user.login),
        (device.Retail = info.TitleRetail),
        (device.CodeRetail = info.CodeRetail),
        (device.Rate = resultRate),
        (device.RateRang = "000000002");
      res.status(200).send(device);
    });
  } else if (rateResult > 0 && rateResult <= 7) {
    Device.findOne({ Code: info.CodeNomenclature }).then((result) => {
      (device.Color = info.Color),
        (device.IMEI = info.IMEI),
        (device._id = result._id),
        (device.Code = result.Code),
        (device.Model = result.Model),
        (device.TypeDevice = result.TypeDevice),
        (device.Price = result.Price["000000003"]),
        (device.Login = user.login),
        (device.Retail = info.TitleRetail),
        (device.CodeRetail = info.CodeRetail),
        (device.Rate = resultRate),
        (device.RateRang = "000000003");
      res.status(200).send(device);
    });
  } else if (rateResult >= 8 && rateResult <= 19) {
    Device.findOne({ Code: info.CodeNomenclature }).then((result) => {
      (device.Color = info.Color),
        (device.IMEI = info.IMEI),
        (device._id = result._id),
        (device.Code = result.Code),
        (device.Model = result.Model),
        (device.TypeDevice = result.TypeDevice),
        (device.Price = result.Price["000000004"]),
        (device.Login = user.login),
        (device.Retail = info.TitleRetail),
        (device.CodeRetail = info.CodeRetail),
        (device.Rate = resultRate),
        (device.RateRang = "000000004");
      res.status(200).send(device);
    });
  } else if (rateResult > 20) {
    Device.findOne({ Code: info.CodeNomenclature }).then((result) => {
      (device.Color = info.Color),
        (device.IMEI = info.IMEI),
        (device._id = result._id),
        (device.Code = result.Code),
        (device.Model = result.Model),
        (device.TypeDevice = result.TypeDevice),
        (device.Price = result.Price["000000005"]),
        (device.Login = user.login),
        (device.Retail = info.TitleRetail),
        (device.CodeRetail = info.CodeRetail),
        (device.Rate = resultRate),
        (device.RateRang = "000000005");

      res.status(200).send(device);
    });
  }
});

module.exports = router;

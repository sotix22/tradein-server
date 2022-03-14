var express = require("express");
var router = express.Router();
var Retails = require("../model/Retails");

/* GET users listing. */
router.post("/getretails", function (req, res, next) {
  Retails.find({}).then((r) => {
    if (r) {
      res.status(201).send(r);
    } else {
      res.status(200).send("Ошибка загрузки списка");
    }
  });
});

router.post("/getretailbyid", function (req, res, next) {
  const { id } = req.body;
  Retails.findOne({ Code: id }).then((r) => {
    if (r) {
      res.status(201).send(r);
    } else {
      res.status(200).send("Ошибка Точка не найдена");
    }
  });
});

router.post("/getretailbycode", async function (req, res, next) {
  const { code } = req.body;
  try {
    let Retail = await Retails.findOne({ Code: code })
    if (Retail) {
      res.status(201).send(Retail);
    } else {
      res.status(200).send("Ошибка Точка не найдена");
    }

  } catch (error) {
    res.status(500).send('Ошибка сервера');
  }
});

module.exports = router;

var express = require("express");
var router = express.Router();
var Phones = require("../model/Phones");

/* GET users listing. */
router.post("/getphones", function (req, res, next) {
  const { key } = req.body;

  const Keys = {
    ModelUp: { Model: 1 },
    ModelDown: { Model: -1 },
    BrandUp: { Company: 1 },
    BrandDown: { Company: -1 },
    PriceAUp: { Price: 1 },
    PriceADown: { Price: -1 },
    PriceBUp: { Price: 1 },
    PriceBDown: { Price: -1 },
    PriceCUp: { Price: 1 },
    PriceCDown: { Price: -1 },
    PriceDUp: { Price: 1 },
    PriceDDown: { Price: -1 },
  };

  for (let KeySort in Keys) {
    if (KeySort == key) {
      Phones.find({})
        .sort(Keys[KeySort])
        .then((r) => {
          if (r) {
            res.status(201).send(r);
          } else {
            res.status(200).send("Ошибка загрузки списка");
          }
        });
    }
  }

  if (!key) {
    Phones.find({})
      .sort({ Model: 1 })
      .then((r) => {
        if (r) {
          res.status(201).send(r);
        } else {
          res.status(200).send("Ошибка загрузки списка");
        }
      });
  }
});

router.post("/getphonesbytype", function (req, res, next) {
  const { id } = req.body;
  Phones.find({ TypeDevice: id }).then((r) => {

    if (r) {
      res.status(201).send(r);
    } else {
      res.status(200).send("Ошибка загрузки списка");
    }
  });
});

router.post("/search", async function (req, res, next) {
  const { name } = req.body;
  try {
    str = name.split("(").join("");
    str = str.split(")").join("");
    let partialToMatch = new RegExp(str, "i");
    let PhonesData = await Phones.find({ Model: partialToMatch, Status: true }).sort({ Model: -1 })
    if (PhonesData.length > 0) {
      res.status(201).send(PhonesData);
    } else {
      PhonesData = await Phones.find({ Model: name })
      res.status(201).send(PhonesData);
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;

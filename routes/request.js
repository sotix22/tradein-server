var express = require("express");
var router = express.Router();
const fs = require("fs");
var Requests = require("../model/Requests");
const Document = require("../model/Documents");
const Phones = require("../model/Phones");
const { request } = require("http");
/* GET users listing. */

router.post("/finish", function (req, res, next) {
  const { id, Client } = req.body;
  Requests.findById({ _id: id }).then((Request) => {
    Request.Status = 1;
    Request.Client = Client;
    Request.save();
    let RequestJSON = {
      Number: "",
      Price: "",
      DeviceId: "",
      DeviceTitle: "",
      Color: "",
      IMEI: "",
      Iniciator: "",
      IniciatorId: "",
      Retail: "",
      RetailId: "",
      RateRang: "",
      DataCreateRequest: "",
      Client: {
        name: "",
        firstName: "",
        lastName: "",
        secondName: "",
        phone: "",
        document: "",
        seriesDocument: "",
        numberDocument: "",
        dateDocument: "",
        whoIssued: "",
        address: "",
      },
    };
    Document.findOne({ idRequest: Request._id })
      .then((Doc) => {
        if (Doc) {
          let IMEI = Request.IMEI.replace(/\s+/g, "");
          RequestJSON.Number = Doc.Count;
          RequestJSON.IMEI = IMEI;
          RequestJSON.DeviceId = Request.DeviceId;
          RequestJSON.DeviceTitle = Request.DeviceTitle;
          RequestJSON.Price = Request.Price;
          RequestJSON.Color = Request.Color;
          RequestJSON.Iniciator = Request.Iniciator;
          RequestJSON.IniciatorId = Request.IniciatorId;
          RequestJSON.RateRang = Request.RateRang;
          RequestJSON.Retail = Request.Retail;
          RequestJSON.RetailId = Request.RetailId;
          RequestJSON.DataCreateRequest = Request.DataCreateRequest;
          RequestJSON.Client.name =
            Request.Client.firstName +
            " " +
            Request.Client.lastName +
            " " +
            Request.Client.secondName;
          RequestJSON.Client.firstName = Request.Client.firstName;
          RequestJSON.Client.lastName = Request.Client.lastName;
          RequestJSON.Client.secondName = Request.Client.secondName;
          RequestJSON.Client.phone = Request.Client.phone;
          RequestJSON.Client.document = Request.Client.document;
          RequestJSON.Client.seriesDocument = Request.Client.seriesDocument;
          RequestJSON.Client.numberDocument = Request.Client.numberDocument;
          RequestJSON.Client.dateDocument = Request.Client.dateDocument;
          RequestJSON.Client.whoIssued = Request.Client.whoIssued;
          RequestJSON.Client.address = Request.Client.address;

          let data = JSON.stringify(RequestJSON);

          fs.writeFileSync(`./public/sync/${Request.RetailId}.json`, data);
          res.status(201).send(Request);
        } else {
          console.log("Документ не найден по заявке номер ", Request._id);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  });
});

router.post("/sync", async (req, res) => {
  const { id } = req.body;
  try {
    let request = await Requests.findById({ _id: id });
    let document = await Document.findOne({ idRequest: request._id });
    let RequestJSON = {
      Number: "",
      Price: "",
      DeviceId: "",
      DeviceTitle: "",
      Color: "",
      IMEI: "",
      Iniciator: "",
      IniciatorId: "",
      Retail: "",
      RetailId: "",
      RateRang: "",
      DataCreateRequest: "",
      Client: {
        name: "",
        firstName: "",
        lastName: "",
        secondName: "",
        phone: "",
        document: "",
        seriesDocument: "",
        numberDocument: "",
        dateDocument: "",
        whoIssued: "",
        address: "",
      },
    };

    let IMEI = request.IMEI.replace(/\s+/g, "");
    // RequestJSON.Number = document.Count;
    RequestJSON.IMEI = IMEI;
    RequestJSON.DeviceId = request.DeviceId;
    RequestJSON.DeviceTitle = request.DeviceTitle;
    RequestJSON.Price = request.Price;
    RequestJSON.Color = request.Color;
    RequestJSON.Iniciator = request.Iniciator;
    RequestJSON.IniciatorId = request.IniciatorId;
    RequestJSON.RateRang = request.RateRang;
    RequestJSON.Retail = request.Retail;
    RequestJSON.RetailId = request.RetailId;
    RequestJSON.DataCreateRequest = request.DataCreateRequest;
    RequestJSON.Client.name =
      request.Client.firstName +
      " " +
      request.Client.lastName +
      " " +
      request.Client.secondName;
    RequestJSON.Client.firstName = request.Client.firstName;
    RequestJSON.Client.lastName = request.Client.lastName;
    RequestJSON.Client.secondName = request.Client.secondName;
    RequestJSON.Client.phone = request.Client.phone;
    RequestJSON.Client.document = request.Client.document;
    RequestJSON.Client.seriesDocument = request.Client.seriesDocument;
    RequestJSON.Client.numberDocument = request.Client.numberDocument;
    RequestJSON.Client.dateDocument = request.Client.dateDocument;
    RequestJSON.Client.whoIssued = request.Client.whoIssued;
    RequestJSON.Client.address = request.Client.address;

    let data = JSON.stringify(RequestJSON);

    fs.writeFileSync(`./public/sync/${request.RetailId}.json`, data);
    res.status(200).send(request);
  } catch (error) {

    res.status(500).send(error);
  }
});

router.post("/false", function (req, res, next) {
  const { id, Comment } = req.body;
  Requests.findById({ _id: id }).then((Request) => {
    Request.Status = 2;
    Request.Comments = Comment;
    Request.save();
    res.status(201).send(Request);
  });
});

router.post("/create", async function (req, res, next) {
  let {
    IMEI,
    CodeNumenclature,
    Model,
    Price,
    Color,
    login,
    TitleRetail,
    idRetail,
    Rate,
    RateRang,
    idFace,
  } = req.body;
  Price = Number(Price);
  try {
    let Request = await Requests.create({
      Price: Price,
      IMEI: IMEI,
      DeviceId: CodeNumenclature,
      DeviceTitle: Model,
      Iniciator: login,
      IniciatorId: idFace,
      Retail: TitleRetail,
      RetailId: idRetail,
      Rate: Rate,
      RateRang: RateRang,
      Color: Color,
    })
    res.status(201).send(Request);
  } catch (error) {
    res.status(500).send(error);
  }


});

router.post("/getrequestsbyini", async function (req, res, next) {
  const { Iniciator } = req.body;
  const Request = await Requests.find({
    Iniciator: Iniciator,
  });

  var Iniciators = Promise.all(
    Request.map(async (element) => {
      var Phone = await Phones.findById({ _id: element.DeviceId });


      element.Device = Phone;
      return element;
    })
  );
  res.status(201).send(await Request);
});

router.post("/getrequestsbyid", async function (req, res, next) {
  const { id } = req.body;
  const Request = await Requests.findById({
    _id: id,
  });
  res.status(201).send(await Request);
});

router.post("/getrequestsbyretail", async function (req, res, next) {
  const { id, key, skip } = req.body;
  let Request = "";
  const Keys = {
    NameUp: { Iniciator: 1 },
    NameDown: { Iniciator: -1 },
    DeviceUp: { DeviceTitle: 1 },
    DeviceDown: { DeviceTitle: -1 },
    DateUp: { DataCreateRequest: 1 },
    DateDown: { DataCreateRequest: -1 },
    PriceUp: { Price: 1 },
    PriceDown: { Price: -1 },
    ClientUp: { Client: 1 },
    ClientDown: { Client: -1 },
    StatusUp: { Status: 1 },
    StatusDown: { Status: -1 },
  };

  for (let KeySort in Keys) {
    if (KeySort == key) {
      Request = await Requests.find({
        RetailId: id,
      })
        .skip(skip)
        .limit(5)
        .sort(Keys[KeySort]);
    }
  }
  if (!Request) {
    Request = await Requests.find({
      RetailId: id,
    })
      .skip(skip)
      .limit(5)
      .sort(Keys["DateDown"]);
  }
  res.status(201).send(Request);
});

router.post("/statuspending", async (req, res) => {
  const { id } = req.body;
  try {
    let request = await Requests.findOne({ RetailId: id, Status: 0 })
    if (request) {
      res.status(200).send(request._id);
    } else {
      res.status(404).send("Requests status Pending not found");
    }
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
});

router.post("/filter", async (req, res) => {
  const { Status, Iniciator, idRetail } = req.body;

  if (idRetail) {
    try {
      if (Iniciator != 0 && Status !== 3) {
        let request = await Requests.find({
          RetailId: idRetail,
          IniciatorId: Iniciator,
          Status: Status,
        });
        res.status(200).send(request);
      }
      if (Iniciator == 0 && Status !== 3) {
        let request = await Requests.find({
          RetailId: idRetail,
          Status: Status,
        });
        if (request) {
          res.status(200).send(request);
        } else {
          res.status(204).send(request);
        }
      }
      if (Iniciator != 0 && Status == 3) {
        let request = await Requests.find({
          RetailId: idRetail,
          IniciatorId: Iniciator,
        });
        if (request) {
          res.status(200).send(request);
        } else {
          res.status(204).send(request);
        }
      }
      if (Iniciator == 0 && Status == 3) {
        let request = await Requests.find({
          RetailId: idRetail,
        });
        res.status(200).send(request);
      }
    } catch (e) {
      console.error(e);
      res.status(500).send("Ошибка");
    }
  } else {
    res.status(500).send("Ошибка, не получен idRetail");
  }
});

getNowTime = () => {
  return new Date().getTime();
};

getToDay = () => {
  let toDay = {
    day: new Date().getDate(),
    mounth: new Date().getMonth(),
    year: new Date().getFullYear(),
  };
  toDay = new Date(
    toDay.year,
    toDay.mounth,
    toDay.day,
    00,
    00,
    00,
    00
  ).toDateString();
  return;
};

module.exports = router;

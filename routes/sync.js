var express = require("express");
const RetailBD = require("../RetailBD.json");
const Imei = require("../IMEIStorage.json");
const Retails = require("../model/Retails");
var StorageIMEI = require("../model/StorageImei");
let Phone = require("../model/Phones");
const Iniciators = require("../model/Users");
const bcrypt = require("bcrypt");
const Nomenclature = require("../Nomenclature.json");
var salt = bcrypt.genSaltSync(10);
var router = express.Router();
const fs = require("fs");
/* GET home page. */

router.post("/1c_nomenclature", function (req, res) {
  let result = "Синхронизация началась";
  let json = JSON.parse(req.body.data);

  // fs.writeFileSync("hello.json", json);
  SyncNumenclature(json);
  res.status(200).send(result);
});

router.get("/syncRetail", function (req, res, next) {
  Main((RetailList) => {
    // Проверка существует ли Магазин в базе данных если нет создаем новые точки
    try {
      checkRetails(RetailList, (retails) => {
        let someRetails = retails.filter((item) => item != undefined);
        if (someRetails.length > 0) {
          CreateNewRetail(someRetails).then((results) => {
            res.status(200).send(results);
          });
        } else {
          res.status(200).send("Синхронизация прошла успешно новых точек нет!");
        }

        //Создаем новые точки
      });
    } catch (e) {
      res.status(500).send("Произошла ошибка синхронизации");
    }
  });
});

router.get("/syncUsers", async (req, res, next) => {
  //Создаем масссив инициаторов из файла синхронизации

  await CreaterSyncIniciatorList(RetailBD).then(async (res) => {
    if (res) {
      await checkIniciators(res, async (result, Iniciator) => {
        let Iniciators = [];
        await Iniciators.push(Iniciator);

        await CreateNewIniciator(Iniciators);
      });
    }
  });

  // Проверка существует ли Инициатор в базе данных если нет создаем нового Инициатора

  res.status(200).send("Синхронизация прошла успешно");
});

//Заносим id пользователей  в  массив  ретейла не актуально !!
router.get("/checkActualWorkJob", async (req, res, next) => {
  await checkActualWorkJob();
});

router.get("/storage_imei", async (req, res, next) => {
  await Imei.forEach(async (el) => {
    try {
      let IMEI = await StorageIMEI.create({
        Imei: el.IMIE,
        Title: el.Title,
        Code: el.Code,
      })
      res.status(201).send(IMEI);
    } catch (error) {
      res.status(500).send(IMEI);
    }

  });

});



router.post("/users", async (req, res) => {
  let json = JSON.parse(req.body.data);
  try {
    //Получаем массив Точек и массив Инициаторов
    await Main(json, async (RetailList, IniciatorsList) => {
      // Проверка существует ли Магазин в базе данных если нет создаем новые точки
      //Проходим по JSON , проверяем ,  есть ли в базе  точка , если нет - возвращаем массив точек которые необходимо добавить и создаем новую
      await checkRetails(RetailList, async (retails) => {
        let someRetails = retails.filter((item) => item != undefined);
        if (someRetails.length > 0) {
          //Создаем новые точки 
          await CreateNewRetail(someRetails).then((results) => {
          });
        }
      });
      // Проверка существует ли Пользователь в базе данных если нет создаем нового и возвращаем массив пользоватлей для создания 
      await checkIniciators(IniciatorsList, async (result, Iniciator) => {
        try {
          let Iniciators = [];
          await Iniciators.push(Iniciator);
          await CreateNewIniciator(Iniciators);
        } catch (error) {
          console.log(error)
        }

      });

      res.status(201).send('ok');
    });
  } catch (error) {
    res.status(500).send('Ошибка', error);
  }





})

router.get("/nomenclature", async (req, res, next) => {
  SyncNumenclature();

  res.send("ok");
});

let SyncNumenclature = async (json) => {
  if (json) {
    console.log(json)
    return new Promise(async (resolve, reject) => {
      await json.forEach(async (el) => {
        await Phone.findOne({ Code: el.Cod })
          .then(async (r) => {
            //Если Девайс не найден то создаем новый 
            if (!r) {
              await createNewNomenclature(el);
            } else {
              r.Price = el.Price;
              r.Color = el.Color;
              r.Impress = el.Impress;
              r.Facelock = el.Facelock;
              await r.save();
              if (r.Status != el.Status) {
                r.Status = el.Status;
                await r.save();
              }
            }
          })
          .catch((e) => {
            reject(e);
          });

        resolve("ok");
      });
    });
  } else {
    return new Promise(async (resolve, reject) => {
      await Nomenclature.forEach(async (el) => {
        await Phone.findOne({ Code: el.Cod })
          .then(async (r) => {
            if (!r) {
              await createNewNomenclature(el);
            } else {
              r.Price = el.Price;
              r.Color = el.Color;
              r.Imress = el.Impress;
              r.Facelock = el.Facelock;
              await r.save();

              if (r.Status != el.Status) {
                r.Status = el.Status;
                await r.save();

              }
            }
          })
          .catch((e) => {
            reject(e);
          });

        resolve("ok");
      });
    });
  }
};

router.post("/", function (req, res, next) {
  res.send("ok");
});

const createNewNomenclature = async (el) => {
  try {
    await Phone.create({
      Code: el.Cod,
      Status: el.Status,
      Company: el.Сompany,
      Model: el.Model,
      TypeDevice: el.TypeDevice,
      Color: el.Color,
      IMEI: el.IMEI,
      Price: el.Price,
      Impress: el.Impress,
      Facelock: el.Facelock
    })
  } catch (error) {
    console.log(error)
  }

};
const checkRetails = async (RetailsSync, Callback) => {
  //Проходим по JSON , проверяем ,  есть ли в базе  точка , если нет - возвращаем массив точек которые необходимо добавить
  let RetailPro = RetailsSync.map(async (element) => {
    result = await Retails.findOne({ Code: element.Code });
    if (!result) {
      return element;
    } else {
      //Если ТОчка в базе есть синхронизируем ее параметры
      result.Title = element.Title
      result.Brand = element.Group
      result.save();
      return;
    }
  });

  Promise.all(RetailPro).then((res) => {
    Callback(res);
  });
};

const CreateNewRetail = (newRetails) => {
  return new Promise((resolve, reject) => {
    newRetails.forEach((Retail) => {
      const { Code, Title, Group } = Retail;
      Retails.create({
        Title: Title,
        Code: Code,
        Brand: Group,
        Iniciators: [],
      });
    });
    resolve("Синхронизация завершена, добавлены новые точки");
  });
};

const CreaterSyncRetailList = (RetailBD) => {
  return RetailBD.map((el, index) => {
    //Создаем новый массив список Магазинов
    let retail = {};
    (retail.id = index),
      (retail.Code = el.Code),
      (retail.Title = el.Title),
      (retail.Group = el.Group);

    return retail;
  });
};

const CreaterSyncIniciatorList = async (RetailBD) => {
  return new Promise((resolve, reject) => {
    let Iniciator = [];
    RetailBD.forEach((el, index) => {
      //Создаем новый массив список Инициаторов
      el.Persons.forEach((Person) => {
        Iniciator.push(Person);
      });
    });
    resolve(Iniciator);
  });
};
//!!!!!!!!!!!!!!!!!!!!!!!!!!
const checkIniciators = (IniciatorsList, CallBack) => {
  if (IniciatorsList.length > 0) {
    IniciatorsList.forEach((IniciatorJSON) => {
      if (IniciatorJSON.id) {
        findIniciatorByIdFace(IniciatorJSON.id)
          //Если инициатор найден  синхронизируем его параметры
          .then((IniciatorDb) => {
            var login = IniciatorJSON.Login.trim();
            var arrLogin = login.split(" ");
            IniciatorDb.Retail = IniciatorJSON.Code;
            IniciatorDb.Password = IniciatorJSON.Password;
            IniciatorDb.Login = IniciatorJSON.Login;
            IniciatorDb.FirstName = arrLogin[0];
            IniciatorDb.LastName = arrLogin[1];
            IniciatorDb.SecondName = arrLogin[2];
            IniciatorDb.save();
          })
          .catch((e) => {
            CallBack(e, IniciatorJSON);
          });
      }
    });
  } else {
    console.log("Список пользователей для синхронизации равен нулю");
  }
};

const checkActualPassword = (IniciatorJSON, IniciatorDb) => {

  const passwordResult = bcrypt.compare(
    IniciatorJSON.Password,
    IniciatorDb.Password
  );

  //Если пароль после дешифровки статус false то перезаписываем пароль
  passwordResult.then((result) => {
    if (!result) {

      ChangePasswordIniciator(IniciatorJSON, IniciatorDb);
    }
  });
};
const ChangePasswordIniciator = (IniciatorJSON, IniciatorDb) => {
  var passwordToSave = bcrypt.hashSync(IniciatorJSON.Password, salt);
  Iniciators.findOne({ IdFace: IniciatorJSON.id }).then((User) => {

    User.Password = IniciatorJSON.Password;
    try {
      User.save();

    } catch (error) {
      console.log(error);
    }
  });
};
const findIniciatorByIdFace = (idFace) => {
  return new Promise((resolve, reject) => {
    Iniciators.findOne({ IdFace: idFace })
      .then((res) => {
        if (res) {
          resolve(res);
        } else {
          reject(false);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });
};

const CreateNewIniciator = async (IniciatorsList) => {
  IniciatorsList.forEach(async (element) => {
    // var passwordToSave = bcrypt.hashSync(element.Password, salt);
    var login = element.Login.trim();
    var arrLogin = login.split(" ");
    if (element) {
      if (element.Role === "Кассир") {
        element.Role = 2;
      } else {
        element.Role = 1;
      }
      await Iniciators.create({
        Login: login,
        Password: element.Password,
        Role: element.Role,
        FirstName: arrLogin[0],
        LastName: arrLogin[1],
        SecondName: arrLogin[2],
        Age: "",
        Retail: element.Code,
        IdFace: element.id,
      });
    }
  });
};

const checkActualWorkJob = (IniciatorJSON, IniciatorDb) => {
  if (IniciatorJSON.Code != IniciatorDb.Retail) {
    try {
      IniciatorDb.Retail = IniciatorJSON.Code;
      IniciatorDb.save();
    } catch (e) {
      console.log(e);
    }
  }
};

const Main = async (data, CallBack) => {
  //Создаем масссив Retail из файла синхронизации
  let RetailList = await CreaterSyncRetailList(data);
  let IniciatorsList = await CreaterSyncIniciatorList(data)
  CallBack(RetailList, IniciatorsList);
};

module.exports = router;

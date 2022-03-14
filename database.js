const mongoose = require("mongoose");
const config = require("./config");

mongoose
  .connect(config.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((res) => {
    console.log("База данных подключена");
  })
  .catch((e) => {
    console.log("Ошибка подключения к базе данных", e);
    setTimeout(() => {
      mongoose.connect(config.db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }, 10000);
  });

exports.default = {};

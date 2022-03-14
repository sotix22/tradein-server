var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../model/Users");
const Retails = require("../model/Retails");
const jwt = require("jsonwebtoken");
const config = require("../config");
const loginMessageFalse = "Пользователь с таким паролем не найден";
const loginMessageTrue = "Пользователь найден";
const loginMessageFail = "Ошибка сервера";

router.post("/", async (req, res) => {
  const { Password } = req.body;

  try {
    let user = await User.findOne({ Password: Password });

    if (user) {
      const token = jwt.sign(
        {
          Login: user.Login,
          Password: user.Password,
        },
        config.secretKey,
        {
          expiresIn: 60 * 60,
        }
      );
      autorization = { msg: loginMessageTrue, token: token, user: user };
      res.status(201).send(autorization);
    } else {
      res.status(404).send(loginMessageFalse);
    }
  } catch (error) {

    res.status(500).send(loginMessageFail);
  }
});
module.exports = router;

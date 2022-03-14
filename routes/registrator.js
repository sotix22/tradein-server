var express = require('express');
var router = express.Router();
var User = require('../model/Users');
var Retails = require('../model/Retails');
const bcrypt = require('bcrypt');
const Users = require('../model/Users');
var salt = bcrypt.genSaltSync(10);
/* GET users listing. */
router.post('/', function (req, res, next) {
    const { Login, Password, Role, Retail } = req.body
    User.findOne({ Login }, (err, user) => {
        if (user) {
            var data = {}
            data.message = 'Такой пользователь уже зарегистрирован!'
            res.status(200).send(data);
            console.error('Такой пользователь уже зарегистрирован!')
        }
        else if (err) {
            console.error(err)
            res.status(200).send(err);
        }
        else if (!user) {
            var passwordToSave = bcrypt.hashSync(Password, salt)
            User.create({ Login: Login, Password: passwordToSave, Role: Role, Retail: Retail })
                .then(
                    async r => {
                        if (r) {
                            res.status(201).send('Пользователь зарегистрирован!');

                            if (Retail) {
                                let user = await Users.findOne({ "Login": Login });
                                const retail = await Retails.findOne({ "_id": Retail });
                                await retail.Iniciators.push(user._id)
                                await retail.save()
                            }
                        }

                    }
                )
                .catch(e => {
                    if (e) {
                        var data = {}
                        console.error(e);
                        data.message = `Проверьте поле <${e.errors.Role.path}> Информация для тех поддержки :` + e
                        res.send(data);
                    }

                });

        }
    })




});

module.exports = router;

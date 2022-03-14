var express = require("express");
var router = express.Router();
var User = require("../model/Users");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.post("/getusersbyid", async function (req, res, next) {
  const { id } = req.body;

  var Iniciators = Promise.all(
    id.map(async (id) => {
      const Iniciator = await User.find({ IdFace: id }).then((result) => {
        if (result != null) {

          return result;
        } else {
          return (result = "");
        }
      });
      return Iniciator;
    })
  );

  res.status(201).send(await Iniciators);
});
router.post("/getUsersByCodeRetail", async function (req, res, next) {
  const { code } = req.body;
  User.find({ Retail: code }).then(result => {
    res.status(201).send(result);
  }).catch(e => {
    res.status(404).send(e);
  })


});

module.exports = router;

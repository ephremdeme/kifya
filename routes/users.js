var express = require("express");
var router = express.Router();
var User = require("../models").User;
var gpc = require("generate-pincode");

/* GET users listing. */

router.get("/", async (req, res) => {
  let users = await User.findAll();
  res.send(users);
});
router.post("/", async (req, res, next) => {
  let { first_name, last_name, city, phone } = req.body;
  console.log(req.body);
  let user = await User.create({
    firstName: first_name,
    lastName: last_name,
    phone: phone,
    city: city,
    pin: gpc(4),
  });
  return res.send(user);
});

router.get("/:id", async (req, res) => {
  let user = await User.findByPk(req.params.id);
  res.send(user);
});

router.post("/:id", async (req, res) => {
  let {
    first_name: firstName,
    last_name: lastName,
    city,
    phone,
    pin,
  } = req.body;
  await User.update(
    {
      firstName,
      lastName,
      city,
      phone,
      pin,
    },
    { where: { id: req.params.id } }
  );
  const user = await User.findByPk(req.params.id);
  res.send(user);
});

router.delete("/:id", async (req, res) => {
  let status = await User.destroy({
    where: { id: req.params.id },
  });
  if (status) {
    res.send({
      message: "Succesfully Deleted",
    });
  } else {
    res.send({
      message: "An Error Occured",
    });
  }
});

module.exports = router;

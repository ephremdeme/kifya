var express = require("express");
var bcrypt = require("bcrypt");
var router = express.Router();
var User = require("../models").User;
var Transaction = require("../models").Transaction;
var gpc = require("generate-pincode");

/* GET users listing. */

router.get("/", async (req, res) => {
  let users = await User.findAll();

  res.send(users);
});

router.post("/", async (req, res, next) => {
  let { first_name, last_name, city, phone } = req.body;
  let pin = gpc(4);

  let user = await User.create({
    firstName: first_name,
    lastName: last_name,
    phone: phone,
    city: city,
    pin: await bcrypt.hash(pin, 10),
  });

  user.pin = pin;
  return res.send(user);
});

router.get("/:id", async (req, res) => {
  let user = await User.findOne({
    where: {
      id: req.params.id,
    },
  });
  user.pin = null;
  res.send({
    user,
  });
});

router.get("/:id/seller", async (req, res) => {
  let user = await User.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Transaction,
      as: "seller",
    },
  });
  user.pin = null;
  res.send({
    user,
  });
});

router.get("/:id/buyer", async (req, res) => {
  let user = await User.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Transaction,
      as: "buyer",
    },
  });
  user.pin = null;
  res.send({
    user,
  });
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
      pin: await bcrypt.hash(pin, 10),
    },
    { where: { id: req.params.id } }
  );
  const user = await User.findByPk(req.params.id);
  user.pn = null;
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

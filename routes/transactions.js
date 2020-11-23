var express = require("express");
var bcrypt = require("bcrypt");
var { sequelize } = require("../models");
var Transaction = require("../models").Transaction;
var User = require("../models").User;

var router = express.Router();

/* GET home page. */
router.get("/", async (req, res) => {
  let txs = await Transaction.findAll();

  res.send(txs);
});

router.post("/", async (req, res) => {
  let { amount, pin, sellerId, buyerId } = req.body;

  try {
    let result = await sequelize.transaction(async (t) => {
      let buyer = await User.findByPk(buyerId);
      let check = await bcrypt.compare(pin, buyer.pin);
      if (!check) {
        throw new Error("Invalid PIN");
      } else {
        if (buyer.balance > amount) {
          buyer.balance -= amount;
          let seller = await User.findByPk(sellerId);
          seller.balance += amount;

          buyer.save();
          seller.save();

          let tx = await Transaction.create(
            {
              amount,
              sellerId,
              buyerId,
            },
            { transaction: t }
          );

          return tx;
        } else {
          throw new Error("InSufficient Balance");
        }
      }
    });
    res.send(result);
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  let tx = await Transaction.findOne({
    where: { tx_id: req.params.id },
  });

  res.send(tx);
});

module.exports = router;

"use strict";
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    "Transaction",
    {
      amount: DataTypes.FLOAT,
      tx_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
    },
    {}
  );
  Transaction.associate = function (models) {
    // associations can be defined here

    Transaction.belongsTo(models.User, { as: "seller" });
    Transaction.belongsTo(models.User, { as: "buyer" });
  };
  return Transaction;
};

"use strict";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      phone: DataTypes.STRING,
      balance: DataTypes.FLOAT,
      pin: DataTypes.STRING,
      city: DataTypes.STRING,
    },
    {}
  );
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Transaction, { as: "seller", foreignKey:'sellerId' });
    User.hasMany(models.Transaction, { as: "buyer", foreignKey:'buyerId' });
  };
  return User;
};

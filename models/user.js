"use strict";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      phone: DataTypes.STRING,
      balance: DataTypes.FLOAT,
      pin: DataTypes.INTEGER,
      city: DataTypes.STRING,
    },
    {}
  );
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Transaction, {as : 'seller'})
    User.hasMany(models.Transaction, {as : 'buyer'})
  };
  return User;
};

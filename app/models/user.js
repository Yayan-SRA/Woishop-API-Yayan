"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Cart, {
        as: 'Cart',
        foreignKey: 'id_user'
      })
    }
  }
  User.init(
    {
    full_name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    my_referal_code: DataTypes.STRING,
    referal_code: DataTypes.STRING,
    otp: DataTypes.INTEGER,
    isActive: DataTypes.BOOLEAN,
    refresh_token: DataTypes.TEXT,
    email: DataTypes.STRING,
    city: DataTypes.STRING,
    kecamatan: DataTypes.STRING,
    postal_code: DataTypes.INTEGER,
    address: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};

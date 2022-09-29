"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Store.hasMany(models.Product, {
        as: 'Product',
        foreignKey: 'id_store'
      })
      Store.hasMany(models.Cart, {
        as: 'Cart',
        foreignKey: 'id_store'
      })
    }
  }
  Store.init(
    {
    store_name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    city: DataTypes.STRING,
    kecamatan: DataTypes.STRING,
    address: DataTypes.TEXT,
    lat: DataTypes.DECIMAL(10,8),
    long: DataTypes.DECIMAL(11,8) ,
    ratting: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Store",
    }
  );
  return Store;
};

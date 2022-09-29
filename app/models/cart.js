"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cart.belongsTo(models.User, {
        foreignKey: 'id_user'
    })
      Cart.belongsTo(models.Product, {
        foreignKey: 'id_product'
    })
      Cart.belongsTo(models.Store, {
        foreignKey: 'id_store'
    })
    }
  }
  Cart.init(
    {
    id_store: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    id_product: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    total_price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};

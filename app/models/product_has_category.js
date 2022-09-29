"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product_has_category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Product_has_category.belongsTo(models.Product, {
            foreignKey: 'id_product'
        })
        Product_has_category.belongsTo(models.Category, {
            foreignKey: 'id_category'
        })
    }
  }
  Product_has_category.init(
    {
    id_category: DataTypes.INTEGER,
    id_product: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product_has_category",
    }
  );
  return Product_has_category;
};

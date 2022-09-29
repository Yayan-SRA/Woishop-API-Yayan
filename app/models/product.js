"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Product.belongsToMany(models.Category, {
          through: 'Product_has_category',  
          foreignKey: 'id_product',
          otherKey: 'id_category'
        })

        Product.hasMany(models.Cart, {
          as: 'Cart',
          foreignKey: 'id_product'
        })

        Product.belongsTo(models.Store, {
          foreignKey: 'id_store'
      })
    }
  }
  Product.init(
    {
    id_store: DataTypes.INTEGER,
    product_name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    image: DataTypes.STRING,
    describtion: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};

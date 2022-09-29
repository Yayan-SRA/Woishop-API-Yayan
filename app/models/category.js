'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.belongsToMany(models.Product, {
        through: 'Product_has_category',
        foreignKey: 'id_category',
        otherKey: 'id_product'
      })
    }
  }
  Category.init({
    variation: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
    timestamps: false
  });
  return Category;
};
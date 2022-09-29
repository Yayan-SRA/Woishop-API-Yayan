'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Stores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      store_name: {
        type: Sequelize.STRING
      },
      phone_number: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      kecamatan: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.TEXT
      },
      lat: {
        type: Sequelize.DECIMAL(10,8)
      },
      long: {
        type: Sequelize.DECIMAL(11,8)
      },
      ratting: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false, 
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Stores');
  }
};
'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      full_name: {
        type: Sequelize.STRING
      },
      phone_number: {
        type: Sequelize.STRING
      },
      my_referal_code: {
        type: Sequelize.STRING
      },
      referal_code: {
        type: Sequelize.STRING
      },
      otp: {
        type: Sequelize.INTEGER
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      refresh_token: {
        type: Sequelize.TEXT
      },
      email: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      kecamatan: {
        type: Sequelize.STRING
      },
      postal_code: {
        type: Sequelize.INTEGER
      },
      address: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('Users');
  }
};
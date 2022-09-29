'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Product_has_categories', [{
      id_category: 1,
      id_product: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    ],
      {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

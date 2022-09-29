'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [{
      variation: "Minuman",
      // createdAt: new Date(),
      // updatedAt: new Date(),
    }, {
      variation: "Makanan",
      // createdAt: new Date(),
      // updatedAt: new Date(),
    }, {
      variation: "Snack",
      // createdAt: new Date(),
      // updatedAt: new Date(),
    }, {
      variation: "Kebutuhan Dapur",
      // createdAt: new Date(),
      // updatedAt: new Date(),
    }, {
      variation: "Kebutuhan Anak",
      // createdAt: new Date(),
      // updatedAt: new Date(),
    }, {
      variation: "Perawatan Diri & Kesehatan",
      // createdAt: new Date(),
      // updatedAt: new Date(),
    }, {
      variation: "Makanan Beku",
      // createdAt: new Date(),
      // updatedAt: new Date(),
    }, {
      variation: "Lain-lain",
      // createdAt: new Date(),
      // updatedAt: new Date(),
    }, {
      variation: "Paket Promo",
      // createdAt: new Date(),
      // updatedAt: new Date(),
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

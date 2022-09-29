'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Stores', [{
      store_name: "RY Store",
      phone_number: "6287862477187",
      city: "Bekasi",
      kecamatan: "Bekasi",
      address: "Jl. Coba, Dsn. Apa aja, Ds. Sukamaju",
      lat: -6.981802636681006,
      long: 110.45235771304502,
      ratting: 5,
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

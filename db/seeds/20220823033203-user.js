'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      full_name: "Sofyan Rizki Afandy",
      phone_number: "+6287862477187",
      my_referal_code: "sof45624",
      otp: 4578,
      isActive: true,
      email: "yayansra14@gmail.com",
      city: "Tuban",
      kecamatan: "Merakurak",
      postal_code: 3556,
      address: "Dsn. Kebondalem Ds. Mandirejo",
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

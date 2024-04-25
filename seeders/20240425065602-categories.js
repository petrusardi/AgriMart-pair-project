'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = require('../data/category.json').map((el) => {
      delete el.id
      el.createdAt = el.updatedAt = new Date();
      return el;
    });
   await queryInterface.bulkInsert("Categories", data);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });  
  },
  };

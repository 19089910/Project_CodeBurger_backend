'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    // Rename the new column to its original name
    await queryInterface.renameColumn('products', 'new_price', 'price')
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('products', 'price', 'new_price')
  },
}

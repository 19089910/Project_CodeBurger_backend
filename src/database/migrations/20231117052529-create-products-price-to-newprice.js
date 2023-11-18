'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    // Update the new column with the values from the old one
    await queryInterface.sequelize.query(
      'UPDATE products SET new_price = CAST(price AS INTEGER)',
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      'UPDATE products SET price = CAST(new_price AS VARCHAR)',
    )
  },
}

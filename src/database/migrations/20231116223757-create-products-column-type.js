'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    // Add a new column price type numeric
    await queryInterface.addColumn('products', 'new_price', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('products', 'new_price')
  },
}

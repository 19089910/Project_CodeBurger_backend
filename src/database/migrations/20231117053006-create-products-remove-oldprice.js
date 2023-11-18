'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    // Remove the old price column
    await queryInterface.removeColumn('products', 'price')
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'price', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 0,
    })
  },
}

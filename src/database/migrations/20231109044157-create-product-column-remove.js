'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('product', 'category')
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.createColumn('product', {
      category: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    })
  },
}

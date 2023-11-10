'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'category_id', {
      type: Sequelize.INTEGER,
      allownull: true,
      references: { model: 'categories', key: 'id' }, // will be a field that will store a key that belongs to another model
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('products', 'category_id')
  },
}

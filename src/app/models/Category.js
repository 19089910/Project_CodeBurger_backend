import Sequelize, { Model } from 'sequelize'

class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      { Sequelize },
    )
    return this // return calss Product to stop here when it needs to and not call associate out of time, product.js also needs to
  }

  // new method that will make the relationship
  static associate(models) {
    // creating a new associated column in the product
    this.belongsTo(models.category, {
      foreignKey: 'category_id',
      as: 'category',
    })
  }
}

export default Category

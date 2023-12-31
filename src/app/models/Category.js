import Sequelize, { Model } from 'sequelize'

class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      { sequelize },
    )
    return this // return calss Product to stop here when it needs to and not call associate out of time, product.js also needs to
  }
}

export default Category

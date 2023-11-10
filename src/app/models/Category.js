import Sequelize, { Model } from 'sequelize'

class Category extends Model {
  static init(sequelize) {
    // my init
    super.init(
      {
        name: Sequelize.STRING,
      },
      { Sequelize },
    )
    return this // return my init method, Product.js also needs it.
  }
}

export default Category

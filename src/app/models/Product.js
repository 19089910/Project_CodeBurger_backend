import Sequelize, { Model } from 'sequelize'

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        price: Sequelize.NUMBER,
        category: Sequelize.STRING,
        Path: Sequelize.STRING,
      },
      { sequelize },
    )
  }
}

export default Product
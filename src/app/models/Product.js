import Sequelize, { Model } from 'sequelize'

class Product extends Model {
  static init(sequelize) {
    // my init
    super.init(
      {
        name: Sequelize.STRING,
        price: Sequelize.NUMBER,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://localhost:3000/product-file${this.path}`
          },
        },
      },
      { sequelize },
    )
    return this // return my init method, Category.js also needs it.
  }
}

export default Product

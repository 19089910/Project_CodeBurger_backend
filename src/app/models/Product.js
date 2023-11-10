import Sequelize, { Model } from 'sequelize'

class Product extends Model {
  static init(sequelize) {
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
    return this // return calss Product to stop here when it needs to and not call associate out of time, category.js also needs to
  }
}

export default Product

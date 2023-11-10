import * as Yup from 'yup'
import Product from '../models/Product'
import { Op } from 'sequelize'

class ProductController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      price: Yup.number().required(),
      category: Yup.string().required(),
    })
    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.error })
    }

    const { name, price, category } = request.body
    const { filename: path } = request.file // capturing log filename

    const existingProduct = await Product.findOne({
      where: {
        [Op.or]: [{ category }, { name }],
      },
    })
    if (existingProduct) {
      if (existingProduct.category === category) {
        return response.status(400).json({ error: 'Category already exists' })
      } else {
        return response.status(400).json({ error: 'Product already exists' })
      }
    }

    const product = await Product.create({ name, price, category, path })

    return response.json(product)
  }

  async index(request, response) {
    const products = await Product.findAll()
    return response.status(200).json({ products })
  }
}

export default new ProductController()

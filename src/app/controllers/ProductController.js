import * as Yup from 'yup'
import Product from '../models/Product'

class ProductController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      price: Yup.number().required(),
      category_id: Yup.number().required(),
    })
    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.error })
    }

    const { name, price, category_id } = request.body
    const { filename: path } = request.file // capturing log filename

    const productExists = await Product.findOne({
      where: { name },
    })
    if (!productExists) {
      return response.status(400).json({ error: 'Product already exists' })
    }

    const product = await Product.create({ name, price, category_id, path })

    return response.json(product)
  }

  async index(request, response) {
    const products = await Product.findAll()
    return response.status(200).json({ products })
  }
}

export default new ProductController()

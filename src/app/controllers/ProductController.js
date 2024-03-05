import * as Yup from 'yup'
import Product from '../models/Product'
import Category from '../models/Category'
import User from '../models/User'

class ProductController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      price: Yup.number().required(),
      category_id: Yup.number().required(),
      offer: Yup.boolean(),
    })
    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      const validationErrors = err.errors || err.inner.map((e) => e.message)
      return response.status(400).json({ error: validationErrors })
    }

    // admin validate
    const { admin: isAdmin } = await User.findByPk(request.userId)
    if (!isAdmin) return response.status(401).json()

    const { name, price, category_id, offer } = request.body
    const { filename: path } = request.file // capturing log filename

    const productExists = await Product.findOne({
      where: { name },
    })
    if (productExists) {
      return response.status(400).json({ error: 'Product already exists' })
    }

    const product = await Product.create({
      name,
      price,
      category_id,
      path,
      offer,
    })

    return response.json({ product })
  }

  async index(request, response) {
    const products = await Product.findAll({
      include: [
        { model: Category, as: 'category', attributes: ['id', 'name'] },
      ],
    })
    return response.status(200).json({ products })
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      price: Yup.number(),
      Category_id: Yup.number(),
      offer: Yup.boolean(),
    })
    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      const validationErrors = err.errors || err.inner.map((e) => e.message)
      return response.status(400).json({ error: validationErrors })
    }

    // admin validate
    const { admin: isAdmin } = await User.findByPk(request.userId)
    if (!isAdmin) return response.status(401).json()

    const { id } = request.params
    const productExists = await Product.findByPk(id)
    if (!productExists) {
      return response
        .status(409)
        .json({ error: 'Make sure your product ID is corret' })
    }

    let path // it won't be every time that the adm will want to change the image
    if (request.file) path = request.file.filename // cosnt{ filename: path } = request.file;
    const { name, price, category_id, offer } = request.body
    await Product.update(
      {
        name,
        price,
        category_id,
        path,
        offer,
      },
      { where: { id } },
    )
    return response.status(200).json()
  }
}

export default new ProductController()

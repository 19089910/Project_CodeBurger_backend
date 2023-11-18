import * as Yup from 'yup'
import Category from '../models/Category'
import User from '../models/User'

class CategoryController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
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

    const { name } = request.body

    const categoryExist = await Category.findOne({
      where: { name },
    })
    if (categoryExist) {
      return response.status(400).json({ error: 'Category already exist' })
    }

    const { id } = Category.create({ name })

    response.status(200).json({ id, name })
  }

  async index(request, response) {
    const categories = await Category.findAll()
    return response.status(200).json({ categories })
  }
}

export default new CategoryController()

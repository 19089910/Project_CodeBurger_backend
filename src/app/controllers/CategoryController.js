import * as Yup from 'yup'
import Category from '../models/Category'

class CategoryController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    })
    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.error })
    }

    const { name } = request.body

    const categoryExist = Category.findOne({
      where: { name },
    })
    if (!categoryExist) {
      return response.status(400).json({ error: 'Category already exist' })
    }

    const { id } = Category.create({ name })

    response.status(200).json({ id, name })
  }
}

export default new CategoryController()

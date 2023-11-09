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

    const existCategory = Category.findOne({
      where: { name },
    })
    if (!existCategory) {
      return response.status(400).json({ error: 'category already exist' })
    }

    const { id } = Category.create({ name })

    response.status(200).json({ id, name })
  }
}

export default new CategoryController()

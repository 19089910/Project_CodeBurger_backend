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
    const { filename: path } = request.file // capturing log filename

    const categoryExist = await Category.findOne({
      where: { name },
    })
    if (categoryExist) {
      return response.status(400).json({ error: 'Category already exist' })
    }

    const { id } = await Category.create({ name, path })

    response.status(200).json({ id, name })
  }

  async index(request, response) {
    const categories = await Category.findAll()
    return response.status(200).json({ categories })
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      path: Yup.string(),
    })
    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      const validationErrors = err.errors || err.inner.map((e) => e.message)
      return response(400).json({ validationErrors })
    }

    // admin validate
    const { admin: isAdmin } = await User.findByPk(request.userId)
    if (!isAdmin) return response.status(401).json()

    const { id } = request.params
    const categoryExist = await Category.findByPk(id)
    if (!categoryExist) {
      return response
        .status(400)
        .json({ error: 'Make sure your category ID is correct' })
    }

    let path // it won't be every time that the adm will want to change the image
    if (request.file) path = request.file.filename // cosnt{ filename: path } = request.file;
    const { name } = request.body

    await Category.update({ name, path }, { where: { id } })

    return response.status(200).json()
  }
}

export default new CategoryController()

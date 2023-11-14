import * as Yup from 'yup'
import Product from '../models/Product'
import Category from '../models/Category'

class OrdeController {
  async store(request, response) {
    const schema = Yup.object().shape({
      protucts: Yup.array()
        .required()
        .of(
          Yup.object().shape({
            id: Yup.number().required(),
            quantity: Yup.number().required(),
          }),
        ),
    })
    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      const validationErrors = err.errors || err.inner.map((e) => e.message)
      return response.status(400).json({ error: validationErrors })
    }
    // let's just take the product id's to: findAll in the bank and get the product information
    const protuctId = request.body.Product.map((product) => product.id)
    const updateProduct = await Product.findAll({
      where: { id: protuctId },
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['name'],
        },
      ],
    })

    return response.status(200).json(updateProduct)
  }
}

export default new OrdeController()

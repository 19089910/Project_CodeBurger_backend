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
    const protuctsId = request.body.Product.map((product) => product.id)
    const updateProducts = await Product.findAll({
      where: { id: protuctsId },
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['name'],
        },
      ],
    })
    // modeling product data
    const editrdProducts = updateProducts.map((product) => {
      const newProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        Category: product.Category.name,
        url: product.url,
        // the quantity is missing here, but it comes from request.body
      }
      return newProduct
    })

    // this variable must be a replica of schema/Order.js
    const order = {
      user: {
        id: request.userId,
        name: request.userName,
      },
      product: editrdProducts,
      // only the "status" are missing here.
    }

    return response.status(200).json(order)
  }
}

export default new OrdeController()

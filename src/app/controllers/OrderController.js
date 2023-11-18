import * as Yup from 'yup'
import Product from '../models/Product'
import Category from '../models/Category'
import Order from '../schemas/Order'

class OrdeController {
  async store(request, response) {
    const schema = Yup.object().shape({
      products: Yup.array()
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
    const prductsId = request.body.products.map((product) => product.id)
    const updateProducts = await Product.findAll({
      where: { id: prductsId },
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['name'],
        },
      ],
    })

    // modeling product data
    const editedProducts = updateProducts.map((product) => {
      const produtIndex = request.body.products.findIndex(
        (requestProduct) => requestProduct.id === product.id,
      )
      const newProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category.name,
        url: product.url,
        quantity: request.body.products[produtIndex].quantity,
      }
      return newProduct
    })

    // this variable must be a replica of schema/Order.js
    const order = {
      user: {
        id: request.userId,
        name: request.userName,
      },
      products: editedProducts,
      status: 'pedido realizado',
    }

    const orderResponse = await Order.create(order)

    return response.status(200).json(orderResponse)
  }

  async index(request, response) {
    const orders = await Order.find()
    return response.status(200).json({ orders })
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      status: Yup.string().required(),
    })
    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      const validationErrors = err.errors || err.inner.map((e) => e.message)
      return response.status(400).json({ error: validationErrors })
    }
    const { id } = request.params
    const { status } = request.body

    // if send the wrong id
    try {
      await Order.updateOne({ _id: id }, { status })
    } catch (err) {
      const validationErrors = err.errors || err.inner.map((e) => e.message)
      return response.status(400).json({ error: validationErrors })
    }
    return response.json({ message: 'Status updated sucessfully' })
  }
}

export default new OrdeController()

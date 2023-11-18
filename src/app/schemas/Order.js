import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema(
  {
    user: {
      id: { type: String, requered: true },
      name: { type: String, requered: true },
    },
    products: [
      {
        id: { type: Number, requered: true },
        name: { type: String, requered: true },
        price: { type: Number, requered: true },
        category: { type: String, requered: true },
        url: { type: String, requered: true },
        quantity: { type: String, requered: true },
      },
    ],
    status: { type: String, requered: true },
  },
  { timestamps: true },
)

export default mongoose.model('Order', OrderSchema)

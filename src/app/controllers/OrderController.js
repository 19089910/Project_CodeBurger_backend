import * as Yup from 'yup'

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

    return response.status(200).json(request.body)
  }
}

export default new OrdeController()

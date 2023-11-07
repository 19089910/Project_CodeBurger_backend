import * as Yup from 'yup'
import User from '../models/User'

class SessionController {
  async store(request, response) {
    const userEmailOrPasswordIncorrect = () => {
      return response
        .status(400)
        .json({ error: 'Make sure yor email or password are correct' })
    }

    const schema = Yup.object().shape({
      email: Yup.string().required(),
      password: Yup.string().required(),
    })
    if (!(await schema.isValid(request.body))) userEmailOrPasswordIncorrect()

    const { email } = request.body

    const userExists = await User.findOne({ where: { email } })
    if (!userExists) userEmailOrPasswordIncorrect()
  }
}

export default new SessionController()

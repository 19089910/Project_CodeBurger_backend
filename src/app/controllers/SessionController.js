import * as Yup from 'yup'
import User from '../models/User'
import jwt from 'jsonwebtoken'

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

    const { email, password } = request.body

    const userExists = await User.findOne({
      where: { email },
    })
    if (!userExists) userEmailOrPasswordIncorrect()

    if (!(await userExists.checkPassword(password))) {
      return userEmailOrPasswordIncorrect()
    }

    return response.json({
      id: userExists.id,
      email,
      name: userExists.name,
      admin: userExists.admin,
      token: jwt.sign(
        { id: userExists.id },
        '6521892f4ffd14e87ab89fad8e1c53d6',
        { expiresIn: '5d' },
      ),
    })
  }
}

export default new SessionController()

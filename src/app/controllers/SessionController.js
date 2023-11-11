import * as Yup from 'yup'
import User from '../models/User'
import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth'

class SessionController {
  async store(request, response) {
    const userEmailOrPasswordIncorrect = () => {
      response
        .status(401)
        .json({ error: 'Make sure yor email or password are correct' })
    }

    const schema = Yup.object().shape({
      email: Yup.string().required(),
      password: Yup.string().required(),
    })
    if (!(await schema.isValid(request.body))) {
      return userEmailOrPasswordIncorrect()
    }

    const { email, password } = request.body

    const userExists = await User.findOne({
      where: { email },
    })
    if (!userExists) {
      return userEmailOrPasswordIncorrect()
    }

    if (!(await userExists.checkPassword(password))) {
      return userEmailOrPasswordIncorrect()
    }

    return response.json({
      id: userExists.id,
      email,
      name: userExists.name,
      admin: userExists.admin,
      token: jwt.sign(
        { id: userExists.id, name: userExists.name },
        authConfig.secret,
        {
          expiresIn: authConfig.expiresIn,
        },
      ),
    })
  }
}

export default new SessionController()

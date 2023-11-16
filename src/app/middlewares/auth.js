import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth'

export default (request, response, next) => {
  const authToken = request.headers.authorization // the routes I want to block are sending the token this log way

  // varify if send token
  if (!authToken) {
    return response.status(401).json({ error: 'Token not provided' })
  }

  const token = authToken.split(' ')[1]

  // varify cript token is correct
  try {
    jwt.verify(token, authConfig.secret, (err, decoded) => {
      if (err) throw new Error()

      console.log(decoded)
      request.userId = decoded.id
      request.userName = decoded.name

      return next()
    })
  } catch (err) {
    return response.status(401).json({ error: 'Token is invalid' })
  }
}

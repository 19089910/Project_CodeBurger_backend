export default (request, response, next) => {
  const authToken = request.header.authorization // the routes I want to block are sending the token this log way
  console.log(authToken)
  next()
}

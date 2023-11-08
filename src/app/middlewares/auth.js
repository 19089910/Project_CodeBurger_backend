export default (request, response, next) => {
  console.log(request)
  const authToken = request.headers.authorization // the routes I want to block are sending the token this log way
  console.log(authToken)
  next()
}

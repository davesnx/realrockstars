const port = parseInt(process.env.PORT, 10) || 1234
const address = process.env.ADDRESS || '//localhost'

module.exports = {
  port,
  address
}

const port = process.env.PORT
const address = process.env.ADDRESS
const protocol = address === 'localhost' ? 'http' : 'https'

module.exports = {
  protocol,
  port,
  address,
  URL: `${protocol}://${address}:${port}`
}

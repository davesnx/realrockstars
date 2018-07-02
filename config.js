const PORT = process.env.PORT
const ADDRESS = process.env.ADDRESS
const PROTOCOL = ADDRESS === 'localhost' ? 'http' : 'https'
const URL = `${PROTOCOL}://${ADDRESS}:${PORT}`
const GITHUB = {
  CLIENT_ID: '07f58fec96405723a8d6',
  CLIENT_SECRET: '1e795378c97afac5e3fd526e2d9be92d352ff8ac'
}

module.exports = {
  PORT,
  URL,
  GITHUB
}

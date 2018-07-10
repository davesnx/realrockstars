require('dotenv').config()

const ADDRESS = process.env.ADDRESS
const PROTOCOL = ADDRESS === 'localhost' ? 'http' : 'https'
const PORT = ADDRESS === 'localhost' ? process.env.PORT : '80'
const URL = `${PROTOCOL}://${ADDRESS}:${PORT}`

const GITHUB = {
  CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET
}

module.exports = {
  PORT,
  URL,
  GITHUB
}

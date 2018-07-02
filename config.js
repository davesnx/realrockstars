require('dotenv').config()

const PORT = process.env.PORT
const ADDRESS = process.env.ADDRESS
const PROTOCOL = ADDRESS === 'localhost' ? 'http' : 'https'
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

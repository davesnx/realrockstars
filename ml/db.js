const low = require('lowdb')
const shortId = require('shortid')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const DB = low(adapter)

DB.defaults({ repos: [] }).write()

const exist = nameWithOwner => !!DB.get('repos').find({ nameWithOwner }).value()

const save = repo => {
  if (!exist(repo.nameWithOwner)) {
    DB.get('repos').push({ id: shortId(), ...repo }).write()
  }
}

module.exports = { DB, save, exist }

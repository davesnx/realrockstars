import R from 'ramda'
import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import fs from 'fs'
import uniqId from 'shortid'
import octonode from 'octonode'
import pMap from 'p-map'
import slug from 'slug'

const adapter = new FileSync('db.json')
const DB = low(adapter)

const github = octonode.client({
  id: process.env.GITHUB_CLIENT_ID,
  secret: process.env.GITHUB_CLIENT_SECRET
})

DB.defaults({ repos: [] }).write()

const githubRepo = url => {
  const repo = github.repo(url)
  return new Promise((resolve, reject) => {
    repo.info((error, data) => {
      if (error) {
        reject(error)
      } else {
        resolve(
          R.applySpec({
            url: R.prop('html_url'),
            name: R.prop('full_name'),
            stargazers_count: R.prop('stargazers_count'),
            size: R.prop('size'),
            watchers_count: R.prop('watchers_count'),
            forks_count: R.prop('forks_count'),
            open_issues_count: R.prop('open_issues_count'),
            default_branch: R.prop('default_branch')
          })(data)
        )
      }
    })
  })
}

const delay = ms => new Promise(res => setTimeout(res, ms))

const saveOne = table => item => {
  const t = DB.get(table)

  if (t.findIndex({ name: item.name }).value() === -1) {
    t.push({ ...item, id: uniqId() }).write()
  }
}

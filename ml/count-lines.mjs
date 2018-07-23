import R from 'ramda'
import axios from 'axios'
import { spawn } from 'child_process'
import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import { parse } from './node_modules/parse5'

const adapter = new FileSync('db.json')
const DB = low(adapter)

DB.defaults({ repos: [] }).write()

const cloneRepo = repo => {
  const folder = `.tmp/${repo.name}`
  console.log(`git clone ${repo.url}`)

  const git = spawn('git', [
    'clone',
    `--branch=${repo.default_branch}`,
    '--depth=1',
    '--no-tags',
    '--single-branch',
    repo.url,
    folder
  ])

  git.stdout.on('data', data => {
    console.log(`stdout: ${data}`)
  })

  git.stderr.on('data', data => {
    console.log(`stderr: ${data}`)
  })

  git.on('close', code => {
    console.log(`child process exited with code ${code}`)
  })
}

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

const countLines = repo => {
  // const folder = `.tmp/${repo.full_name}`
  const folder = `.tmp/vuejs/vue`

  const tokei = spawn('tokei', [folder, '--output=json'])

  tokei.stdout.on('data', result => {
    console.log(`stdout: ${result}`)

    const data = JSON.parse(result)

    // DB.get('repos')
    //   .find({ name: repo.name })
    //   .update('lines', R.identity(data))
    //   .write()
  })

  tokei.stderr.on('data', data => {
    console.log(`stderr: ${data}`)
  })

  tokei.on('close', code => {
    console.log(`child process exited with code ${code}`)
  })
}

async function main () {
  const reposData = await DB.get('repos').value()
  // cloneRepo(reposData[getRandomInt(0, R.length(reposData))])
  // R.forEach(countLines, reposData)
  countLines(reposData[0])
}

main()

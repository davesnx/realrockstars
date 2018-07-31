const R = require('ramda')
const execa = require('execa')
const { delay } = require('./utils.js')
const fs = require('fs')

const directoryExists = directory => {
  fs.stat(directory, err => {
    if (err && err.errno === 34) {
      return false
    } else {
      return true
    }
  })
}

const removeFolder = async folder =>
  await execa.shell(['rm -rf', folder].join(' '))

const countLines = async (repo, sshUrl, defaultBranch) => {
  const folder = `.tmp/${repo}`
  try {
    console.log(`git clone ${sshUrl}`)

    // if (directoryExists(folder)) {
    //   console.log('Already cloned')
    //   return 0
    // }

    const git = await execa.shell(
      [
        'git clone',
        `--branch=${defaultBranch}`,
        '--depth=1',
        '--no-tags',
        '--single-branch',
        sshUrl,
        folder
      ].join(' ')
    )

    await delay(1000)

    const tokei = await execa.shell(`tokei ${folder} --output=json`)

    const linesByLanguage = R.mapObjIndexed(
      R.prop('code'),
      JSON.parse(tokei.stdout)
    )

    const totalLines = R.sum(R.values(linesByLanguage))

    await removeFolder(folder)

    return totalLines
  } catch (error) {
    await removeFolder(folder)
    console.log(error)
  }
}

module.exports = countLines

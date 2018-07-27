const R = require('ramda')
const execa = require('execa')
const { delay, getRandomInt } = require('./utils')

const main = async () => {
  const reposData = await DB.get('repos').value()

  const repo = reposData[getRandomInt(0, reposData.length - 1)]
  // for (const repo of reposData) {

  try {
    const folder = `.tmp/${repo.full_name}`
    const repository = `https://github.com/${repo.full_name}`

    console.log(`git clone ${repository}`)

    const git = await execa.shell(
      [
        'git clone',
        `--branch=${repo.default_branch}`,
        '--depth=1',
        '--no-tags',
        '--single-branch',
        repository,
        folder
      ].join(' ')
    )

    delay(1000)

    const tokei = await execa.shell('tokei', [folder, '--output json'])
    const lines = R.mapObjIndexed((_, value) => value.code, tokei.stdout)
    const totalLines = R.sum(lines)
    console.log(totalLines)
  } catch (error) {
    console.log(error)
  }
  // }
}

main()

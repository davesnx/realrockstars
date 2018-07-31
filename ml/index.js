const { DB, save, exist } = require('./db.js')
const fetch = require('./fetch.js')
const countLines = require('./count-lines.js')

const NUM_OF_REPOS = 10
const QUERY = 'q=language:JavaScript'

const main = async () => {
  const repoData = await fetch(QUERY, NUM_OF_REPOS)
  for (const repo of repoData) {
    if (!exist(repo)) {
      const lines = await countLines(
        repo.nameWithOwner,
        repo.sshUrl,
        repo.defaultBranch
      )
      await save({ ...repo, linesOfCode: lines })
    }
  }
}

main()

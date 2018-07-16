import R from 'ramda'
import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import octonode from 'octonode'

const adapter = new FileSync('db.json')
const DB = low(adapter)

DB.defaults({ repos: [] }).write()

const github = octonode.client({
  id: process.env.GITHUB_CLIENT_ID,
  secret: process.env.GITHUB_CLIENT_SECRET
})

const getTrendingGithubRepos = lang => {}

// pMap(
//   DB.get('repos').take(4300).value(),
//   async repo => {
//     try {
//       const repoData = await githubRepo(repo.url.split('m/')[1])
//       await saveToDB('data')(repoData)
//     } catch (err) {
//       console.error(err)
//     }
//   },
//   {
//     concurrency: 1
//   }
// ).then(_ => {
//   console.log('Cefini')
//   console.log(DB.get('data').value().length)
// })

const ghsearch = github.search()

// curl -G https://api.github.com/search/repositories
// --data-urlencode "sort=stars"
// --data-urlencode "order=desc"
// --data-urlencode "q=language:php"
// | jq_ ".items[] | { name, full_name, description, html_url, forks_count,
// size, default_branch, stargazers_count, language, open_issues_count }"
// >> db.json

R.forEach(
  lang => {
    ghsearch.repos(
      {
        q: `language:javascript`,
        sort: 'stars'
      },
      response => {
        console.log(response)

        // console.log(response.body.message)
      }
    )
  },
  ['elm']
)

github.limit(function (err, left, max, reset) {
  console.log(left) // 4999
  console.log(max) // 5000
})

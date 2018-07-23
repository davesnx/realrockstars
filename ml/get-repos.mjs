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

// pMap(
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

const languages = ['javascript']
  ghsearch. ({
    q:

  })
}

// for (const lang of languages) {

// }

github.limit(function (err, left, max, reset) {
  console.log(left) // 4999
  console.log(max) // 5000
})

const R = require('ramda')
const uniqId = require('shortid')
const slug = require('slug')
const { GraphQLClient } = require('graphql-request')

require('dotenv').config()

const client = new GraphQLClient('https://api.github.com/graphql', {
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_PERSONAL_TOKEN}`
  }
})

const getRepos = `{
  search(query: "q=language:JavaScript", type: REPOSITORY, last:1) {
    edges {
      node {
        ... on Repository {
          name
          owner {
            avatarUrl
            login
          }
          nameWithOwner
          description
          createdAt
          updatedAt
          stargazers {
            totalCount
          }
          forks {
            totalCount
          }
          primaryLanguage {
            id
            name
            color
          }
          pullRequests {
            totalCount
          }
          defaultBranchRef {
            name
          }
          diskUsage
          sshUrl
          url
        }
      }
    }
  }

  rateLimit {
    limit
    cost
    remaining
    resetAt
  }
}`

const getCommitCount = (login, name, branch) => {
  const query = `{
    repository(owner: ${login}, name: ${name}) {
      object(expression: ${branch}) {
        ... on Commit {
          history {
            totalCount
          }
        }
      }
    }
  }
  `

  return client.request(query)
}

const main = async () => {
  try {
    const repos = await client.request(getRepos)
    const {
      owner,
      name,
      defaultBranchRef,
      stargazers,
      pullRequests,
      forks,
      ...data
    } = repos.search.edges[0].node

    const defaultBranch = defaultBranchRef.name
    const starsCount = stargazers.totalCount
    const forksCount = forks.totalCount
    const pullRequestsCount = pullRequests.totalCount

    const response = await getCommitCount(owner.login, name, defaultBranch)

    const commitCount = response.repository.object.history

    return {
      ...data,
      defaultBranch,
      forksCount,
      starsCount,
      pullRequestsCount,
      commitCount
    }
  } catch (error) {
    console.log(error)
  }
}

// const octonode = require('octonode')

// const github = octonode.client({
//   id: process.env.GITHUB_CLIENT_ID,
//   secret: process.env.GITHUB_CLIENT_SECRET
// })

// const githubRepo = url => {
//   const repo = github.repo(url)
//   return new Promise((resolve, reject) => {
//     repo.info((error, data) => {
//       if (error) {
//         reject(error)
//       } else {
//         resolve(
//           R.applySpec({
//             url: R.prop('html_url'),
//             name: R.prop('full_name'),
//             stargazers_count: R.prop('stargazers_count'),
//             size: R.prop('size'),
//             watchers_count: R.prop('watchers_count'),
//             forks_count: R.prop('forks_count'),
//             open_issues_count: R.prop('open_issues_count'),
//             default_branch: R.prop('default_branch')
//           })(data)
//         )
//       }
//     })
//   })
// }

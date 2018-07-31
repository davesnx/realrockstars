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

const NUM_OF_REPOS = 1
const QUERY = 'q=language:JavaScript'

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

const fetch = async (query = QUERY, numOfRepos = NUM_OF_REPOS) => {
  let fetchedRepos = []

  try {
    const getRepos = `{
      search(query: "${query}", type: REPOSITORY, last:${numOfRepos}) {
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

    const response = await client.request(getRepos)

    const repos = response.search.edges

    for (const repo of repos) {
      const {
        owner,
        name,
        defaultBranchRef,
        stargazers,
        pullRequests,
        forks,
        ...data
      } = repo.node

      const defaultBranch = defaultBranchRef.name
      const starsCount = stargazers.totalCount
      const forksCount = forks.totalCount
      const pullRequestsCount = pullRequests.totalCount

      const response = await getCommitCount(owner.login, name, defaultBranch)
      const commitCount = response.repository.object.history.totalCount

      fetchedRepos.push({
        ...data,
        defaultBranch,
        forksCount,
        starsCount,
        pullRequestsCount,
        commitCount
      })
    }
    return fetchedRepos
  } catch (error) {
    console.log(error)
  }
}

module.exports = fetch

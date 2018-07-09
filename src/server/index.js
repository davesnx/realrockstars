import 'babel-polyfill'
import express from 'express'
import bodyParser from 'body-parser'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { renderStylesToString } from 'emotion-server'
import path from 'path'
import octonode from 'octonode'
import R from 'ramda'

import { URL, PORT, GITHUB } from './../../config'
import Html from './html'
import App from './../client/app'

const server = express()
const github = octonode.client({
  id: GITHUB.CLIENT_ID,
  secret: GITHUB.CLIENT_SECRET
})

const sizeDividedByStars = R.converge(R.divide, [
  R.prop('stargazers_count'),
  R.prop('size')
])

const calculateRockstarLevel = R.pipe(sizeDividedByStars, Math.sqrt)
const getAvatarUrl = R.pipe(R.prop('owner'), R.prop('avatar_url'))

const githubRepo = (org, name) => {
  const repo = github.repo(`${org}/${name}`)
  return new Promise((resolve, reject) => {
    repo.info((error, data) => {
      if (error) {
        reject(error)
      } else {
        resolve(
          R.applySpec({
            name: R.prop('full_name'),
            description: R.prop('description'),
            avatarURL: getAvatarUrl,
            stars: R.prop('stargazers_count'),
            linesOfCode: R.prop('size'),
            rockstarLevel: calculateRockstarLevel
          })(data)
        )
      }
    })
  })
}

const fetchRepositoryMiddleware = (req, res) => {
  const { org, name } = req.body

  githubRepo(org, name)
    .then(data => {
      res.send({
        OK: R.T(),
        data: data
      })
    })
    .catch(error => {
      res.send({
        OK: !error,
        error: error && error.message
      })
    })
}

const renderFrontendMiddleware = (_, res) => {
  github.limit((error, left, max, reset) => {
    if (error) {
      res.send()
    }

    const body = renderStylesToString(
      renderToString(<App githubAPILimit={{ max, left }} />)
    )

    res.send(Html(body))
  })
}

server.use(bodyParser.json())
server.use(express.static('build/client'))
server.use(express.static('static'))
server.get('/', renderFrontendMiddleware)
server.post('/repo', fetchRepositoryMiddleware)

server.listen(PORT, () => console.log(`> Ready on ${URL}`))

console.log(URL, PORT)

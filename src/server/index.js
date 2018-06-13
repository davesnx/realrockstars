import 'babel-polyfill'
import express from 'express'
import bodyParser from 'body-parser'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { renderStylesToString } from 'emotion-server'
import path from 'path'
import octonode from 'octonode'

import { port, address } from './../../config'
import Html from './html'
import App from './../client/app'

const server = express()
const github = octonode.client()

// github.limit((err, left, max, reset) => {
//   console.log(left)
//   console.log(max)
//   console.log(reset);  // 1372700873 (UTC epoch seconds)
// })

const IS_DEV = process.env.NODE_ENV === 'development'

import createGlobalStyles from './../client/create-global-styles'

const fetchRepositoryMiddleware = (req, res) => {
  const { org, name } = req.body
  const repo = github.repo(`${org}/${name}`)

  // createGlobalStyles()

  if (IS_DEV) {
    res.send({
      OK: true,
      data: {
        name: 'facebook/react',
        description: 'A declarative, efficient, and flexible JavaScript library for building user interfaces.',
        avatarURL: 'http://cdn1.sciencefiction.com/wp-content/uploads/2013/03/url-491.jpeg',
        stars: 97365,
        linesOfCode: 136392,
        rockstarLevel: 97365 / 136392
      }
    })
  } else {
    repo.info((error, data) => {
      res.send({
        data: {
          name: data.full_name,
          description: data.description,
          avatarURL: data.owner.avatar_url,
          stars: data.stargazers_count,
          linesOfCode: data.size,
          rockstarLevel: data.stargazers_count / data.size
        },
        OK: !error,
        error: error && error.message
      })
    })
  }
}

const renderFrontendMiddleware = (_, res) => {
  const body = renderStylesToString(renderToString(<App />))

  res.send(Html(body))
}

server.use(bodyParser.json())
server.use(express.static('build/client'))
server.use(express.static('static'))
server.get('/', renderFrontendMiddleware)
server.post('/repo', fetchRepositoryMiddleware)

server.listen(port, () => {
  console.log(`> Ready on ${address}:${port}`)
})

import 'babel-polyfill'
import express from 'express'
import bodyParser from 'body-parser'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { renderStylesToString } from 'emotion-server'
import path from 'path'
import octonode from 'octonode'
import R from 'ramda'

import { URL, port } from './../../config'
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

// console.log(process.env.ADDRESS)
// console.log(process.env.PORT)

const fetchRepositoryMiddleware = (req, res) => {
  const { org, name } = req.body
  const repo = github.repo(`${org}/${name}`)

  if (IS_DEV) {
    res.send({
      OK: R.T(),
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
      if (error) {
        res.send({
          OK: !error,
          error: error && error.message
        })
      } else {
        const restrictFrom0To1 = R.clamp(0, 1)

        const calculateRockstarLevel = R.pipe(
          R.converge(R.divide, [R.prop('stargazers_count'), R.prop('size')]),
          restrictFrom0To1
        )

        const getAvatarUrl = R.pipe(R.prop('owner'), R.prop('avatar_url'))

        res.send({
          OK: R.T(),
          data: R.applySpec({
            name: R.prop('full_name'),
            description: R.prop('description'),
            avatarURL: getAvatarUrl,
            stars: R.prop('stargazers_count'),
            linesOfCode: R.prop('size'),
            rockstarLevel: calculateRockstarLevel
          })(data)
        })
      }
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
  console.log(`> Ready on ${URL}`)
})

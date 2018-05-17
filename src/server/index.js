import 'babel-polyfill'
import express from 'express'
import bodyParser from 'body-parser'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'
import path from 'path'
import URL from 'url'
import octonode from 'octonode'
import { port } from './../../config'

import __document from './document'
import App from './../client'

const server = express()
const github = octonode.client() // https://github.com/pksunkara/octonode

// github.limit((err, left, max, reset) => {
//   console.log(left)
//   console.log(max)
//   console.log(reset);  // 1372700873 (UTC epoch seconds)
// })

const fetchRepositoryMiddleware = (req, res) => {
  const { org, name } = req.body
  const repo = github.repo(`${org}/${name}`)
  repo.info((error, data) => {
    res.send({
      data: data,
      OK: true
    })
  })
}

const renderFrontendMiddleware = (_, res) => {
  const sheet = new ServerStyleSheet()
  const body = renderToString(sheet.collectStyles(<App />))
  const styles = sheet.getStyleTags()

  res.send(__document({ body, styles }))
}

server.use(bodyParser.json())
server.use(express.static('public'))
server.get('/', renderFrontendMiddleware)
server.post('/repo', fetchRepositoryMiddleware)

server.listen(port, () => {
  console.log(`> Ready on http://localhost:${port}`)
})

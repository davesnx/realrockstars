import fetch from 'node-fetch'
import { port } from './../../../config'

const API_HOST = `http://localhost:${port}`

export async function httpPost(resource, body) {
  const bodyString = JSON.stringify(body)
  const result = await _fetch(resource, 'POST', bodyString)
  const response = result.json()
  if (response.OK) {
    return response
  }

  throw response
}

function _fetch(resource, method = 'GET', body) {
  return fetch(API_HOST + resource, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body
  })
}

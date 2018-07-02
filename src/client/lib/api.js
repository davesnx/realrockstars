import fetch from 'node-fetch'
import { URL } from './../../../config'

export async function httpPost (resource, body) {
  const bodyString = JSON.stringify(body)
  const result = await _fetch(resource, 'POST', bodyString)
  const response = await result.json()

  if (response.OK) {
    return response
  }

  throw response
}

function _fetch (resource, method = 'GET', body) {
  return fetch(URL + resource, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body
  })
}

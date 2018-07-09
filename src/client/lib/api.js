import fetch from 'node-fetch'

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
  return fetch(window.location + resource, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body
  })
}

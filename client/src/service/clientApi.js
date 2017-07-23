const host = process.env.REACT_APP_API_HOST

export function requestRepo (organizationName, repoName) {
  const options = {
    mode: 'no-cors',
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }

  const endpoint = `repo?org=${organizationName}&name=${repoName}`
  return fetch(host + endpoint, options)
    .then(resp => resp.json())
    .catch(console.warn)
}

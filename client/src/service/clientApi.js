const apiHost = process.env.REACT_APP_API_HOST

function debugP (args) {
  console.log(args)
  return args
}

export function requestRepo (organizationName, repoName) {
  const endpoint = `repo?org=${organizationName}&name=${repoName}`
  return fetch(apiHost + endpoint).then(debugP).then(resp => resp.json())
}

const apiHost = process.env.REACT_APP_API_HOST

export function requestRepo(organizationName, repoName) {
  const endpoint = `repo?org=${organizationName}&name=${repoName}`
  return fetch(apiHost + endpoint).then(resp => resp.json())
}

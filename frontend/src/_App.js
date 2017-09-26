import React, { Component } from 'react'
import styled from 'styled-components'

import Footer from './components/footer/footer'
import Header from './components/header/header'
import InputGroup from './components/search/input-group'
import GithubGrid from './components/github-grid/github-grid'
import Error from './components/error/error'
import Repo from './components/repository/repo'
import { requestRepo } from './service/client-api'
import delay from './utils/delay'

const Layout = styled.div`
  max-width: 630px;
  margin: 0 auto;
`

const Main = styled.div`
  position: relative;
  height: 380px;
  display: flex;
  justify-content: center;
  align-items: center;
`

class App extends Component {
  state = {
    loading: false,
    success: false,
    error: false,
    repo: {}
  }

  setRepo = data => {
    this.setState({
      repo: data,
      success: true
    })
  }

  setError = error => {
    this.setState({
      error: error,
      loading: false
    })
  }

  stopLoading = cosis => {
    this.setState({
      loading: false
    })
    return cosis
  }

  submitHandler = (org, repo) => {
    this.setState({ loading: true }, () => {
      requestRepo(org, repo)
        .then(delay(400))
        .then(this.stopLoading)
        .then(this.setRepo)
        .catch(this.setError)
    })
  }

  render () {
    const { error, success } = this.state
    return (
      <Layout>
        <Main>
          {error &&
            <Error>
              {error.message}
            </Error>}
          {!success && <InputGroup onSubmit={this.submitHandler} />}
          {success &&
            this.state.repo &&
            <Repo
              name={this.state.repo.name}
              org={this.state.repo.org}
              description={this.state.repo.description}
              link={this.state.repo.url}
              stars={this.state.repo.stars}
              language={this.state.repo.language}
              linesOfCode={this.state.repo.lines}
              rockstarLevel={this.state.repo.rockstarLevel}
              orgaLogo={this.state.repo.avatarUrl}
            />}
          <GithubGrid spinning={this.state.loading} />
        </Main>
        <Footer>by davesnx</Footer>
      </Layout>
    )
  }
}

export default App

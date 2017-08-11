import React, { Component } from 'react'
import styled from 'styled-components'

import Footer from './components/Footer'
import Header from './components/Header'
import InputGroup from './components/InputGroup'
import GithubBackground from './components/GithubBackground'
import Error from './components/Error'
import Repo from './components/Repo'
import { requestRepo } from './service/clientApi'
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
      error: error
    })
  }

  stopLoading = () => {
    this.setState({
      loading: false
    })
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

  render() {
    const { error, success } = this.props
    return (
      <Layout>
        <Header />
        <Main>
          {!!error &&
            <Error>
              {error.message}
            </Error>}
          {!success && <InputGroup onSubmit={this.submitHandler} />}
          {success &&
            <Repo
              name={this.props.repo.name}
              org={this.props.repo.org}
              description={this.props.repo.description}
              link={this.props.repo.url}
              stars={this.props.repo.stars}
              language={this.props.repo.language}
              linesOfCode={this.props.repo.lines}
              rockstarLevel={this.props.repo.rockstarLevel}
              orgaLogo={this.props.repo.avatarUrl}
            />}
          <GithubBackground spinning={this.state.loading} />
        </Main>
        <Footer>by davesnx</Footer>
      </Layout>
    )
  }
}

export default App

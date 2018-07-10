import React, { Fragment, Component } from 'react'

import Header from './header'
import Repository from './components/repository/repo'
import Search from './components/search/search'
import Spacer from './components/spacer'
import ErrorBanner from './components/error/error'
import Container from './components/container'
import BaseStyles from './components/base-styles'
import constants from './components/constants'
import { httpPost } from './lib/api'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      hasResult: false,
      hasError: false,
      data: {}
    }

    this.submitHandler = this.submitHandler.bind(this)
    this.dispatchError = this.dispatchError.bind(this)
  }

  submitHandler (org, name) {
    httpPost('repo', { org, name })
      .then(response => {
        this.setState({
          hasError: false,
          hasResult: true,
          data: response.data
        })
      })
      .catch(response => this.dispatchError(response.error))
  }

  dispatchError (error) {
    this.setState({
      hasResult: false,
      hasError: true,
      error: error
    })
  }

  renderError (hasError, error) {
    if (!hasError) {
      return null
    }

    return (
      <Spacer top={1}>
        <ErrorBanner>{error}</ErrorBanner>
      </Spacer>
    )
  }

  renderResult (hasResult, repo) {
    if (!hasResult) {
      return null
    }

    return (
      <Spacer top={3}>
        <Repository
          name={repo.name}
          description={repo.description}
          avatarURL={repo.avatarURL}
          stars={repo.stars}
          language={repo.language}
          linesOfCode={repo.linesOfCode}
          rockstarLevel={repo.rockstarLevel}
        />
      </Spacer>
    )
  }

  render () {
    const { hasResult, data, hasError, error } = this.state
    return (
      <BaseStyles>
        <Container>
          <Header />
          <Search onSubmit={this.submitHandler} onError={this.dispatchError} />
          {this.renderError(hasError, error)}
          {this.renderResult(hasResult, data)}
        </Container>
      </BaseStyles>
    )
  }
}

export default App

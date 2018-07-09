import React, { Fragment, Component } from 'react'
// import { Transition, animated } from 'react-spring'

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
      data: {}
    }

    this.submitHandler = this.submitHandler.bind(this)
  }

  submitHandler (org, name) {
    console.log('window.location', window.location)

    httpPost('repo', { org, name })
      .then(response => {
        this.setState({
          hasError: false,
          hasResult: true,
          data: response.data
        })
      })
      .catch(response => {
        this.setState({
          hasResult: false,
          hasError: true,
          error: response.error
        })
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
          <Search onSubmit={this.submitHandler} />
          {this.renderError(hasError, error)}
          {this.renderResult(hasResult, data)}
        </Container>
      </BaseStyles>
    )
  }
}

export default App

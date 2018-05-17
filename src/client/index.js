import ReactDOM from 'react-dom'
import React, { Fragment, Component } from 'react'
import styled, { injectGlobal } from 'styled-components'
import Parser from 'html-react-parser'

import styledNormalize from 'styled-normalize'

import Logo from './components/logo/logo'
import Repository from './components/repository/repo'
import Search from './components/search/search'
import MessageBox from './components/message-box'
import Spacer from './components/spacer'
import ErrorBanner from './components/error/error'
import Container from './components/container'
import BaseStyles from './components/base-styles'
import { httpPost } from './lib/api'

injectGlobal`
  ${styledNormalize}

  @font-face {
    font-family: 'SF Mono';
    src: url('./public/fonts/SFMono-Regular.woff2') format('woff2'),
      url('./public/fonts/SFMono-Regular.woff') format('woff'),
      url('./public/fonts/SFMono-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: italic;
  }

  @font-face {
    font-family: 'SF Mono';
    src: url('./public/fonts/SFMono-Bold.woff2') format('woff2'),
      url('./public/fonts/SFMono-Bold.woff') format('woff'),
      url('./public/fonts/SFMono-Bold.ttf') format('truetype');
    font-weight: bold;
    font-style: italic;
  }
`

const IS_RUNNING_ON_BROWSER = typeof document === "object"

class Home extends Component {
  constructor (props) {
    super(props)

    this.state = {
      hasResult: false,
      data: {}
    }

    this.submitHandler = this.submitHandler.bind(this)
  }

  submitHandler (org, name) {
    httpPost('/repo', { org, name })
      .then(response => {
        console.log(response)
        this.setState({
          data: {
            hasResult: true,
            data: response
          }
        })
      })
      .catch(err => {
        this.setState({
          data: {
            hasResult: false,
            hasError: true,
            error: err.message
          }
        })
      })
  }

  renderHeader () {
    return (
      <Fragment>
        <Logo />
        <Spacer top={4} bottom={4}>
          <MessageBox
            title={`What's a real rockstar?`}
            description={`
            <strong>A developer who has a project with more stars than lines of code.</strong>
            <br/><br/>
            <a href='http://wikipedia.com/Linus_torvalds'>Linus Torvalds</a> made <a href='http://wikipedia.com/linux'>Linux</a>'s Kernel and potentially is a rockstar, but not a realrockstar... the project has <strong>24M lines of code</strong> and <strong>"only" 46,253 github stars, </strong>that's a 0.08 of realrockstar level
          `}
          />
        </Spacer>
      </Fragment>
    )
  }

  renderError (error) {
    if (!error) {
      return null
    }
    return (
      <Spacer top={1}>
        <ErrorBanner>{error.message}</ErrorBanner>
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
          org={repo.org}
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
    const { hasResult, data, error } = this.state
    return (
      <BaseStyles>
        <Container>
          <br/>
          {this.renderHeader()}
          <Search onSubmit={this.submitHandler} />
          {this.renderError(error)}
          {this.renderResult(hasResult, data)}
        </Container>
      </BaseStyles>
    )
  }
}

if (IS_RUNNING_ON_BROWSER) {
  ReactDOM.hydrate(<Home />, document.getElementById('app'))
}

export default Home
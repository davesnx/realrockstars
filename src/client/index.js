import ReactDOM from 'react-dom'
import React, { Fragment, Component } from 'react'
import styled, { injectGlobal } from 'styled-components'
import styledNormalize from 'styled-normalize'
// import { Transition, animated } from 'react-spring'

import Logo from './components/logo/logo'
import Repository from './components/repository/repo'
import Search from './components/search/search'
import MessageBox from './components/message-box/message-box'
import StarIcon from './components/icons/star'
import CodeIcon from './components/icons/code'
import Bold from './components/bold'
import Spacer from './components/spacer'
import ErrorBanner from './components/error/error'
import Container from './components/container'
import BaseStyles from './components/base-styles'
import { httpPost } from './lib/api'
import constants from './components/constants'

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

const IS_RUNNING_ON_BROWSER = typeof document === 'object'

const InlineIcon = styled.div`
  display: inline-flex;
  align-items: baseline;
  margin: 0 -${constants.unit / 2}px;

  & > svg {
    margin: 0 ${constants.unit / 2}px;
  }
`

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
        this.setState({
          hasResult: true,
          data: response.data
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
          <MessageBox title={`What's a real rockstar?`}>
            <Fragment>
              A developer who has a project with more stars than lines of code.
              <br />
              <br />
              So... If you have a repo with <InlineIcon>
                <StarIcon
                  width={14}
                  height={13}
                  color={constants.colors.brand}
                />
                <Bold>10 stars</Bold>
              </InlineIcon> and only <InlineIcon>
                <CodeIcon
                  width={16}
                  height={12}
                  color={constants.colors.brand}
                />
                <Bold>3 lines of code</Bold>
              </InlineIcon>, you are a fucking rockstar.
              <br />
              <br />
              Even
              {' '}
              <a href='http://wikipedia.com/Linus_torvalds'>Linus Torvalds</a>
              {' '}
              that made
              {' '}
              <a href='http://wikipedia.com/linux'>Linux</a>
              's Kernel isn't a realrockstar. The project has
              {' '}
              <InlineIcon>
                <CodeIcon
                  width={16}
                  height={12}
                  color={constants.colors.brand}
                />
                <Bold>24M lines of code</Bold>
              </InlineIcon>
              {' '}
              and
              {' '}
              <InlineIcon>
                <StarIcon
                  width={14}
                  height={13}
                  color={constants.colors.brand}
                />
                <Bold>46,253 stars</Bold>
              </InlineIcon> that's a 0.08 of realrockstar level
            </Fragment>
          </MessageBox>
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
          <br />
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

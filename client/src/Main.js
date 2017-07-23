import React, { Component } from 'react'
import styled from 'styled-components'

import InputGroup from './components/InputGroup'
import GithubBackground from './components/GithubBackground'
import Error from './components/Error'
import Repo from './components/Repo'

const Root = styled.div`
  position: relative;
  height: 380px;
  display: flex;
  justify-content: center;
  align-items: center;
`

class Main extends Component {
  render () {
    const { hasError, success, loading, error } = this.props
    return (
      <Root>
        {hasError && <Error>{error.message}</Error>}
        {!success && <InputGroup onSubmit={this.props.onSubmit} />}
        {success &&
          <Repo
            name={this.props.data.name}
            org={this.props.data.org}
            description={this.props.data.description}
            link={this.props.data.url}
            stars={this.props.data.stars}
            language={this.props.data.language}
            linesOfCode={this.props.data.lines}
            rockstarLevel={this.props.data.rockstarLevel}
            orgaLogo={this.props.data.avatarUrl}
          />}
        <GithubBackground spinning={loading} />
      </Root>
    )
  }
}

export default Main

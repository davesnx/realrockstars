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
    const { success, loading, error } = this.props
    return (
      <Root>
        {!!error && <Error>{error.message}</Error>}
        {!success && <InputGroup onSubmit={this.props.onSubmit} />}
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
        <GithubBackground spinning={loading} />
      </Root>
    )
  }
}

export default Main

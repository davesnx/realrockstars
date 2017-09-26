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
  margin: 0 auto;
  overflow: hidden;
`

class App extends Component {
  state = {
    loading: true
  }

  render () {
    return (
      <Layout>
        <GithubGrid
          size={{
            height: window.innerHeight,
            width: window.innerWidth
          }}
          spinning={this.state.loading}
        />
      </Layout>
    )
  }
}

export default App

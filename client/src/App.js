import React, { Component } from 'react'
import styled from 'styled-components'

import Main from './Main'
import Footer from './components/Footer'
import Header from './components/Header'
import { requestRepo } from './service/clientApi'
import delay from './utils/delay'

const Layout = styled.div`
  max-width: 630px;
  margin: 0 auto;
`

class App extends Component {
  state = {
    fetching: false,
    success: false,
    error: false
  }

  setRepo = data => {
    this.setState({
      repo: data,
      success: true
    })
  }

  setError = error => {
    this.setState({
      hasError: true,
      error: error
    })
  }

  stopFetching = () => {
    this.setState({
      fetching: false
    })
  }

  submitHandler = (org, repo) => {
    this.setState({ fetching: true }, () => {
      requestRepo(org, repo)
        .then(this.stopFetching)
        .then(delay(400))
        .then(this.setRepo)
        .catch(this.setError)
    })
  }

  render () {
    return (
      <Layout>
        <Header />
        <Main
          {...this.state.data}
          loading={this.state.fetching}
          onSubmit={this.submitHandler}
        />
        <Footer>
          by davesnx
        </Footer>
      </Layout>
    )
  }
}

export default App

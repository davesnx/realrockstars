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
    loading: false,
    success: false,
    error: false,
    repo: {}
  }

  setRepo = data => {
    console.log(data)
    this.setState({
      loading: false,
      repo: data,
      success: true
    })
  }

  setError = error => {
    console.error(error)
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
        // .then(this.stopLoading)
        // .then(delay(400))
        .then(this.setRepo)
        .catch(this.setError)
    })
  }

  render () {
    return (
      <Layout>
        <Header />
        <Main
          {...this.state.repo}
          loading={this.state.loading}
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

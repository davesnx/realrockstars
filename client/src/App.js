import React, { Component } from 'react'
import styled from 'styled-components'

import InputGroup from './components/InputGroup'
import GithubBackground from './components/GithubBackground'
import Footer from './components/Footer'
import Header from './components/Header'
import Error from './components/Error'
import Repo from './components/Repo'

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
    fetching: true,
    success: false,
    error: false
  }

  submitHandler = () => {
    this.setState({
      fetching: true
    }, () => {
      setTimeout(() => {
        this.setState({
          fetching: false
        }, () => {
          setTimeout(() => {
            this.setState({
              success: true
            })
          }, 300);
        })
      }, 1000)
    })
  }

  render () {
    return (
      <Layout>
        <Header />
        <Main>
          {
            this.state.error &&
              <Error>Repo doesn't exist</Error>
          }
          {
            !this.state.success &&
              <InputGroup onSubmit={this.submitHandler} />
          }
          {
              this.state.success &&
                <Repo
                  name='react'
                  orga='facebook'
                  description='A declarative, efficient, and flexible JavaScript library for building user interfaces'
                  link='https://facebook.github.io/react/'
                  stars='45.093'
                  language='JavaScript'
                  tags={['view', 'declarative']}
                  linesOfCode='2M'
                  rockstarLevel='0.33'
                  orgaLogo='https://avatars0.githubusercontent.com/u/69631?v=3&s=200'
                />
            }
            <GithubBackground spinning={this.state.fetching} />
        </Main>
        <Footer>
          by davesnx
        </Footer>
      </Layout>
    )
  }
}

export default App

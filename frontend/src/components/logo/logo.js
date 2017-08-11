import React, { Component } from 'react'
import styled from 'styled-components'

const Root = styled.div``

const H1 = styled.h1`
  margin: 0;
  text-align: center;
  line-height: 3em;
`

class Logo extends Component {
  render() {
    return <H1>realrockstar.io</H1>
  }
}

export default Logo

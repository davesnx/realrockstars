import React, { Component } from 'react'
import styled from 'styled-components'

const black = 'rgb(50, 50, 50)'

const H1 = styled.h1`
  max-width: 350px;
  padding: 10px;
  margin: 0;
  line-height: 0.8;
  text-align: center;
  text-transform: uppercase;
  border: 4px solid ${black};
  color: ${black};
`

class Logo extends Component {
  render () {
    return <H1>realrockstars.io</H1>
  }
}

export default Logo

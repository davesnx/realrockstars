import React, { Component } from 'react'
import styled from 'react-emotion'
import constants from './../constants'

const LogoWrapper = styled.span`
  font-size: 30px;
  color: ${constants.colors.brand};
`

const H1 = styled.h1`
  display: inline;
  color: ${constants.colors.brand};
  font-size: 30px;
`

class Logo extends Component {
  render () {
    return (
      <LogoWrapper>
        <H1>RealRockstars</H1>.io
      </LogoWrapper>
    )
  }
}

export default Logo

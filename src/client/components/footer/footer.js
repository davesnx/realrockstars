import React, { Component } from 'react'
import styled from 'react-emotion'

const Root = styled.div`
  padding: 24px 50px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
`

class Footer extends Component {
  render () {
    return <Root>by davesnx</Root>
  }
}

export default Footer

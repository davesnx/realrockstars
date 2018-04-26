import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Root = styled.div`
  display: flex;
  align-items: center;

  border: 1px solid #ff655a;
  background-color: #f2c1be;

  color: #ff655a;
  padding: 5px 15px;
  border-radius: 5px;
`

class Error extends Component {
  render() {
    return <Root>{this.props.children}</Root>
  }
}

Error.propTypes = {
  childen: PropTypes.node
}

export default Error

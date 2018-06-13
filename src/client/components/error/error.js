import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import Text from './../text'
import Strong from './../strong'
import constants from './../constants'

const ErrorWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: ${constants.unit}px ${constants.unit * 2}px;
  background: ${constants.colors.error};
`

class Error extends Component {
  render () {
    return (
      <ErrorWrapper>
        <Text>
          <Strong>Error </Strong> {this.props.children}
        </Text>
      </ErrorWrapper>
    )
  }
}

Error.propTypes = {
  childen: PropTypes.node
}

export default Error

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { TiDeleteOutline } from 'react-icons/lib/ti'

const Root = styled.div`
  display: flex;
  align-items: center;

  border: 1px solid #ff655a;
  background-color: #f2c1be;

  color: rgba(0, 0, 0, .65);
  padding: 5px 15px;
  border-radius: 5px;
`

const DeleteIcon = styled(TiDeleteOutline)`
  margin-left: -5px;
  margin-right: 10px;
`

class Error extends Component {
  render() {
    return (
      <Root>
        <DeleteIcon width="1.5em" height="1.5em" />
        {this.props.children}
      </Root>
    )
  }
}

Error.propTypes = {
  childen: PropTypes.node
}

export default Error
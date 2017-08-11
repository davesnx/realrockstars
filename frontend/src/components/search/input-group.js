import React, { Component } from 'react'
import styled from 'styled-components'
import R from 'ramda'

import Input from './input'

const Root = styled.form`
  display: flex;
  border-radius: 6px;
  z-index: 3;ep
`

const GithubLabel = Input.extend`
  color: black;
  text-align: center;
  background-color: #d9d9d9;
`

class InputGroup extends Component {
  keyPressHandler = event => {
    const hasRepoInput = !!this.repo.value
    const hasOrgaInput = !!this.orga.value
    const haveInputValues = R.and(hasRepoInput, hasOrgaInput)
    const isEnterKey = event.key === 'Enter'
    const submitFnExist = R.has('onSubmit')(this.props)
    const canSubmit = R.and(isEnterKey, haveInputValues, submitFnExist)

    if (canSubmit) {
      this.props.onSubmit(this.orga.value, this.repo.value)
    }
  }

  render() {
    return (
      <Root onKeyPress={this.keyPressHandler}>
        <GithubLabel value="github.com" disabled left />
        <Input
          innerRef={node => {
            this.orga = node
          }}
          placeholder="organitzation"
          center
        />
        <Input
          innerRef={node => {
            this.repo = node
          }}
          placeholder="repo"
          right
        />
      </Root>
    )
  }
}

export default InputGroup

import React from 'react'
import styled from 'styled-components'
import R from 'ramda'

const Root = styled.form `
  display: flex;
  border-radius: 6px;
  z-index: 3;ep
`

const Input = styled.input `
  position: relative;
  display: inline-block;
  padding: 10px 15px;
  width: 100%;
  height: 45px;
  font-size: 16px;
  line-height: 1.5;

  color: rgba(0, 0, 0, 0.65);
  background-image: none;
  border: 3px solid #D9D9D9;

  border-right-width: ${props => (props.center ? '0px' : '3px')};
  border-left-width: ${props => (props.center ? '0px' : '3px')};

  background-color: #FFF;
  background-color: ${props => (props.disabled ? '#E3E3E3' : '#FFF')};

  border-radius: ${props => (props.center ? '0px' : '6px')};

  border-top-right-radius: ${props => (props.right ? '6px' : '0px')};
  border-bottom-right-radius: ${props => (props.right ? '6px' : '0px')};

  border-top-left-radius: ${props => (props.left ? '6px' : '0px')};
  border-bottom-left-radius: ${props => (props.left ? '6px' : '0px')};

  user-select: ${props => (props.disabled ? 'none' : 'auto')};
  cursor: ${props => (props.disabled ? 'default' : 'text')};
  outline: none;

  transition: all .3s;
`

const GithubLabel = Input.extend `
  color: black;
  text-align: center;
  background-color: #D9D9D9;
`

class InputGroup extends React.Component {
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
    return ( <
      Root onKeyPress = {
        this.keyPressHandler
      } >
      <
      GithubLabel value = 'github.com'
      disabled left / >
      <
      Input innerRef = {
        node => {
          this.orga = node
        }
      }
      placeholder = 'organitzation'
      center /
      >
      <
      Input innerRef = {
        node => {
          this.repo = node
        }
      }
      placeholder = 'repo'
      right /
      >
      <
      /Root>
    )
  }
}

export default InputGroup

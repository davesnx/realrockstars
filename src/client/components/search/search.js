import React, { Component } from 'react'
import styled from 'react-emotion'
import R from 'ramda'
import SearchIcon from 'react-feather/dist/icons/search'
import parseGitHubURL from 'git-url-parse'

import Spacer from './../spacer'
import Strong from './../strong'
import constants from './../constants'

const Input = styled.input`
  position: relative;
  display: inline;
  padding: 0px 10px;

  width: 100%;
  height: 45px;
  font-size: 20px;

  color: ${constants.colors.black};
  background-image: none;
  border: none;

  background-color: transparent;

  user-select: ${props => (props.disabled ? 'none' : 'auto')};
  cursor: ${props => (props.disabled ? 'default' : 'text')};
  outline: none;

  transition: all 150ms linear;
`

const Label = styled.div`
  color: ${constants.colors.black};
  font-size: 14px;
  display: flex;
  justify-content: space-between;
`

const InputWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  boder-size: 3px;
  border-style: solid;
  border-color: ${props => (props.focused ? constants.colors.brand : constants.colors.grey)};
  background: ${props => (!props.focused ? constants.colors.grey : 'white')};

  padding: 6px 12px;

  transition: all 150ms linear;
`

class Search extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isFocused: false
    }

    this.keyPressHandler = this.keyPressHandler.bind(this)
    this.onFocusInputHandler = this.onFocusInputHandler.bind(this)
    this.onBlurInputHandler = this.onBlurInputHandler.bind(this)
  }

  keyPressHandler (event) {
    const { value } = event.target
    const { name, owner } = parseGitHubURL(value)
    console.log(parseGitHubURL(value))

    const hasNameInput = !!name.length
    const hasOwnerInput = !!owner.length
    const haveInputValues = R.and(hasNameInput, hasOwnerInput)
    const isEnterKey = event.key === 'Enter'
    const submitFnExist = R.has('onSubmit')(this.props)
    const canSubmit = R.and(isEnterKey, haveInputValues, submitFnExist)

    if (canSubmit) {
      this.props.onSubmit(owner, name)
    } else if (isEnterKey) {
      this.props.onError(`${value} doesn't seem a valid repository`)
    }
  }

  onFocusInputHandler () {
    this.setState({
      isFocused: true
    })
  }

  onBlurInputHandler () {
    this.setState({
      isFocused: false
    })
  }

  render () {
    return (
      <div onKeyPress={this.keyPressHandler}>
        <Label>
          <div>
            <Strong>Search</Strong> any public github repository
          </div>
        </Label>
        <Spacer top={1}>
          <InputWrapper focused={this.state.isFocused}>
            <SearchIcon color='black' size={20} />
            <Input
              onFocus={this.onFocusInputHandler}
              onBlur={this.onBlurInputHandler}
              innerRef={node => {
                this.ref = node
              }}
              placeholder='https://github.com/facebook/react'
            />
          </InputWrapper>
        </Spacer>
      </div>
    )
  }
}

Search.defaultProps = {
  onSubmit: console.log,
  onError: console.error
}

export default Search

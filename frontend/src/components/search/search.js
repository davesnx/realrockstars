import React, { Component } from 'react'
import styled from 'styled-components'
import R from 'ramda'
import SearchIcon from 'react-feather/dist/icons/search'
import MaskedInput from 'react-text-mask'
import Spacer from './../spacer'
// import emailMask from 'text-mask-addons/dist/emailMask'

import constants from './../constants'

const Strong = styled.span`
  font-weight: bold;
`

// const Input = styled(MaskedInput)`
const Input = styled.input`
  position: relative;
  display: inline-block;
  padding: 10px 15px;
  width: 100%;
  height: 45px;
  font-size: 16px;
  line-height: 1.5;

  color: ${constants.colors.black};
  background-image: none;
  border: none;

  background-color: transparent;

  user-select: ${props => (props.disabled ? 'none' : 'auto')};
  cursor: ${props => (props.disabled ? 'default' : 'text')};
  outline: none;

  transition: all 150ms linear;
`

const SearchWrapper = styled.div`
  max-width: 600px;
`

const Label = styled.div`
  color: ${constants.colors.black};
`

const Cosa = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  boder-size: 3px;
  border-style: solid;
  border-color: ${props =>
    props.focused ? constants.colors.brand : constants.colors.grey};
  background: ${props => (!props.focused ? constants.colors.grey : 'white')};

  padding: 4px 10px;

  transition: all 150ms linear;
`

class Search extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isFocused: false
    }
  }

  keyPressHandler = event => {
    const { value } = event.target

    if (!value || !value.includes('/')) {
      return
    }

    const [orga, repo] = value.split('/')
    const hasRepoInput = !!repo.length
    const hasOrgaInput = !!orga.length
    const haveInputValues = R.and(hasRepoInput, hasOrgaInput)
    const isEnterKey = event.key === 'Enter'
    const submitFnExist = R.has('onSubmit')(this.props)
    const canSubmit = R.and(isEnterKey, haveInputValues, submitFnExist)

    if (canSubmit) {
      this.props.onSubmit(orga, repo)
    }
  }

  onFocusInputHandler = () => {
    this.setState({
      isFocused: true
    })
  }

  onBlurInputHandler = () => {
    this.setState({
      isFocused: false
    })
  }

  render() {
    return (
      <SearchWrapper onKeyPress={this.keyPressHandler}>
        <Label>
          <Strong>Search</Strong> for a repository
        </Label>
        <Spacer top={1}>
          <Cosa focused={this.state.isFocused}>
            <SearchIcon color="black" size={20} />
            <Input
              onFocus={this.onFocusInputHandler}
              onBlur={this.onBlurInputHandler}
              pipe={confor => {}}
              innerRef={node => {
                this.ref = node
              }}
              placeholder="facebook/react"
            />
          </Cosa>
        </Spacer>
      </SearchWrapper>
    )
  }
}

export default Search

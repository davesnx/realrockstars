import React, { Component } from 'react'
import styled from 'styled-components'

const Button = styled.button`
  position: relative;
  display: inline-block;
  margin: 0;
  padding: 0 15px;
  height: 28px;
  line-height: 1.5;
  touch-action: manipulation;
  user-select: none;
  cursor: pointer;
  white-space: nowrap;
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  border-radius: 4px;
  color: rgba(0, 0, 0, .65);
  background-color: #fff;
  border-color: #d9d9d9;
  border: 1px solid transparent;
  transition: all .3s cubic-bezier(.645, .045, .355, 1);
`

class Button extends Component {
  render () {
    return (
      <div>

      </div>
    )
  }
}

export default Button

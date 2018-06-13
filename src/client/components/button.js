import React, { Component } from 'react'
import styled from 'react-emotion'

const Button = styled.button`
  position: relative;
  display: inline-block;
  margin: 0;
  padding: 0 150px;
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
  color: rgba(0, 0, 0, 0.65);
  background-color: #fff;
  border-color: #d9d9d9;
  border: 1px solid transparent;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
`

export default Button

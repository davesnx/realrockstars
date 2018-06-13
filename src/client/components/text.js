import React from 'react'
import styled from 'react-emotion'
import constants from './constants'

const Text = styled.div`
  ${props => (props.inline ? 'display: inline' : '')};
  ${props => props.size && `
    font-size: ${constants.fontSizes[props.size]}px;
    line-height: ${constants.lineHeights[props.size]}px;
  `} ${props => props.color && `
    color: ${props.color};
  `} ${props => props.mono && `
    font-family: ${constants.fontMono};
  `} ${props => props.fontWeight && `
    font-weight: ${constants.fontWeights[props.fontWeight]};
  `} ${props => props.uppercase && `
    text-transform: uppercase;
  `} ${props => props.loose && `
    letter-spacing: .1em;
  `} ${props => props.dimmed && `
    opacity: 0.7;
  `};
  ${props => props.ellipsis && `white-space: nowrap; overflow: hidden; text-overflow: ellipsis`};
  ${props => (props.italic ? 'font-style: italic;' : '')};
  ${props => props.align && `text-align: ${props.align};`};
  ${props => (props.cursor === 'pointer' ? `cursor: pointer;` : props.cursor === 'default' ? `cursor: default;` : props.cursor === 'noEvents' ? 'pointer-events: none;' : '')}
`

export default Text

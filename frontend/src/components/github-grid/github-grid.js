import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import R from 'ramda'

const colorMap = ['#C6E48B', '#7BC96F', '#196127', '#ECECEC', '#ECECEC']
const colorMapLength = R.length(colorMap)
const random = () => Math.floor(Math.random() * 23)
const randomColorIndex = () => R.mathMod(random(), colorMapLength)
const generateRandomColorMap = () => [...Array(10000)].map(randomColorIndex)

// const Contribution = styled.div`
//   background-color: ${props => props.color};
//   transition: all 350ms ease;
// `

const itemSize = 4

const rows = w => {
  return Math.floor(w / itemSize)
}

const columns = h => {
  return Math.floor(h / itemSize)
}

const Root = styled.svg`
  overflow: hidden;
  position: absolute;
  opacity: 0.5;
  display: grid;
  grid-gap: ${itemSize}px;
  grid-template-rows: repeat(${p => rows(p.width)}, ${itemSize}px);
  grid-template-columns: repeat(${p => columns(p.height)}, ${itemSize}px);
`

class GithubBackground extends Component {
  state = {
    contributions: generateRandomColorMap()
  }

  static propTypes = {
    size: PropTypes.objectOf(PropTypes.number),
    spinning: PropTypes.bool
  }

  static defaultProps = {
    size: {
      width: window.innerWidth,
      height: window.innerHeight
    },
    spinning: false
  }

  componentWillUpdate () {
    if (this.props.spinning) {
      setTimeout(() => {
        this.setState({
          contributions: generateRandomColorMap()
        })
      }, 300)
    }
  }

  render () {
    const { size: { width, height } } = this.props
    return (
      <Root width={this.props.size.width} height={this.props.size.height}>
        {this.state.contributions.map((colorIndex, index) => {
          return (
            <rect
              key={index}
              width='4'
              height='4'
              fill={colorMap[colorIndex]}
            />
          )
          // return <Contribution key={index} color={colorMap[colorIndex]} />
        })}
      </Root>
    )
  }
}

export default GithubBackground

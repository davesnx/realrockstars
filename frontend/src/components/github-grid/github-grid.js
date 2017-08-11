import React, { Component } from 'react'
import styled from 'styled-components'
import R from 'ramda'

const colorMap = ['#C6E48B', '#7BC96F', '#196127', '#ECECEC', '#ECECEC']
const colorMapLength = colorMap.length
const random = () => Math.floor(Math.random() * 23)
const randomColorIndex = () => R.mathMod(random(), colorMapLength)
const generateRandomColorMap = () => [...Array(300)].map(randomColorIndex)

const Contribution = styled.div`
  background-color: ${props => props.color};
  transition: all 350ms ease;
`

const Panel = styled.div`
  position: absolute;
  opacity: 0.5;
  display: grid;
  grid-gap: 4px;
  grid-template-columns: repeat(30, 15px);
  grid-template-rows: repeat(10, 15px);
`

class GithubBackground extends Component {
  state = {
    contributions: generateRandomColorMap()
  }

  componentWillUpdate() {
    if (this.props.spinning) {
      setTimeout(() => {
        this.setState({
          contributions: generateRandomColorMap()
        })
      }, 300)
    }
  }

  render() {
    return (
      <Panel>
        {this.state.contributions.map((colorIndex, index) => {
          return <Contribution key={index} color={colorMap[colorIndex]} />
        })}
      </Panel>
    )
  }
}

export default GithubBackground

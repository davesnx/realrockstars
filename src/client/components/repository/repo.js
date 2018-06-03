import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import approximate from 'approximate-number'

import Spacer from './../spacer'
import StarIcon from './../icons/star'
import CodeIcon from './../icons/code'
import CircularProgress from './../circular-progress'
import Stat from './../stat'
import Bold from './../bold'
import constants from './../constants'

const Body = styled.article`
  margin: ${constants.unit}px ${constants.unit * 2}px;
  flex: 0 0 calc(100% - 120px - 16px);
`

const Image = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`

const Box = styled.div`
  display: flex;
`

const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const Name = styled.h3`
  margin: 0;
  margin-left: ${constants.unit * 1.5}px;
  font-weight: 400;
`

const Description = styled.p`
  margin-top: 8px;
  margin-bottom: 8px;
  font-size: 14px;
  line-height: 20px;
`

const Level = styled.div`
  width: 120px;
`

const Stats = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

class RepositoryBox extends Component {
  render () {
    const {
      name,
      description,
      avatarURL,
      stars,
      language,
      linesOfCode,
      rockstarLevel
    } = this.props

    return (
      <Box>
        <Level>
          <CircularProgress value={rockstarLevel * 10} max={10} />
        </Level>
        <Body>
          <Header>
            <Image src={avatarURL} alt={name} />
            <Name>{name}</Name>
          </Header>
          <Description>{description}</Description>
          <Spacer top={1}>
            <Stats>
              <Stat>
                <CodeIcon />
                <Bold>{approximate(linesOfCode)}</Bold> lines
              </Stat>
              <Stat>
                <StarIcon />
                <Bold>{approximate(stars)}</Bold> stars
              </Stat>
            </Stats>
          </Spacer>
        </Body>
      </Box>
    )
  }
}

RepositoryBox.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  avatarURL: PropTypes.string,
  stars: PropTypes.number,
  linesOfCode: PropTypes.number,
  rockstarLevel: PropTypes.number
}

export default RepositoryBox

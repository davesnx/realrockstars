import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import approxNum from 'approximate-number'
import StarIcon from 'react-feather/dist/icons/star'
import ListIcon from 'react-feather/dist/icons/list'
import Spacer from './../spacer'
import Text from './../text'

import constants from './../constants'

const Root = styled.div`
  margin: 0 auto;

  background: #fff;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;

  display: flex;

  z-index: 1;
`

const Left = styled.div`
  width: 124px;
  height: 124px;
  justify-content: center;
  display: flex;
  align-items: center;
`

const Right = styled.div``

const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const Content = styled.div``

const Title = styled.h2`
  color: ${constants.colors.blue};
  margin: 0;
  font-weight: normal;
`

const Avatar = styled.img`
  width: 20px;
  height: 20px;
  display: inline-block;
  border-radius: 2px;

  word-wrap: break-word;
  overflow: hidden;
}
`

const Tags = styled.div`
  display: flex;
  justify-content: left;
`

const Label = styled.div`
  color: ${constants.colors.black};

  margin: 0;

  display: flex;
  justify-content: center;
  align-items: center;
`

const RockstarLabel = styled.div`
  color: ${constants.colors.brand};
`

const Strong = styled.span`
  font-weight: 600;
`

class Repo extends Component {
  render() {
    const {
      avatarURL,
      org,
      name,
      description,
      linesOfCode,
      stars,
      rockstarLevel
    } = this.props
    return (
      <Root>
        <Left>
          <RockstarLabel>
            {approxNum(rockstarLevel, {
              decimal: '.',
              round: true
            })}
          </RockstarLabel>
        </Left>
        <Right>
          <Header>
            {this.props.avatarURL && (
              <Avatar src={this.props.avatarURL} alt={org} />
            )}
            <Spacer left={1}>
              <Title>{`${org}/${name}`}</Title>
            </Spacer>
          </Header>
          <Content>
            <Spacer top={2} bottom={3}>
              <Text>{description}</Text>
            </Spacer>
            <Tags>
              <Label>
                <ListIcon />
                <Spacer left={1}>
                  <Strong>{approxNum(linesOfCode)}</Strong> Lines
                </Spacer>
              </Label>
              <Spacer left={3}>
                <Label>
                  <StarIcon />
                  <Spacer left={1}>
                    <Strong>{approxNum(stars)}</Strong> Stars
                  </Spacer>
                </Label>
              </Spacer>
            </Tags>
          </Content>
        </Right>
      </Root>
    )
  }
}

Repo.propTypes = {
  name: PropTypes.string,
  org: PropTypes.string,
  description: PropTypes.string,
  avatarURL: PropTypes.string,
  stars: PropTypes.number,
  language: PropTypes.string,
  linesOfCode: PropTypes.number,
  rockstarLevel: PropTypes.number
}

export default Repo

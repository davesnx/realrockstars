import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import approxNum from 'approximate-number'

const Root = styled.div`
  max-width: 455px;
  margin: 0 auto;
  width: 100%;


  background: #fff;
  border-radius: 4px;
  font-size: 12px;
  position: relative;
  overflow: hidden;
  transition: all .3s;

  padding: 11px;

  display: flex;
  justify-content: space-between;

  z-index: 1;

  box-shadow: 0 3px 10px 0px rgba(0, 0, 0, 0.15);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.15);
  }
`

const Left = styled.div`max-width: 280px;`
const Right = styled.div``

const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
`

const Content = styled.div``

const Title = styled.p`
  color: #108ee9;
  margin-left: 6px;
`

const Desc = styled.p``

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
  justify-content: space-around;
`

const Label = styled.p`
  background-color: #d9d9d9;
  border-radius: 3px;
  padding: 4px 7px;
  margin: 6px 0px;
  color: black;
`

const Level = styled.div`
  font-size: 45px;
  color: #ffda24;
  letter-spacing: -2px;
  text-align: center;
`

const RockstarLabel = styled.div`
  padding: 15px 10px;
  color: black;
  border: 5px solid #ffda24;
  background-color: rgba(255, 218, 36, 0.2);
  border-radius: 5px;
`

class Repo extends Component {
  render () {
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
          <Header>
            {this.props.avatarURL &&
              <Avatar src={this.props.avatarURL} alt={org} />}
            <Title>{`${org}/${name}`}</Title>
          </Header>
          <Content>
            <Desc>
              {description}
            </Desc>
            <Tags>
              <Label>
                Lines of Code: {approxNum(linesOfCode)}
              </Label>
              <Label>
                Stars: {approxNum(stars)}
              </Label>
            </Tags>
          </Content>
        </Left>
        <Right>
          <RockstarLabel>
            <Level>
              {approxNum(rockstarLevel, {
                decimal: '.',
                round: true
              })}
            </Level>
            Rockstar Level
          </RockstarLabel>
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

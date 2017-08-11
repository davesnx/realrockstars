import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import approxNum from 'approximate-number'

const Root = styled.div`
  max-width: 455px;
  margin: 0 auto;
  width: 100%;

  border: 1px solid #bebaba;
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
  render() {
    return (
      <Root>
        <Left>
          <Header>
            <Avatar src={this.props.avatarURL} alt={this.props.org} />
            <Title>{`${this.props.org}/${this.props.name}`}</Title>
          </Header>
          <Content>
            <Desc>
              {this.props.description}
            </Desc>
            <Tags>
              <Label>
                Lines of Code: {approxNum(this.props.linesOfCode)}
              </Label>
              <Label>
                Stars: {approxNum(this.props.stars)}
              </Label>
            </Tags>
          </Content>
        </Left>
        <Right>
          <RockstarLabel>
            <Level>
              {approxNum(this.props.rockstarLevel, {
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

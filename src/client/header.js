import React, { Fragment } from 'react'
import styled from 'styled-components'

import Logo from './components/logo/logo'

import MessageBox from './components/message-box/message-box'
import Spacer from './components/spacer'
import StarIcon from './components/icons/star'
import CodeIcon from './components/icons/code'
import Bold from './components/bold'
import constants from './components/constants'

const InlineIcon = styled.div`
  display: inline-flex;
  align-items: baseline;
  margin: 0 -${constants.unit / 2}px;

  & > svg {
    margin: 0 ${constants.unit / 2}px;
  }
`

const Header = () => {
  return (
    <Fragment>
      <Logo />
      <Spacer top={4} bottom={4}>
        <MessageBox title={`What's a real rockstar?`}>
          <Fragment>
            A developer who has a project with more stars than lines of code.
            <br />
            <br />
            So... If you have a repo with <InlineIcon>
              <StarIcon width={14} height={13} color={constants.colors.brand} />
              <Bold>10 stars</Bold>
            </InlineIcon> and only <InlineIcon>
              <CodeIcon width={16} height={12} color={constants.colors.brand} />
              <Bold>3 lines of code</Bold>
            </InlineIcon>, you are a fucking rockstar.
            <br />
            <br />
            Even
            {' '}
            <a href='https://en.wikipedia.org/wiki/Linus_Torvalds'>
              Linus Torvalds
            </a>
            {' '}
            that made
            {' '}
            <a href='http://wikipedia.com/linux'>Linux</a>
            's Kernel isn't a realrockstar. The project has
            {' '}
            <InlineIcon>
              <CodeIcon width={16} height={12} color={constants.colors.brand} />
              <Bold>24M lines of code</Bold>
            </InlineIcon>
            {' '}
            and
            {' '}
            <InlineIcon>
              <StarIcon width={14} height={13} color={constants.colors.brand} />
              <Bold>46,253 stars</Bold>
            </InlineIcon> that's a 0.08 of realrockstar level
          </Fragment>
        </MessageBox>
      </Spacer>
    </Fragment>
  )
}

export default Header

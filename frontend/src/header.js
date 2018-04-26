import React, { Component } from 'react'
import styled from 'styled-components'

import Logo from './../logo/logo'

const Root = styled.div``
const H2 = styled.h2`
  line-height: 3em;
`
const P = styled.p`
  line-height: 2em;
`
const Strong = styled.strong`
  color: #272727;
`

class Header extends Component {
  render() {
    return (
      <Root>
        <Logo />
        <H2>What's a real rockstar?</H2>
        <P>
          A developer who has a project with more stars than lines of code.
          <br />
          <a href="https://es.wikipedia.org/wiki/Linus_Torvalds">
            Linus Torvalds{' '}
          </a>{' '}
          made <a href="https://github.com/torvalds/linux">Linux's Kernel</a>{' '}
          and potentially is a rockstar, but not a real rockstar... the project
          has <Strong>24M lines of code</Strong> and only{' '}
          <Strong>46,253 Github stars</Strong>
          .
        </P>
        <P>
          That's a <Strong>0.08</Strong> of real rockstar level
        </P>
      </Root>
    )
  }
}

export default Header

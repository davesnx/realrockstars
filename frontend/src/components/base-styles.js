import React, { Component } from 'react'
import styled, { injectGlobal } from 'styled-components'
import 'normalize.css'
import constants from './constants'
import SFMonoRegularTTF from './fonts/SFMono-Regular.ttf'
import SFMonoRegularWOFF from './fonts/SFMono-Regular.woff'
import SFMonoRegularWOFF2 from './fonts/SFMono-Regular.woff2'
import SFMonoBoldTTF from './fonts/SFMono-Bold.ttf'
import SFMonoBoldWOFF from './fonts/SFMono-Bold.woff'
import SFMonoBoldWOFF2 from './fonts/SFMono-Bold.woff2'

injectGlobal`
  @font-face {
    font-family: 'SF Mono';
    src: url('${SFMonoRegularWOFF2}') format('woff2'),
        url('${SFMonoRegularWOFF}') format('woff'),
        url('${SFMonoRegularTTF}') format('truetype');
    font-weight: normal;
  }

  @font-face {
    font-family: 'SF Mono';
    src: url('${SFMonoBoldWOFF2}') format('woff2'),
        url('${SFMonoBoldWOFF}') format('woff'),
        url('${SFMonoBoldTTF}') format('truetype');
    font-weight: bold;
  }
`

const BaseStyles_ = styled.div`
  font-family: 'SF Mono', Arial, Helvetica, sans-serif;
  font-size: ${constants.fontSizes.size0}px;
  line-height: ${constants.lineHeights.size0}px;

  color: ${constants.colors.black};
  box-sizing: border-box;

  -moz-font-feature-settings: 'ss01' 1;
  -ms-font-feature-settings: 'ss01' 1;
  -o-font-feature-settings: 'ss01' 1;
  -webkit-font-feature-settings: 'ss01' 1;
  font-feature-settings: 'ss01' 1;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  a {
    text-decoration: none;
  }
`

class BaseStyles extends Component {
  componentDidMount() {
    // WebFont.load({
    //   google: {
    //     families: ['Fira Code']
    //   }
    // })
  }

  render() {
    return <BaseStyles_ />
  }
}

export default BaseStyles

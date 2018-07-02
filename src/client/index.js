import React from 'react'
import ReactDOM from 'react-dom'
import { injectGlobal } from 'emotion'
import normalize from 'emotion-normalize'
import App from './app'

injectGlobal`
  ${normalize}

  @font-face {
    font-family: 'SF Mono';
    src: url('./fonts/SFMono-Regular.woff2') format('woff2'),
      url('./fonts/SFMono-Regular.woff') format('woff'),
      url('./fonts/SFMono-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: 'SF Mono';
    src: url('./fonts/SFMono-Bold.woff2') format('woff2'),
      url('./fonts/SFMono-Bold.woff') format('woff'),
      url('./fonts/SFMono-Bold.ttf') format('truetype');
    font-weight: bold;
    font-style: italic;
    font-display: swap;
  }
`

const renderApp = app => {
  const domElement = document.getElementById('app')
  const mount = domElement.innerHTML.trim().length ? 'hydrate' : 'render'
  ReactDOM[mount](app, domElement)
}

renderApp(<App />)

import { injectGlobal } from 'emotion'
import normalize from 'emotion-normalize'

// const createGlobalStyles = () => {
injectGlobal`
    ${normalize}

    @font-face {
      font-family: 'SF Mono';
      src: url('./fonts/SFMono-Regular.woff2') format('woff2'),
        url('./fonts/SFMono-Regular.woff') format('woff'),
        url('./fonts/SFMono-Regular.ttf') format('truetype');
      font-weight: normal;
      font-style: italic;
    }

    @font-face {
      font-family: 'SF Mono';
      src: url('./fonts/SFMono-Bold.woff2') format('woff2'),
        url('./fonts/SFMono-Bold.woff') format('woff'),
        url('./fonts/SFMono-Bold.ttf') format('truetype');
      font-weight: bold;
      font-style: italic;
    }
  `
// }

// export default createGlobalStyles

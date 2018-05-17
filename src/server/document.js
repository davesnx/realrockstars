import { Helmet } from "react-helmet"

const __Document = ({ head, body, styles }) => `
<!doctype html>
  <html lang="en">
    <head>
      <title>realrockstars.io</title>
      <styles>${styles}</styles>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no" />
    </head>
    <body style="margin:0; padding:0">
      <div id="app">${body}</div>
      <script src="/bundle.js"></script>
    </body>
  </html>
`

export default __Document
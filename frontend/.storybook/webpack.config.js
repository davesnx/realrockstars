const path = require('path')

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.svg$/,
        use: 'svg-sprite-loader'
      },
      {
        test: /\.(png|jpg|woff|ttf|woff2)$/,
        use: 'url-loader'
      }
    ]
  }
}

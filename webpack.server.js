const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
// require('dotenv')

// const enviroment = process.env.NODE_ENV === 'development' ? 'development' : 'production'

module.exports = {
  mode: 'development',

  devtool: 'source-map',

  target: 'node',

  entry: './src/server/index.js',

  externals: nodeExternals({
    modulesFromFile: true
  }),

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'server.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=public/fonts/[name].[ext]'
      }
    ]
  },

  plugins: [
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false
    })
  ]
}

require('dotenv').config()

const webpack = require('webpack')
const path = require('path')

const DEVELOPMENT = process.env.NODE_ENV === 'development'
const DEBUG = true

module.exports = {
  target: 'web',

  devtool: DEBUG
    ? 'source-map'
    : DEVELOPMENT ? 'cheap-module-source-map' : '#hidden-source-map',

  entry: ['babel-polyfill', './src/client/index.js'],

  output: {
    path: path.resolve(__dirname, 'build', 'client'),
    filename: 'bundle.js'
  },

  node: {
    fs: 'empty'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, 'build'],
        use: 'babel-loader'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        exclude: /node_modules/,
        loader: 'file-loader?name=static/fonts/[name].[ext]'
      }
    ]
  }
}

const webpack = require('webpack')
const path = require('path')

const enviroment = process.env.NODE_ENV === 'dev' ? 'development' : 'production'
const DEVELOPMENT = true
const DEBUG = false

module.exports = {
  target: 'web',

  devtool: DEBUG ? 'source-map' : (DEVELOPMENT ? 'cheap-module-source-map' : '#hidden-source-map'),

  mode: enviroment,

  entry: ['babel-polyfill', './src/client/index.js'],

  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
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
        loader: 'file-loader?name=public/fonts/[name].[ext]'
      }
    ]
  }
}

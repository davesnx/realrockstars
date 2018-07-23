const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')

const DEVELOPMENT = process.env.NODE_ENV === 'development'

module.exports = {
  mode: process.env.NODE_ENV,

  watch: DEVELOPMENT,

  devtool: 'source-map',

  target: 'node',

  entry: './src/server/index.js',

  externals: nodeExternals({
    modulesFromFile: true
  }),

  output: {
    path: path.resolve(__dirname, 'build', 'server'),
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
        loader: 'file-loader?name=public/fonts/[name].[ext]'
      }
    ]
  }
}

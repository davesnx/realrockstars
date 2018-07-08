require('dotenv').config()

const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')

const DEVELOPMENT = process.env.NODE_ENV === 'development'

module.exports = {
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

  plugins: [
    new webpack.DefinePlugin({
      'process.env.PORT': JSON.stringify(process.env.PORT),
      'process.env.ADDRESS': JSON.stringify(process.env.ADDRESS),
      'process.env.GITHUB_CLIENT_ID': JSON.stringify(
        process.env.GITHUB_CLIENT_ID
      ),
      'process.env.GITHUB_CLIENT_SECRET': JSON.stringify(
        process.env.GITHUB_CLIENT_SECRET
      )
    })
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
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

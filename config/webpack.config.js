const webpack = require('webpack')

const { readFileSync } = require('fs')

const nodeEnv = process.env.NODE_ENV || 'development'
const isProd = nodeEnv === 'production'

const devtool = isProd ? 'source-map' : 'inline-source-map'

const plugins = [
  // new webpack.optimize.CommonsChunkPlugin({
  //   name: 'vendor',
  //   minChunks: Infinity,
  //   filename: 'vendor.bundle.js'
  // }),
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
  }),
]

module.exports = {
  entry: {
    'index': [ './src/index.js' ],
    // vendor: [
    //
    // ],
  },
  resolve: {
    extensions: [ '.js', '.html' ],
  },
  output: {
    path: process.cwd() + '/bundle',
    filename: '[name].js',
    chunkFilename: '[name].[id].js',
  },
  module: {
    rules: [
      {
        test: /\.(html|js)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
        query: {
          babelrc: false,
          presets: [
            [ 'es2015', { modules: false } ],
          ],
          cacheDirectory: true,
        },
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: 'svelte-loader',
      },
    ],
  },
  devtool,
  plugins,
}

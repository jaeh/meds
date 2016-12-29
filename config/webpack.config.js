const webpack = require('webpack')
const path = require('path')

const BabiliPlugin = require('babili-webpack-plugin')

const CompressionPlugin = require('compression-webpack-plugin')

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

if (isProd) {
  plugins.push(
    new BabiliPlugin({
      comments: false,
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'zopfli',
      test: /\.js$|\.html|\.css$/,
      threshold: 10240,
      minRatio: 0.8,
    })
  )
}

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
    path: path.join(process.cwd(), 'public', 'js'),
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

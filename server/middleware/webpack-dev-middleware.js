const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpack = require('webpack')

const webpackConfig = require('../../config/webpack.config.js')
const devMiddlewareConfig = require('../../config/webpack.devmiddleware.config.js')

const compiler = webpack(webpackConfig)

const devMiddleware = webpackDevMiddleware(compiler, devMiddlewareConfig)
const hotMiddleware = webpackHotMiddleware(compiler)

module.exports = {
  devMiddleware,
  hotMiddleware,
}

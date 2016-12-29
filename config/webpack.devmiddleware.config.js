module.exports = {
  noInfo: true,
  // display no info to console (only warnings and errors)

  quiet: false,
  // display nothing to the console

  lazy: false,
  // switch into lazy mode
  // that means no watching, but recompilation on every request

  // watchOptions: {
      // aggregateTimeout: 300,
      // poll: true
  // },
  // watch options (only lazy: false)

  publicPath: '/js/',
  // public path to bind the middleware to
  // use the same as in webpack

  index: 'index.html',
  // the index path for web server

  // headers: { 'X-Custom-Header': 'yes' },
  // custom headers

  stats: {
    colors: true,
    hash: false,
    version: false,
    timings: false,
    assets: false,
    chunks: false,
    modules: false,
    reasons: false,
    children: false,
    source: false,
    errors: true,
    errorDetails: true,
    warnings: true,
    publicPath: false,
  },
  // options for formating the statistics

  reporter: null,
  // Provide a custom reporter to change the way how logs are shown.

  serverSideRender: false,
  // Turn off the server-side rendering mode. See Server-Side Rendering part for more info.
}

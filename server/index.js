const path = require('path')
const express = require('express')

const app = express()

const cwd = process.cwd()
const PORT = 3000
const CWD = process.cwd()
const PUBLIC_DIR = path.join(cwd, 'public')
const BUNDLE_DIR = path.join(cwd, 'bundle')
const INDEX_FILE = path.join(PUBLIC_DIR, 'index.html')

const env = app.get('env')

if (env !== 'production') {
  const {
    devMiddleware,
    hotMiddleware,
  } = require('./middleware/webpack-dev-middleware')

  app.use(devMiddleware)
  app.use(hotMiddleware)
}

app.use('/meds', express.static(PUBLIC_DIR))

app.use('*', (req, res) => {
  res.sendFile(INDEX_FILE)
})

app.listen(
  PORT,
  err =>
    err
      ? console.error(err)
      : console.log(`Server running @ localhost:${ PORT }`)
)

process.on('uncaughtException', (err) => {
  console.error(err)
  process.exit()
})

#!/usr/bin/env node
const { exec } = require('child_process')

const publish =
  () => {
    const cmdPrefix = `--prefix=public`
    const cmdOnto = `--onto=origin/gh-pages`
    const cmdArgv = `${ cmdPrefix } ${ cmdOnto }`
    const cmd = `git subtree split ${ cmdArgv }`

    return new Promise((resolve, reject) => {
      console.log('exec', cmd)
      exec(cmd, (err, id, stderr) => {
        if (err) {
          reject(err)
          return
        }

        console.log('git subtree split succeeded:', id.trim())
        resolve(id)
      })
    })
    .then(
      (id) =>
        new Promise((resolve, reject) => {
          let cmd2 = `git push origin ${ id.trim() }:gh-pages --force`

          console.log('exec', cmd2)
          exec(cmd2, (err, res) => {
            if (err) {
              reject(err)
              return
            }

            resolve()
          })
        })
    )
  }

publish()
  .then(() => { console.log('publish finished') })
  .catch(console.error)

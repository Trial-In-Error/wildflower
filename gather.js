const fse = require('fs-extra')
const meadows = require('./valley/meadows.js')
const copy = require('recursive-copy')
const { fixSrcPath, fixDestPath, logNoSuchFile } = require('./common')

const promises = []
const copyOptions = {
  dot: true,
  overwrite: true,
  expand: true,
  filter: function(e) {
    return !(e.includes('node_modules'))
  }
}

fse.ensureDirSync('./valley/meadows')
const paths = fse.readdirSync('./valley/meadows')
// Make Async
paths
  .filter((path) => path !== '.git')
  .forEach((path) => fse.removeSync(`./valley/meadows/${path}`))

meadows.forEach((meadow) => {
    promises.push(copy(fixSrcPath(meadow.path), fixDestPath(meadow.path), copyOptions)
      .then(() => console.log(`Copied ${fixSrcPath(meadow.path)} to ${fixDestPath(meadow.path)}`))
      .catch(logNoSuchFile))
})

Promise.all(promises).then(() => console.log('Done gathering.')).catch((err) => console.error('Error while gathering:', err))

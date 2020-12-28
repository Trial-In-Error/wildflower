const fse = require('fs-extra')
const meadows = require('./valley/meadows.js')
const copy = require('recursive-copy')
const { fixSrcPath, fixDestPath, logNoSuchFile } = require('./common')

const promises = []
const defaultCopyOptions = {
  dot: true,
  overwrite: true,
  expand: true,
  filter: [
    '**/**',
    '!**/node_modules',
    '!**/node_modules/**'
  ]
}

fse.ensureDirSync('./valley/meadows')
const paths = fse.readdirSync('./valley/meadows')
// Make Async
paths
  .filter((path) => path !== '.git')
  .forEach((path) => fse.removeSync(`./valley/meadows/${path}`))

meadows.forEach((meadow) => {
  // real dumb way of added some exclusion logic
  // this ADDS your exclusion logic to the base exclusion logic
  // currently no way to completely overwrite it
  let filter = defaultCopyOptions.filter

  if (meadow.filter && Array.isArray(meadow.filter)) {
    // we're starting with a blank array so we don't overwrite the original filter
    filter = [].concat(filter, meadow.filter)
  }

  // we have to be careful we don't overwrite the original copyOptions.filter
  let copyOptions = {
    ...defaultCopyOptions,
    filter
  }

  promises.push(copy(fixSrcPath(meadow.path), fixDestPath(meadow.path), copyOptions)
    .then(() => console.log(`Copied ${fixSrcPath(meadow.path)} to ${fixDestPath(meadow.path)}`))
    .catch(logNoSuchFile))
})

Promise.all(promises).then(() => console.log('Done gathering.')).catch((err) => console.error('Error while gathering:', err))

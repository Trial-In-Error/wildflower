const fse = require('fs-extra')
const copy = require('recursive-copy')
const path = require('path')
const meadows = require('./meadows')
// The functions are named relative to gathering, not sowing
// So we'll have to use them named in reverse
const { fixSrcPath: fixDestPath, fixDestPath: fixSrcPath, logNoSuchFile } = require('./common')

const promises = []
const copyOptions = {
  dot: true,
  overwrite: true,
  expand: true
}

meadows.forEach((meadow) => {
    promises.push(copy(fixSrcPath(meadow.path), fixDestPath(meadow.path), copyOptions)
      .catch(logNoSuchFile))
})

Promise.all(promises).then(() => console.log('Done sowing.')).catch((err) => console.error('Error while sowing:', err))

const path = require('path')

const logNoSuchFile = (error) => {
  if(error.errno === -2 && error.code === 'ENOENT') {
    console.error('Did not find file', error.path)
  } else {
    throw error
  }
}

function fixSrcPath(filepath) {
    if(filepath[0] === '~') {
        filepath = path.join(process.env.HOME, filepath.slice(1))
    }
    return filepath
}

function fixDestPath(filepath) {
  return path.join(__dirname, '/meadows', filepath)
}

module.exports = {
  fixSrcPath,
  fixDestPath,
  logNoSuchFile
}

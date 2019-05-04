require('dotenv').config()

const { homedir } = require('os')
const { join, dirname } = require('path')
const execa = require('execa')
const fs = require('@ianwalter/fs')
const { print, chalk } = require('@ianwalter/print')
const makeDir = require('make-dir')
const download = require('download')
const { oneLine } = require('common-tags')

const binary = join(__dirname, 'BrowserStackLocal')
const defaultOptions = {
  key: process.env.BROWSERSTACK_ACCESS_KEY,
  force: true,
  'force-local': true
}
const toFlags = (acc, [key, value]) => (
  value === true ? acc.concat([`--${key}`]) : acc.concat([`--${key}`, value])
)

async function start (options = { daemon: 'start' }) {
  const flags = Object.entries(Object.assign(defaultOptions, options))
  return execa(binary, flags.reduce(toFlags, []))
}

async function stop (options = { daemon: 'stop' }) {
  return execa(binary, Object.entries(options).reduce(toFlags, []))
}

async function checkIfGlobalBinaryExists () {
  const target = join(homedir(), '.browserstack/BrowserStackLocal')
  let exists = true
  try {
    await fs.access(target)
  } catch (err) {
    exists = false
  }
  return { target, exists }
}

async function move () {
  const { target, exists } = await checkIfGlobalBinaryExists()
  if (exists) {
    print.error('BrowserStackLocal binary already exists at', target)
    process.exit(1)
  } else {
    await makeDir(dirname(target))
    await fs.rename(binary, target)
    await fs.symlink(target, binary)
    print.success('BrowserStackLocal binary moved to', target)
  }
}

async function install () {
  let url = 'https://s3.amazonaws.com/bstack-local-prod/BrowserStackLocal-darwin-x64'
  if (process.platform === 'linux') {
    url = 'https://s3.amazonaws.com/bstack-local-prod/BrowserStackLocal-linux-x64'
  } else if (process.platform === 'win32') {
    url = 'https://s3.amazonaws.com/bstack-local-prod/BrowserStackLocal.exe'
  }
  await download(url, __dirname, { filename: 'BrowserStackLocal' })
  await fs.chmod(binary, 755)
  print.success(
    `Downloaded BrowserStackLocal binary for ${process.platform}.`, '\n',
    oneLine`
      Run ${chalk.magenta('yarn bsl move')} to move the binary to your home
      directory if you want other installations to re-use it.
    `
  )
}

module.exports = { start, stop, move, install, checkIfGlobalBinaryExists }

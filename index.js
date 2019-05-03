require('dotenv').config()

const { homedir } = require('os')
const { join, dirname } = require('path')
const execa = require('execa')
const fs = require('@ianwalter/fs')
const { print } = require('@ianwalter/print')
const makeDir = require('make-dir')

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
    print.error(`BrowserStackLocal binary already exists at ${target}`)
    process.exit(1)
  } else {
    await makeDir(dirname(target))
    await fs.rename(binary, target)
    await fs.symlink(target, binary)
    print.success(`BrowserStackLocal binary moved to ${target}`)
  }
}

module.exports = { start, stop, move, checkIfGlobalBinaryExists }

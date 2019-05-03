require('dotenv').config()

const { homedir } = require('os')
const { join, dirname } = require('path')
const execa = require('execa')
const Conf = require('conf')
const fkill = require('fkill')
const fs = require('@ianwalter/fs')
const { print } = require('@ianwalter/print')
const makeDir = require('make-dir')

const binary = join(__dirname, 'BrowserStackLocal')
const config = new Conf({ projectName: 'bsl' })
const defaultOptions = { force: true, forceLocal: true }
const toFlags = (acc, [key, value]) => acc.concat([`--${key}`, value])

async function start (config) {
  const flags = Object
    .assign(defaultOptions, config)
    .entries()
    .reduce(toFlags, [])
  const local = await execa(binary, ...flags)
  config.set('pid', local.pid)
}

async function stop () {
  return fkill(config.get('pid'))
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

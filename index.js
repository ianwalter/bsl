require('dotenv').config()

const { homedir } = require('os')
const { join } = require('path')
const execa = require('execa')
const Conf = require('conf')
const fkill = require('fkill')
const fs = require('@ianwalter/fs')
const { print } = require('@ianwalter/print')

const config = new Conf({ projectName: 'bsl' })
const defaultOptions = { force: true, forceLocal: true }
const toFlags = (acc, [key, value]) => acc.concat([`--${key}`, value])

async function start (config) {
  const flags = Object
    .assign(defaultOptions, config)
    .entries()
    .reduce(toFlags, [])
  const local = await execa('./BrowserStackLocal', ...flags)
  config.set('pid', local.pid)
}

async function stop () {
  return fkill(config.get('pid'))
}

async function move () {
  const target = join(homedir(), '.browserstack/BrowserStackLocal')
  const binaryExists = await fs.access(target)
  if (binaryExists) {
    print.error(`BrowserStackLocal binary already exists at ${target}`)
    process.exit(1)
  } else {
    await fs.move('./BrowserStackLocal', target)
    await fs.symlink(target, './BrowserStackLocal')
    print.success(`BrowserStackLocal binary moved to ${target}`)
  }
}

module.exports = { start, stop, move }

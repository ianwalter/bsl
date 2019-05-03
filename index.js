require('dotenv').config()

const { resolve } = require('path')
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

async function symlink () {
  const destination = resolve('~/.browserstack/BrowserStackLocal')
  await fs.symlink('./BrowserStackLocal', destination)
}

async function move () {
  const destination = resolve('~/.browserstack/BrowserStackLocal')
  const binaryExists = await fs.access(destination)
  if (binaryExists) {
    print.error(`BrowserStackLocal binary already exists at ${destination}`)
    process.exit(1)
  } else {
    await fs.move('./BrowserStackLocal', destination)
    await symlink()
    print.success(`BrowserStackLocal binary moved to ${destination}`)
  }
}

module.exports = { start, stop, symlink, move }

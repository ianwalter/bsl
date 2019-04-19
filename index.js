require('dotenv').config()
const { Local } = require('browserstack-local')
const Conf = require('conf')
const fkill = require('fkill')

const config = new Conf({ projectName: 'bsl' })
const defaultOptions = { force: true, forceLocal: true }

async function start (options = {}) {
  return new Promise((resolve, reject) => {
    const local = new Local()
    local.start(Object.assign(defaultOptions, options), err => {
      if (err) {
        reject(err)
      } else {
        config.set('pid', local.pid)
        resolve(local)
      }
    })
  })
}

async function stop () {
  return fkill(config.get('pid'))
}

module.exports = { start, stop }

const { Local } = require('browserstack-local')
const Conf = require('conf')
const fkill = require('fkill')

const config = new Conf({ projectName: 'bsl' })

async function start () {
  return new Promise((resolve, reject) => {
    const local = new Local()
    local.start({ force: true, forceLocal: true }, err => {
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

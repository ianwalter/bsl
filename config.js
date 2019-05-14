const { print } = require('@ianwalter/print')
const { start, stop } = require('.')

module.exports = {
  async before () {
    const { stdout } = await start()
    print.debug(stdout)
  },
  async after () {
    const { stdout } = await stop()
    print.debug(stdout)
  }
}

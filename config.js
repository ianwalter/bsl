const { start, stop } = require('.')

module.exports = {
  async before () {
    return start()
  },
  async after () {
    return stop()
  }
}

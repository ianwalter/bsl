#!/usr/bin/env node

const cli = require('@ianwalter/cli')
const { print } = require('@ianwalter/print')
const { start, stop, move } = require('.')

async function run () {
  const config = await cli({ name: 'bsl' })
  const { _: [command] } = config
  delete config._

  try {
    if (command === 'start') {
      await start({ ...config, daemon: 'start' })
      print.success('BrowserStack Local started')
    } else if (command === 'stop') {
      await stop()
      print.success('BrowserStack Local stopped')
    } else if (command === 'move') {
      await move()
    } else {
      print.error('Unknown command:', command)
      process.exit(1)
    }
  } catch (err) {
    print.error(err)
  }
}

run()

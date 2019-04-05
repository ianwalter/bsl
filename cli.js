#!/usr/bin/env node

const meow = require('meow')
const signale = require('signale')
const { start, stop } = require('.')

async function run () {
  const cli = meow(
    `
      Usage
        bsl

      Option
        --kill, -k  Kill process

      Example
        ❯ bsl
        ✔  success   BrowserStack Local started with process 18232.
    `,
    {
      flags: {
        kill: { type: 'boolean', alias: 'k' }
      }
    }
  )
  try {
    if (cli.flags.kill) {
      await stop()
      signale.success('BrowserStack Local stopped.')
    } else {
      const local = await start()
      signale.success(`BrowserStack Local started with process ${local.pid}.`)
    }
  } catch (err) {
    signale.error(err)
    process.exit(1)
  }
}

run()

#!/usr/bin/env node

const { join } = require('path')
const download = require('download')
const fs = require('@ianwalter/fs')
const { checkIfGlobalBinaryExists } = require('.')
const { print, chalk } = require('@ianwalter/print')
const { oneLine } = require('common-tags')

const binary = join(__dirname, 'BrowserStackLocal')

async function run () {
  const { target, exists } = await checkIfGlobalBinaryExists()

  // Determine if the local binary / symlink already exists
  let localBinaryDoesNotExist = false
  try {
    await fs.access(binary)
  } catch (err) {
    localBinaryDoesNotExist = true
  }

  if (exists) {
    // If the local binary / symlink exists, delete it.
    if (!localBinaryDoesNotExist) {
      await fs.unlink(binary)
    }

    // Create a symlink to the global binary.
    await fs.symlink(target, binary)
    print.success('Using global binary at', target)
  } else if (localBinaryDoesNotExist) {
    // Download the BrowserStackLocal binary dependening on the user's platform
    // and make it executable.
    let url = 'https://s3.amazonaws.com/bstack-local-prod/BrowserStackLocal-darwin-x64'
    if (process.platform === 'linux') {
      url = 'https://s3.amazonaws.com/bstack-local-prod/BrowserStackLocal-linux-x64'
    } else if (process.platform === 'win32') {
      url = 'https://s3.amazonaws.com/bstack-local-prod/BrowserStackLocal.exe'
    }
    await download(url, __dirname, { filename: 'BrowserStackLocal' })
    await fs.chmod(binary, 755)
    print.success(
      `Downloaded BrowserStackLocal binary for ${process.platform}.`, '\n',
      oneLine`
        Run ${chalk.magenta('yarn bsl move')} to move the binary to your home
        directory if you want other installations to re-use it.
      `
    )
  }
}

run()

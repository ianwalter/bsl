#!/usr/bin/env node

const { join } = require('path')
const { promises: fs } = require('fs')
const { checkIfGlobalBinaryExists, install } = require('.')
const { print } = require('@ianwalter/print')

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
    await install()
  }
}

run()

#!/usr/bin/env node

const { homedir } = require('os')
const { join } = require('path')
const download = require('download')
const fs = require('@ianwalter/fs')

async function run () {
  const target = join(homedir(), '.browserstack/BrowserStackLocal')

  let exists = true
  try {
    await fs.access(target)
  } catch (err) {
    exists = false
  }

  if (exists) {
    await fs.symlink(target, './BrowserStackLocal')
  } else {
    let url = 'https://s3.amazonaws.com/bstack-local-prod/BrowserStackLocal-darwin-x64'
    if (process.platform === 'linux') {
      url = 'https://s3.amazonaws.com/bstack-local-prod/BrowserStackLocal-linux-x64'
    } else if (process.platform === 'win32') {
      url = 'https://s3.amazonaws.com/bstack-local-prod/BrowserStackLocal.exe'
    }
    await download(url, __dirname, { filename: 'BrowserStackLocal' })
  }
}

run()

#!/usr/bin/env node

const download = require('download')
const fs = require('@ianwalter/fs')
const { symlink } = require('.')

async function run () {
  const binaryExists = await fs.access('~/.browserstack/BrowserStackLocal')
  if (binaryExists) {
    await symlink()
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

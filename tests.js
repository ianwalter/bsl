const { test } = require('@ianwalter/bff')
const createTestServer = require('@ianwalter/test-server')
const { start, stop } = require('.')

test('tunneling localhost', async ({ browser, expect }) => {
  const local = await start()
  expect(local.pid).toBeGreaterThan(0)
  const server = await createTestServer()
  await browser.url(server.url)
  expect()
  await stop()
})

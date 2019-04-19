const { test } = require('@ianwalter/bff')
const { start, stop } = require('.')

test('start and stop', async ({ expect }) => {
  const local = await start()
  expect(local.pid).toBeGreaterThan(0)
  await stop()
})

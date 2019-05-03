const { test } = require('@ianwalter/bff')
const createTestServer = require('@ianwalter/test-server')
const { start, stop } = require('.')

test('tunneling localhost', async ({ browser, expect }) => {
  const server = await createTestServer()
  server.use(ctx => {
    ctx.body = `
      <html>
        <head>
          <title>Hello World!</title>
        </head>
        <body>
          <h1>Hello World!</h1>
        </body>
      </html>
    `
  })
  await start()
  await browser.url(server.url)
  expect(await browser.getTitle()).toBe('Hello World!')
  await stop()
})

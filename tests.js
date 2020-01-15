const { test } = require('@ianwalter/bff')
const { createApp } = require('@ianwalter/nrg')

test('tunneling localhost', async ({ browser, expect }) => {
  const app = await createApp().start()
  app.use(ctx => {
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
  await browser.url(app.server.url)
  expect(await browser.getTitle()).toBe('Hello World!')
  await app.server.close()
})

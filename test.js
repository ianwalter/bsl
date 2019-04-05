import test from 'ava'
import { start, stop } from '.'

test('start and stop', async t => {
  const local = await start()
  t.truthy(local && local.pid)
  await stop()
})

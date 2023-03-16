import { test } from 'tap'
import { build } from '../helper'

test('users is loaded', async (t) => {
    const app = await build(t)
    const res = await app.inject({ url: '/users' })

    t.equal(res.payload, 'this is an example')
})

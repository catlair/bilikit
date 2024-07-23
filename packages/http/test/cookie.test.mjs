import { deepStrictEqual } from 'node:assert'
import { test } from 'node:test'
import { createCookieJar } from '../cookie'

const COOKIE = 'bar=foo; demo=1;xxx=yyy; test=hello;a=1'

test('setCookieString', async () => {
  const jar = createCookieJar()
  jar.setCookieString(COOKIE, 'https://example.com')

  deepStrictEqual(jar.getCookieString('https://example.com'), 'bar=foo; demo=1; xxx=yyy; test=hello; a=1')
})

test('getItem', async () => {
  const jar = createCookieJar()
  jar.setCookie('bar=foo', 'https://example.com')

  deepStrictEqual(jar.getItem('bar', 'https://example.com'), 'foo')
})

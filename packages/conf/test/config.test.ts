import { deepStrictEqual } from 'node:assert'
import { dirname, resolve } from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'
import { readConfig } from '../index.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

test('readConfig mjs', async () => {
  deepStrictEqual(await readConfig(resolve(__dirname, './demo.mjs')), {
    name: 'demo',
    mjs: true,
    version: process.version,
    exports: {
      '.': './index.js',
      './index': './index.js',
      './index.js': './index.js',
    },
  })
})

test('readConfig cjs', async () => {
  deepStrictEqual(await readConfig(resolve(__dirname, './demo.cjs')), {
    name: 'demo',
    cjs: true,
    version: process.version,
    exports: {
      '.': './index.js',
      './index': './index.js',
      './index.js': './index.js',
    },
  })
})

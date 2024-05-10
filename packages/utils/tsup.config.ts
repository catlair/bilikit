import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['index.ts'],
  minify: false,
  clean: true,
  platform: 'node',
  splitting: true,
  target: 'node16',
  shims: true,
  dts: true,
  minifySyntax: true,
  outExtension({ format }) {
    return {
      js: `.${format === 'cjs' ? 'cjs' : format === 'esm' ? 'mjs' : 'js'}`,
    }
  },
  format: ['cjs', 'esm'],
  esbuildOptions: (options) => {
    // 判断是否是 esm，避免重复引入 require
    if (options.define['TSUP_FORMAT'] === '"esm"') {
      options.banner = {
        js:
          `import{createRequire}from'module';if(!globalThis.require)globalThis.require=createRequire(import.meta.url);`,
      }
    }
  },
})

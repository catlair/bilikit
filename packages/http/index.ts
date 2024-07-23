import { defu } from 'defu'
import destr from 'destr'
import { type ExtendOptions as GotExtendOptions, got, type Options as GotOptions } from 'got'
import { isPlainObject, merge } from 'lodash-es'
import { URLSearchParams } from 'url'
import { CookieJar, createCookieJar } from './cookie.js'
import { toLowerCaseHeaders } from './utils.js'

export { got }

export type MyOptions =
  & Omit<
    & Partial<GotOptions>
    & {
      native?: boolean
      data?: any
      timeout?: number | GotOptions['timeout']
    },
    'body'
  >
  & {
    body?: GotOptions['body'] | Record<string, any>
    cookie?: string
  }

export type Options = GotExtendOptions

export function mergeOptions(options: MyOptions, globalOptions: GotExtendOptions) {
  options.headers = toLowerCaseHeaders(options.headers)

  // 新版本 timeout 不是 number 类型
  if (typeof options.timeout === 'number') {
    options.timeout = {
      request: options.timeout,
    }
  }

  /**
   * 最终配置
   */
  options = defu(options, globalOptions) as MyOptions

  // 兼容之前的配置，后续删除
  if (options.data) {
    options.body = options.data
    delete options.data
  }

  if (
    options.body && options.headers['content-type'] && options.headers['content-type'].includes('form-urlencoded')
  ) {
    options.body = new URLSearchParams(options.body as any).toString()
  } else if (isPlainObject(options.body)) {
    options.body = JSON.stringify(options.body)
  }

  return options
}

export function createRequest(options: GotExtendOptions & MyOptions = {}) {
  const globalOptions = defu(
    options,
    { method: 'POST', timeout: { request: 30000 }, throwHttpErrors: false } as GotExtendOptions,
  )
  globalOptions.headers = toLowerCaseHeaders(globalOptions.headers)

  if (!globalOptions.cookieJar) {
    globalOptions.cookieJar = createCookieJar()
  }

  if (globalOptions.cookie) {
    setCookies(globalOptions.cookie, globalOptions.cookieJar as CookieJar)
    delete globalOptions.cookie
  }

  const api = got.extend(globalOptions)

  async function request<T = any>(options: MyOptions): Promise<T> {
    options = mergeOptions(options, globalOptions)

    const method = options.method.toLowerCase() as typeof options.method
    if (options.native) {
      delete options.native
      return await api[method](options)
    }

    return destr(await api[method](options).text())
  }

  function get<T = any>(url: string, options?: MyOptions) {
    return request<T>({ url, method: 'get', ...options })
  }

  function post<T = any>(url: string, body: MyOptions['body'], options?: MyOptions) {
    return request<T>({ url, method: 'post', body, ...options })
  }

  const http = {
    request,
    get,
    post,
    setOptions(options: MyOptions) {
      options.headers = toLowerCaseHeaders(options.headers)
      merge(globalOptions, options)
      if (options.cookie) {
        http.initCookies(options.cookie, '/')
        delete globalOptions.cookie
      }
      return http
    },
    setHeader(key: string, value: string) {
      globalOptions.headers[key.toLowerCase()] = value
      return http
    },
    setCookie(key: string, value: string, currentUrl: string) {
      ;(globalOptions.cookieJar as CookieJar).setCookie(`${key}=${value}`, currentUrl)
      return http
    },
    initCookies(cookieString: string, currentUrl: string) {
      setCookies(cookieString, globalOptions.cookieJar as CookieJar, currentUrl)
      return http
    },
    getCookie(currentUrl: string) {
      return (globalOptions.cookieJar as CookieJar).getCookieString(currentUrl)
    },
  }

  return http
}

export type HTTP = ReturnType<typeof createRequest>

export function setCookies(cookies: string, cookieJar: CookieJar, currentUrl?: string) {
  cookies.split(/;\s?/).filter(Boolean).forEach((cookie) => cookieJar.setCookie(cookie, currentUrl))
}

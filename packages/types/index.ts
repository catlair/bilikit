export interface ApiBaseProp<T = object | number | null> {
  /**
   * -658 Token 过期
   */
  code: number
  message: string
  ttl: number
  data: T
}

export interface PureDataProp<T = object | [] | null> {
  code: number
  message: string
  data: T
}

interface Option {
  native?: boolean
  headers?: Record<string, string>
  [x: string]: any
}

export interface Http {
  post<T = any>(
    url: string,
    data?: Record<string, any> | string,
    options?: Option,
  ): Promise<T>
  get<T = any>(url: string, options?: Option): Promise<T>
  request?<T = any>(options?: Option): Promise<T>
  setOptions?(option: Option): Http
  setHeader?(key: string, value: string): Http
  setCookie?(key: string, value: string, currentUrl: string): Http
  getCookie?(currentUrl: string): string
  initCookie?(cookieString: string, currentUrl: string): void
}

export interface LoggerType {
  info(...args: any[]): void
  error(...args: any[]): void
  warn(...args: any[]): void
  debug(...args: any[]): void
  start(...args: any[]): void
  success(...args: any[]): void
  fail(...args: any[]): void
  fatal(...args: any[]): void
}

export interface M<API = any, Config = any> {
  api: API
  logger: LoggerType
  config: Config
  http: Http
}

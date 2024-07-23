import { md5 } from './crypto.js'

/**
 * 为请求参数进行 APP 签名
 */
export function getSign(params: Record<string, any>, appkey: string, appsec: string) {
  params.appkey = appkey
  const searchParams = new URLSearchParams(params)
  searchParams.sort()
  return md5(searchParams.toString() + appsec)
}

export function getSignQuery(
  params: Record<string, any>,
  appkey = '1d8b6e7d45233436',
  appsec = '560c52ccd288fed045859ed18bffd973',
) {
  const searchParams = new URLSearchParams(params)
  searchParams.sort()
  return `${searchParams.toString()}&sign=${getSign(params, appkey, appsec)}`
}

import { createRequest } from '@bilikit/http'

export type BaseResponse<T> = {
  code: number
  message: string
  ttl: number
  data: T
}

export function createApi() {
  const http = createRequest({
    headers: {
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'accept-language': 'zh-CN,zh;q=0.9',
      'accept-encoding': 'gzip, deflate, br',
      'user-agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0',
    },
  })

  function generateQrCode() {
    return http.get<
      BaseResponse<{
        qrcode_key: string
        url: string
      }>
    >('https://passport.bilibili.com/x/passport-login/web/qrcode/generate')
  }

  function pollQrCode(key: string) {
    return http.get(
      `https://passport.bilibili.com/x/passport-login/web/qrcode/poll?qrcode_key=${key}`,
    )
  }

  function getCookie() {
    try {
      return http.get('https://www.bilibili.com/')
    } catch (error) {
      return error
    }
  }

  return {
    generateQrCode,
    pollQrCode,
    getCookie,
  }
}

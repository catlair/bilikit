import { createLogger } from '@bilikit/utils'
import { BigPointApi } from './request.js'

export async function bigPoint(config: any, csrf: string) {
  const logger = await createLogger()
  const api = new BigPointApi({ cookie: config.cookie }, {
    mobileUA:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
    csrf,
  })

  console.log(await api.signIn())
}

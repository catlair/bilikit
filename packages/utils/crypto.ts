import { createHash } from 'crypto'

export function md5(str: string | Buffer) {
  return createHash('md5').update(str).digest('hex')
}

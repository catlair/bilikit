import { dayjs } from './time.js'

import { randomInt } from 'crypto'
import { isNumber } from './is.js'

export * from './bilibili.js'
export * from './is.js'

export interface LoggerPushData {
  /**
   * 0 fatal and error
   *
   * 1 warn
   *
   * 2 normal
   *
   * 3 info success fail ready start
   *
   * 4 debug
   *
   * 5 trace
   *
   * 999 verbose
   *
   * -999 silent
   */
  level: 0 | 1 | 2 | 3 | 4 | 5 | -999 | 999 | number
  type: string
  msg: string
  date: Date
}

export async function createLogger(options?: { pushData: LoggerPushData[] }) {
  const { createConsola, consola } = await import('consola')
  consola.options.level = 5
  return createConsola({
    level: 5,
    reporters: [
      {
        log: ({ type, args, level, date }) => {
          if (options?.pushData) {
            const msg = args
              .reduce<string>((str, cur) => `${str} ${cur}`, '')
              .substring(1)
            options.pushData.push({ msg, type, level, date })
          }
          consola[type].apply(consola, args)
        },
      },
    ],
  })
}

export const logger = await createLogger()

export function sleep(ms1: number, ms2?: number) {
  return new Promise((resolve) => setTimeout(resolve, randomInt(ms1, ms2)))
}

export function isToday(date: Date): boolean
export function isToday(date: number, isUnix?: boolean): boolean
export function isToday(date: Date | number, isUnix = true): boolean {
  const time = isNumber(date) ? (isUnix ? date * 1000 : date) : date
  return dayjs().isSame(time, 'day')
}

export function getUnixTime() {
  return dayjs().unix()
}

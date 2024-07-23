import { createRequest, type HTTP, type MyOptions } from '@bilikit/http'
import { BASE_URLS, REFERER_URLS } from '@bilikit/shared'
import type { PureDataProp } from '@bilikit/types'
import { getSignQuery, getUnixTime } from '@bilikit/utils'
import type { PointListDto, TaskCombineDto } from './dto.js'
import { TaskCodeType } from './emum.js'

export interface ApiOptions {
  csrf: string
  mobileUA: string
}

export class BigPointApi {
  biliApi: HTTP
  csrf: string

  constructor(options: MyOptions, { mobileUA, csrf }: ApiOptions) {
    this.biliApi = createRequest({
      prefixUrl: BASE_URLS.API,
      headers: {
        'Referer': REFERER_URLS.BIGPOINT,
        'app-key': 'android64',
        'env': 'prod',
        'user-agent': mobileUA,
      },
    })
      .setOptions(options)

    this.csrf = csrf
  }

  /**
   * 大积分签到
   */
  signIn() {
    return this.biliApi.post<Omit<PureDataProp, 'data'>>(
      'pgc/activity/score/task/sign',
      getSignQuery({
        csrf: this.csrf,
      }),
    )
  }

  /**
   * 大积分领取任务
   */
  receiveTask(taskCode: TaskCodeType = 'ogvwatch') {
    return this.biliApi.post<PureDataProp>(
      'pgc/activity/score/task/receive',
      {
        csrf: this.csrf,
        ts: getUnixTime(),
        taskCode,
      },
      {
        http2: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Referer': REFERER_URLS.BIGPOINT_TASK,
          'navtive_api_from': 'h5',
        },
      },
    )
  }

  susWin() {
    return this.biliApi.post<PureDataProp<Record<string, never>>>(
      'pgc/activity/deliver/susWin/receive',
      getSignQuery({
        csrf: this.csrf,
      }),
    )
  }

  /**
   * 完成大积分每日任务
   */
  complete(position: string) {
    return this.biliApi.post<PureDataProp>(
      'pgc/activity/deliver/task/complete',
      getSignQuery({
        csrf: this.csrf,
        position,
      }),
      {
        headers: {
          referer: REFERER_URLS.BIGPOINT,
        },
      },
    )
  }

  /**
   * 完成大积分每日任务 v2
   */
  completeV2(taskCode: TaskCodeType) {
    return this.biliApi.post<PureDataProp>(
      'pgc/activity/score/task/complete/v2',
      getSignQuery({
        csrf: this.csrf,
        taskCode,
      }),
      {
        headers: {
          referer: REFERER_URLS.BIGPOINT_TASK,
        },
      },
    )
  }

  /**
   * 提交事件
   */
  showDispatch(eventId: string) {
    return this.biliApi.post<{
      code: number
      message: string
      data: never
      errtag: number
      ttl: number
    }>(
      `https://show.bilibili.com/api/activity/fire/common/event/dispatch?${
        getSignQuery({
          csrf: this.csrf,
        })
      }`,
      {
        eventId,
      },
      {
        headers: {
          'content-type': 'application/json; charset=utf-8',
        },
      },
    )
  }

  /**
   * 获取大积分任务列表
   */
  getTaskCombine() {
    return this.biliApi.get<TaskCombineDto>('x/vip_point/task/combine')
  }

  /**
   * 积分记录
   */
  getPointList() {
    return this.biliApi.get<PointListDto>(
      `x/vip_point/list?${
        getSignQuery({
          csrf: this.csrf,
          change_type: 1,
          pn: 1,
          ps: 10,
        })
      }`,
    )
  }
}

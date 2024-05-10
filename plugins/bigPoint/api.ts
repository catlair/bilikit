import { createRequest } from '@bilikit/http'
import { BASE_URLS, REFERER_URLS } from '@bilikit/shared'

export function createBigPointApi(config: Record<string, any> = {}) {
  const baseHeaders = {
    'app-key': 'android64',
    'env': 'prod',
    'user-agent': config.mbUserAgent,
  }

  const biliApi = createRequest({
    prefixUrl: BASE_URLS.API,
    headers: {
      'Referer': REFERER_URLS.WWW,
      'user-agent': config.userAgent,
    },
  })

  return {}
}

/**
 * 大积分签到
 */
function signIn() {
  return biliApi.post<Omit<PureDataProp, 'data'>>(
    'pgc/activity/score/task/sign',
    appSignString({
      csrf: TaskConfig.BILIJCT,
    }),
    {
      headers: baseHeader,
    },
  )
}

/**
 * 大积分领取任务
 */
function receiveTask(taskCode: TaskCodeType = 'ogvwatch') {
  return biliApi.post<PureDataProp>(
    'pgc/activity/score/task/receive',
    {
      csrf: TaskConfig.BILIJCT,
      ts: getUnixTime(),
      taskCode,
    },
    {
      http2: true,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Referer': RefererURLs.bigPointTask,
        ...baseHeader,
        'navtive_api_from': 'h5',
      },
    },
  )
}

function susWin() {
  return biliApi.post<PureDataProp<Record<string, never>>>(
    'pgc/activity/deliver/susWin/receive',
    appSignString({
      csrf: TaskConfig.BILIJCT,
    }),
    {
      headers: baseHeader,
    },
  )
}

/**
 * 完成大积分每日任务
 */
function complete(position: string) {
  return biliApi.post<PureDataProp>(
    'pgc/activity/deliver/task/complete',
    appSignString({
      csrf: TaskConfig.BILIJCT,
      position,
    }),
    {
      headers: {
        ...baseHeader,
        referer: RefererURLs.bigPoint,
      },
    },
  )
}

/**
 * 完成大积分每日任务 v2
 */
function completeV2(taskCode: TaskCodeType) {
  return biliApi.post<PureDataProp>(
    'pgc/activity/score/task/complete/v2',
    appSignString({
      csrf: TaskConfig.BILIJCT,
      taskCode,
    }),
    {
      headers: {
        ...baseHeader,
        referer: RefererURLs.bigPointTask,
      },
    },
  )
}

/**
 * 提交事件
 */
function showDispatch(eventId: string) {
  return biliHttp.post<{
    code: number
    message: string
    data: never
    errtag: number
    ttl: number
  }>(
    `https://show.bilibili.com/api/activity/fire/common/event/dispatch?${
      appSignString({
        csrf: TaskConfig.BILIJCT,
      })
    }`,
    {
      eventId,
    },
    {
      headers: {
        'content-type': 'application/json; charset=utf-8',
        ...baseHeader,
      },
    },
  )
}

/**
 * 获取大积分任务列表
 */
function getTaskCombine() {
  return biliApi.get<TaskCombineDto>('x/vip_point/task/combine', {
    headers: baseHeader,
  })
}

/**
 * 积分记录
 */
function getPointList() {
  return biliApi.get<PointListDto>(
    `x/vip_point/list?${
      appSignString({
        csrf: TaskConfig.BILIJCT,
        change_type: 1,
        pn: 1,
        ps: 10,
      })
    }`,
    {
      headers: baseHeader,
    },
  )
}

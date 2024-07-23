import type { ApiBaseProp } from '@bilikit/types'

/**
 * 查看任务详情
 */
export type TaskCombineDto = ApiBaseProp<{
  vip_info: Vipinfo
  point_info: Pointinfo
  task_info: Taskinfo
  current_ts: number
  integration_task: boolean
}>

export interface Taskinfo {
  modules?: Module[]
  sing_task_item?: SingTaskItem
  score_month: number
  score_limit: number
}

export interface CommonTaskItem {
  /** 任务代码 */
  task_code:
    | 'bonus' // 大会员福利
    | 'dress-up' // 使用免费体验装扮
    | 'privilege' // 浏览大会员专享福利
    | 'getrights' // 领取大会员福利
    | 'dress-view' // 浏览装扮商城
    | '626act' //
    | 'animatetab' // 浏览追番页面 10 秒
    | 'filmtab' //
    | 'vipmallview' // 浏览会员购页面 10 秒
    | 'ogvwatch' // 观看任意正片
    | 'tvodbuy' // 购买付费点播影片
    | 'dressbuyamount' // 购买指定装扮
    | 'vipmallbuy' // 购买指定大会员商品
  /** 0 未领取 1 未完成 2 未知 3 已领取 */
  state: number
  title: string
  icon: string
  subtitle: string
  explain: string
  /** 估计是需要会员等级 */
  vip_limit: number
  /** 已完成次数 */
  complete_times: number
  /** 最大次数 */
  max_times: number
  recall_num: number
  link?: string
}

interface SingTaskItem {
  histories: SingTaskHistory[]
  count: number
  base_score: number
}

export interface SingTaskHistory {
  day: string
  signed: boolean
  score: number
  is_today?: boolean
}

interface Module {
  module_title: string
  common_task_item: CommonTaskItem[]
  module_sub_title?: string
}

interface Pointinfo {
  /** 目前积分 */
  point: number
  /** 即将过期积分 */
  expire_point: number
  /** 过期时间 */
  expire_time: number
  /** 剩余天数 */
  expire_days: number
}

interface Vipinfo {
  /** 0 普通 1 月度 2 年度 */
  type: number
  /** 0 不存在 1 存在 */
  status: number
  due_date: number
  vip_pay_type: number
  start_time: number
  paid_type: number
  mid: number
  role: number
  tv_vip_status: number
  tv_vip_pay_type: number
  tv_due_date: number
}

export type PointListDto = ApiBaseProp<{
  total: number
  big_point_list: Bigpointlist[]
}>

interface Bigpointlist {
  point: number
  change_time: number
  remark: string
  order_no: string
  image_url: string
}

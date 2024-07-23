export const TaskCode = {
  ogvwatch: '观看正片',
  tvodbuy: '购买视频',
  vipmallbuy: '购买商品',
  bonus: '大会员福利',
  privilege: '浏览会员权益',
  '626act': '浏览“我的哔哩小屋”',
  animatetab: '浏览追番',
  filmtab: '浏览影视',
  vipmallview: '浏览会员购',
  dressbuyamount: '购买装扮',
  'dress-up': '使用免费体验装扮',
  getrights: '领取大会员福利',
  'dress-view': '浏览装扮商城',
} as const;

export type TaskCodeType = keyof typeof TaskCode;

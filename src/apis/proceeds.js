import http from '~axios';

// 获取实收列表
export const getActualIncomeList = req => http('/statistic/getAllReceiptItemList', req);

// 获取待收列表
export const getWaitIncomeList = req => http('/statistic/getAllDueItemList', req);

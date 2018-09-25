import http from '~axios';

// 获取我的店铺列表
export const getSelfStoreList = () => http('/merchantStaff/getMerchantStaffToken', {});
// 获取店铺信息
export const getStoreInfo = merchantId => http('/merchant/getInfo4Seller', {
  merchantId,
});
// 获取店铺待收款金额(全部)
export const getDueAmount = merchantId => http('/statistic/getMerchantDueAmount', {
  merchantId,
});
// 获取店铺实收款金额(本月)
export const getReceiptAmount = (merchantId) => {
  const current = new Date();

  return http('/statistic/getMerchantReceiptAmount', {
    merchantId,
    month: current.getMonth() + 1,
    year: current.getFullYear(),
    pageNum: 1,
    pageSize: 0,
  });
};
// 获取月销售冠军
export const getCurrentMonthSaleChampion = (merchantId) => {
  const current = new Date();

  return http('/statistic/getMerchantChampion', {
    merchantId,
    month: current.getMonth() + 1,
    year: current.getFullYear(),
    pageNum: 1,
    pageSize: 0,
  });
};
// 获取店铺目标金额
export const getStoreSaleTarget = (merchantId) => {
  const current = new Date();

  return http('/statistic/getMerchantGoalProcess', {
    merchantId,
    month: current.getMonth() + 1,
    year: current.getFullYear(),
    pageNum: 1,
    pageSize: 0,
  });
};
// 获取业绩排行榜
export const getPerformanceRank = ({
  merchantId,
  year,
  month,
}) => http('/statistic/getDesignerTradeRank', {
  merchantId,
  year,
  month,
  pageNum: 1,
  pageSize: 0,
});
// 获取开单排行榜
export const getBillRank = ({
  merchantId,
  year,
  month,
}) => http('/statistic/getBillRank', {
  merchantId,
  year,
  month,
  pageNum: 1,
  pageSize: 0,
});
// 获取店铺某一年的业绩目标列表
export const getOnePerformanceTargetList = ({
  merchantId,
  goalYear,
}) => http('/merchantGoal/getMerchantGoalInfo', {
  merchantId,
  goalYear,
});
// 更新店铺某一年业绩目标列表
export const updatePerformTargetList = (merchantId, {
  janAmount,
  fabAmount,
  marAmount,
  aprAmount,
  mayAmount,
  junAmount,
  julAmount,
  augAmount,
  sepAmount,
  octAmount,
  novAmount,
  decAmount,
  year,
  id,
}) => http('/merchantGoal/saveOrUpdateMerchantGoal', {
  merchantId,
  goalYear: year,
  merchantGoalId: id,
  janAmount: janAmount.length > 3 ? +janAmount.replace(/\D/g, '') : +janAmount,
  fabAmount: fabAmount.length > 3 ? +fabAmount.replace(/\D/g, '') : +fabAmount,
  marAmount: marAmount.length > 3 ? +marAmount.replace(/\D/g, '') : +marAmount,
  aprAmount: aprAmount.length > 3 ? +aprAmount.replace(/\D/g, '') : +aprAmount,
  mayAmount: mayAmount.length > 3 ? +mayAmount.replace(/\D/g, '') : +mayAmount,
  junAmount: junAmount.length > 3 ? +junAmount.replace(/\D/g, '') : +junAmount,
  julAmount: julAmount.length > 3 ? +julAmount.replace(/\D/g, '') : +julAmount,
  augAmount: augAmount.length > 3 ? +augAmount.replace(/\D/g, '') : +augAmount,
  sepAmount: sepAmount.length > 3 ? +sepAmount.replace(/\D/g, '') : +sepAmount,
  octAmount: octAmount.length > 3 ? +octAmount.replace(/\D/g, '') : +octAmount,
  novAmount: novAmount.length > 3 ? +novAmount.replace(/\D/g, '') : +novAmount,
  decAmount: decAmount.length > 3 ? +decAmount.replace(/\D/g, '') : +decAmount,
});
// 获取店铺总业绩列表
export const getPerformanceTotalList = ({
  merchantId,
  year,
}) => http('/statistic/getMerchantTradeAmountList', {
  merchantId,
  year,
  pageNum: 1,
  pageSize: 0,
});

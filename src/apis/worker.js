import http from '~axios';

// 获取我的店铺列表
export const getSelfStoreList = () => {
  return http('/merchantStaff/getMerchantStaffToken', {});
}
// 获取店铺信息
export const getStoreInfo = merchantId => {
  return http('/merchant/getInfo4Seller', {
    merchantId
  })
}
// 获取店铺待收款金额(全部)
export const getDueAmount = merchantId => {
  return http('/statistic/getMerchantDueAmount', {
    merchantId
  })
}
// 获取店铺实收款金额(本月)
export const getReceiptAmount = merchantId => {
  const current = new Date();

  return http('/statistic/getMerchantReceiptAmount', {
    merchantId,
    month: 7,
    // month: current.getMonth() + 1,
    year: current.getFullYear(),
    pageNum: 1,
    pageSize: 0
  })
}
// 获取月销售冠军
export const getCurrentMonthSaleChampion = merchantId => {
  const current = new Date();

  return http('/statistic/getMerchantChampion', {
    merchantId,
    month: current.getMonth() + 1,
    year: current.getFullYear(),
    pageNum: 1,
    pageSize: 0
  })
}
// 获取店铺目标金额
export const getStoreSaleTarget = merchantId => {
  const current = new Date();

  return http('/statistic/getMerchantGoalProcess', {
    merchantId,
    month: 7,
    // month: current.getMonth() + 1,
    year: current.getFullYear(),
    pageNum: 1,
    pageSize: 0
  })
}
// 获取业绩排行榜
export const getPerformanceRank = ({
  merchantId,
  year,
  month
}) => {
  return http('/statistic/getDesignerTradeRank', {
    merchantId,
    year,
    month,
    pageNum: 1,
    pageSize: 0
  })
}
// 获取开单排行榜
export const getBillRank = ({
  merchantId,
  year,
  month
}) => {
  return http('/statistic/getBillRank', {
    merchantId,
    year,
    month,
    pageNum: 1,
    pageSize: 0
  })
}
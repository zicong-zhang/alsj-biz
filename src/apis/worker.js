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
    month: current.getMonth() + 1,
    year: current.getFullYear(),
    pageNum: 1,
    pageSize: 0
  })
}
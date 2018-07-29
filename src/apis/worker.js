import http from '~axios';

// 获取店铺信息
export const getStoreInfo = merchantId => {
  return http('/merchant/getInfo4Seller', {
    merchantId
  })
}
// 获取店铺本月待收款金额(线上 + 线下)
export const get = merchantId => {
  return http('/statistic/getMerchantDueAmount', {
    merchantId
  })
}

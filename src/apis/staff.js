import http from '~axios'

// 获取员工列表
export const getStaffList = ({
  merchantId,
  pageNum,
  pageSize
}) => {
  return http('/merchantStaff/listMerchantStaff', {
    merchantId,
    pageNum,
    pageSize
  })
}

// 根据店员获取订单列表
export const getOrderListForStaff = ({
  merchantId,
  pageNum,
  pageSize,
  staffId
}) => {
  return http('/order/listByKeeper', {
    merchantId,
    pageNum,
    pageSize,
    staffId
  })
}
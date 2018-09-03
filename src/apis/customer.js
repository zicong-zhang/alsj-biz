import http from '~axios';

// 获取客户列表
export const getCustomerList = ({
  merchantId,
  pageNum
}) => {
  return http('/merchantCustomer/list', {
    merchantId,
    pageNum,
    pageSize: 20
  })
}
// 获取客户对应的订单列表
export const getOrderListByCustomer = ({
  customerId,
  pageNum,
  pageSize
}) => {
  return http('/order/listByCustomer', {
    customerId,
    pageNum,
    pageSize
  })
}
// 获取客户信息
export const getCustomerInfo = merchantCustomerId => {
  return http('/merchantCustomer/getInfo', {
    merchantCustomerId
  });
}
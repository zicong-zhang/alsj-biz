import http from '~axios';

// 根据订单状态 获取订单列表
export const getOrderListByStatus = ({
  storeId,
  status,
  pageNum
}) => {
  return http('/order/listByStatus', {
    merchantId: storeId,
    orderStatus: status,
    pageNum,
    pageSize: 10,
  })
}
// 获取订单详情信息
export const getOrderDetailInfo = id => {
  return http('/order/getOrderInfo', {
    orderId: id
  })
}

// 提交修改客户信息
export const updateCustomerInfo = params => {
  /* let {
     
  } = params; */
  return http('/order/getOrderInfo', {
    orderId: params
  })
}
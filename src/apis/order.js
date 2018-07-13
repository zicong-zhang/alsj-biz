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

export const getOrderDetailInfo = id => {
  return http('/order/getOrderInfo', {
    orderId: id
  })
}
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
// 查询订单操作记录
export const getOrderDetailProgress = params => {
  let {
    orderId,
    type,
    pageNum,
    pageSize
  } = params;
  return http('/orderOperate/list', {
    orderId,
    type, // 查询类型，0-全部记录，1操作记录，2-付款记录，3-转移记录
    pageNum,
    pageSize,
  })
}
// 提交修改客户信息
export const updateCustomerInfo = params => {
  let {
    linkmanAddress,
    linkmanBudget,
    linkmanGender,
    linkmanName,
    linkmanPhone,
    orderId
  } = params;
  return http('/order/customer/update', {
    linkmanAddress,
    linkmanBudget,
    linkmanGender,
    linkmanName,
    linkmanPhone,
    orderId
  })
}
// 提交修改户型信息
export const updateHouseTypeInfo = params => {
  let {
    linkmanHouseType,
    linkmanResidence,
    measurement,
    orderId
  } = params;
  return http('/order/houseType/update', {
    linkmanHouseType,
    linkmanResidence,
    measurement,
    orderId
  })
}
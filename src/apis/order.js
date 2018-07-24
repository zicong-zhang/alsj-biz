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
// 修改设计方案图片
export const updateDesignPic = params => {
  return http('/order/designPlan/update', {
    designsUrl: params.imgs.join(','),
    orderId: params.orderId
  })
}
// 获取空间列表
export const getSpaceList = () => {
  return http('/dimension/listSpace', {
    pageNum: 1,
    pageSize: 0
  })
}
// 根据空间id获取功能列表
export const getFunctionListBySpaceId = spaceId => {
  return http('/dimension/listActionBySpaceId', {
    spaceId,
    pageNum: 1,
    pageSize: 0
  })
}
// 修改定制需求
export const updateDemand = (arr, orderId) => {
  return http('/order/dimension/update', {
    orderId,
    dimensionId: arr
  })
}
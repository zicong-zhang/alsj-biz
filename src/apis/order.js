import http from '~axios';

// 根据订单状态 获取订单列表
export const getOrderListByStatus = ({
  storeId,
  status,
  pageNum,
}) => http('/order/listByStatus', {
  merchantId: storeId,
  orderStatus: status,
  pageNum,
  pageSize: 10,
});
// 获取订单详情信息
export const getOrderDetailInfo = id => http('/order/getOrderInfo', {
  orderId: id,
});
// 查询订单操作记录
export const getOrderDetailProgress = (params) => {
  const {
    orderId,
    type,
    pageNum,
    pageSize,
  } = params;
  return http('/orderOperate/list', {
    orderId,
    type, // 查询类型，0-全部记录，1操作记录，2-付款记录，3-转移记录
    pageNum,
    pageSize,
  });
};
// 提交修改客户信息
export const updateCustomerInfo = (params) => {
  const {
    linkmanAddress,
    linkmanBudget,
    linkmanGender,
    linkmanName,
    linkmanPhone,
    orderId,
  } = params;
  return http('/order/customer/update', {
    linkmanAddress,
    linkmanBudget,
    linkmanGender,
    linkmanName,
    linkmanPhone,
    orderId,
  });
};
// 提交修改户型信息
export const updateHouseTypeInfo = (params) => {
  const {
    linkmanHouseType,
    linkmanResidence,
    measurement,
    orderId,
  } = params;
  return http('/order/houseType/update', {
    linkmanHouseType,
    linkmanResidence,
    measurement,
    orderId,
  });
};
// 修改设计方案图片
export const updateDesignPic = params => http('/order/designPlan/update', {
  designsUrl: params.imgs.join(','),
  orderId: params.orderId,
});
// 获取空间列表
export const getSpaceList = () => http('/dimension/listSpace', {
  pageNum: 1,
  pageSize: 0,
});
// 根据空间id获取功能列表
export const getFunctionListBySpaceId = spaceId => http('/dimension/listActionBySpaceId', {
  spaceId,
  pageNum: 1,
  pageSize: 0,
});
// 修改定制需求
export const updateDemand = (arr, orderId) => http('/order/dimension/update', {
  orderId,
  dimensionId: arr,
});
// 更新订单进度
export const updateOrderDetailStatus = (orderId, orderStatus) => {
  let status = '';
  switch (orderStatus) {
    case 1: // 完成量尺
      status = 'measured';
      break;
    case 2: // 确认设计方案
      status = 'designed';
      break;
    case 3: // 签订合同
      status = 'contracted';
      break;
    case 4: // 完成复尺
      status = 'againMeasured';
      break;
    case 5: // 完成下单
      status = 'released';
      break;
    case 6: // 完成生产
      status = 'produced';
      break;
    case 7: // 完成送货安装
      status = 'Installed';
      break;
    case 8: // 完成结束订单
      status = 'finished';
      break;
  }
  return http(`/order/${status}/update`, {
    orderId,
    orderStatus,
  });
};

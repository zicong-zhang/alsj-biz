const api = {
  // 获取订单列表
  getOrderListByStatus: '/order/listByStatus',
  // 获取订单详情信息
  getOrderDetailInfo: '/order/getOrderInfo',
  // 查询订单操作记录
  getOrderDetailProgress: '/orderOperate/list',
  // 提交修改客户信息
  updateCustomerInfo: '/order/customer/update',
  // 提交修改户型信息
  updateHouseTypeInfo: '/order/houseType/update',
  // 修改设计方案图片
  updateDesignPic: '/order/designPlan/update',
  // 获取空间列表
  getSpaceList: '/dimension/listSpace',
  // 根据空间id获取功能列表
  getFunctionListBySpaceId: '/dimension/listActionBySpaceId',
  // 修改定制需求
  updateDemand: '/order/dimension/update'
}

export default api;

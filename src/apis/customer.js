import http from '~axios';

// 获取客户列表
export const getCustomerList = ({
  merchantId,
  pageNum,
  pageSize,
}) => http('/merchantCustomer/list', {
  merchantId,
  pageNum,
  pageSize,
});
// 获取客户对应的订单列表
export const getOrderListByCustomer = ({
  customerId,
  pageNum,
  pageSize,
}) => http('/order/listByCustomer', {
  customerId,
  pageNum,
  pageSize,
});
// 获取客户信息
export const getCustomerInfo = merchantCustomerId => http('/merchantCustomer/getInfo', {
  merchantCustomerId,
});
// 创建订单
export const createOrder = ({
  customerId,
  linkmanAddress,
  linkmanGender,
  linkmanName,
  linkmanPhone,
  merchantId,
  orderType,
}) => http('/order/create', {
  customerId,
  linkmanAddress,
  linkmanGender,
  linkmanName,
  linkmanPhone,
  merchantId,
  orderType,
});

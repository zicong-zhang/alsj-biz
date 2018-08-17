import http from '~axios';

// 获取客户列表
export const getCustomerList = ({
  merchantId,
  pageNum
}) => {
  return http('/merchantCustomer/list', {
    merchantId,
    pageNum,
    pageSize: 12
  })
}
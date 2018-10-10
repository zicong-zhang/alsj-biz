import http from '~axios';

// 获取员工列表
export const getStaffList = ({
  merchantId,
  pageNum,
  pageSize
}) => http('/merchantStaff/listMerchantStaff', {
  merchantId,
  pageNum,
  pageSize
});

// 根据店员获取订单列表
export const getOrderListForStaff = ({
  merchantId,
  pageNum,
  pageSize,
  staffId
}) => http('/order/listByKeeper', {
  merchantId,
  pageNum,
  pageSize,
  staffId
});

// 获取员工详细信息
export const getStaffDetailInfo = merchantStaffId => http('/merchantStaff/getInfo', {
  merchantStaffId
});

// 根据角色 id 获取权限列表
export const getStaffPermission = ({
  roleId,
  pageNum,
  pageSize
}) => http('/resource/listByRoleId', {
  roleId,
  pageNum,
  pageSize
});

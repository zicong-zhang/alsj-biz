import * as api from '~apis/staff';

const staffStore = {
  state: {

  },
  getters: {

  },
  actions: {
    // 获取员工列表
    getStaffList({
      rootState
    }) {
      return api.getStaffList({
        merchantId: rootState.root.storeId,
        pageNum: 1,
        pageSize: 0
      });
    },
    // 获取店员订单
    getOrderListForStaff({
      rootState
    }, staffId) {
      return api.getOrderListForStaff({
        merchantId: rootState.root.storeId,
        pageNum: 1,
        pageSize: 0,
        staffId
      });
    },
    // 获取员工详细信息
    getStaffDetailInfo(ctx, merchantStaffId) {
      return api.getStaffDetailInfo(merchantStaffId);
    },
    // 根据角色 id 获取权限列表
    getStaffPermission(ctx, roleId) {
      return api.getStaffPermission({
        roleId,
        pageNum: 1,
        pageSize: 0
      });
    }
  },
  mutations: {

  }
};

export default staffStore;

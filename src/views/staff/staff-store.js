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
      })
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
      })
    }
  },
  mutations: {

  }
}

export default staffStore;
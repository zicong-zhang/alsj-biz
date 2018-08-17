import * as api from '~apis/customer';

export default {
  state: {
    pageNum: 1,
    customerList: []
  },
  getters: {

  },
  actions: {
    // 获取客户列表
    getCustomerList({
      rootState,
      state,
      commit
    }) {
      return api.getCustomerList({
        merchantId: rootState.root.storeId,
        pageNum: state.pageNum
      })
        .then(res => {
          commit('UPDATE_CUSTOMER_LIST', res.data);
          return Promise.resolve(res);
        })
    }
  },
  mutations: {
    UPDATE_CUSTOMER_LIST(state, data) {
      state.pageNum++;
      state.customerList = state.customerList.concat(data.list);
    }
  }
}
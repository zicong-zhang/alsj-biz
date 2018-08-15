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
    getCustomerList({rootState, commit}) {
      return api.getCustomerList(rootState.root.storeId)
        .then(res => {
          commit('UPDATE_CUSTOMER_LIST', res.data);
          return Promise.resolve(res);
        })
    }
  },
  mutations: {
    UPDATE_CUSTOMER_LIST(state, data) {
      if (data.next) {
        state.pageNum++;
        state.customerList.concat(list);
      }
    }
  }
}
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
    },
    // 获取客户信息
    getCustomerInfo(ctx, customerId) {
      return api.getCustomerInfo(customerId);
    },
    // 获取客户对应的订单列表
    getOrderListByCustomer(ctx, {customerId, pageNum}) {
      return api.getOrderListByCustomer({
        customerId,
        pageNum,
        pageSize: 15
      })
    }
  },
  mutations: {
    // 更新客户列表 （添加）
    UPDATE_CUSTOMER_LIST(state, data) {
      state.customerList = (state.pageNum === 1 ? [] : state.customerList).concat(data.list);
      state.pageNum++;
      console.log('state.customerList.length:_____', state.customerList.length);
    },
    // 初始化分页的当前页数
    INIT_CUSTOMER_LIST_PAGE_NUM(state, pageNum = 1) {
      state.pageNum = pageNum;
    }
  }
}
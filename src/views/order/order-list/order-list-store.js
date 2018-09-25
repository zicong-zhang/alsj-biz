import * as api from '~apis/order';

export default {
  state: {
    status: 1,
    storeId: 4425,
    orderList: [],
  },
  getters: {

  },
  actions: {
    getListByStatus(ctx, pageNum) {
      if (pageNum === 1) ctx.commit('EMPTY_ORDER_LIST');

      const {
        storeId,
        status,
      } = ctx.state;

      return api.getOrderListByStatus({
        storeId,
        status,
        pageNum,
      }).then((data) => {
        ctx.commit('CONCAT_ORDER_LIST', data.data.list);
        return Promise.resolve(data);
      });
    },
  },
  mutations: {
    CHANGE_STATUS(state, idx) {
      state.status = idx;
    },
    EMPTY_ORDER_LIST(state) {
      state.orderList = [];
    },
    CONCAT_ORDER_LIST(state, newList) {
      state.orderList = newList;
    },
  },
};

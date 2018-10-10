import http from '~axios';
import api from '~apis/order';
import * as types from '../mutation-types';

export default {
  state: {
    status: 1,
    orderList: []
  },
  getters: {

  },
  actions: {
    getListByStatus(ctx, pageNum) {
      if (pageNum === 1) ctx.commit(types.EMPTY_ORDER_LIST);

      const status = ctx.state.status;
      const storeId = ctx.rootState.root.storeId;

      return http(api.getOrderListByStatus, {
        pageNum,
        orderStatus: status,
        merchantId: storeId,
        pageSize: 15
      }).then(data => {
        ctx.commit(types.CONCAT_ORDER_LIST, data.data.list);
        return Promise.resolve(data);
      });
    }
  },
  mutations: {
    // 切换当前订单列表状态
    [types.CHANGE_STATUS](state, idx) {
      state.status = idx;
    },
    // 清空订单列表
    [types.EMPTY_ORDER_LIST](state) {
      state.orderList = [];
    },
    // 拼接订单列表（分页）
    [types.CONCAT_ORDER_LIST](state, newList) {
      state.orderList = newList;
    }
  }
};

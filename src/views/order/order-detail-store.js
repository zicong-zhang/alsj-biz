import * as api from '~apis/order';

export default {
  state: {
    orderId: '',
    info: {}
  },
  getters: {

  },
  actions: {
    getOrderDetailInfo(ctx) {
      api.getOrderDetailInfo(ctx.state.orderId)
        .then(data => {
          ctx.commit('SET_ORDER_DETAIL_INFO', data.data)
        })
    }
  },
  mutations: {
    SET_ORDER_ID(state, id) {
      state.orderId = id;
    },
    // 设置订单信息
    SET_ORDER_DETAIL_INFO(state) {

    }
  }
}
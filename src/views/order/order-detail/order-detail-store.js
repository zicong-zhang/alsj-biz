import * as api from '~apis/order';

export default {
  state: {
    orderId: '',
    orderInfo: {}
  },
  getters: {
    // 定制需求
    demands: state => state.orderInfo.dimensionList,
    // 跟进人
    keepers: state => state.orderInfo.orderKeeperList,
    // 合同图片列表(目前只展示纸质合同)
    contractList: state => {
      let contract = state.orderInfo.paperContract;
      if (contract) {
        return contract.split(',');
      } else {
        return [];
      }
    },
    // 合同图片列表(目前只展示纸质合同)
    designList: state => {
      let designsUrl = state.orderInfo.designsUrl;
      if (designsUrl) {
        return designsUrl.split(',');
      } else {
        return [];
      }
    }
  },
  actions: {
    getOrderDetailInfo(ctx) {
      api.getOrderDetailInfo(ctx.state.orderId)
        .then(data => {
          ctx.commit('SET_ORDER_DETAIL_INFO', data.data.orderExt)
        })
    }
  },
  mutations: {
    SET_ORDER_ID(state, id) {
      state.orderId = id;
    },
    // 设置订单信息
    SET_ORDER_DETAIL_INFO(state, info) {
      state.orderInfo = info;
    }
  }
}
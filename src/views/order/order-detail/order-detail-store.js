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
    // 获取订单详情信息
    getOrderDetailInfo(ctx) {
      api.getOrderDetailInfo(ctx.state.orderId)
        .then(data => {
          ctx.commit('SET_ORDER_DETAIL_INFO', data.data.orderExt)
        })
    },
    // 修改客户信息
    updateCustomerInfo(ctx, params) {
      api.updateCustomerInfo(params)
        .then(data => {
          ctx.UPDATE_CUSTOMER_INFO(params);
        })
    }
  },
  mutations: {
    // 设置订单 id
    SET_ORDER_ID(state, id) {
      state.orderId = id;
    },
    // 设置订单信息
    SET_ORDER_DETAIL_INFO(state, info) {
      state.orderInfo = info;
    },
    // 修改客户信息
    UPDATE_CUSTOMER_INFO(state, params) {

    }
  }
}
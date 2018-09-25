import * as api from '~apis/product';

export default {
  state: {},
  getters: {

  },
  actions: {
    // 获取产品中心的产品列表
    getProductList({
      rootState,
    }, pageNum) {
      return api.getProductList({
        merchantId: rootState.root.storeId,
        pageNum,
      });
    },
    // 删除产品
    delProduct({ rootState }, merchantGoodsId) {
      return api.delProduct({
        merchantId: rootState.root.storeId,
        merchantGoodsId,
      });
    },
  },
  mutations: {

  },
};

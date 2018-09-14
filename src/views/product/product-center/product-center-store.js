import * as api from '~apis/product';

export default {
  state: {},
  getters: {

  },
  actions: {
    getProductList({
      rootState
    }, pageNum) {
      return api.getProductList({
        merchantId: rootState.root.storeId,
        pageNum
      })
    }
  },
  mutations: {

  }
}
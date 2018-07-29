import * as api from '~apis/worker';

export default {
  state: {
    info: {} // 店铺信息
  },
  getters: {
    storeInfo: state => state.info // 店铺信息
  },
  actions: {
    // 获取店铺信息
    getStoreInfo({rootState, commit}) {
      api.getStoreInfo(rootState.root.storeId)
        .then(res => {
          commit('SET_STORE_INFO', res.data.merchantExt);
        })
    }
  },
  mutations: {
    // 设置店铺信息
    SET_STORE_INFO(state, info) {
      state.info = info;
    }
  }
}
import * as api from '~apis/worker';

export default {
  state: {
    info: {}, // 店铺信息
    myStores: [], // 我的所有店铺列表
  },
  getters: {
    storeInfo: state => { // 店铺信息
      return { ...state.info
      }
    },
    myStoreList: state => { // 我的所有店铺列表
      return [...state.myStores]
    } // 店铺列表
  },
  actions: {
    // 获取该账号下的所有店铺
    getSelfStoreList({
      dispatch,
      commit
    }) {
      return api.getSelfStoreList()
        .then(res => {
          const list = res.data.list
          commit('SET_MY_STORE_LIST', list);
          return Promise.resolve(list);
        });
    },
    // 获取店铺信息
    getStoreInfo({
      rootState,
      commit
    }) {
      api.getStoreInfo(rootState.root.storeId)
        .then(res => {
          commit('SET_STORE_INFO', res.data.merchantExt);
        })
    },
    // 获取店铺实收款金额(本月)
    getReceiptAmount({rootState}) {
      return api.getReceiptAmount(rootState.root.storeId)
        .then(res => Promise.resolve(res));
    },
    // 获取店铺待收款金额(全部)
    getDueAmount({rootState}) {
      return api.getDueAmount(rootState.root.storeId)
        .then(res => Promise.resolve(res));
    }
  },
  mutations: {
    // 设置店铺信息
    SET_STORE_INFO(state, info) {
      state.info = info;
    },
    // 设置店铺列表
    SET_MY_STORE_LIST(state, storeList) {
      state.myStores = storeList;
    }
  }
}
import * as api from '~apis/worker';
// todo  更新worker的销售目标
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
      commit
    }) {
      return api.getSelfStoreList()
        .then(res => {
          const list = res.data.list;
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
    getReceiptAmount({
      rootState
    }) {
      return api.getReceiptAmount(rootState.root.storeId)
        .then(res => Promise.resolve(res));
    },
    // 获取店铺待收款金额(全部)
    getDueAmount({
      rootState
    }) {
      return api.getDueAmount(rootState.root.storeId)
        .then(res => Promise.resolve(res));
    },
    // 获取月销售冠军
    getCurrentMonthSaleChampion({
      rootState
    }) {
      return api.getCurrentMonthSaleChampion(rootState.root.storeId)
        .then(res => Promise.resolve(res))
    },
    // 获取店铺目标金额
    getStoreSaleTarget({
      rootState
    }) {
      return api.getStoreSaleTarget(rootState.root.storeId)
        .then(res => Promise.resolve(res));
    },
    // 获取店铺某一年的业绩目标列表
    getOnePerformanceTargetList({
      rootState
    }, goalYear) {
      return api.getOnePerformanceTargetList({
          merchantId: rootState.root.storeId,
          goalYear
        })
        .then(res => Promise.resolve(res));
    },
    // 更新店铺某一年业绩目标列表
    updatePerformTargetList({
      rootState,
      commit
    }, params) {
      return api.updatePerformTargetList(rootState.root.storeId, params)
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
import * as api from '~apis/proceeds';
import * as types from '../mutation-types';

const proceedsDetailStore = {
  state: {
    showModule: 0
  },
  getters: {
    showModule: state => state.showModule
  },
  actions: {
    // 获取实收列表
    getActualIncomeList({ rootState }, {
      month,
      year,
      pageNum,
      pageSize = 10
    }) {
      return api.getActualIncomeList({
        merchantId: rootState.root.storeId,
        month,
        year,
        pageNum,
        pageSize
      })
    },
    // 获取待收列表
    getWaitIncomeList({ rootState }, {
      pageNum,
      pageSize = 10
    }) {
      return api.getWaitIncomeList({
        merchantId: rootState.root.storeId,
        pageNum,
        pageSize
      })
    }
  },
  mutations: {
    // 切换展示 实收 / 待收
    [types.UPDATE_PROCEEDS_SHOW_MODULE](state, idx) {
      state.showModule = +idx;
    }
  }
}

export default proceedsDetailStore;

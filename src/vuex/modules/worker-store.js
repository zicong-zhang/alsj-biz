import http from '~axios';
import api from '~apis/worker';
import * as types from '../mutation-types';

// TODO  更新worker的销售目标
export default {
  state: {
    info: {}, // 店铺信息
    myStores: [], // 我的所有店铺列表
    merchantTradeAmount: 0, // 当前已完成销售目标
    merchantGoalAmount: 0, // 总销售目标金额
    rate: '0%' // 销售金额进度
  },
  getters: {
    storeInfo: state => // 店铺信息
      ({ ...state.info
      }),
    myStoreList: state => // 我的所有店铺列表
      [...state.myStores]
    // 店铺列表
  },
  actions: {
    // 获取该账号下的所有店铺
    getSelfStoreList({
      commit
    }) {
      return http(api.getSelfStoreList)
        .then(res => {
          const list = res.data.list;
          commit(types.SET_MY_STORE_LIST, list);
          return Promise.resolve(list);
        });
    },
    // 获取店铺信息
    getStoreInfo({
      rootState,
      commit
    }) {
      http(api.getStoreInfo, {
        merchantId: rootState.root.storeId
      })
        .then(res => {
          commit(types.SET_STORE_INFO, res.data.merchantExt);
        });
    },
    // 获取店铺实收款金额(本月)
    getReceiptAmount({
      rootState
    }) {
      const current = new Date();

      return http(api.getReceiptAmount, {
        merchantId: rootState.root.storeId,
        month: current.getMonth() + 1,
        year: current.getFullYear(),
        pageNum: 1,
        pageSize: 0
      })
    },
    // 获取店铺待收款金额(全部)
    getDueAmount({
      rootState
    }) {
      return http(api.getDueAmount, {
        merchantId: rootState.root.storeId
      })
    },
    // 获取月销售冠军
    getCurrentMonthSaleChampion({
      rootState
    }) {
      const current = new Date();

      return http(api.getCurrentMonthSaleChampion, {
        merchantId: rootState.root.storeId,
        month: current.getMonth() + 1,
        year: current.getFullYear(),
        pageNum: 1,
        pageSize: 0
      })
        .then(res => Promise.resolve(res));
    },
    // 获取店铺目标金额
    getStoreSaleTarget({
      rootState,
      commit
    }) {
      const current = new Date();

      return http(api.getStoreSaleTarget, {
        merchantId: rootState.root.storeId,
        month: current.getMonth() + 1,
        year: current.getFullYear(),
        pageNum: 1,
        pageSize: 0
      })
        .then(res => {
          commit(types.SET_SALE_TARGET, res.data);
        });
    },
    // 获取店铺某一年的业绩目标列表
    getOnePerformanceTargetList({
      rootState
    }, goalYear) {
      return http(api.getOnePerformanceTargetList, {
        merchantId: rootState.root.storeId,
        goalYear
      })
    },
    // 更新店铺某一年业绩目标列表
    updatePerformTargetList({
      rootState
    }, {
      janAmount,
      fabAmount,
      marAmount,
      aprAmount,
      mayAmount,
      junAmount,
      julAmount,
      augAmount,
      sepAmount,
      octAmount,
      novAmount,
      decAmount,
      year,
      id
    }) {
      return http(api.updatePerformTargetList, {
        merchantId: rootState.root.storeId,
        goalYear: year,
        merchantGoalId: id,
        janAmount: janAmount.length > 3 ? +janAmount.replace(/\D/g, '') : +janAmount,
        fabAmount: fabAmount.length > 3 ? +fabAmount.replace(/\D/g, '') : +fabAmount,
        marAmount: marAmount.length > 3 ? +marAmount.replace(/\D/g, '') : +marAmount,
        aprAmount: aprAmount.length > 3 ? +aprAmount.replace(/\D/g, '') : +aprAmount,
        mayAmount: mayAmount.length > 3 ? +mayAmount.replace(/\D/g, '') : +mayAmount,
        junAmount: junAmount.length > 3 ? +junAmount.replace(/\D/g, '') : +junAmount,
        julAmount: julAmount.length > 3 ? +julAmount.replace(/\D/g, '') : +julAmount,
        augAmount: augAmount.length > 3 ? +augAmount.replace(/\D/g, '') : +augAmount,
        sepAmount: sepAmount.length > 3 ? +sepAmount.replace(/\D/g, '') : +sepAmount,
        octAmount: octAmount.length > 3 ? +octAmount.replace(/\D/g, '') : +octAmount,
        novAmount: novAmount.length > 3 ? +novAmount.replace(/\D/g, '') : +novAmount,
        decAmount: decAmount.length > 3 ? +decAmount.replace(/\D/g, '') : +decAmount
      })
    },
    // 获取店铺总业绩列表
    getPerformanceTotalList({
      rootState
    }, year) {
      return http(api.getPerformanceTotalList, {
        merchantId: rootState.root.storeId,
        year,
        pageNum: 1,
        pageSize: 0
      });
    },
    // 获取业绩排行榜
    getPerformanceRank({
      rootState
    }, {
      year,
      month
    }) {
      return http(api.getPerformanceRank, {
        merchantId: rootState.root.storeId,
        year,
        month,
        pageNum: 1,
        pageSize: 0
      })
    },
    // 获取开单排行榜
    getBillRank({
      rootState
    }, {
      year,
      month
    }) {
      return http(api.getBillRank, {
        merchantId: rootState.root.storeId,
        year,
        month,
        pageNum: 1,
        pageSize: 0
      })
    }
  },
  mutations: {
    // 设置店铺信息
    [types.SET_STORE_INFO](state, info) {
      state.info = info;
    },
    // 设置店铺列表
    [types.SET_MY_STORE_LIST](state, storeList) {
      state.myStores = storeList;
    },
    // 设置销售目标
    [types.SET_SALE_TARGET](state, params) {
      Object.assign(state, params);
    }
  }
};

import api from '~apis/customer';
import http from '~axios';
import * as types from '../mutation-types';

export default {
  state: {
    pageNum: 1,
    customerList: []
  },
  getters: {

  },
  actions: {
    // 获取客户列表
    getCustomerList({
      rootState,
      state,
      commit
    }) {
      return http(api.getCustomerList, {
        merchantId: rootState.root.storeId,
        pageNum: state.pageNum,
        pageSize: 15
      })
        .then(res => {
          commit(types.UPDATE_CUSTOMER_LIST, res.data);
          return Promise.resolve(res)
        });
    },
    // 获取客户信息
    getCustomerInfo(ctx, customerId) {
      return http(api.getCustomerInfo, {
        customerId
      })
    },
    // 获取客户对应的订单列表
    getOrderListByCustomer(ctx, {
      customerId,
      pageNum
    }) {
      return http(api.getOrderListByCustomer, {
        customerId,
        pageNum,
        pageSize: 2
      })
    },
    // 创建订单
    createOrder({
      rootState
    }, {
      customerId,
      linkmanAddress,
      linkmanGender,
      linkmanName,
      linkmanPhone,
      orderType
    }) {
      return http(api.createOrder, {
        customerId,
        linkmanAddress,
        linkmanGender,
        linkmanName,
        linkmanPhone,
        orderType,
        merchantId: rootState.root.storeId
      })
    }
  },
  mutations: {
    // 更新客户列表 （添加）
    [types.UPDATE_CUSTOMER_LIST](state, data) {
      state.customerList = (state.pageNum === 1 ? [] : state.customerList).concat(data.list);
      state.pageNum += 1;
    },
    // 初始化分页的当前页数
    [types.INIT_CUSTOMER_LIST_PAGE_NUM](state, pageNum = 1) {
      state.pageNum = pageNum;
    }
  }
};

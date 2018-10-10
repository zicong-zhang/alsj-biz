import http from '~axios';
import api from '~apis/order';
import * as types from '../mutation-types';

// 订单流程对应名称
const progressList = {
  1: {
    name: '创建订单'
  },
  2: {
    name: '上门量尺'
  },
  3: {
    name: '设计方案'
  },
  4: {
    name: '签订合同'
  },
  5: {
    name: '复尺'
  },
  6: {
    name: '下单'
  },
  7: {
    name: '生产'
  },
  8: {
    name: '送货安装'
  },
  9: {
    name: '订单已完成'
  }
};

export default {
  state: {
    orderId: '', // 订单id
    orderInfo: {}, // 订单详情
    orderProgress: [], // 订单进度
    isShowDemandPicker: false, // 是否展示定制需求选择器
    spaceList: [], // 空间列表
    functionList: [] // 功能列表
  },
  getters: {
    // 订单信息
    orderInfo: (state) => {
      if (JSON.stringify({ ...state.orderInfo
      }) === '{}') {
        const storage = sessionStorage.getItem('ORDER_DETAIL_INFO');
        return (storage ? JSON.parse(storage) : {});
      }
      return state.orderInfo;
    },
    // 订单id
    orderId: state => (state.orderId || sessionStorage.getItem('ORDER_DETAIL_ID')),
    // 订单状态
    orderDetailStatus: state => state.orderInfo.orderStatus,
    // 定制需求
    demands: state => state.orderInfo.dimensionList,
    // 定制需求 - 空间列表
    spaces: state => state.spaceList,
    // 定制需求 - 功能列表
    functions: state => state.functionList,
    // 跟进人
    keepers: state => state.orderInfo.orderKeeperList,
    // 合同图片列表(目前只展示纸质合同)
    contractList: (state) => {
      const contract = state.orderInfo.paperContract;
      if (contract) {
        return contract.split(',');
      }
      return [];
    },
    // 设计方案图片列表
    designList: (state) => {
      const designsUrl = state.orderInfo.designsUrl;
      return (designsUrl ? designsUrl.split(',') : []);
    }
  },
  actions: {
    // 获取订单详情信息
    getOrderDetailInfo(ctx) {
      return http(api.getOrderDetailInfo, {
        orderId: ctx.state.orderId
      })
        .then(res => ctx.commit(types.SET_ORDER_DETAIL_INFO, res.data.orderExt));
    },
    // 获取订单进度
    getOrderDetailProgress(ctx) {
      return http(api.getOrderDetailProgress, {
        pageNum: 1,
        pageSize: 0,
        type: 1, // 查询类型，0-全部记录，1操作记录，2-付款记录，3-转移记录
        orderId: ctx.state.orderId
      })
        .then(res => ctx.commit(types.SET_ORDER_DETAIL_PROGRESS, res.data.list));
    },
    // 修改客户信息
    updateCustomerInfo(ctx, params) {
      const {
        linkmanAddress,
        linkmanBudget,
        linkmanGender,
        linkmanName,
        linkmanPhone,
        orderId
      } = params;

      return http(api.updateCustomerInfo, {
        linkmanAddress,
        linkmanBudget,
        linkmanGender,
        linkmanName,
        linkmanPhone,
        orderId
      })
        .then(res => ctx.commit(types.UPDATE_CUSTOMER_INFO, res.data));
    },
    // 修改户型信息
    updateHouseTypeInfo(ctx, params) {
      const {
        linkmanHouseType,
        linkmanResidence,
        measurement,
        orderId
      } = params;

      return http(api.updateHouseTypeInfo, {
        linkmanHouseType,
        linkmanResidence,
        measurement,
        orderId
      })
        .then(() => ctx.commit(types.UPDATE_HOUSE_TYPE_INFO, params));
    },
    // 修改设计方案图片
    updateDesignPic(ctx, imgArr) {
      return http(api.updateDesignPic, {
        designsUrl: imgArr.join(','),
        orderId: ctx.state.orderId
      })
        .then(() => ctx.commit(types.UPDATE_DESIGN_PIC, imgArr));
    },
    // 获取空间列表
    getSpaceList(ctx) {
      return http(api.getSpaceList, {
        pageNum: 1,
        pageSize: 0
      })
        .then(res => {
          const list = res.data.list;
          ctx.commit(types.SET_SPACE_LIST, list);

          list.forEach((item, idx) => {
            ctx.commit(types.SET_PLACEHOLDER_FUNCTION_LIST, list.length);
            ctx.dispatch('getFunctionList', [item.id, idx]);
          });
        });
    },
    // 通过空间id获取功能列表
    getFunctionList(ctx, [spaceId, idx]) {
      return http(api.getFunctionListBySpaceId, {
        spaceId,
        pageNum: 1,
        pageSize: 0
      })
        .then(res => {
          ctx.commit(types.SET_FUNCTION_LIST, [res.data.list, idx]);
        });
    },
    // 修改定制需求
    updateDemand(ctx, list) {
      return http(api.updateDemand, {
        orderId: ctx.state.orderId,
        dimensionId: list
      }, {
        noRepeat: true
      })
    },
    // 更新订单进度
    updateOrderDetailStatus(ctx) {
      const orderId = ctx.state.orderId;
      const orderDetailStatus = ctx.getters.orderDetailStatus;
      const config = [
        'measured', // 完成量尺
        'designed', // 确认设计方案
        'contracted', // 签订合同
        'againMeasured', // 完成复尺
        'released', // 完成下单
        'produced', // 完成生产
        'Installed', // 完成送货安装
        'finished' // 完成结束订单
      ]
      const url = `/order/${config[orderStatus - 1]}/update`;

      return http(url, {
        orderId,
        orderStatus: orderDetailStatus
      })(orderId, orderDetailStatus)
        .then(() => {
          ctx.dispatch('getOrderDetailProgress');
          ctx.commit(types.UPDATE_ORDER_STATUS);
        });
    }
  },
  mutations: {
    // 设置订单 id
    [types.SET_ORDER_ID](state, id) {
      state.orderId = id;
      sessionStorage.setItem('ORDER_DETAIL_ID', id);
    },
    // 设置订单进度
    [types.SET_ORDER_DETAIL_PROGRESS](state, arr) {
      const newArr = JSON.parse(JSON.stringify(progressList));
      arr.forEach(item => Object.assign(newArr[item.orderStatus], item, {
        finish: true
      }));
      state.orderProgress = newArr;
    },
    // 设置订单信息
    [types.SET_ORDER_DETAIL_INFO](state, info) {
      state.orderInfo = info;
      sessionStorage.setItem('ORDER_DETAIL_INFO', JSON.stringify({ ...info
      }));
    },
    // 修改客户信息
    [types.UPDATE_CUSTOMER_INFO](state, params) {
      Object.assign(state.orderInfo, params.order);
    },
    // 修改户型信息
    [types.UPDATE_HOUSE_TYPE_INFO](state, params) {
      Object.assign(state.orderInfo, params);
    },
    // 修改设计方案图片
    [types.UPDATE_DESIGN_PIC](state, imgArr) {
      state.orderInfo.designsUrl = imgArr.join(',');
    },
    // 设置空间列表
    [types.SET_SPACE_LIST](state, list) {
      state.spaceList = list;
    },
    // 设置默认占位的空间列表，以便通过下标插入对应的空间名
    [types.SET_PLACEHOLDER_FUNCTION_LIST](state, length) {
      const arr = [];
      for (let index = 0; index < length; index++) {
        arr.push([]);
      }
      state.functionList = arr;
    },
    // 设置功能列表
    [types.SET_FUNCTION_LIST](state, [list, idx]) {
      const demands = state.orderInfo.dimensionList;
      const newList = [...list];

      if (demands.length !== 0) {
        newList.forEach(item => {
          demands.forEach(value => {
            // if (item.id == value.id) item.active = true;
          });
        });
      }
      state.functionList.splice(idx, 1, list);
    },
    // 修改定制需求展示列表
    [types.UPDATE_DEMAND](state, list) {
      state.orderInfo.dimensionList = list;
    },
    // 更改订单状态
    [types.UPDATE_ORDER_STATUS](state) {
      state.orderInfo.orderStatus++;
    }
  }
};

import * as api from '~apis/order';

// 订单流程对应名称
const progressList = {
  1: {
    name: '创建订单',
  },
  2: {
    name: '上门量尺',
  },
  3: {
    name: '设计方案',
  },
  4: {
    name: '签订合同',
  },
  5: {
    name: '复尺',
  },
  6: {
    name: '下单',
  },
  7: {
    name: '生产',
  },
  8: {
    name: '送货安装',
  },
  9: {
    name: '订单已完成',
  },
};

export default {
  state: {
    orderId: '', // 订单id
    orderInfo: {}, // 订单详情
    orderProgress: [], // 订单进度
    isShowDemandPicker: false, // 是否展示定制需求选择器
    spaceList: [], // 空间列表
    functionList: [], // 功能列表
  },
  getters: {
    // 订单信息
    orderInfo: (state) => {
      if (JSON.stringify({ ...state.orderInfo,
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
    },
  },
  actions: {
    // 获取订单详情信息
    getOrderDetailInfo(ctx) {
      api.getOrderDetailInfo(ctx.state.orderId)
        .then((data) => {
          ctx.commit('SET_ORDER_DETAIL_INFO', data.data.orderExt);
        });
    },
    // 获取订单进度
    getOrderDetailProgress(ctx) {
      api.getOrderDetailProgress({
        pageNum: 1,
        pageSize: 0,
        type: 1,
        orderId: ctx.state.orderId,
      }).then((data) => {
        ctx.commit('SET_ORDER_DETAIL_PROGRESS', data.data.list);
        return Promise.resolve();
      });
    },
    // 修改客户信息
    updateCustomerInfo(ctx, params) {
      api.updateCustomerInfo(params)
        .then((data) => {
          ctx.commit('UPDATE_CUSTOMER_INFO', data.data);
          return Promise.resolve();
        });
    },
    // 修改户型信息
    updateHouseTypeInfo(ctx, params) {
      api.updateHouseTypeInfo(params)
        .then(() => {
          ctx.commit('UPDATE_HOUSE_TYPE_INFO', params);
          return Promise.resolve();
        });
    },
    // 修改设计方案图片
    updateDesignPic(ctx, imgArr) {
      api.updateDesignPic({
        imgs: imgArr,
        orderId: ctx.state.orderId,
      })
        .then(() => ctx.commit('UPDATE_DESIGN_PIC', imgArr));
    },
    // 获取空间列表
    getSpaceList(ctx) {
      api.getSpaceList().then((data) => {
        const list = data.data.list;
        ctx.commit('SET_SPACE_LIST', list);

        list.forEach((item, idx) => {
          ctx.commit('SET_PLACEHOLDER_FUNCTION_LIST', list.length);
          ctx.dispatch('getFunctionList', [item.id, idx]);
        });
      });
    },
    // 通过空间id获取功能列表
    getFunctionList(ctx, [id, idx]) {
      api.getFunctionListBySpaceId(id).then((data) => {
        ctx.commit('SET_FUNCTION_LIST', [data.data.list, idx]);
      });
    },
    // 修改定制需求
    updateDemand(ctx, activeList) {
      const list = activeList.map(item => item.id);
      api.updateDemand(list, ctx.state.orderId)
        .then(() => {
          ctx.commit('UPDATE_DEMAND', JSON.parse(JSON.stringify(activeList)));
          return Promise.resolve();
        });
    },
    // 更新订单进度
    updateOrderDetailStatus(ctx) {
      const { orderId } = ctx.state;
      const { orderDetailStatus } = ctx.getters;
      api.updateOrderDetailStatus(orderId, orderDetailStatus)
        .then(() => {
          ctx.dispatch('getOrderDetailProgress');
          ctx.commit('UPDATE_ORDER_STATUS');
          Promise.resolve();
        }, (err) => {
          Promise.reject(err);
        });
    },
  },
  mutations: {
    // 设置订单 id
    SET_ORDER_ID(state, id) {
      state.orderId = id;
      sessionStorage.setItem('ORDER_DETAIL_ID', id);
    },
    // 设置订单进度
    SET_ORDER_DETAIL_PROGRESS(state, arr) {
      const newArr = JSON.parse(JSON.stringify(progressList));
      arr.forEach(item => Object.assign(newArr[item.orderStatus], item, {
        finish: true,
      }));
      state.orderProgress = newArr;
    },
    // 设置订单信息
    SET_ORDER_DETAIL_INFO(state, info) {
      state.orderInfo = info;
      sessionStorage.setItem('ORDER_DETAIL_INFO', JSON.stringify({ ...info,
      }));
    },
    // 修改客户信息
    UPDATE_CUSTOMER_INFO(state, params) {
      Object.assign(state.orderInfo, params.order);
    },
    // 修改户型信息
    UPDATE_HOUSE_TYPE_INFO(state, params) {
      Object.assign(state.orderInfo, params);
    },
    // 修改设计方案图片
    UPDATE_DESIGN_PIC(state, imgArr) {
      state.orderInfo.designsUrl = imgArr.join(',');
    },
    // 设置空间列表
    SET_SPACE_LIST(state, list) {
      state.spaceList = list;
    },
    // 设置默认占位的空间列表，以便通过下标插入对应的空间名
    SET_PLACEHOLDER_FUNCTION_LIST(state, length) {
      const arr = [];
      for (let index = 0; index < length; index++) {
        arr.push([]);
      }
      state.functionList = arr;
    },
    // 设置功能列表
    SET_FUNCTION_LIST(state, [list, idx]) {
      const demands = state.orderInfo.dimensionList;
      const newList = [...list];

      if (demands.length !== 0) {
        newList.forEach((item) => {
          demands.forEach((value) => {
            // if (item.id == value.id) item.active = true;
          });
        });
      }
      state.functionList.splice(idx, 1, list);
    },
    // 修改定制需求展示列表
    UPDATE_DEMAND(state, list) {
      state.orderInfo.dimensionList = list;
    },
    // 更改订单状态
    UPDATE_ORDER_STATUS(state) {
      state.orderInfo.orderStatus++;
    },
  },
};

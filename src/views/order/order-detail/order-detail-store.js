import * as api from '~apis/order';

// 订单流程对应名称
const progressList = {
  1: {
    name: "创建订单"
  },
  2: {
    name: "上门量尺"
  },
  3: {
    name: "设计方案"
  },
  4: {
    name: "签订合同"
  },
  5: {
    name: "复尺"
  },
  6: {
    name: "下单"
  },
  7: {
    name: "生产"
  },
  8: {
    name: "送货安装"
  },
  9: {
    name: "订单已完成"
  }
}

export default {
  state: {
    orderId: '', // 订单id
    orderInfo: {}, // 订单详情
    orderProgress: [], // 订单进度
    isShowDemandPicker: false // 是否展示定制需求选择器
  },
  getters: {
    // 订单信息
    orderInfo: state => {
      if (JSON.stringify({ ...state.orderInfo
        }) === '{}') {
        let storage = sessionStorage.getItem('ORDER_DETAIL_INFO');
        return (storage ? JSON.parse(storage) : {});
      } else {
        return state.orderInfo;
      }
    },
    // 订单id
    orderId: state => (state.orderId || sessionStorage.getItem('ORDER_DETAIL_ID')),
    // 订单状态
    orderDetailStatus: state => {
      return state.orderInfo.orderStatus;
    },
    // 定制需求
    demands: state => state.orderInfo.dimensionList,
    // 跟进人
    keepers: state => state.orderInfo.orderKeeperList,
    // 合同图片列表(目前只展示纸质合同)
    contractList: state => {
      let contract = state.orderInfo.paperContract;
      if (contract) {
        return contract.split(',');
      } else {
        return [];
      }
    },
    // 合同图片列表(目前只展示纸质合同)
    designList: state => {
      let designsUrl = state.orderInfo.designsUrl;
      if (designsUrl) {
        /* return designsUrl.split(',').map(item => {
          let obj = {
            path: item
          }
          return obj
        }) */
        return designsUrl.split(',');
      } else {
        return [];
      }
    }
  },
  actions: {
    // 获取订单详情信息
    getOrderDetailInfo(ctx) {
      api.getOrderDetailInfo(ctx.state.orderId)
        .then(data => {
          ctx.commit('SET_ORDER_DETAIL_INFO', data.data.orderExt);
        })
    },
    // 获取订单进度
    getOrderDetailProgress(ctx) {
      api.getOrderDetailProgress({
        pageNum: 1,
        pageSize: 0,
        type: 1,
        orderId: ctx.state.orderId
      }).then(data => {
        ctx.commit('SET_ORDER_DETAIL_PROGRESS', data.data.list);
        return Promise.resolve();
      })
    },
    // 修改客户信息
    updateCustomerInfo(ctx, params) {
      api.updateCustomerInfo(params)
        .then(data => {
          ctx.commit('UPDATE_CUSTOMER_INFO', data.data);
          return Promise.resolve();
        })
    },
    // 修改户型信息
    updateHouseTypeInfo(ctx, params) {
      api.updateHouseTypeInfo(params)
        .then(data => {
          ctx.commit('UPDATE_HOUSE_TYPE_INFO', params);
          return Promise.resolve();
        })
    },
    // 修改设计方案图片
    updateDesignPic(ctx, imgArr) {
      api.updateDesignPic({
          imgs: imgArr,
          orderId: ctx.state.orderId
        })
        .then(data => {
          ctx.commit('UPDATE_DESIGN_PIC', imgArr);
        })
    }
  },
  mutations: {
    // 设置订单 id
    SET_ORDER_ID(state, id) {
      state.orderId = id;
      sessionStorage.setItem('ORDER_DETAIL_ID', id);
    },
    // 设置订单进度
    SET_ORDER_DETAIL_PROGRESS(state, arr) {
      let newArr = JSON.parse(JSON.stringify(progressList));
      arr.forEach(item => Object.assign(newArr[item.orderStatus], item, {
        finish: true
      }));
      state.orderProgress = newArr;
    },
    // 设置订单信息
    SET_ORDER_DETAIL_INFO(state, info) {
      state.orderInfo = info;
      sessionStorage.setItem('ORDER_DETAIL_INFO', JSON.stringify({ ...info
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
    // 展示定制需求选择器
    SHOW_DEMAND_PICKER(state) {
      state.isShowDemandPicker = !state.isShowDemandPicker;
    },
    // 修改设计方案图片
    UPDATE_DESIGN_PIC(state, imgArr) {
      console.log('imgArr:_____', imgArr);
      /* let arr = state.orderInfo.designsUrl.split(',');
      arr.push(path); */
      state.orderInfo.designsUrl = imgArr.join(',');
    }
  }
}
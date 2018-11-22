import http from '~axios';
import api from '~apis/common';
import * as types from '../mutation-types';

export default {
  state: {
    turn: '', // '' on off
    storeId: false,
    qiNiuToken: '' // 七牛 token
  },
  getters: {

  },
  actions: {
    // 获取 七牛 token
    getQiNiuToken({ commit }) {
      return http(api.getQiNiuToken, {})
        .then(res => {
          const token = res.data.token;
          commit(types.SET_QI_NIU_TOKEN, token);
          return Promise.resolve(token);
        })
    }
  },
  mutations: {
    // 转场动画
    [types.TURN](state, status) {
      state.turn = status;
    },
    // 设置店铺 id
    [types.SET_STORE_ID](state, id) {
      state.storeId = id;
      window.sessionStorage.setItem('STORE_ID', id);
    },
    // 设置七牛 token
    [types.SET_QI_NIU_TOKEN](state, token) {
      state.qiNiuToken = token;
    }
  }
};

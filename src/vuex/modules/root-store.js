import * as types from '../mutation-types';

export default {
  state: {
    turn: '', // '' on off
    storeId: false
  },
  getters: {

  },
  actions: {

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
    }
  }
};

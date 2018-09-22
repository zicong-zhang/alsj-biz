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
    TURN(state, status) {
      state.turn = status;
    },
    SET_STORE_ID(state, id) {
      state.storeId = id;
      window.sessionStorage.setItem('STORE_ID', id);
    }
  }
}
export default {
  state: {
    turn: '',
    storeId: 4425
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
    }
  }
}
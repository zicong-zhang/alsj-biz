import http from '~axios';
import utils from '~tools/utils';
import api from '~apis/login';

export default {
  actions: {
    // 登录
    login({
      commit
    }, {
      captcha,
      phone,
      origin = 13
    }) {
      return http(api.login, {
        captcha,
        phone,
        origin
      })
        .then(res => {
          commit('saveUserToken', res.data.user)
        })
    }
  },
  mutations: {
    saveUserToken(state, info) {
      utils.setUserInfo(info)
    }
  }
};

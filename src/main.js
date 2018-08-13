/**
 * TODO
 * 抽取 mutations type
 * 图片上传改用七牛
 * 组件库改用 vant，后期有时间再修改以前使用cube组件的地方
 * webpack 配置 dll 打包
 * 配置用户权限表
 */

import 'babel-polyfill'
import 'lib-flexible/flexible'
// 第三方库
import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import AlloyFinger from 'alloyfinger'
import AlloyFingerPlugin from 'alloyfinger/vue/alloy_finger.vue'
import FastClick from 'fastclick'

import './tools/function';


// 工具类
import router from './router';
import './directives/directives';
import utils from './tools/utils';
import http from './axios';
import store from './vuex/store';

// 全局组件
import App from './App';
import '~components';

// 全局样式
import './sass/base.scss';
import './sass/common.scss';
import './sass/transition.scss';
import './assets/font/iconfont.css';

Vue.config.devtools = process.env.NODE_ENV === 'development';

Vue.config.productionTip = false;

Vue.use(VueLazyload);
Vue.use(AlloyFingerPlugin, {
  AlloyFinger
})


Vue.prototype.$utils = utils;
Vue.prototype.$http = http;

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}

// import Vconsole from 'vconsole';
// if (process.env.NODE_ENV !== 'production') {
//   new Vconsole()
// }


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

Vue.prototype.$rem = (fz) => {
  return `${fz / 75}rem`;
}
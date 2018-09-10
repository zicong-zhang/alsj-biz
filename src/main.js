/**
 * TODO
 * 清除缓存时要把app.vue的缓存组件数组清空？
 * 判断当前运行环境，动态引入mui，减少不必要的加载时间
 * 引入模块化mui
 * 加入plus
 * 修改通用返回事件监听mui
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
// import { VuetronVue } from 'vuetron';
mui.init();

// 工具类
import router from './router';
import './directives/directives';
import './filters/filters';
import './tools/tools';
import store from './vuex/store';

// 全局组件
import App from './App';
import '~components';

// 全局样式
import './sass/base.scss';
import './sass/common.scss';
import './sass/transition.scss';
import './assets/font/iconfont.css';

// (function() {
//   var script = document.createElement('script');
//   script.src = "//cdn.jsdelivr.net/npm/eruda";
//   document.body.appendChild(script);
//   script.onload = function() {
//     eruda.init()
//   }
// })()

Vue.config.devtools = process.env.NODE_ENV === 'development';

Vue.config.productionTip = false;

// Vue.use(VuetronVue);
Vue.use(VueLazyload);
Vue.use(AlloyFingerPlugin, {
  AlloyFinger
})

/* Vue.prototype.$plus = fn => {
  if (window.plus) {
    fn();
  } else {
    document.addEventListener("plusready", fn, false);
  }
} */
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}

// import VConsole from 'vconsole';
// if (process.env.NODE_ENV !== 'production') {
//   let vc = new VConsole();
// }


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
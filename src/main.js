/** TODO
 * 清除缓存时要把app.vue的缓存组件数组清空？
 * 动态处理路由组件的失活
 * 判断当前运行环境，动态引入mui，减少不必要的加载时间
 * 图片上传改用七牛
 * 配置用户权限表
 */

// import 'babel-polyfill';
import 'lib-flexible/flexible';
// 第三方库
import Vue from 'vue';
import AlloyFinger from 'alloyfinger';
import AlloyFingerPlugin from 'alloyfinger/vue/alloy_finger.vue';
// import Swiper from 'swiper'
import FastClick from 'fastclick';

// 工具类
import router from './router';
import './directives';
import './filters';
import './tools/tools';
import store from './vuex';

// 全局组件
import App from './App';
import '~components';

// 全局样式
import './sass/base.scss';
import './sass/common.scss';
import './sass/transition.scss';
// import { VuetronVue } from 'vuetron';
window.mui.init();

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
Vue.use(AlloyFingerPlugin, {
  AlloyFinger
});

/* Vue.prototype.$plus = fn => {
  if (window.plus) {
    fn();
  } else {
    document.addEventListener("plusready", fn, false);
  }
} */
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', () => {
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
});

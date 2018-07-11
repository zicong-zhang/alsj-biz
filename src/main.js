// 第三方库
import Vue from 'vue'
import Vuex from 'vuex'
import VueLazyload from 'vue-lazyload'
import AlloyFinger from 'alloyfinger'
import AlloyFingerPlugin from 'alloyfinger/vue/alloy_finger.vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import FastClick from 'fastclick'

// 工具类
import router from './router';
import directives from './directives/directives';
import utils from './tools/utils';
import http from './axios';
import vx from './vuex/store';

// 全局组件
import App from './App';
import '~components';

// 全局样式
import './sass/base.scss';
import '~assets/font/iconfont.css';

Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.use(Vuex);
Vue.use(VueLazyload);
Vue.use(VueAwesomeSwiper);
Vue.use(AlloyFingerPlugin, {
  AlloyFinger
})

Vue.prototype.$utils = utils;
Vue.prototype.$http = http;

FastClick.attach(document.body);


let store = new Vuex.Store(vx);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})



const docWidth = document.documentElement.clientWidth > 700 ? 700 : document.documentElement.clientWidth;
const wd = docWidth * window.devicePixelRatio / 10;
document.querySelector("html").style.fontSize = `${wd}px`;
const scale = (1 / window.devicePixelRatio);
document.querySelector("#vp").content = `initial-scale=${scale}, maximum-scale=${scale}, minimum-scale=${scale}, user-scalable=no, width=device-width`;

Vue.prototype.$rem = (fz) => {
  return `${fz / 75 * window.devicePixelRatio}rem`;
}
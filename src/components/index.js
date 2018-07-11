import Vue from 'vue';

import VHeader from '~components/VHeader';
import VPageBottom from '~components/VPageBottom';
import VDownload from '~components/VDownload';
import VToast from '~components/VToast';

Vue.component('VHeader', VHeader);
Vue.component('VPageBottom', VPageBottom);
Vue.component('VDownload', VDownload);

let ToastConstructor = Vue.extend(VToast);
Vue.prototype.$toast = function(txt, timeout = 2300) {
  return new Promise(resolve => {
    let toastDom = new ToastConstructor({
      el: document.createElement('div')
    })

    document.querySelector('#app').appendChild(toastDom.$el);
    toastDom.text = txt;

    // 显示文本
    let timer = null;
    timer = setTimeout(() => {
      toastDom.showText = true;
      clearTimeout(timer);
      timer = null;
    }, 50)

    toastDom.timer = setTimeout(() => {
      clearTimeout(toastDom.showText);
      toastDom.showText = false;
    }, timeout)

    // 隐藏容器
    toastDom.showToast = setTimeout(() => {
      clearTimeout(toastDom.showToast);
      toastDom.showToast = false;
      resolve();
    }, timeout + 200)
  })
}
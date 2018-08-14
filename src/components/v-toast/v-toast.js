import Vue from 'vue';
import VToast from './v-toast';


let VToastConstructor = Vue.extend(VToast);
const $Toast = (txt, timeout = 1500) => {
  return new Promise(resolve => {
    let toastDom = new VToastConstructor({
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
export default $Toast;
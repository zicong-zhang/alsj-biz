import Vue from 'vue';
import VToast from './v-toast.vue';


let VToastConstructor = Vue.extend(VToast);
console.log('VToast:_____', VToast);

const $Toast = (txt, timeout = 1500) => {
  return new Promise(resolve => {
    let toastDom = new VToastConstructor({
      el: document.createElement('div')
    })

    document.body.appendChild(toastDom.$el);
    toastDom.text = txt;
    console.log('111:_____', VToastConstructor);

    // 显示文本
    let timer = null;
    timer = setTimeout(() => {
      toastDom.showText = true;
      clearTimeout(timer);
      timer = null;
      console.log('222:_____', 222);
    }, 50)

    toastDom.timer = setTimeout(() => {
      clearTimeout(toastDom.showText);
      toastDom.showText = false;
      console.log('333:_____', 333);
    }, timeout)

    // 隐藏容器
    toastDom.showToast = setTimeout(() => {
      clearTimeout(toastDom.showToast);
      toastDom.showToast = false;
      resolve();
      console.log('444:_____', toastDom);
    }, timeout + 200)
  })
}
export default $Toast;
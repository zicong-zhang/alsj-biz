import Vue from 'vue';
import VToast from './v-toast.vue';


let VToastConstructor = Vue.extend(VToast);

const $Toast = (txt, timeout = 1500) => {
  return new Promise(resolve => {
    
    let instance = new VToastConstructor().$mount(document.createElement('div'));

    document.body.appendChild(instance.$el);

    instance.timeout = timeout;
    instance.resolve = resolve; // 传入resolve
    // 显示文本
    instance.$nextTick(() => instance.onShowText(txt));
  })
}
export default $Toast;
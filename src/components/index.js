import Vue from 'vue';

import VHeader from '~components/v-header';
import VFooter from '~components/v-footer';
import VPopup from '~components/v-popup';
import VInfoList from '~components/v-info-list';
import VToast from '~components/v-toast';
import VInput from '~components/v-input';
import VPicker from '~components/v-picker';
import VForm from '~components/v-form';
import VUpload from '~components/v-upload';
import VDialog from '~components/v-dialog';
import VCover from '~components/v-cover';
import VDatePicker from '~components/v-date-picker';
import VFormLabel from '~components/v-form-label';


Vue.component('VHeader', VHeader);
Vue.component('VFooter', VFooter);
Vue.component('VPopup', VPopup);
Vue.component('VInfoList', VInfoList);
Vue.component('VForm', VForm);
Vue.component('VInput', VInput);
Vue.component('VPicker', VPicker);
Vue.component('VUpload', VUpload);
Vue.component('VDialog', VDialog);
Vue.component('VCover', VCover);
Vue.component('VDatePicker', VDatePicker);
Vue.component('VFormLabel', VFormLabel);

let ToastConstructor = Vue.extend(VToast);
Vue.prototype.$toast = function(txt, timeout = 1500) {
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
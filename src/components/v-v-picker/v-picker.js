import Vue from 'vue';
import VPicker from './v-v-picker';

const VPickerConstructor = Vue.extend(VPicker);

const $Picker = (opt = {
  showToolBar: false,
  dataList: []
}) => {
  let instance = new VPickerConstructor().$mount(document.createElement('div'));

  Object.assign(instance, opt);
  document.body.appendChild(instance.$el);

  instance.isShow = true;
  instance.isShowContainer = true;
}

export default $Picker;
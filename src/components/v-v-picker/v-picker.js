import Vue from 'vue';
import VPicker from './v-v-picker';

const VPickerConstructor = Vue.extend(VPicker);

const $Picker = (opt = {
  key: 'text',
  title: '',
  list: [],
}) => {
  const instance = new VPickerConstructor().$mount(document.createElement('div'));

  Object.assign(instance, opt);
  instance.onConfirm = opt.onConfirm;
  instance.onCancel = opt.onCancel;
  document.body.appendChild(instance.$el);

  instance.isShow = true;
  instance.isShowContainer = true;
};

export default $Picker;

import Vue from 'vue';
import VPicker from './v-v-picker';

const VPickerConstructor = Vue.extend(VPicker);

const $Picker = (opt = {
  key: 'text',
  title: '',
  list: []
}) => {
  const instance = new VPickerConstructor();

  Object.assign(instance, opt);
  console.log('opt:_____', opt);
  instance.onConfirm = opt.onConfirm;
  instance.onCancel = opt.onCancel;

  instance.$mount(document.createElement('div'));
  document.body.appendChild(instance.$el);

  instance.isShow = true;
  instance.isShowContainer = true;
};

export default $Picker;

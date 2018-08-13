import Vue from 'vue';
import VPicker from '~components/v-v-picker';

const VPickerConstructor = Vue.extend(VPicker);

VPickerConstructor.prototype.close = function() {
  // this.visible = false;
  this.$el.addEventListener('transitionend', this.isShow = false);
};

const $Picker = (opt = {
  showToolBar: false,
  dataList: []
}) => {
  let instance = new VPickerConstructor().$mount(document.createElement('div'));

  Object.assign(instance, opt);
  document.body.appendChild(instance.$el);

  instance.isShow = true;
}

export default $Picker;
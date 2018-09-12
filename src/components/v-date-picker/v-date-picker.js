import Vue from 'vue';
import VDatePicker from './v-date-picker.vue';

const VDatePickerConstructor = Vue.extend(VDatePicker);

const $DatePicker = (opt = {}) => {
  let instance = new VDatePickerConstructor();

  Object.assign(instance, opt);
  
  const min = new Date('2017/01/01');
  const max = new Date();
  max.setFullYear(max.getFullYear() + 15);

  instance.minDate = opt.minDate || min; // 默认最小是当前
  instance.maxDate = opt.maxDate || max; // 默认最大展示15年

  instance.$mount(document.createElement('div'));
  
  document.body.appendChild(instance.$el);   
  
  instance.isShow = true;
  instance.isShowContainer = true;
  
}

export default $DatePicker;
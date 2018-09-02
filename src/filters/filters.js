import Vue from 'vue';

// 手机号插入空格
Vue.filter('phone', value => {
  if (!value) return '';
  return value.replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3');
})

// 格式化金钱
Vue.filter('money', (value, fixed) => {
  if (!value) return 0;
  let float = '';
  if (fixed) float = value.toFixed(fixed).match(/\.(\d+)/g)[0]; // 截取包括小数点在内的浮点数
  
  let intNum = value.toString().split('.')[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); // 截取小数点之前的整数
  return intNum + float;
})

// 格式化日期
Vue.filter('date', value => {
  if (!value) return '';
  return value.replace(/\-/g, '.');
})
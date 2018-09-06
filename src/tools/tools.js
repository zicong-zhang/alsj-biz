import Vue from 'vue';
import utils from './utils';
import http from '../axios';

Vue.prototype.$utils = utils;

Vue.prototype.$http = http;

Vue.prototype.$rem = fz => {
  return `${fz / 75}rem`;
}
import Axios from 'axios'
import * as utils from './utils';

Axios.defaults.headers.post['Content-Type'] = 'application/json';
Axios.defaults.timeout =  6000;

// 请求拦截
Axios.interceptors.request.use(function (config) {
  
  config.url = utils.filterUrl(config.url);
  config.data = utils.formatRequestData(config.data);
  
  return config;
}, function (error) {
  console.log('error1:_____', error);
  // Do something with request error
  return Promise.reject(error);
});

// 响应拦截
Axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response.data;
}, function (error) {
  // Do something with response error
  console.log('error2:_____', error);
  return Promise.reject(error);
});

export default Axios;
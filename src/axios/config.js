import Axios from 'axios';
import * as utils from './utils';

Axios.defaults.headers.post['Content-Type'] = 'application/json';
Axios.defaults.timeout = 15000;

// 请求拦截
Axios.interceptors.request.use((config) => {
  const newConfig = { ...config };
  const path = newConfig.url;
  newConfig.url = utils.filterUrl(path);
  newConfig.data = utils.setRequestData(config.data, path);
  return newConfig;
}, (error) => {
  console.log('axiosError:_____', error);
  // Do something with request error
  return Promise.reject(error);
});

// 响应拦截
Axios.interceptors.response.use(response =>
  // Do something with response data
  response.data
  , (error) => {
  // Do something with response error
  console.log('error2:_____', error);
  return Promise.reject(error);
});

export default Axios;

import Axios from 'axios';
import * as utils from './utils';

Axios.defaults.headers.post['Content-Type'] = 'application/json';
Axios.defaults.timeout = 15000;

const ajaxQueue = {};

// 请求拦截
Axios.interceptors.request.use(req => {
  const newConfig = { ...req };
  const path = newConfig.url;

  if (req.opt.noRepeat) {
    if (ajaxQueue[path]) {
      return Promise.reject({
        msg: '正在请求数据，请勿重复提交'
      });
    }

    ajaxQueue[path] = true;
  }

  newConfig.url = utils.filterUrl(path);
  newConfig.data = utils.setRequestData(req.data, path);

  return newConfig;
}, error => {
  console.log('axiosError:_____', error);
  return Promise.reject(error);
});

// 响应拦截
Axios.interceptors.response.use(res => {
  const { url, opt } = res.config;

  if (opt.noRepeat) delete ajaxQueue[url];

  return res.data;
}, error => {
  console.log('error2:_____', error);
  return Promise.reject(error);
});

export default Axios;

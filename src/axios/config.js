import Axios from 'axios';
import * as utils from './utils';
import $Toast from '~components/v-toast';

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
  const { data, code, msg } = res.data;

  if (opt.noRepeat) delete ajaxQueue[url];

  // 状态码处理
  if (code === 200) {
    return res.data;
  } else if (code === 100001) {
    $Toast('登录超时，请重新登录')
      .then(() => {
        // utils.clearUserInfo();
      })
  } else if (!opt.catch) {
    $Toast(msg);
    return Promise.reject();
  }
}, error => {
  console.log('error2:_____添加toast', error);
  return Promise.reject(error);
});

export default Axios;

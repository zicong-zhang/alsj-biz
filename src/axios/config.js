import Axios from 'axios';
import * as utils from './utils';
import $Toast from '~components/v-toast';

Axios.defaults.headers.post['Content-Type'] = 'application/json';
Axios.defaults.timeout = 3000;

/**
 * {
 *    url: {
 *      pending: false, // 是否请求中
 *      retry: 0 // 重试次数
 *    }
 * }
 */
const ajaxQueue = {};

// 请求拦截
Axios.interceptors.request.use(req => {
  const newConfig = { ...req };
  const { opt, data, url } = newConfig;

  if (opt.noRepeat) {
    if (ajaxQueue[url] && ajaxQueue[url].pending) {
      return Promise.reject({
        msg: '正在请求数据，请勿重复提交'
      });
    }

    // 队列记录当前请求
    ajaxQueue[url] = {
      pending: true,
      retry: 0
    }
  }

  newConfig.url = utils.filterUrl(url);
  newConfig.data = opt.retry ? data : utils.setRequestData(data, url);

  return newConfig;
}, error => {
  console.log('axiosError:__未处理___', error);
  return Promise.reject(error);
});

// 响应拦截
Axios.interceptors.response.use(res => {
  const { url, opt } = res.config;
  const { code, msg } = res.data;

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
}, ({
  message,
  config: {
    url,
    timeout,
    opt
  }
}) => {
  const errorTypes = {
    // 断网
    'Network Error': {
      handle() {}
    },
    // 超时
    [`timeout of ${timeout}ms exceeded`]: {
      handle() {}
    }
  }

  if (
    // 存在已定义的错误类型
    Object.prototype.hasOwnProperty.call(errorTypes, message) &&
    // 请求开启了重试选项
    opt.retry &&
    ajaxQueue[url] &&
    // 当前已重试次数未超过选项的重试次数
    ajaxQueue[url].retry < opt.retryCount
  ) {
    ajaxQueue[url].retry++;
    return Axios(Object.assign(config, {
      opt: {
        retrying: true // 改为“重试中”，用于防止 axios 的 transformRequest 将已经转为 json 字符串的 config 再次转换成 json 字符串
      }
    }));
  }

  if (!opt.catch) $Toast('网络异常，请稍后重试');

  return Promise.reject();
});

export default Axios;

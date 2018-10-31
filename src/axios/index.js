// import Axios from 'axios';
import Axios from './config';

const http = (url, data = {}, opt = {
  retry: true, // 失败后重试
  retrying: false, // 是否处于重试中
  retryTotal: 3, // 重试次数
  currentRetry: 0 // 当前已重试次数
}, method = 'post') => {
  const apiUrl = `${process.env.API_ROOT}${url}`;

  return Axios({
    method,
    url: apiUrl,
    data,
    opt,
    transformRequest: [res => {
      // 重试时， 传入的 data 已经转为 json 字符串
      return (opt.retrying ? res : JSON.stringify(res));
    }]
  });
};

export default http;

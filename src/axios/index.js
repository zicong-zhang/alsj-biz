import Axios from 'axios';
import config from './config';

const http = (url, data = {}, opt = {
  retry: true, // 失败后重试
  retrying: false, // 是否处于重试中
  retryCount: 3 // 重试次数
}, method = 'post') => {
  return Axios({
    method,
    url: `/api${url}`,
    data,
    opt,
    transformRequest: [res => {
      return opt.retrying ? res : JSON.stringify(res);
    }]
  });
};

export default http;

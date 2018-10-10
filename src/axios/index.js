import Axios from 'axios';
import config from './config';

const http = (url, data = {}, opt = {}, method = 'post') => {
  return Axios({
    method,
    url: `/api${url}`,
    data,
    opt,
    transformRequest: [res => JSON.stringify(res)]
  });
};

export default http;

import Axios from 'axios';
import config from './config';
import * as API from './apis';

const ajaxArr = {}; // 放于 store


const http = function (url, data = {}, opt = {}) {
  /* if (opt.noRepeat && ajaxArr[url]) return false;

  ajaxArr[url] = true; */


  return Axios({
    method: 'post',
    url: `/api${url}`,
    data,
    transformRequest: [function (data) {
      return JSON.stringify(data);
    }],
  });
};

export default http;

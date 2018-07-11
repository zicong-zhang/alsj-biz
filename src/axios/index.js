import Axios from 'axios'
import config from './config.js'
import * as API from './api.js'

let ajaxArr = {}; // 放于 store


let http = function(url, data = {}, opt = {}) {


  /* if (opt.noRepeat && ajaxArr[url]) return false;

  ajaxArr[url] = true; */

  
  

  return Axios({
    method: 'post',
    url: API[url],
    data: data,
    transformRequest: [function (data) {
      return JSON.stringify(data);
    }]
  })
}

export default http;
import Axios from 'axios'
import config from './config'
import * as API from './apis'

let ajaxArr = {}; // 放于 store


let http = function(url, data = {}, opt = {}) {


  /* if (opt.noRepeat && ajaxArr[url]) return false;

  ajaxArr[url] = true; */




  return Axios({
    method: 'post',
    url: `/api${url}`,
    data: data,
    transformRequest: [function(data) {
      return JSON.stringify(data);
    }]
  })
}

export default http;
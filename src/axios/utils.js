/**
 * TODO
 * 传入 needLogin 处理登录判断
 * 使用vue.toast
 */

import utils from '~/tools/utils';

// 过滤api路径
export const filterUrl = url => {
  let _url = url === 'img' ? '/api/upload' : url;
  if (process.env.NODE_ENV == 'production') {
    return process.env.API_ROOT + _url;
  } else {
    return _url;
  }
}

export const setRequestData = (data, img) => {
  return (img === 'img' ? formatRequestImgData(data) : formatRequestData(data));
}

function formatRequestImgData(data) {
  let fd = new FormData();
  fd.append('files', data);
  fd.append('token', getToken());
  return fd;
}

function formatRequestData(data) {
  let req = {
    client: {
      caller: "web",
      deviceId: null,
      ex: {},
      pf: getPF(),
      ua: getUA(),
      vCode: 0,
      vName: "1.0.0"
    },
    data: { ...data
    },
    encrypt: "string",
    requestId: "string",
    sign: "string"
  }

  req.data.token = getToken();

  return req;
}

// 获取token
function getToken() {
  return 'YWxhc2dhLmFwcC5nYXRld2F5LTExLTE1MzAxNjUxOTIwNjYtMTEtYWJj'
  /* var token = utils.getUserInfo();
  if (token) {
    return JSON.parse(token).token;
  } else {
    return '';
  } */
}

// 判断平台 ios / Android
function getPF() {
  let pf = window.sessionStorage.getItem('PF');
  if (typeof pf !== null) pf;

  const u = navigator.userAgent
  const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
  const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if (isAndroid) {
    pf = 'Android';
  } else if (isIOS) {
    pf = 'iOS'
  } else {
    pf = 'DONT_KNOW';
  }
  window.sessionStorage.setItem('PF', pf);
  return pf;
}

// 客户端标识
// 格式 设备型号|生产厂商|设备id|mac地址
function getUA() {
  // 目前没空找正则
  return '';
}

// 判断 token 是否有效
const isInvalidToken = code => {
  /**
   * 100001	token 无效
   * 100002	token 获取用户id出错
   * 100003	token 获取时间戳出错
   * 100004	token 无能为空
   * 100005	token 超时
   * 100006	token 为空
   * 100007	token 无效的bizToken
   */
  var isUnValid = true;
  switch (code) {
    case 100001:
    case 100002:
    case 100003:
    case 100004:
    case 100005:
    case 100006:
    case 100007:
      isUnValid = true;
      break;
    default:
      isUnValid = false;
      break;
  }

  return isUnValid;
}
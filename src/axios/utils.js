/**
 * TODO
 * 传入 needLogin 处理登录判断
 * 使用vue.toast
 */

import utils from '~/tools/utils';

// 获取token
function getToken() {
  const storeToken = window.sessionStorage.getItem('STORE_TOKEN');
  const userToken = window.localStorage.getItem('USER_TOKEN');
  if (storeToken) {
    return storeToken;
  } else if (userToken) {
    return userToken;
  }
  return '';

  // return (storage ? storage : 'VE9LRU4tMzYyLTE1MzI4NDkwODU0MjAtMzE3LWFiYw__');
}

// 判断平台 ios / Android
function getPF() {
  let pf = window.sessionStorage.getItem('PF');
  if (pf !== null) return pf;

  const u = navigator.userAgent;
  console.log('u:_____', u);
  const isAndroid = /Android/i.test(u); // g
  const isIOS = /(iPhone|mac|Safari)/i.test(u); // ios终端
  if (isAndroid) {
    pf = 'Android';
  } else if (isIOS) {
    pf = 'IOS';
  } else {
    pf = u;
  }
  window.sessionStorage.setItem('PF', pf);
  return pf;
}

// 获取设备信息
function getDeviceInfo() {
  let device = null;
  const pf = getPF();

  if (pf === 'Android') {
    device = navigator.userAgent.match(/(Android.*)\sbuild/i)[1].replace(/(\;\s)/g, '|');
  }

  if (pf === 'ios') {
    const h = screen.height;
    const w = screen.width;

    if (h === 812 && w === 375) {
      device = 'iPhoneX';
    } else if (h === 736 && w === 414) {
      device = 'iPhone6P/iPhone7P/iPhone8P';
    } else if (h === 667 && w === 375) {
      device = 'iPhone6/iPhone7/iPhone8';
    } else if (h === 568 && w === 320) {
      device = 'iPhone5';
    } else {
      device = 'iPhone4';
    }
  }
  return device;
}

// 获取浏览器信息
function getBrowserInfo() {
  const ua = window.navigator.userAgent;
  let browser = null;

  // 判断浏览器
  switch (true) {
    case /dingtalk/i.test(ua): // 必须置于UC前判断
      browser = 'dingding';
      break;
    case /UC/i.test(ua):
      browser = 'ucBrowser';
      break;
    case /baidu/i.test(ua):
      browser = 'baiduBrowser';
      break;
    case /baiduboxapp/i.test(ua):
      browser = 'baiduApp';
      break;
    case /micromessenger/i.test(ua): // 必须置于qq浏览器前判断
      browser = 'wx';
      break;
    case /MQQBrowser/i.test(ua):
      browser = 'QQBrowser';
      break;
    case /miuiBrowser/i.test(ua):
      browser = 'xiaomiBrowser';
      break;
    case /vivoBrowser/i.test(ua):
      browser = 'vivoBrowser';
      break;
    case /oppoBrowser/i.test(ua):
      browser = 'oppoBrowser';
      break;
    case /MZBrowser/i.test(ua):
      browser = 'meizuBrowser';
      break;
    case /huawei/i.test(ua):
      browser = 'huaweiBrowser';
      break;
    case /Chrome/i.test(ua):
      browser = 'Chrome';
      break;
    case /Safari/i.test(ua):
      browser = 'Safari';
      break;
    default:
      browser = ua;
      break;
  }

  return browser;
}

// 客户端标识
// 格式 设备型号|生产厂商|设备id|mac地址
function getUA() {
  const device = getDeviceInfo();
  const browser = getBrowserInfo();
  let ip = null;
  try {
    ip = window.returnCitySN.cip;
  } catch (err) {
    ip = 'NULL';
  }
  return `${browser} | ${device} | NO_DEVICE_ID | ${ip}`;
}

// 上传文件请求体 formData
function formatRequestImgData(data) {
  const fd = new FormData();
  fd.append('files', data);
  fd.append('token', getToken());
  return fd;
}

// 常规请求体
function formatRequestData(data) {
  const req = {
    client: {
      caller: 'web',
      deviceId: null,
      ex: {},
      pf: getPF(),
      ua: getUA(),
      vCode: 0,
      vName: '1.0.0',
    },
    data: { ...data,
    },
    encrypt: 'string',
    requestId: 'string',
    sign: 'string',
  };

  req.data.token = getToken();
  return req;
}

// 判断 token 是否有效
const isInvalidToken = (code) => {
  /**
   * 100001 token 无效
   * 100002 token 获取用户id出错
   * 100003 token 获取时间戳出错
   * 100004 token 无能为空
   * 100005 token 超时
   * 100006 token 为空
   * 100007 token 无效的bizToken
   */
  let isUnValid = true;
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
};

// 过滤api路径
export const filterUrl = (url) => {
  const path = url === '/img' ? '/api/upload' : url;
  if (process.env.NODE_ENV === 'production') {
    return process.env.API_ROOT + path;
  }
  return path;
};

export const setRequestData = (data, img) => {
  if (img === '/img') {
    return formatRequestImgData(data);
  }
  return formatRequestData(data);
};

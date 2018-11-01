import Vuex from '~/vuex';
import Router from '~/router';
import * as mutationTypes from '~vuex/mutation-types';

export default {
  /**
   * 路由跳转
   */
  go(params, replace) {
    Vuex.commit(mutationTypes.TURN, 'on');

    if (replace) {
      Router.replace(params);
    } else {
      Router.push(params);
    }
  },
  /**
   * 路由返回
   */
  back(param, cb) {
    if (cb) return cb();

    Vuex.commit(mutationTypes.TURN, 'off');

    if (document.referrer == window.location.href || !document.referrer) {
      Router.push({
        name: 'worker'
      });
    } else if (param) {
      Router.push(param);
    } else {
      Router.back(-1);
    }
  },
  /**
   * 获取时间
   * @param {String} type 根据不同类型返回不同的数据格式
   * @return {Object} 返回格式化好的对象
   */
  getDate(type = 'current') {
    const current = new Date();
    const dateObj = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };

    if (type === 'current') {
      return dateObj;
    }
  },
  getOrderProgress(idx) {
    const progressList = ['创建订单', '上门量尺', '设计方案', '签订合同', '复尺', '下单', '生产', '送货安装', '订单已完成'];

    if (idx) return progressList[idx];

    return progressList;
  },
  /**
   * 设置session缓存
   */
  setSession(name, data) {
    let params = '';
    switch (typeof data) {
      case 'object':
      case 'array':
        params = JSON.stringify(data);
        break;
      default:
        params = data;
        break;
    }
    window.sessionStorage.setItem(name, params);
  },
  // 附带参数跳转
  openUrl(path, params = {}) {
    let data = '?';

    Object.keys(params).forEach(attr => {
      data += `${attr}=${params[attr]}&`;
    });

    data = encodeURI(data.slice(0, -1));
    window.location.href = path + data;
  },
  /**
   * 数字内插入符号
   * @param {Number | String} number 需要操作的数字
   * @param {String} symbol 插入的符号
   */
  numInsertSymbol(number = 0, symbol = ',') {
    const num = number.toString();
    if (num.length > 3) {
      return num.replace(/(\d)(?=(?:\d{3})+$)/g, `$1${symbol}`);
    }
    return num;
  },
  /**
   * 格式化数字
   */
  formatNum(num, retain) {
    if (!num) {
      return 0;
    } else if (num > 10000) {
      let number = (num * 1) / 10000;
      number = retain ? number.toFixed(retain) : number;
      return `${number}万`;
    }
    return num;
  },
  // 复制数组
  copyArr(arr) {
    if (arr.length === 0) return [];
    const newArr = JSON.parse(JSON.stringify(arr));
    return newArr;
  },
  // 复制对象
  copyObj(obj) {
    return JSON.parse(JSON.stringify(obj));
  },
  /**
   * 限制输入框输入
   */
  limitInput(text = '', type, regExp) {
    const config = {
      number: () => /\D/g,
      password: () => /[^\da-zA-Z]/g,
      cn: () => /[^\u4E00-\u9FA5a-zA-Z\']/g
    }

    if (!type) return text;
    if (regExp) return text.replace(regExp, '');

    return text.replace(config[type], '');
  },
  /**
   * 验证正则
   */
  regExpText(text, type, regEpx) {
    let pass = false;
    switch (type) {
      case 'mobile':
        // pass = API_ENV === _product ? /^((13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])+\d{8})$/.test(text) : true;
        pass = /^((13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])+\d{8})$/.test(text);
        break;
      case 'password':
        pass = /^\w{6,16}$/.test(text);
        break;
      default:
        pass = regEpx ? regEpx.test(text) : false;
        break;
    }
    return pass;
  },
  /**
   * 加密密码
   */
  encryption(password) {
    const key = window.CryptoJS.enc.Utf8.parse('alasgad980f7467f');
    const iv = window.CryptoJS.enc.Utf8.parse('alasgad980f7467f');
    return window.CryptoJS.AES.encrypt(password, key, {
      iv,
      mode: window.CryptoJS.mode.CBC,
      padding: window.CryptoJS.pad.ZeroPadding
    }).toString();
  },
  /**
   * 设置用户信息
   */
  setUserInfo(data) {
    const info = JSON.parse(JSON.stringify(data));
    window.localStorage.setItem('USER_INFO', JSON.stringify(info));
    window.localStorage.setItem('USER_INFO_EXPIRE', Date.now());
  },
  /**
   * 获取用户信息
   */
  getUserInfo() {
    const info = window.localStorage.getItem('USER_INFO');
    return info;
  },
  /**
   * 清除用户信息
   */
  clearUserInfo() {
    window.localStorage.removeItem('USER_INFO');
    window.localStorage.removeItem('USER_TOKEN');
    window.localStorage.removeItem('USER_INFO_EXPIRE');
  },
  /**
   * 登录后的跳转
   */
  loginTo() {
    const from = this.urlToObj().from;
    if (from) {
      window.location.href = (`../../pages/${from}?${window.location.search.slice(1)}`);
    } else {
      window.location.href = '../../../index.html';
    }
  },
  /**
   * 判断登录状态是否过期
   */
  judgeLoginStatusExpire() {
    const expire = window.localStorage.getItem('USER_INFO_EXPIRE');
    const gap = Date.now() - (expire * 1);
    const time = gap / (1000 * 60 * 60 * 24);
    return time > 7;
  },
  /**
   * 跳转去登录页
   */
  goLogin() {
    const {
      pathname,
      search
    } = window.location;
    const path = pathname.replace(/\/.*pages\/(.*html)/, '$1');
    const params = search ? `&${search.slice(1)}` : '';
    window.location.href = `../../pages/login/login.html?from=${path}${params}`;
  },
  /**
   * 判断是否已登录
   * 传入 Vue 实例
   */
  judgeIsLogin(_this) {
    console.log('this:_____', this);
    if (!this.getUserInfo()) {
      _this.$Toast('您尚未登录，请登录后再试', 800)
        .then(() => {
          this.goLogin();
        });
      return false;
    } else if (this.judgeLoginStatusExpire()) {
      _this.$Toast('您的登录状态已过期，请重新登录', 800)
        .then(() => {
          this.goLogin();
        });
    } else {
      return true;
    }
  },
  /**
   * 随机数
   */
  randomNum() {
    const num = parseInt(Math.random() * 10);
    return num;
  },
  /**
   * 防键盘阻挡表单元素
   */
  preventKeyboard() {
    window.addEventListener('resize', () => {
      if (
        document.activeElement.tagName === 'INPUT' ||
        document.activeElement.tagName === 'TEXTAREA'
      ) {
        window.setTimeout(() => {
          if ('scrollIntoView' in document.activeElement) {
            document.activeElement.scrollIntoView(false);
          } else {
            document.activeElement.scrollIntoViewIfNeeded();
          }
        }, 0);
      }
    });
  },
  /**
   * 获取定位
   */
  locationStorageMap() {
    const mapDom = document.createElement('div');
    mapDom.style.display = 'none';
    mapDom.id = 'allmap';
    document.querySelector('body').append(mapDom);
    // 百度地图API功能
    const map = new BMap.Map('allmap');
    const point = new BMap.Point(116.331398, 39.897445);
    map.centerAndZoom(point, 12);

    const geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition((r) => {
      if (this.getStatus() === window.BMAP_STATUS_SUCCESS) {
        const mk = new BMap.Marker(r.point);
        map.addOverlay(mk);
        map.panTo(r.point);
        window.localStorage.setItem('GET_CURRENT_LOCATION', JSON.stringify(r));
      } else {
        this.locationStorageMap();
      }
    }, {
      enableHighAccuracy: true
    });
  },
  /**
   * 获取默认定位 （珠江新城）
   */
  getDefaultPosition() {
    return {
      lat: 23.1194300000,
      lng: 113.3212200000
    };
  },
  /**
   * 手动创建loading
   * el: DOM
   */
  createLoading(el) {
    setTimeout(() => {
      const params = {
        renderer: 'svg',
        loop: true,
        autoplay: true,
        container: el,
        animationData: LOADING_CONFIG
      };
      lottie.loadAnimation(params);
    }, 200);
  },
  /**
   * 格式化时间
   */
  formatDate(dateNum) {
    const date = new Date(dateNum);
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let seconds = date.getSeconds();

    if (month <= 9) month = `0${month}`;
    if (day <= 9) day = `0${day}`;
    if (hour <= 9) hour = `0${hour}`;
    if (minute <= 9) minute = `0${minute}`;
    if (seconds <= 9) seconds = `0${seconds}`;

    const time = `${date.getFullYear()}-${month}-${day} ${hour}:${minute}:${seconds}`;
    return time;
  },
  /**
   * 格式化时间 - 多久之前
   * 一小时内，显示为xx分钟前
   * 小于24小时，显示为xx小时前
   * 间隔超过24小时，显示：昨天xx：xx
   * 间隔超过48小时，显示：xx月xx日 xx：xx
   * 间隔超过一年，显示：xxxx年xx月xx日 xx：xx
   */
  howLongBefore(str, now) {
    let newStr = str;
    if (typeof newStr === 'number') {
      window.date = newStr;
      newStr = this.formatDate(newStr);
    } else {
      window.date = Date.parse(newStr.replace(/\-/g, '/'));
    }

    const oneMinute = 1000 * 60;
    const oneHour = oneMinute * 60;
    const oneDay = oneHour * 24;
    const oneMonth = oneDay * 30;
    const oneYear = oneMonth * 12;

    const gap = now - window.date;

    const minute = gap / oneMinute;
    const hour = gap / oneHour;
    const year = gap / oneYear;

    let res = null;

    switch (true) {
      case year >= 1:
        res = this.formatHowLongBefore(newStr, '$1年$2月$3日$4');
        break;
      case hour >= 48 && year < 1:
        res = this.formatHowLongBefore(newStr, '$2月$3日$4');
        break;
      case hour >= 24 && hour < 48:
        res = this.formatHowLongBefore(newStr, '昨天$4');
        break;
      case hour >= 1 && hour < 24:
        res = `${parseInt(hour)}小时前`;
        break;
      case hour <= 1 && minute > 1:
        res = `${parseInt(minute)}分钟前`;
        break;
      case minute <= 1:
        res = '刚刚';
        break;
      default:
        res = newStr;
        break;
    }

    return res;
  },
  /**
   * 格式化 多长时间前的 正则分割时间
   */
  formatHowLongBefore(str, text) {
    let res = null;
    res = str.toString().replace(/(\d{4})\-(\d{2})\-(\d{2})(.{6})(.*)/, text);
    return res;
  },
  /**
   * 跳转下载app
   */
  downloadApp(system) {
    const ua = navigator.userAgent.toLowerCase();
    let url = null;
    if (/iphone|ipad|ipod/.test(ua)) {
      url = system === 'seller' ?
        'https://itunes.apple.com/us/app/%E9%98%BF%E6%8B%89%E7%A7%81%E5%AE%B6/id1268958426?mt=8' :
        'https://itunes.apple.com/us/app/%E9%98%BF%E6%8B%89%E7%A7%81%E5%AE%B6/id1268958426?mt=8';
    } else if (/android/.test(ua)) {
      url = system === 'seller' ?
        'http://android.myapp.com/myapp/detail.htm?apkName=alsj.com.EhomeCompany' :
        'http://android.myapp.com/myapp/detail.htm?apkName=alsj.com.EhomeCompany';
    }
    window.location.href = url;
  }


};

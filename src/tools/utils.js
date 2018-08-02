import EXIF from 'exif-js'

export default {
  /**
   * 路由跳转
   */
  go(vue, params) {
    vue.$store.commit('TURN', 'on');
    vue.$router.push(params);
  },
  /**
   * 路由返回
   */
  back(vue) {
    vue.$store.commit('TURN', 'off');
    vue.$router.back(-1);
  },
  getDate(type = 'current') {
    const current = new Date();
    let dateObj = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };

    if (type === 'current') {
      return dateObj;
    }
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
  openUrl(path, params) {
    params = params || {};
    var data = '?';

    for (var attr in params) {
      data += attr + '=' + params[attr] + '&';
    }

    data = encodeURI(data.slice(0, -1));
    window.location.href = path + data;
  },
  /**
   * 格式化数字
   */
  formatNum(num, retain) {
    if (!num) {
      return 0;
    } else if (num > 10000) {
      let number = num * 1 / 10000;
      number = retain ? number.toFixed(retain) : number;
      return number + '万';
    } else {
      return num;
    }
  },
  // 复制数组
  copyArr(arr) {
    if (arr.length === 0) return [];
    var newArr = JSON.parse(JSON.stringify(arr));
    return newArr;
  },
  // 复制对象
  copyObj(obj) {
    return JSON.parse(JSON.stringify(obj));
  },
  /**
   * 限制输入框输入
   */
  limitInput(text, type, length, regExp) {
    text = text || '';
    if (type) {
      switch (type) {
        case 'number':
          text = text.replace(/\D/g, '');
          break;
        case 'password':
          text = text.replace(/[^\da-zA-Z]/g, '');
        case 'cn':
          text = text.replace(/[^\u4E00-\u9FA5a-zA-Z\']/g, '');
          break;
        default:
          text = text.replace(regExp, '');
          break;
      }
    }

    if (length) {
      text = text.slice(0, length);
    }
    return text;
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
    var key = CryptoJS.enc.Utf8.parse('alasgad980f7467f');
    var iv = CryptoJS.enc.Utf8.parse('alasgad980f7467f');
    return CryptoJS.AES.encrypt(password, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding
    }).toString();
  },
  /**
   * 设置用户信息
   */
  setUserInfo(data) {
    let info = JSON.parse(JSON.stringify(data));
    window.localStorage.setItem('USER_INFO', JSON.stringify(info));
    window.localStorage.setItem('USER_INFO_EXPIRE', Date.now());
  },
  /**
   * 获取用户信息
   */
  getUserInfo() {
    let info = window.localStorage.getItem('USER_INFO');
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
    let from = this.urlToObj().from;
    if (from) {
      window.location.href = (`../../pages/${ from }?` + window.location.search.slice(1));
    } else {
      window.location.href = '../../../index.html';
    }
  },
  /**
   * 判断登录状态是否过期
   */
  judgeLoginStatusExpire() {
    let expire = window.localStorage.getItem('USER_INFO_EXPIRE');
    let gap = Date.now() - expire * 1;
    let time = gap / (1000 * 60 * 60 * 24);
    return time > 7;
  },
  /**
   * 跳转去登录页
   */
  goLogin() {
    let {
      pathname,
      search
    } = window.location;
    let path = pathname.replace(/\/.*pages\/(.*html)/, '$1');
    let params = search ? `&${ search.slice(1) }` : '';
    window.location.href = `../../pages/login/login.html?from=${ path }${ params }`;
  },
  /**
   * 判断是否已登录
   * 传入 Vue 实例
   */
  judgeIsLogin(_this) {
    console.log('this:_____', this);
    if (!this.getUserInfo()) {
      _this.$toast('您尚未登录，请登录后再试', 800)
        .then(() => {
          this.goLogin();
        })
      return false;
    } else if (this.judgeLoginStatusExpire()) {
      _this.$toast('您的登录状态已过期，请重新登录', 800)
        .then(() => {
          this.goLogin();
        })
    } else {
      return true;
    }
  },
  /**
   * 随机数
   */
  randomNum() {
    let num = parseInt(Math.random() * 10);
    return num;
  },
  /**
   * 防键盘阻挡表单元素
   */
  preventKeyboard() {
    window.addEventListener('resize', function() {
      if (
        document.activeElement.tagName === 'INPUT' ||
        document.activeElement.tagName === 'TEXTAREA'
      ) {
        window.setTimeout(function() {
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
    var mapDom = document.createElement('div');
    mapDom.style.display = 'none';
    mapDom.id = 'allmap';
    document.querySelector('body').append(mapDom);
    // 百度地图API功能
    var map = new BMap.Map("allmap");
    var point = new BMap.Point(116.331398, 39.897445);
    map.centerAndZoom(point, 12);

    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r) {
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        var mk = new BMap.Marker(r.point);
        map.addOverlay(mk);
        map.panTo(r.point);
        window.localStorage.setItem('GET_CURRENT_LOCATION', JSON.stringify(r));
      } else {
        this.locationStorageMap();
      }
    }, {
      enableHighAccuracy: true
    })
  },
  /**
   * 获取默认定位 （珠江新城）
   */
  getDefaultPosition() {
    return {
      lat: 23.1194300000,
      lng: 113.3212200000
    }
  },
  /**
   * 手动创建loading
   * el: DOM
   */
  createLoading(el) {
    setTimeout(() => {
      let params = {
        renderer: 'svg',
        loop: true,
        autoplay: true,
        container: el,
        animationData: LOADING_CONFIG
      }
      lottie.loadAnimation(params);
    }, 200)
  },
  /**
   * 格式化时间
   */
  formatDate(dateNum) {
    var date = new Date(dateNum);
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var seconds = date.getSeconds();

    if (month <= 9) month = "0" + month;
    if (day <= 9) day = "0" + day;
    if (hour <= 9) hour = "0" + hour;
    if (minute <= 9) minute = "0" + minute;
    if (seconds <= 9) seconds = "0" + seconds;

    var time = `${date.getFullYear()}-${ month }-${ day } ${ hour }:${ minute }:${ seconds }`;
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
    if (typeof str === 'number') {
      date = str;
      str = this.formatDate(str);
    } else {
      date = Date.parse(str.replace(/\-/g, '/'));
    }

    const oneMinute = 1000 * 60;
    const oneHour = oneMinute * 60;
    const oneDay = oneHour * 24;
    const oneMonth = oneDay * 30;
    const oneYear = oneMonth * 12;

    let gap = now - date;

    let minute = gap / oneMinute;
    let hour = gap / oneHour;
    let year = gap / oneYear;

    let res = null;

    switch (true) {
      case year >= 1:
        res = this.formatHowLongBefore(str, '$1年$2月$3日$4');
        break;
      case hour >= 48 && year < 1:
        res = this.formatHowLongBefore(str, '$2月$3日$4');
        break;
      case hour >= 24 && hour < 48:
        res = this.formatHowLongBefore(str, '昨天$4');
        break;
      case hour >= 1 && hour < 24:
        res = `${ parseInt(hour) }小时前`;
        break;
      case hour <= 1 && minute > 1:
        res = `${ parseInt(minute) }分钟前`;
        break;
      case minute <= 1:
        res = '刚刚';
        break;
      default:
        res = str;
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
    let ua = navigator.userAgent.toLowerCase();
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
  },














































  /**
   * 压缩图片
   */
  photoCompress(file, quality, cb) {
    var ready = new FileReader();
    /*开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.*/
    ready.readAsDataURL(file);
    ready.onload = () => {
      this.canvasDataURL(ready.result, quality, file, cb)
    }
  },
  canvasDataURL(path, quality, file, callback) {
    var img = new Image();
    img.src = path;
    img.onload = () => {

      EXIF.getData(img, () => {
        EXIF.getAllTags(img);
        let Orientation = EXIF.getTag(img, 'Orientation');
        switch (Orientation) {
          case 6:
            this.compressPic(img, 'left', quality, callback);
            break;
          case 8:
            this.compressPic(img, 'right', quality, callback);
            break;
          case 3:
            this.compressPic(img, 'right', quality, callback);
            break;
          default:
            this.compressPic(img, '', quality, callback);
        }
      });
    }
  },
  rotateCanvas(img, imgWidth, imgHeight, direction, canvas, ctx) {
    var min_step = 0;
    var max_step = 3;
    var step = 2;
    if (step == null) {
      step = min_step;
    }
    if (direction == 'right') {
      step++;
      //旋转到原位置，即超过最大值
      step > max_step && (step = min_step);
    } else {
      step--;
      step < min_step && (step = max_step);
    }
    var degree = step * 90 * Math.PI / 180;

    switch (step) {
      case 0:
        canvas.width = imgWidth
        canvas.height = imgHeight
        ctx.drawImage(img, 0, 0);
        break;
      case 1:
        canvas.width = imgHeight
        canvas.height = imgWidth
        ctx.rotate(degree);
        ctx.drawImage(img, 0, -imgHeight);
        break;
      case 2:
        canvas.width = imgWidth
        canvas.height = imgHeight
        ctx.rotate(degree);
        ctx.drawImage(img, -imgWidth, -imgHeight);
        break;
      case 3:
        canvas.width = imgHeight
        canvas.height = imgWidth
        ctx.rotate(degree);
        ctx.drawImage(img, -imgWidth, 0);
        break;
    }
  },
  compressPic(img, direction, quality, callback) {
    // 默认按比例压缩
    var w = img.width,
      h = img.height,
      scale = w / h;
    w = w;
    h = w / scale;
    //生成canvas
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    if (direction) {
      this.rotateCanvas(img, w, h, direction, canvas, ctx);
    } else {
      var anw = document.createAttribute("width");
      anw.nodeValue = w;
      var anh = document.createAttribute("height");
      anh.nodeValue = h;
      canvas.setAttributeNode(anw);
      canvas.setAttributeNode(anh);
      ctx.drawImage(img, 0, 0, w, h);
    }

    // quality值越小，所绘制出的图像越模糊
    console.log('压缩比', quality);
    var base64 = canvas.toDataURL('image/jpeg', quality * 1);
    // 回调函数返回base64的值
    callback(base64);
  },
  convertBase64UrlToBlob(urlData) {
    var arr = urlData.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {
      type: mime
    });
  },
}
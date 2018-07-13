import Vue from '../../node_modules/_vue@2.5.16@vue';

/**
 * 滚动加载更多
 */
Vue.directive('scroll', {
  /**
   * TODO
   * 增加节流防抖
   */
  bind(el, binding, vNode) {
    let windowHeight = window.innerHeight;
    let {
      api,
      fn
    } = binding.value;

    el.addEventListener('scroll', e => {
      let container = document.querySelector('.scroll-container');
      let bottom = parseInt(container.getBoundingClientRect().bottom);
      // console.log(container, bottom, bottom - 50, windowHeight, !ajaxArr[api], api);
      if (bottom - 50 <= windowHeight && !ajaxArr[api]) {
        // console.log(123)
        binding.value.fn();
      }
    })

  }
})

/**
 * 获取焦点
 */
Vue.directive('focus', {
  bind(el, binding, vNode) {
    el.focus();
  }
})
/**
 * 返回上一页
 */
Vue.directive('back', {
  bind(el, binding, vNode) {
    el.addEventListener('click', e => {
      vNode.$router.back();
    })
  }
})
/**
 * 返回上一页并刷新
 * url : String
 */
Vue.directive('back-reload', {
  bind(el, binding) {
    el.addEventListener('click', e => {
      window.location.href = document.referrer;

      if (binding.value) {
        let timer = setTimeout(() => {
          clearTimeout(timer);
          timer = null;
          window.location.href = binding.value;
        }, 300)
      }
      return false;
    })
  }
})

/**
 * 屏蔽滚动穿透
 */
Vue.directive('stop-cover', {
  bind(el) {
    el.addEventListener('touchmove', e => {
      e.preventDefault();
      // window.event.cancelBubble=true;
      e.stopPropagation();
      return false;
    })
  }
})
/**
 * 图片加载失败
 */
Vue.directive('img-err', {
  bind(el, binding) {
    let defaultUrl = '~~img/product_img.jpg';
    el.addEventListener('error', function() {
      let path = binding.value;
      console.log('path:_____', path);
      // this.src = '../src/assets/img/product_img.jpg';
      this.src = path || defaultUrl;
    })
  }
})
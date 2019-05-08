import Vue from 'vue';
import * as mutationTypes from '~vuex/mutation-types';

/**
 * 按钮按下效果
 */
function buttonAddClassName(el) {
  return e => el.classList.add('d-button');
}
function buttonRemoveClassName(el) {
  return e => el.classList.remove('d-button');
}
Vue.directive('button', {
  bind(el) {
    el.addEventListener('touchstart', buttonAddClassName(el), false)
    el.addEventListener('touchend', buttonRemoveClassName(el), false)
  },
  unbind(el) {
    el.removeEventListener('touchstart', buttonAddClassName(el), false)
    el.removeEventListener('touchend', buttonRemoveClassName(el), false)
  }
})
/**
 * 获取焦点
 */
Vue.directive('focus', {
  bind(el, binding, vNode) {
    el.focus();
  }
});
/**
 * 返回上一页
 */
Vue.directive('back', {
  bind(el, binding, vNode) {
    el.addEventListener('click', (e) => {
      vNode.$store.commit(mutationTypes.TURN, 'on');
      vNode.$router.back();
    });
  }
});
/**
 * 返回上一页并刷新
 * url : String
 */
Vue.directive('back-reload', {
  bind(el, binding) {
    el.addEventListener('click', (e) => {
      window.location.href = document.referrer;

      if (binding.value) {
        let timer = setTimeout(() => {
          clearTimeout(timer);
          timer = null;
          window.location.href = binding.value;
        }, 300);
      }
      return false;
    });
  }
});

/**
 * 屏蔽滚动穿透
 */
Vue.directive('stop-cover', {
  bind(el) {
    el.addEventListener('touchmove', (e) => {
      e.preventDefault();
      // window.event.cancelBubble=true;
      e.stopPropagation();
      return false;
    });
  }
});
/**
 * 图片加载失败
 */
Vue.directive('img-err', {
  bind(el, binding) {
    const defaultUrl = '~~img/product_img.jpg';
    el.addEventListener('error', () => {
      const path = binding.value;
      console.log('path:_____', path);
      // this.src = '../src/assets/img/product_img.jpg';
      this.src = path || defaultUrl;
    });
  }
});

import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: () =>
      import ( /* webpackChunkName: "home" */ "~components/home"),
    meta: {
      title: '阿拉私家 - 商家端'
    }
  }, {
    path: '/store',
    name: 'store',
    component: () =>
      import ( /* webpackChunkName: "store" */ "~views/store/Store"),
    meta: {
      title: '阿拉私家 - 店铺主页',
      keepAlive: true
    }
  }, {
    path: '/product',
    name: 'product-detail',
    component: () =>
      import ( /* webpackChunkName: "product-detail" */ "~views/product/ProductDetail"),
    meta: {
      title: '阿拉私家 - 产品详情'
    }
  }, {
    path: '*',
    name: '404',
    component: () =>
      import ( /* webpackChunkName: "no-found" */ "~components/home"),
    meta: {
      title: '阿拉私家 - 找不到页面'
    }
  }],
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  console.log('to, from:_____', to, from);
  if (to.meta.needLogin) {
    // if (store.state.token) { // 通过vuex state获取当前的token是否存在
    if (1) {
      next();
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next();
  }
})

export default router;
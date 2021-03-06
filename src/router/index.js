import Vue from 'vue';
import Router from 'vue-router';

import utils from '~tools/utils';

import homeRouter from './home-router';
import LoginRouter from './login-router';
import workerRouter from './worker-router';
import orderRouter from './order-router';
import noFoundRouter from './no-found-router';
import customerRouter from './customer-router';
import productRouter from './product-router';
import testRouter from './test-router';
import staffRouter from './staff-router';

const DEV_ENV = process.env.NODE_ENV === 'development';

Vue.use(Router);

const routes = [].concat(
  homeRouter,
  LoginRouter,
  workerRouter,
  orderRouter,
  customerRouter,
  noFoundRouter,
  productRouter,
  staffRouter,
  testRouter
);

const router = new Router({
  // mode: 'history',
  routes
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  // console.log('from:_____', to, from);

  console.log('utils.getUserToken():_____', to.name, utils.getUserToken());
  // if (utils.getUserToken()) {
  //   console.log('222:_____', 222);
  next();
  // } else {
  //   next({
  //     path: '/login'
  //   })
  // }
  /* if (to.meta.needLogin) {
    // if (store.state.token) { // 通过 vuex state 获取当前的 token是否存在
    if (true === 1) {
      next();
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath,
        }, // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
    }
  } else if (!to.name) {
    next({
      name: 'home',
    });
  } else {
    next();
  } */
});

export default router;

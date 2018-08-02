import Vue from '../../node_modules/_vue@2.5.16@vue';
import Router from '../../node_modules/_vue-router@3.0.1@vue-router';

Vue.use(Router);

import homeRouter from './home-router';
import workerRouter from './worker-router';
import orderRouter from './order-router';
import noFoundRouter from './no-found-router';

const routes = [].concat(homeRouter, workerRouter, orderRouter, noFoundRouter);

const router = new Router({
  routes
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
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
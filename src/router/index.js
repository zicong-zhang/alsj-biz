import Vue from '../../node_modules/_vue@2.5.16@vue';
import Router from '../../node_modules/_vue-router@3.0.1@vue-router';

Vue.use(Router);

const router = new Router({
  routes: [{
    path: '/',
    name: 'home',
    redirect: {
      name: 'worker'
    },
    component: () =>
      import ( /* webpackChunkName: "home" */ "~views/home/home"),
    meta: {
      title: '阿拉私家 - 商家端',
      scrollTop: 0
    },
    children: [{
      path: 'worker',
      name: 'worker',
      component: () =>
        import ( /* webpackChunkName: "worker" */ "~views/worker/worker"),
      meta: {
        title: '阿拉私家 - 工作台'
      }
    }, {
      path: 'order-list',
      name: 'order-list',
      component: () =>
        import ( /* webpackChunkName: "order" */ "~views/order/order-list/order-list"),
      meta: {
        title: '阿拉私家 - 订单列表'
      }
    }]
  }, {
    path: '/order',
    name: 'order',
    redirect: {
      name: 'order-detail'
    },
    component: () =>
      import ( /* webpackChunkName: "no-found" */ "~views/order/order-index"),
    children: [{
      path: 'detail',
      name: 'order-detail',
      component: () =>
        import ( /* webpackChunkName: "no-found" */ "~views/order/order-detail/order-detail"),
        meta: {
          title: '阿拉私家 - 订单详情'
        }
    }, {
      path: 'edit-customer',
      name: 'order-edit-customer',
      component: () =>
        import ( /* webpackChunkName: "no-found" */ "~views/order/edit-customer/edit-customer"),
        meta: {
          title: '阿拉私家 - 编辑客户信息',
          keep: false
        }
    }]
  }, {
    path: '*',
    name: '404',
    component: () =>
      import ( /* webpackChunkName: "no-found" */ "~components/home"),
    meta: {
      title: '阿拉私家 - 找不到页面'
    }
  }]
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  // console.log('to, from:_____', to, from);
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
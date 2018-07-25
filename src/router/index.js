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
      title: '商家端 - 阿拉私家',
      scrollTop: 0
    },
    children: [{
      path: 'worker',
      name: 'worker',
      component: () =>
        import ( /* webpackChunkName: "worker" */ "~views/worker/worker"),
      meta: {
        title: '工作台 - 阿拉私家'
      }
    }, {
      path: 'order-list',
      name: 'order-list',
      component: () =>
        import ( /* webpackChunkName: "order" */ "~views/order/order-list/order-list"),
      meta: {
        title: '订单列表 - 阿拉私家'
      }
    }]
  }, {
    path: '/order-detail',
    name: 'order-detail',
    component: () =>
      import ( /* webpackChunkName: "order" */ "~views/order/order-detail/order-detail"),
    meta: {
      title: '订单详情 - 阿拉私家'
    }
  }, {
    path: '/edit-customer',
    name: 'order-edit-customer',
    component: () =>
      import ( /* webpackChunkName: "order" */ "~views/order/edit/edit-customer"),
    meta: {
      title: '编辑客户信息 - 阿拉私家'
    }
  }, {
    path: '/edit-house-type',
    name: 'order-edit-house-type',
    component: () =>
      import ( /* webpackChunkName: "order" */ "~views/order/edit/edit-house-type"),
    meta: {
      title: '编辑户型信息 - 阿拉私家'
    }
  }, {
    path: '/edit-contract',
    name: 'order-edit-contract',
    component: () =>
      import ( /* webpackChunkName: "order" */ "~views/order/edit/edit-contract"),
    meta: {
      title: '录入合同信息 - 阿拉私家'
    }
  }, {
    path: '*',
    name: '404',
    component: () =>
      import ( /* webpackChunkName: "no-found" */ "~components/home"),
    meta: {
      title: '找不到页面 - 阿拉私家'
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
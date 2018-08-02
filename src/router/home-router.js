const homeRouter = [{
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
}]

export default homeRouter;
const homeRouter = [{
  path: '/',
  component: () =>
    import(/* webpackChunkName: "home" */ '~views/home'),
  meta: {
    title: '商家端 - 阿拉私家',
    scrollTop: 0
  },
  children: [{
    path: '/',
    name: 'worker',
    component: () =>
      import(/* webpackChunkName: "worker-index" */ '~views/worker'),
    meta: {
      title: '工作台 - 阿拉私家'
    }
  }, {
    path: 'order-list',
    name: 'order-list',
    component: () =>
      import(/* webpackChunkName: "order-list" */ '~views/order/order-list'),
    meta: {
      title: '订单列表 - 阿拉私家'
    }
  }]
}];

export default homeRouter;

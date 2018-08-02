const orderRouter = [{
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
}]

export default orderRouter;
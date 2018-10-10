const customerRouter = [{
  path: '/customer-list',
  name: 'customer-list',
  meta: {
    title: '客户 - 阿拉私家'
  },
  component: () => import(/* webpackChunkName: "customer-management" */ '~views/customer-management/customer-list')
}, {
  path: '/customer-info',
  name: 'customer-info',
  meta: {
    title: '客户详情 - 阿拉私家'
  },
  component: () => import(/* webpackChunkName: "customer-info" */ '~views/customer-management/customer-info')
}];

export default customerRouter;

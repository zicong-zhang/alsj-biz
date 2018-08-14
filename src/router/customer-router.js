const customerRouter = [{
  path: '/customer-management',
  name: 'customer-management',
  meta: {
    title: '客户 - 阿拉私家'
  },
  component: () => import ( /* webpackChunkName: "customer-management" */ '~views/customer-management/customer-list' )
}]
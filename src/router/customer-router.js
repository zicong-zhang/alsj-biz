const customerRouter = [{
  path: '/customer-list',
  name: 'customer-list',
  meta: {
    title: '客户 - 阿拉私家'
  },
  component: () => import ( /* webpackChunkName: "customer-management" */ '~views/customer-management/customer-list/customer-list' )
}]

export default customerRouter;
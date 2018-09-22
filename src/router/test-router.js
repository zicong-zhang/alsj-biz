const testRouter = [{
  path: '/test-pulldown',
  name: 'test-pulldown',
  meta: {
    title: '下拉刷新 - 阿拉私家'
  },
  // component: () => import ( /* webpackChunkName: "test-pulldown" */ '~views/test/pulldown/pulldown' )
  component: () => import ( /* webpackChunkName: "test-pulldown" */ '~components/v-list' )
}]
export default testRouter;
const noFoundRouter = [{
  path: '*',
  name: '404',
  component: () =>
    import ( /* webpackChunkName: "no-found" */ "~components/home"),
  meta: {
    title: '找不到页面 - 阿拉私家'
  }
}]

export default noFoundRouter;
const noFoundRouter = [{
  path: '*',
  name: 'notfound',
  component: () =>
    import ( /* webpackChunkName: "notfound" */ "~views/notfound/notfound"),
  meta: {
    title: '找不到页面 - 阿拉私家'
  }
}]

export default noFoundRouter;
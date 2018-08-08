const workRouter = [
  {
    path: '/proceeds-detail',
    name: 'proceeds-detail',
    component: () =>
      import ( /* webpackChunkName: "worker" */ "~views/proceeds/proceeds-detail"),
    meta: {
      title: '收款详情 - 阿拉私家'
    }
  },
  {
    path: '/sale-rank',
    name: 'sale-rank',
    component: () =>
      import ( /* webpackChunkName: "worker" */ "~views/sale-rank/sale-rank"),
    meta: {
      title: '销售排行榜 - 阿拉私家'
    }
  },
  {
    path: '/performance-target',
    name: 'performance-target',
    component: () =>
      import ( /* webpackChunkName: "worker" */ "~views/performance-target/performance-target"),
    meta: {
      title: '业绩目标 - 阿拉私家'
    }
  }
]

export default workRouter;
const proceedsDetail = () =>
      import(/* webpackChunkName: "proceeds-detail" */ '~views/proceeds/proceeds-detail');
const saleRank = () =>
import(/* webpackChunkName: "sale-rank" */ '~views/sale-rank/sale-rank');
const performanceTarget = () =>
import(/* webpackChunkName: "performance-target" */ '~views/performance-target/performance-target');
const performanceTotal = () =>
      import(/* webpackChunkName: "proceeds-detail" */ '~views/performance-target/performance-total');


const workRouter = [
  {
    path: '/proceeds-detail',
    name: 'proceeds-detail',
    component: proceedsDetail,
    meta: {
      title: '收款详情 - 阿拉私家',
    },
  },
  {
    path: '/sale-rank',
    name: 'sale-rank',
    component: saleRank,
    meta: {
      title: '销售排行榜 - 阿拉私家',
    },
  },
  {
    path: '/performance-target',
    name: 'performance-target',
    component: performanceTarget,
    meta: {
      title: '业绩目标 - 阿拉私家',
    },
  },
  {
    path: '/performance-total',
    name: 'performance-total',
    component: performanceTotal,
    meta: {
      title: '总业绩 - 阿拉私家',
    },
  },
];

export default workRouter;

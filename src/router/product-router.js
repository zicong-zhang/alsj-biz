const productRouter = [{
  path: '/product-center',
  name: 'product-center',
  meta: {
    title: '客户 - 阿拉私家'
  },
  component: () => import(/* webpackChunkName: "product-center" */ '~views/product/product-center/product-center')
}];

export default productRouter;

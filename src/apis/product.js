import http from '../axios';

// status: 产品状态: 1下架|2上架,不传则查询全部
// 获取产品中心的产品列表
export const getProductList = ({
  pageNum,
  merchantId,
}) => http('/merchantGoods/list', {
  merchantId,
  pageNum,
  pageSize: 15,
  status: 2,
});

// 删除产品
export const delProduct = ({
  merchantGoodsId,
  merchantId,
}) => http('/merchantGoods/deleteBatch', {
  merchantGoodsId,
  merchantId,
});

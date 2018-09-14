import http from "../axios";

// status: 产品状态: 1下架|2上架,不传则查询全部 ,
export const getProductList = ({
  pageNum,
  merchantId
}) => {
  return http('/merchantGoods/list', {
    merchantId,
    pageNum,
    pageSize: 15,
    status: 2,
  })
}
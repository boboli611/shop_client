var NewApiRootUrl = "https://www.ttyouhiu.com/";

module.exports = {
  Login: NewApiRootUrl + 'wx/login',//微信用户登录注册
  IndexUrl: NewApiRootUrl + 'page/index', //首页数据接口 ---
  BannerInfo: NewApiRootUrl + 'banner/info',  //获得banner详情 ---
  ItemIndex: NewApiRootUrl + 'product-item/index',//商品类目
  GoodsSearch: NewApiRootUrl + 'production/search',  //获得商品列表---
  GoodsIndex: NewApiRootUrl + 'production/index',  //获得商品首页---
  GoodsDetail: NewApiRootUrl + 'production/detail',  //获得商品的详情
  GoodsList: NewApiRootUrl +'production/list',//商品分页
  AddCart: NewApiRootUrl + 'shop/add',//加入购物车
  ShopList: NewApiRootUrl + 'shop/list',//购物车列表
  ShopIdList: NewApiRootUrl + 'shop/id-list',//购物车列表
  ShopBuy: NewApiRootUrl + 'shop/buy-list', //创建订单
  ShopDrop: NewApiRootUrl + 'shop/delete',//购物车列表
  ShopUpdate: NewApiRootUrl + 'shop/update',//购物车更新
  GoodsBuyPrew: NewApiRootUrl + 'production/buy-info',  //获得商品的详情
  Createorder: NewApiRootUrl + 'wx/create-order', //创建订单
  CreateShoporder: NewApiRootUrl + 'pay/shop-pay', //创建订单
  GetOrder: NewApiRootUrl + 'pay/order', //获取订单
  AddressDelete: NewApiRootUrl + 'address/delete',  //保存收货地址
  AddressSave: NewApiRootUrl + 'address/save',  //保存收货地址
  AddressSaveStatus: NewApiRootUrl + 'address/save-status',  //保存收货地址
  AddressList: NewApiRootUrl + 'address/list',  //收货地址列表
  AddressDefault: NewApiRootUrl + 'address/default',  //收货地址列表
  OrderList: NewApiRootUrl + 'order/list',  //订单列表
  OrderDetail: NewApiRootUrl + 'order/detail',  //订单详情
  OrderRefund: NewApiRootUrl + 'order/refund',  //退货
  OrderReceve: NewApiRootUrl + 'order/receve',  //收货
  OrderDelete: NewApiRootUrl + 'order/delete',  //收货
  OrderNotice: NewApiRootUrl + 'order/notice',  //收货
  OrderRefundDetail: NewApiRootUrl + 'order/refund-detail',  //退货
  orderRefundApply: NewApiRootUrl + 'order/refund-apply',
  orderUploadExpressage: NewApiRootUrl + 'order/upload-expressage',//上传快递单号
  orderCancelRefund: NewApiRootUrl + 'order/cancel-refund',//取消退款
  ExpressCompany: NewApiRootUrl + 'express/company-list',
  ExpressInfo: NewApiRootUrl + 'express/get',
};
const data = {
　　"sucess":true,
　　"msg":"",
　　"data":{
　　　　"info":{
　　　　　　"info": [
　　　　　　  {
　　　　　　    "name": "品牌品牌",
　　　　　　    "value": "lipez"
　　　　　　  },
            {
　　　　　　    "name": "品  牌",
　　　　　　    "value": "lipez"
　　　　　　  },
            {
              "name": "品牌",
　　　　　　    "value": "lipez"
            }
　　　　　　],
　　　　　　"id":53,
　　　　　　"title":"A牛皮鞋",
　　　　　　"desc":"<p><img src='https://lipz-shop.oss-cn-hangzhou.aliyuncs.com/upload/image/20180304/9875290e750e2719468b614522572915.jpg'></p>",
　　　　　　"cover":[
　　　　　　　　"https://lipz-shop.oss-cn-hangzhou.aliyuncs.com/upload/image/20180318/ed7caaf7a06a874b2cdc9f6835f59552.jpg"
　　　　　　],
　　　　　　"price":0.01,
　　　　　　"sell":null,
　　　　　　"count":null,
　　　　　　"item_id":1,
　　　　　　"status":1,
　　　　　　"tag":"新品",
　　　　　　"sort":1,
　　　　　　"type":2,
　　　　　　"carriage":0,
　　　　　　"updated_at":"2018-03-18 22:25:42",
　　　　　　"created_at":"2018-03-04 21:33:57",
　　　　　　"storage": [
　　　　　　　　{
　　　　　　　　  style: '浅蓝',
　　　　　　　　  size: 'M',
　　　　　　　　  num: 0
　　　　　　　　},
　　　　　　　　{
　　　　　　　　  style: '浅蓝1',
　　　　　　　　  size: 'S',
　　　　　　　　  num: 2
　　　　　　　　},
　　　　　　　　{
　　　　　　　　  style: '浅蓝2',
　　　　　　　　  size: 'M',
　　　　　　　　  num: 12
　　　　　　　　},
　　　　　　　　{
　　　　　　　　  style: '浅蓝1',
　　　　　　　　  size: 'L',
　　　　　　　　  num: 4
　　　　　　　　},
　　　　　　　　{
　　　　　　　　  style: '浅4蓝',
　　　　　　　　  size: 'L',
　　　　　　　　  num: 12
　　　　　　　　},
　　　　　　　　{
　　　　　　　　  style: '浅5蓝',
　　　　　　　　  size: 'M',
　　　　　　　　  num: 12
　　　　　　　　},
　　　　　　　　{
　　　　　　　　  style: '浅蓝',
　　　　　　　　  size: 'S',
　　　　　　　　  num: 12
　　　　　　　　}
　　　　　　]
　　　　},
　　　　"recommend":[
　　　　　　{
　　　　　　　　"id":62,
　　　　　　　　"title":"a羊毛毛衣",
　　　　　　　　"desc":"<p><img src='https://lipz-shop.oss-cn-hangzhou.aliyuncs.com/upload/image/20180305/1a6dac18b1672f549f1bc8c90357b5ce.jpg'></p>",
　　　　　　　　"cover":"https://lipz-shop.oss-cn-hangzhou.aliyuncs.com/upload/image/20180318/c84817840dcd6826cdb821f41fcdcaf6.jpg",
　　　　　　　　"price":1,
　　　　　　　　"sell":null,
　　　　　　　　"count":null,
　　　　　　　　"item_id":3,
　　　　　　　　"status":1,
　　　　　　　　"tag":"新品",
　　　　　　　　"sort":64,
　　　　　　　　"type":2,
　　　　　　　　"carriage":0,
　　　　　　　　"updated_at":"2018-03-18 15:47:13",
　　　　　　　　"created_at":"2018-03-05 23:03:33"
　　　　　　},
　　　　　　{
　　　　　　　　"id":95,
　　　　　　　　"product_id":53,
　　　　　　　　"title":"a羊毛毛衣",
　　　　　　　　"cover":"https://lipz-shop.oss-cn-hangzhou.aliyuncs.com/upload/image/20180318/c84817840dcd6826cdb821f41fcdcaf6.jpg",
　　　　　　　　"style":"a",
　　　　　　　　"size":"12",
　　　　　　　　"num":1,
　　　　　　　　"sell":0,
　　　　　　　　"price":0.01,
　　　　　　　　"status":1,
　　　　　　　　"updated_at":"2018-03-18 22:25:42",
　　　　　　　　"created_at":"2018-03-04 21:33:57"
　　　　　　}
　　　　]
　　},
　　"errno":0
};
const mockSkuItem = ( id ) => {
  if( !id ){
    return {
      sucess: false,
      msg: '商品id为空',
      errno: 1
    }
  }
  return data;
}
module.exports = mockSkuItem;

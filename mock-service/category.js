const data =   {
　　"sucess":true,
　　"msg":"",
　　"data":{
　　　　"list":[
　　　　　　{
　　　　　　　　"id":4,
　　　　　　　　"title":"风衣",
　　　　　　　　"icon":"http://lipz.oss-cn-hangzhou.aliyuncs.com/upload/image/20171224/76d9d2e97589cbee0892022d12c384df.png",
　　　　　　　　"sort":4,
　　　　　　　　"updated_at":"2017-12-24 18:33:05",
　　　　　　　　"created_at":"2017-12-24 18:33:05"
　　　　　　},
　　　　　　{
　　　　　　　　"id":3,
　　　　　　　　"title":"毛衣",
　　　　　　　　"icon":"http://lipz.oss-cn-hangzhou.aliyuncs.com/upload/image/20171224/9e0a7cab83461761c3c15b9fa425e6a8.png",
　　　　　　　　"sort":3,
　　　　　　　　"updated_at":"2017-12-24 18:32:50",
　　　　　　　　"created_at":"2017-12-24 18:32:50"
　　　　　　},
　　　　　　{
　　　　　　　　"id":2,
　　　　　　　　"title":"单鞋",
　　　　　　　　"icon":"http://lipz.oss-cn-hangzhou.aliyuncs.com/upload/image/20171224/adf2bf8fa196b8a796834e54b22dbc76.png",
　　　　　　　　"sort":2,
　　　　　　　　"updated_at":"2017-12-24 18:24:58",
　　　　　　　　"created_at":"2017-12-05 11:39:41"
　　　　　　},
　　　　　　{
　　　　　　　　"id":1,
　　　　　　　　"title":"鞋",
　　　　　　　　"icon":"https://lipz-shop.oss-cn-hangzhou.aliyuncs.com/upload/image/20180224/38599544b41e2172463aae55cebbd7e7.png",
　　　　　　　　"sort":1,
　　　　　　　　"updated_at":"2018-02-24 14:13:59",
　　　　　　　　"created_at":"2017-12-04 18:57:32"
　　　　　　}
　　　　]
　　},
　　"errno":0
};

const mockCategoryService = () => {
  return data;

}
module.exports = mockCategoryService;

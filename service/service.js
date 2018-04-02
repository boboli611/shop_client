const mock = require('../mock-servie/mock.js');
const isMock = true;

const apiFactory = ( apiName, ...argvs ) => {
  if( isMock ){
    return mock[apiName](...argvs)
      .then((res)=>{
        if( !res.sucess ){
          throw res.msg;
        }else{
          return res
        }
      });
  }
}
// 首页接口
const indexService = () => apiFactory( 'index' );

const categoryService = () => apiFactory( 'category' );

const skuItemService = ( id ) =>  apiFactory( 'skuItem', id );

const searchService = ( keyword, currentPage ) => apiFactory('search', keyword, currentPage);

module.exports = {
  indexService,
  categoryService,
  searchService,
  skuItemService
}

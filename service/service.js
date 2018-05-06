const mock = require('../mock-service/mock.js');
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

const addressService = () => {
  return {
    get: () => apiFactory('getAddress'),
    add: (addressObj) => apiFactory('addAddress', addressObj),
    update: (addressObj) => apiFactory('updateAddress', addressObj),
    delete: (addressId) => apiFactory('deleteAddress', addressId),
    updateStatus: (addressObj) => apiFactory('updateStatusAddress', addressObj),
  }
}

module.exports = {
  indexService,
  categoryService,
  searchService,
  skuItemService,
  addressService
}

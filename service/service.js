const mock = require('../mock-servie/mock.js');
const isMock = true;

const apiFactory = ( apiName, ...argvs ) => {
  if( isMock ){
    return mock[apiName]();
  }
}
// 首页接口
const indexService = () => {
  return apiFactory( 'index' );
}
const categoryService = () => {
  return apiFactory( 'category' );
}

const searchService = ( keywords ) => apiFactory('search', keywords);

module.exports = {
  indexService,
  categoryService,
  searchService
}

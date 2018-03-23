const mock = require('../mock-servie/mock.js');
const isMock = true;

const apiFactory = ( apiName ) => {
  if( isMock ){
    return mock[apiName]();
  }
}
// 首页接口
const indexService = () => {
  return apiFactory( 'index' );
}


module.exports = {
  indexService
}
const mockSearchService = require('./search.js');
const mockIndexService = require('./index.js');
const mockCategoryService = require('./category.js');
const mockSkuItem = require('./sku-item.js');

const mockServiceFactory = (data) => {
  return new Promise((res)=>{
    setTimeout(()=>{
      res(data);
    }, 1000);
  })
}

const index = () => {
  return mockServiceFactory( mockIndexService() );
}
const search = ( ...argvs ) => {
  return mockServiceFactory( mockSearchService( ...argvs ) );
}
const category = () => {
  return mockServiceFactory( mockCategoryService() );
}
const skuItem = (...argvs) => {
  return mockServiceFactory( mockSkuItem(...argvs) );
}

module.exports = {
  index,
  search,
  category,
  skuItem
}

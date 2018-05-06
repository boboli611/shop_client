const mockSearchService = require('./search.js');
const mockIndexService = require('./index.js');
const mockCategoryService = require('./category.js');
const mockSkuItem = require('./sku-item.js');
const mockAddresssService = require('./address.js');

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

const getAddress = () => {
  return mockServiceFactory( mockAddresssService.get() );
}
const addAddress = (...argvs) => {
  return mockServiceFactory( mockAddresssService.add(...argvs) );
}
const updateAddress = (...argvs) => {
  return mockServiceFactory( mockAddresssService.update(...argvs) );
}
const deleteAddress = (...argvs) => {
  return mockServiceFactory( mockAddresssService.delete(...argvs) );
}
const updateStatusAddress = (...argvs) => {
  return mockServiceFactory(mockAddresssService.updateStatus(...argvs));
}

module.exports = {
  index,
  search,
  category,
  skuItem,
  getAddress,
  addAddress,
  updateAddress,
  deleteAddress,
  updateStatusAddress,
}

const mockSearchSerive = require('./search.js');
const mockIndexService = require('./index.js');
const mockCategoryService = require('./category.js');

const mockServiceFactory = (data) => {
  return new Promise((res)=>{
    setTimeout(()=>{
      res(data);
    }, 200);
  })
}

const index = () => {
  return mockServiceFactory( mockIndexService() );
}
const search = () => {
  return mockServiceFactory( mockSearchSerive() );
}
const category = () => {
  return mockServiceFactory( mockCategoryService() );
}

module.exports = {
  index,
  search,
  category
}

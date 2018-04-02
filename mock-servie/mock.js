const mockSearchSerive = require('./search.js');
const mockIndexService = require('./index.js');

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

module.exports = {
  index,
  search
}

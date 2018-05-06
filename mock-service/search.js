const api = require('../config/api.js');
const network = require('../utils/network.js');
console.log('search')
const searchService = ( keyword, page ) => {
  return new Promise(function (resolve) {

    if (!keyword) {
      var res = {
        sucess: false,
        data:{search:false},
        msg: '搜索需要关键字',
        errno: 1
      }
      console.log("vvvv", res)
      resolve(res)
      return
    }
   
    network.get(api.GoodsSearch, { "word": keyword, "page": page}).then(function (res) {
      resolve(res)
    })
  })
}


module.exports = {
  searchService,
};

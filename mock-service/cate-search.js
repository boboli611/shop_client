const api = require('../config/api.js');
const network = require('../utils/network.js');

const mockSearchService = (keyword, page) => {
  return new Promise(function (resolve) {

    if (!keyword) {
      return {
        sucess: false,
        msg: '搜索需要关键字',
        errno: 1
      }
    }

    network.get(api.GoodsSearch, { "word": keyword, "page": page }).then(function (res) {
      resolve(res)
      return res
    })
  })
}

module.exports = {
  mockSearchService,
};
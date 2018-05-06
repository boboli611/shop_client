const api = require('../config/api.js');
const network = require('../utils/network.js');


const indexService = () => {
  return new Promise(function(resolve){
    network.get(api.GoodsIndex, {}).then(function (res) {
      resolve(res)
    })
  })
}

const indexProductList = (page) => {
  return new Promise(function (resolve) {
    var url = api.GoodsList + "?p=" + page
    console.log(url)
    network.get(api.GoodsList, {"p":page}).then(function (res) {
      resolve(res)
    })
  })
}
module.exports = {
  indexService,
  indexProductList,
};

const api = require('../config/api.js');
const network = require('../utils/network.js');
const mockSkuItem = ( id ) => {
  return new Promise(function (resolve) {

    if (!id) {
      var res = {
        sucess: false,
        msg: '商品id为空',
        errno: 1
      }
      resolve(res)
      return
    }

    network.get(api.GoodsDetail, { "id": id}).then(function (res) {
      resolve(res)
    })
  })


  return;
  if( !id ){
    return {
      sucess: false,
      msg: '商品id为空',
      errno: 1
    }
  }
  return data;
}
module.exports = mockSkuItem;

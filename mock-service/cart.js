const api = require('../config/api.js');
const network = require('../utils/network.js');
const   utils = require('../utils/util.js')

const addCart = (id, num) => {
  return new Promise(function (resolve) {
    console.log("商品id" + id + "数量"+num)
    if (!id) {
      var res = {
        sucess: false,
        msg: '商品id为空',
        errno: 1
      }
      resolve(res)
      return
    }

    if (!num) {
      var res = {
        sucess: false,
        msg: '商品数量错误',
        errno: 1
      }
      resolve(res)
      return
    }
    
    network.get(api.AddCart, {"id":id, "num":num}).then(function (res) {
      resolve(res)
    })
  })
}

const list = () => {

  return new Promise(function (resolve) {
    network.get(api.ShopList, {}).then(function (res) {
      resolve(res)
    })
  })
}

const drop = (id) => {
  console.log(id)
  if (!id) {
    utils.showError("请选择要删除商品")
    return
  }

  return new Promise(function (resolve) {
    network.post(api.ShopDrop, {"id":id}).then(function (res) {
      if (res.errno != 0) {
        utils.showError(res.msg)
        return
      }
      resolve(res)
    })
  })
}


const update = (id, storageId, num) => {
  return new Promise(function (resolve, reject) {

    if (!id) {
      utils.showError("购物车id为空")
      return
    }

    if (!storageId) {
      utils.showError("商品id为空")
      return
    }

    if (!num) {
      utils.showError("商品数量错误")
      return
    }

    var foo = network.post(api.ShopUpdate, { "id": id, "storage_id": storageId, "num": num })
      .then(function (res, reject) {
        if (res.errno != 0) {
          utils.showError(res.msg)
        }
        resolve(res, reject)
      })
  })
}

const IdList = (ids) => {
  return new Promise(function (resolve, reject) {

    if (!ids) {
      utils.showError("购物车id为空")
      return
    }

    var foo = network.post(api.ShopIdList, { "ids": ids})
      .then(function (res, reject) {
        if (res.errno != 0) {
          utils.showError(res.msg)
        }
        resolve(res, reject)
      })
  })
}


module.exports = {
  addCart,
  update,
  list,
  drop,
  IdList,
}
const api = require('../config/api.js');
const network = require('../utils/network.js');
const utils = require('../utils/util.js')

const orderPreview = (id, num) => {
  return new Promise(function (resolve) {

    if (!id) {
      var res = {
        sucess: false,
        data: { search: false },
        msg: 'id不能为空',
        errno: 1
      }
      resolve(res)
      return
    }

    network.get(api.GoodsBuyPrew, {"id":id, "buy_num":num}).then(function (res) {
      resolve(res)
    })
  })
}

const orderInfo = (id) => {
  return new Promise(function (resolve) {

    if (!id) {
      var res = {
        sucess: false,
        data: { search: false },
        msg: 'id不能为空',
        errno: 1
      }
      resolve(res)
      return
    }

    network.get(api.OrderDetail, { "orderId": id}).then(function (res) {
      resolve(res)
    })
  })
}

const orderList = (t, page) => {
  return new Promise(function (resolve) {
    network.get(api.OrderList, { "type": t, "p":page }).then(function (res) {
      resolve(res)
    })
  })
}

const RefundApply = (id, storage_id) => {
  return new Promise(function (resolve) {
    network.post(api.orderRefundApply, { "id": id, "storage_id": storage_id}).then(function (res) {
      resolve(res)
    })
  })
}

const RefundDetail = (id) => {
  return new Promise(function (resolve) {
    network.post(api.OrderRefundDetail, { "id": id }).then(function (res) {
      resolve(res)
    })
  })
}

const orderCreate = (param) => {
  return new Promise(function (resolve) {
    if (!param.id || !param.num || !param.address) {
      utils.showError('id不能为空')
      resolve(res)
      return
    }

    network.post(api.Createorder, { "id": param.id, "address_id": param.address, "content": param.content, "ticket_id": param.ticket, "buy_num": param.num }).then(function (res) {
      resolve(res)
    })
  })
}

const Refund = (param) => {
  return new Promise(function (resolve) {
    if (!param.order_id || !param.storage_id) {
      utils.showError('参数错误')
      return
    }

    network.post(api.OrderRefund, { "order_id": param.order_id, "storage_id": param.storage_id, "content": param.content, "recive": param.recive }).then(function (res) {
      resolve(res)
    })
  })
}



const ShopPay = (param) => {
  return new Promise(function (resolve) {
    if (!param.id || !param.address) {
      utils.showError('id不能为空')
      return
    }

    network.post(api.CreateShoporder, { "id": param.id, "address_id": param.address, "content": param.content, "ticket_id": param.ticket }).then(function (res) {
      resolve(res)
    })
  })
}

const indexProductList = (page) => {
  return new Promise(function (resolve) {
    var url = api.GoodsList + "?p=" + page
    console.log(url)
    network.get(api.GoodsList, { "p": page }).then(function (res) {
      resolve(res)
    })
  })
}
module.exports = {
  orderPreview,
  orderCreate,
  orderInfo,
  orderList,
  ShopPay,
  RefundApply,
  Refund,
  RefundDetail,
};

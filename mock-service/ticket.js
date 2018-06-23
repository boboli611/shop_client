const api = require('../config/api.js');
const network = require('../utils/network.js');
const utils = require('../utils/util.js')

const add = (id) => {
  return new Promise(function (resolve) {
    if (!id) {
      utils.showError('选择领取的优惠券')
      resolve(res)
      return
    }

    network.post(api.TicketAdd, { "id": id}).then(function (res) {
      resolve(res)
    })
  })
}


module.exports = {
  add,
};

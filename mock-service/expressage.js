const api = require('../config/api.js');
const network = require('../utils/network.js');
const utils = require('../utils/util.js')

const companyList = () => {

  return new Promise(function (resolve) {
    network.get(api.ExpressCompany, {}).then(function (res) {
      resolve(res)
    })
  })
}

module.exports = {
  companyList,
}
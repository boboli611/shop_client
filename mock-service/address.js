const api = require('../config/api.js');
const network = require('../utils/network.js');

const updateAddressData = {
  "sucess":true,
  "msg":"",
  "data":{
    "id":23
  },
  "errno":0
}


const mockAddresssService = {
  get(){
    return new Promise(function (resolve) {
      network.get(api.AddressList, {}).then(function (res) {
        res.msg = 'get'
        resolve(res)
      })
    })
  },
  add(params){
    console.log(params)
    return new Promise(function (resolve) {
      var data = {}
      data.name = params.name
      data.mobile = params.mobile
      data.province = params.region[0]
      data.city = params.region[1]
      data.county = params.region[2]
      data.address = params.address
      data.status = params.status
      network.post(api.AddressSave, data).then(function (res) {
        res.msg = 'add'
        resolve(res)
      })
    })
  },
  update(params){
    return new Promise(function (resolve) {
      var data = {}
      data.id = params.id
      data.name = params.name
      data.mobile = params.mobile
      data.province = params.region[0]
      data.city = params.region[1]
      data.county = params.region[2]
      data.address = params.address
      data.status = params.status
      network.post(api.AddressSave, data).then(function (res) {
        res.msg = 'update'
        resolve(res)
      })
    })
    return JSON.parse(JSON.stringify(updateAddressData));
  },
  updateStatus(id, status) {
    return new Promise(function (resolve) {
      var data = {}
      data.id = id
      data.status = status
      network.post(api.AddressSaveStatus, data).then(function (res) {
        res.msg = 'update'
        resolve(res)
      })
    })
    return JSON.parse(JSON.stringify(updateAddressData));
  },
  delete(id){
    return new Promise(function (resolve) {
      network.get(api.AddressDelete, {"id":id}, true).then(function (res) {
        res.msg = 'get'
        resolve(res)
      })
    })
  }
}
module.exports = mockAddresssService;

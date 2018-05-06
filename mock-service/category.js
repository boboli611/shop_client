const api = require('../config/api.js');
const network = require('../utils/network.js');

const mockCategoryService = () => {
  return new Promise(function (resolve) {
    network.get(api.ItemIndex, {}).then(function (res) {
      resolve(res)
    })
  })
  return data;

}
module.exports = mockCategoryService;

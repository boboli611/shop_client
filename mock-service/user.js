
const api = require('../config/api.js');
const network = require('../utils/network.js');
const wxLogin = ()=>{
  wx.login({
    success: function (res) {
      if (res.code) {
        wxUserInfo(res.code);

      } else {
        console.log('登录失败！' + res.errMsg)
      }
    }
  });
}

const wxUserInfo = (code) =>{
  wx.getUserInfo({
    success: function (res) {
      var params = {code: code,encrypted_data: res.encryptedData,iv: res.iv}
      network.post(api.Login, params).then(function(res){
        if (res.sucess){
          wx.setStorage({
            key: "user_info",
            data: res.data
          })
        }
        
      })
     
    }
  })
}


module.exports = {
  wxLogin,
  wxUserInfo
}
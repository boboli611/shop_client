
const post = (url, parmas) => {
  return new Promise(function (resolve, reject) {
    var user_info = wx.getStorageSync('user_info')
    /*
    wx.showLoading({
      title: '加载中...',
    })
    */
    wx.request({
      url: url,
      data: parmas,
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'user-token': user_info.token,
      },
      success: function (res) {
        wx.hideLoading();
        resolve(res.data);
      },
      fail: function (res) {
        wx.hideLoading();
        wx.showToast({
          title: "请求异常",
          icon: 'none'
        })
        reject(res)
        
      }
    })
  })
}

const get = (url, parmas, loading = false) => {
  return new Promise(function (resolve, reject) {
    if (loading === true){
      wx.showLoading({
        title: '加载中...',
      })
    }
    
    
    var user_info = wx.getStorageSync('user_info')
    wx.request({
      url: url,
      data: parmas,
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'user-token': user_info.token,
      },
      success: function (res) {
        wx.hideLoading();
        resolve(res.data);
      },
      fail: function (res) {
        wx.showToast({
          title: "请求异常",
          icon: 'none'
        })
        reject(res)
      }
    })
  })
}

module.exports = {
  post,
  get,
};
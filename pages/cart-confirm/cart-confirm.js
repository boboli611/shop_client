// pages/order-confirm/order-confirm.js
const cart = require('../../mock-service/cart.js');
const order = require('../../mock-service/order.js');
const utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: [],
    products: [],
    order: [],
    ids: [],
    num: 0,
    content: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.ids = options.ids
    console.log(options.ids)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    cart.IdList(this.data.ids).then((res) => {
      if (res.errno != 0){
        utils.showError(res.msg)
        return
      }
      res.data.order.price += res.data.order.carriage
      res.data.order.carriage = res.data.order.carriage > 0 ? res.data.order.carriage : "包邮"
      console.log(res.data.info)
      this.setData({
        address: res.data.address,
        products: res.data.info,
        order: res.data.order
      })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bindContent: function (event) {
    var content = event.detail.value;
    this.setData({
      content: content
    });
  },
  pay() {
    var parmas = {}
    parmas.address = this.data.address.id
    parmas.id = this.data.ids
    parmas.content = this.data.content
    parmas.ticket = this.data.ticket

    order.ShopPay(parmas).then((res) => {
      console.log('ssss')
      if (res.errno !== 0) {
        return;
      }

      console.log(res)
      var order_id = res.data.order_id
      wx.requestPayment({
        'timeStamp': res.data.timeStamp,
        'nonceStr': res.data.nonceStr,
        'package': res.data.package,
        'signType': 'MD5',
        'paySign': res.data.sign,
        'success': function (res) {
          wx.redirectTo({
            url: '../order-details/order-details?sucess=1&id=' + order_id,
          })
        },
        'fail': function (res) {
          console.log("fail", res)
          if (res.errMsg == "requestPayment:fail cancel") {
            return
          }
        }
      })
    })
    return;
    wx.redirectTo({
      url: '../order-details/order-details'
    })
  }
})
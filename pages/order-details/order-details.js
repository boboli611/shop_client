const order = require('../../mock-service/order.js');
const utils = require("../../utils/util.js")
// pages/order-details/order-details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    product:[],
    orderInfo:[],
    sucess:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      sucess:options.sucess,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      random: Math.random()
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var id = this.data.id
    order.orderInfo(id).then((res) => {
      var status = res.data.info.status;
      var msg
      if (status == 2) {
        msg = "付款成功";
      }else if (status == 4) {
        msg = "已完成";
      }
      this.setData({
        product: res.data.goods,
        orderInfo: res.data.info,
        sucessMsg:msg,
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
  expressage(){
    wx.navigateTo({
      url: '/pages/payback-details/payback-details?id=' + this.data.id,
    })
  },

  pay() {

    var order_id = this.data.id
    order.OrderPay(order_id).then((res) => {
      if (res.errno !== 0) {
        return;
      }

      
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
  },
  expressage(event) {
    let order = this.data.id;
    wx.navigateTo({
      url: '/pages/payback-details/payback-details?id=' + order,
    })
  },
  notice(event) {
    let orderId = this.data.id;
    console.log(orderId)
    order.orderNotice(orderId).then((res) => {
      console.log(res)
      if (res.errno != 0) {
        utils.showError(res.msg)
        return
      }

      utils.showError("提醒成功")
    })
  },
  del(event) {
    var order_id = this.data.id;
    console.log(order_id, event)
    order.orderDelete(order_id).then((res) => {
      if (res.errno != 0) {
        utils.showError(res.msg)
        return
      }
      this.getList();
    })
  },
})

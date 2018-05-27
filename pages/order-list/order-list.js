const order = require('../../mock-service/order.js');
const utils = require("../../utils/util.js")
// pages/order-list/order-list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state: 0,
    page: 1,
    orderList:[],
    headerLine: {
      left: 0,
      width: 0
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      state: options.state
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.updateHeaderLine();
  },
  updateHeaderLine(){
    wx.createSelectorQuery().select('.order-type-current').boundingClientRect((rect)=>{
      this.setData({
        headerLine: {
          left: rect.left,
          width: rect.width
        }
      })
    }).exec()
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getList();
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
    this.getList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  del(event){
    var order_id = event.currentTarget.dataset.orderid;
    console.log(order_id,event)
    order.orderDelete(order_id).then((res)=>{
      if (res.errno != 0){
          utils.showError(res.msg)
          return
      }
      this.getList();
    })
  },
  switchOrderState(event){
    let stateName = event.currentTarget.dataset.stateName;

    this.setData({
      state: stateName,
      page:1,
      orderList:[],
    }, this.updateHeaderLine);
    this.getList()
    // this.updateHeaderLine();
  },
  getList(){
    var t = this.data.state
    var page = this.data.page
    order.orderList(t, page).then((res) => {
      if (res.errno !== 0) {
        return
      }
      if (res.data.length <= 0) {
        return
      }
      page++
      this.setData({
        orderList: this.data.orderList.concat(res.data),
        page: page,
      })
    })
  },
  expressage(event) {
    let orderid = event.currentTarget.dataset.orderid;
    wx.navigateTo({
      url: '/pages/payback-details/payback-details?id=' + orderid,
    })
  },
  notice(event){
    let orderId = event.currentTarget.dataset.orderid;
    console.log(orderId)
    order.orderNotice(orderId).then((res)=>{
      console.log(res)
      if (res.errno != 0){
        utils.showError(res.msg)
        return
      }

      utils.showError("提醒成功")
    })
  }
})

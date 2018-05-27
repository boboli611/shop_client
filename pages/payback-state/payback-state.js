const order = require('../../mock-service/order.js');
const utils = require('../../utils/util.js');
// pages/payback-state/payback-state.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    random: 0,
    order:{},
    product:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    order.RefundDetail(this.data.id).then((res) => {
      this.setData({
        product: res.data.product,
        order: res.data.order,
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
  cancel(){
    var order_id = this.data.order.order_id
    var storage_id = this.data.product.storage_id

    order.CancelRefund(order_id, storage_id).then((res) =>{
      console.log(res)

      if (res.errno != 0){
        utils.showError(res.msg)
        return
      }

      utils.showError("取消成功")
      var orderInfo = this.data.order
      orderInfo.expressage_status = 5
      console.log(orderInfo)
      this.setData({
        order:orderInfo,
      })
    })
  }
})

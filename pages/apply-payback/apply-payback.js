const order = require('../../mock-service/order.js');
const utils = require('../../utils/util.js');
// pages/apply-payback/apply-payback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    storage_id:0,
    order:{},
    product:{},
    recive: ["未到货","已到货"],
    reciveIds:[3,4],
    reciveStatus:0,
    content:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id,
      storage_id:options.storage_id,
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
    order
      .RefundApply(this.data.id, this.data.storage_id)
      .then((res)=>{
          this.setData({
            product:res.data.product,
            order:res.data.order,
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
  bindRecive(e){
    var id = e.detail.value
    var reciveStatus = this.data.reciveIds[id]
    this.setData({
      reciveStatus: reciveStatus,
      index: e.detail.value,
    })
  },
  bindContent: function (event) {
    var content = event.detail.value;
    this.setData({
      content: content
    });
  },
  formSubmit(){

    if (order.status >= 3 && this.data.reciveStatus == 0){
      utils.showError("请选择货物状态");
      return
    }

    var parmas = {}
    parmas.order_id = this.data.id
    parmas.storage_id = this.data.storage_id
    parmas.content = this.data.content
    parmas.recive = this.data.reciveStatus

    order.Refund(parmas).then((res) => {
      if (res.errno != 0) {
        utils.showError(res.msg);
        return
      }

      wx.navigateTo({
        url: '/pages/payback-state/payback-state?id=' + this.data.id + '&storage_id=' + this.data.storage_id,
      })
    })
 
  }
})

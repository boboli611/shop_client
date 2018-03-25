const store = require('../../store/store.js');
// pages/sku-item/sku-item.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addCartAnimation: false,
    detailsVisible: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(store)
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
  addCart(){
    console.log(111)
    this.setData({
      addCartAnimation: true
    });
    setTimeout(()=>{
      this.setData({
        addCartAnimation: false
      })
    }, 1000);
  },
  switchDetails(){
    this.setData({
      detailsVisible: !this.data.detailsVisible
    })
  }
})

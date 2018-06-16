const app = getApp();
const service = require('../../service/service.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    banner: [],
    item: [],
    list: [],
    recommend: [],
    ticket: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.startPullDownRefresh();
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
    service
      .indexService()
      .then((res)=>{
        let { data } = res;
        console.log(data);
        this.setData({
          banner: data.banner,
          item: data.item,
          list: data.list,
          recommend: data.recommend,
          ticket: data.ticket
        })
        wx.stopPullDownRefresh();
      })
      .catch((err)=>{
        wx.stopPullDownRefresh();
      })
  },
  toTop: function(){
    wx.pageScrollTo({
      scrollTop: 0
    })
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

  }
})

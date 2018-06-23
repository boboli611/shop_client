const app = getApp();
const service = require('../../mock-service/index.js');
const ticket = require('../../mock-service/ticket.js');
const util = require("../../utils/util.js")
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
    page:1,
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
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    service
      .indexService()
      .then((res) => {
        let { data } = res;
        this.setData({
          banner: data.banner,
          item: data.item,
          list: data.list,
          recommend: data.recommend,
          ticket: data.ticket
        })
        wx.stopPullDownRefresh();
      })
      .catch((err) => {
        wx.onReachBottom();
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
    let that = this
    var page = this.data.page + 1;
    service
      .indexProductList(page)
      .then((res) => {
        let { data } = res;
        console.log(data);
        if (data.list.length > 0){
          this.data.page++;
        }
        this.setData({
          list: that.data.list.concat(data.list),
        })
        //wx.stopPullDownRefresh();
      })
      .catch((err) => {
        wx.onReachBottom();
      })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  banner(event){
    console.log(event)
    var id = event.currentTarget.dataset.productid
    wx.navigateTo({
      url: '/pages/sku-item/sku-item?id='+id + '&title=',
    })
  },
  toTop: function () {
    wx.pageScrollTo({
      scrollTop: 0
    })
  },
  ticket:function(e){
    console.log(e)
    var id = e.currentTarget.dataset.ticketId;
    console.log(id)
    ticket.add(id)
      .then((res) => {
        if (res.errno > 0){
          util.showError(res.msg)
          return
        }
        
        this.setData({
          list: that.data.list.concat(data.list),
        })
        //wx.stopPullDownRefresh();
      })
      .catch((err) => {
        util.showError("领取失败")
      })
  }
})

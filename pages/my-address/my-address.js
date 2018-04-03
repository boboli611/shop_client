// pages/my-address/my-address.js
const service = require('../../service/service.js');
const store = require('../../store/store.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    state: "complete", // "edit": 编辑状态, "complete": 浏览状态,
    addressList: []
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
    store.addWatcher('addressList', this);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.startPullDownRefresh();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.stopPullDownRefresh();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    store.delWatcher('addressList', this);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    service
      .addressService()
      .get()
      .then((res)=>{
        let defaultIndex = res.data.findIndex( ad => ad.status === 1 );
        let defaultAddress = [];
        if( defaultIndex > -1 ){
          defaultAddress = res.data.splice(defaultIndex, 1);
        }
        store.setData('addressList',  defaultAddress.concat(res.data) );
        wx.stopPullDownRefresh();
      })
      .catch((err)=>{
        wx.stopPullDownRefresh();
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

  },
  switchPageState(){
    this.setData({
      state: this.data.state === 'complete'? 'edit' : 'complete'
    })
  }
})

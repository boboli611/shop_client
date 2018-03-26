// pages/order-list/order-list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state: '全部',
    headerLine: {
      left: 0,
      width: 0
    },
    loading: false
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
  switchOrderState(event){
    let stateName = event.currentTarget.dataset.stateName;

    this.setData({
      state: stateName
    }, this.updateHeaderLine);

    // this.updateHeaderLine();
  }
})

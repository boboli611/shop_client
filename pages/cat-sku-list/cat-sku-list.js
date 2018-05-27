// pages/cat-sku-list/cat-sku-list.js
const service = require('../../mock-service/cate-search.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    skuList: [],
    currentPage: 1,
    title: '',
    loadingNext: 0, // 0: 初始状态, 1: 下一页加载中, -1: 没有下一页了
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.title
    })
    this.data.title = options.title;
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
      .mockSearchService(this.data.title, this.data.currentPage)
      .then((res)=>{
         console.log(res)
        if( res.data.search ){
          this.setData({
            skuList: res.data.list,
            currentPage: this.data.currentPage + 1
          })
        }else{
          this.setData({
            //skuList: res.data.list,
            //currentPage: this.data.currentPage + 1,
            loadingNext: -1
          })
        }

        wx.stopPullDownRefresh();
      })
      .catch(()=>{
        wx.stopPullDownRefresh();
      })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if( this.data.loadingNext === -1 || this.data.loadingNext === 1 ){
      return;
    }
    this.setData({
      loadingNext: 1,
    }, ()=>{
      service
        .mockSearchService( this.data.title, this.data.currentPage+1 )
        .then((res)=>{
          if( res.data.search ){
            this.setData({
              skuList: this.data.skuList.concat(res.data.list),
              currentPage: this.data.currentPage + 1,
              loadingNext: 0
            })
          }else{
            this.setData({
              loadingNext: -1
            })
          }

        })
        .catch(()=>{
          this.setData({
            loadingNext: -1
          })
        })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

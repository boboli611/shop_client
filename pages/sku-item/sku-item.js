const service = require('../../service/service.js');
const store = require('../../store/store.js');
// pages/sku-item/sku-item.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addCartAnimation: false,
    detailsVisible: false,
    skuInfoVisible: false,
    // 商品信息
    id: -1,
    cover: [],
    title: '',
    desc: '',
    recommend: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log( options.id )
    this.setData({
      title: options.title,
      id: options.id
    })
    service
      .skuItemService(options.id)
      .then((res)=>{
        console.log(res)
        let { info, recommend } = res.data;
        this.setData({
          cover: info.cover,
          desc: info.desc,
          recommend: recommend.concat(recommend)
        })
      })
      .catch((err)=>{
        console.log('catch', err)
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
  },
  switchSkuInfo(){
    this.setData({
      skuInfoVisible: !this.data.skuInfoVisible
    })
  }
})

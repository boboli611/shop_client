const expressage = require('../../mock-service/expressage.js');
const order = require('../../mock-service/order.js');
const utils = require('../../utils/util.js');
// pages/update-delivery/update-delivery.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    company:[],
    companyIds:[],
    companyId:0,
    expressage:"",
    mobile:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    expressage.companyList().then((res)=>{
        this.setData({
          id:options.id,
          company:res.data.name,
          companyIds: res.data.id,
        })
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
  submit(){
    var params = {}
    params.id = this.data.id
    params.companyId = this.data.companyId
    params.expressage = this.data.expressage
    params.mobile = this.data.mobile
    if (!utils.isMobile(params.mobile)) {
      utils.showError("请输入正确手机号")
      return
    }

    order.UploadExpressage(params).then((res)=>{
      if (res.errno != 0){
        utils.showError(res.msg)
        return
      }
      wx.navigateBack({
        url: -1
      })
    })
  },
  bindCompany(e){
    var id = e.detail.value
    var companyId = this.data.companyIds[id]
    this.setData({
      companyId: companyId,
      index: e.detail.value,
    })
  },
  bindExpressage: function (event) {
    var expressage = event.detail.value;
    this.setData({
      expressage: expressage
    });
  },
  bindMobile: function (event) {
    var mobile = event.detail.value;
    
    this.setData({
      mobile: mobile
    });
  },
})
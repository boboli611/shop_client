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
    this.list()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    //wx.stopPullDownRefresh();
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
    
  },
  list(){
    service
      .addressService()
      .get()
      .then((res) => {
        let defaultIndex = res.data.findIndex(ad => ad.status === 1);
        let defaultAddress = [];
        if (defaultIndex > -1) {
          defaultAddress = res.data.splice(defaultIndex, 1);
        }
        store.setData('addressList', defaultAddress.concat(res.data));
        wx.stopPullDownRefresh();
      })
      .catch((err) => {
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
  },
  switchDelete(e){
    console.log(e)
    let that = this
    var index = e.currentTarget.dataset.index
    var address = this.data.addressList[index]
    var addressList = this.data.addressList
    console.log(address);
    service
      .addressService()
      .delete(address.id)
      .then((res) => {
        if (res.sucess != true){
          return
        }
        
        addressList.splice(index, 1);
        console.log(addressList);
        this.setData({
          addressList: addressList,
        })
        //store.setData('addressList', defaultAddress.concat(res.data));
        //wx.stopPullDownRefresh();
      })
      .catch((err) => {
        wx.stopPullDownRefresh();
      })

  },
  switchChange(e) {
    console.log(e)
    let that = this
    var index = e.currentTarget.dataset.index
    var address = this.data.addressList[index]
    var addressList = this.data.addressList
    var status = address.status === 0 ? 1 : 0;
    console.log("start", addressList)
    service
      .addressService()
      .updateStatus(address.id, status)
      .then((res) => {
        console.log(res)
        if (res.sucess != true) {
          return
        }

        var defaultIndex = addressList.findIndex((value, index, arr) => {
          return value.status === 1
        })
        
        console.log(defaultIndex)
        if (defaultIndex > -1) {
          addressList[defaultIndex].status = 0
        }
        console.log("index",defaultIndex)
        addressList[index].status = status
        console.log(addressList);
        this.setData({
          addressList: addressList,
        })

      })
      .catch((err) => {
        wx.stopPullDownRefresh();
      })
  },
})

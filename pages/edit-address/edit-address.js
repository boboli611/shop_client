// pages/edit-address/edit-address.js
const store = require('../../store/store.js');
const Watcher = require('../../watcher/watcher.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    region: [],
    name: '',
    mobile: '',
    address: '',
    province: '',
    city: '',
    county: ''
  },
  watch: {
    region( newRegion ){
      this.changeData({
        province: newRegion[0].substr(0, 4),
        city: newRegion[1].substr(0, 4),
        county: newRegion[2].substr(0, 4),
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.watcher = new Watcher(this);

    let {addressId} = options;
    wx.setNavigationBarTitle({
      title: addressId? '编辑地址' : '添加地址',
    })
    if( addressId ){
      let addressList = store.getData('addressList');
      let address = addressList.find( address => address.id == addressId );

      console.log(addressId, addressList, address)
      this.changeData({
        id: addressId,
        region: [ address.province, address.city, address.county ],
        name: address.name,
        mobile: address.mobile,
        address: address.address,
      })
    }

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
    this.watcher = null;
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
  bindRegionChange: function (e) {
    let region = e.detail.value;
    this.changeData({
      region: region,
    })
  },
  formSubmit(e){
    let { name, mobile, region, address } = e.detail.value;
    let mobileReg = /^[1][3,4,5,7,8][0-9]{9}$/;
    new Promise((res, rej)=>{
      if( !name ){
        return rej('请输入姓名');
      }
      if( !mobileReg.test(mobile) ){
        return rej('请输入正确的手机号码');
      }
      if( region.length < 3 ){
        return rej('请选择地区')
      }
      if( !address ){
        return rej('请输入详细地址')
      }
      res();
    })
    .then(()=>{
      wx.showLoading({title: '地址修改中...', mask: true})
      let addressObj = { name, mobile, region, address };
      if( this.data.id ){
        addressObj['id'] = this.data.id;
        console.log('updateAddress')
        return store.dispatchEvent('updateAddress', addressObj);
      }else{
        return store.dispatchEvent('addAddress', addressObj);
      }
    })
    .then((res)=>{
      wx.hideLoading();
      console.log(res);
    })
    .catch((err)=>{
      wx.showToast({
        title: err,
        icon: 'none'
      })
      wx.hideLoading();
    })
  }
})

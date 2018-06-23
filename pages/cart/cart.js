// pages/cart/cart.js
const store = require('../../store/store.js');
const Watcher = require('../../watcher/watcher.js');
const service = require('../../mock-service/cart.js');
const utils = require('../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    state: 'normal', //'normal': 正常状态, 'manage': 编辑,
    // 单个编辑状态\
    editMap: {},
    // 本地购物车数据
    cart: {},
    // 管理状态的选中状态
    manageSelectMap: {},
    // 管理普通状态下的商品选中状态
    normalSelectMap: {},
    // 总数量
    skuCount: 0,
    // 总价
    sumPrice: 0,
    // 是否全选
    isSelectedAll: false,
    // 编辑详情的商品在购物车中的key
    editSkuInfoKey: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.watcher = new Watcher(this);
    store.addWatcher('cart', this);
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
    this.getList()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      data: {
        state: 'normal', 
        editMap: {},
        cart: {},
        manageSelectMap: {},
        normalSelectMap: {},
        skuCount: 0,
        sumPrice: 0,
        isSelectedAll: false,
        editSkuInfoKey: null,
      },
    })
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
  // 打开商品详情（尺寸，颜色）编辑界面
  openSkuInfoEditModal(event){
    let key = event.currentTarget.dataset.key;
    this.changeData({
      editSkuInfoKey: key
    });
    setTimeout(()=>{
      console.log(this.data.editSkuInfoKey)
    }, 100)
  },
  // 关闭商品详情（尺寸，颜色）编辑界面
  closeSkuInfoEditModal(){
    this.changeData({
      editSkuInfoKey: null
    });
  },
  // 全选 | 全不选
  selectAll(){
    var sumPrice = 0
    var skuCount = 0
    let value = !this.data.isSelectedAll;
    let mapKey = this.data.state === 'normal'? 'normalSelectMap' : 'manageSelectMap';
    for( let key in this.data.cart ){
      this.data[mapKey][key] = value;
      sumPrice += this.data.cart[key].price * 100 * this.data.cart[key].num
      skuCount++
    }

    if (value == false){
      sumPrice = 0;
      skuCount = 0;
    }
    
    this.changeData({
      [mapKey]: this.data[mapKey],
      isSelectedAll: value,
      sumPrice: sumPrice / 100,
      skuCount: skuCount,
    });
  },
  // 切换单个商品的选中状态
  switchSkuSelectedState(event){
    let key = event.currentTarget.dataset.cartskuKey;

    if( this.data.state === 'normal' ){
      this.data.normalSelectMap[key] = !this.data.normalSelectMap[key];
      var sku = this.data.cart[key]
      var sumPrice = this.data.sumPrice
      var skuCount = this.data.skuCount
      if (this.data.normalSelectMap[key] == false){
        skuCount--;
        sumPrice = sumPrice * 100 - sku.price * 100 * sku.num
      }else{
        skuCount++;
        sumPrice = sumPrice * 100 + sku.price * 100 * sku.num
      }
      console.log("sumPrice:" , sumPrice)
      console.log("skuCount:", skuCount)
      this.changeData({
        normalSelectMap: this.data.normalSelectMap,
        skuCount: skuCount,
        sumPrice: sumPrice / 100,
        isSelectedAll: false,
      })
    }else{

      this.data.manageSelectMap[key] = !this.data.manageSelectMap[key];
      this.setData({
        manageSelectMap: this.data.manageSelectMap
      })
    }
  },
  // 删除管理状态下 选中的商品
  deleteManageSelectSku(){
    var id = [];
    
    for( let skuKey in this.data.manageSelectMap ){
      id.push(this.data.cart[skuKey].shop_id)
      
    }
    console.log(id)
    
    service
      .drop(id)
    .then((res) => {
      this.setData({
        manageSelectMap:[]
      })
      this.getList()
    })

  },
  // 在管理状态和普通状态间切换
  switchPageState(){
    this.setData({
      state: this.data.state === 'normal'? 'manage' : 'normal'
    })
  },
  // 单个商品进入编辑模式
  edit( event ){
    let key = event.currentTarget.dataset.skuKey;
    let editMap = this.data.editMap;
    if( editMap[key] ){
      return;
    }
    editMap[key] = true;
    this.setData({
      editMap
    })
  },
  // 完成编辑
  completeEdit( event ){
    let key = event.currentTarget.dataset.skuKey;
    let editMap = this.data.editMap;
    if( !editMap[key] ){
      return;
    }
    
    var sku = this.data.cart[key]
    service
      .update(sku.shop_id, sku.storage_id, sku.num)
      .then(res => {
        editMap[key] = false;
        this.setData({
          editMap
        })
      })
    
  },
  // 减少数量
  minusNum(event){
    let index = event.currentTarget.dataset.baseSku;
    var sku = this.data.cart;
    
    if (sku[index].num <= 1 ){
      return;
    }
    sku[index].num--;
    this.setData({
      cart: sku,
    })
  },
  // 增加数量
  maxusNum(event) {
    let index = event.currentTarget.dataset.baseSku;
    var sku = this.data.cart;
    sku[index].num++;
    this.setData({
      cart: sku,
    })
  },
  // 付款按钮
  pay(){

    var ids = []
    for (let key in this.data.normalSelectMap) {

      if (this.data.normalSelectMap[key] == false){
        continue
      }

      ids.push(this.data.cart[key].shop_id)
    }

    if (ids.length == 0){
      utils.showError("请选择购物车商品")
      return
    }

    wx.navigateTo({
      url: '../cart-confirm/cart-confirm?ids=' + ids.join(',')
    })
  },
  getList(){
    service
      .list()
      .then((res) => {
        console.log("length" + res.data.info.length)
        this.setData({
          cart: res.data.info
        });
      })
  }
})

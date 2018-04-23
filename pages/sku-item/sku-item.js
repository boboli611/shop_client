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
    price: '',
    desc: '',
    style: [],
    size: [],
    recommend: [],
    skuInfo: [],
    sell: 0,
    selectedProperties: {
      style: null,
      size: null,
      num: 1,
    }
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
        let style = {};
        let size = {};

        info.storage.forEach((st)=>{
          if( style[ st.style ] ){
            style[ st.style ] = {
              maxNum: Math.max( style[ st.style ].maxNum, st.num ),
              stock:  Math.max( style[ st.style ].maxNum, st.num ),
            };
          }else{
            style[ st.style ] = {
              maxNum: st.num,
              stock:  st.num,
            };
          }
          if( size[ st.size ] ){
            size[ st.size ] = {
              maxNum: Math.max( size[ st.size ].maxNum, st.num ),
              stock:  Math.max( size[ st.size ].maxNum, st.num ),
            };
          }else{
            size[ st.size ] = {
              maxNum: st.num,
              stock:  st.num,
            };
          }
        })

        this.setData({
          id: info.id,
          cover: info.cover,
          title: info.title,
          price: info.price,
          desc: info.desc,
          storage: info.storage,
          style,
          size,
          sell: info.sell || 0,
          skuInfo: info.info,
          recommend: recommend
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
  // 加入购物车
  addCart(){
    if( !this.data.selectedProperties.size || !this.data.selectedProperties.style ){
      if( !this.data.detailsVisible ){
        this.switchDetails()
      }
      return;
    }
    let stock = this.getRealStock({ id: this.data.id, storage: this.data.storage, style: this.data.selectedProperties.style, size: this.data.selectedProperties.size });
    if( stock <= 0 ){
      wx.showToast({title: '库存不够了', icon: 'none'})
      return;
    }
    // 动画
    this.setData({
      addCartAnimation: true
    });
    setTimeout(()=>{
      this.setData({
        addCartAnimation: false
      })
    }, 1000);
    store.dispatchEvent('addSkuToCart', {
      id: this.data.id,
      title: this.data.title,
      selectedProperties: this.data.selectedProperties
    })
    // 清空选择的尺寸
    this.setData({
      selectedProperties: {
        style: null,
        size: null,
        num: 1,
      }
    })
  },
  // 尺寸框确认按钮
  confirmProperties(){
    if( !this.data.selectedProperties.style ){
      wx.showToast({title: '请先选择颜色', icon: 'none', mask: true});
      return;
    }
    if( !this.data.selectedProperties.size ){
      wx.showToast({title: '请先选择尺寸', icon: 'none', mask: true});
      return;
    }
    this.addCart()
    this.switchDetails();
  },
  // 切换商品细节是否显示 颜色尺寸
  switchDetails(){
    this.setData({
      detailsVisible: !this.data.detailsVisible
    })
  },
  // 切换商品信息
  switchSkuInfo(){
    this.setData({
      skuInfoVisible: !this.data.skuInfoVisible
    })
  },
  // 根据 样式和尺寸计算库存
  getStockByStorageAndStyleAndSize(storage, style, size){
    let st = storage.find( st => st.size === size && st.style === style );
    return st? st.num : 0;
  },
  // 获取购物车中的数量
  getCartSkuNumber(id, style, size){
    let cartSku = store.dispatchEvent('getCartSku', { id, style, size });
    return cartSku? cartSku.selectedProperties.num : 0;
  },
  // 获取真实库存( 根据样式和尺寸计算库存后，再减去购物车中的数量 )
  getRealStock( { storage, id, style, size } ){
    let stock = this.getStockByStorageAndStyleAndSize( storage, style, size ) - this.getCartSkuNumber(id, style, size);
    return Math.max(0, stock);
  },
  setStyle(event){
    let cartData = store.getData('cart');
    let style = event.currentTarget.dataset.style;
    if( this.data.selectedProperties.num > this.data.style[style].stock ){
      if( this.data.style[style].stock > 0 ){
        wx.showToast({title: `库存剩余${this.data.style[style].stock}。请减少数量`, icon: 'none'});
      }
      return;
    }
    // 如果已经选中 改为取消
    style = style === this.data.selectedProperties.style? null : style;

    let selectedSize = this.data.selectedProperties.size;
    if( selectedSize ){
      // 计算所有样式和当前尺寸合并后的库存
      for(let s in this.data.style){
        this.data.style[s].stock = this.getRealStock( { storage: this.data.storage, id: this.data.id, style: s, size: selectedSize } );
      }
    }
    // 计算所有尺寸和当前样式合并后的库存
    for(let s in this.data.size){
      if( style ){
        this.data.size[s].stock = this.getRealStock( { storage: this.data.storage, id: this.data.id, style: style, size: s } );
      }else{
        this.data.size[s].stock = this.data.size[s].maxNum;
      }
    }

    let newSelectedProperties = this.data.selectedProperties;
    newSelectedProperties.style = style;
    this.setData({
      selectedProperties: newSelectedProperties,
      style: this.data.style,
      size: this.data.size
    })
  },
  setSize(event){
    let size = event.currentTarget.dataset.size;
    if( this.data.selectedProperties.num > this.data.size[size].stock ){
      if( this.data.size[size].stock > 0 ){
        wx.showToast({title: `库存剩余${this.data.size[size].stock}。请减少数量`, icon: 'none'});
      }
      return;
    }
    // 如果已经选中 改为取消
    size = size === this.data.selectedProperties.size? null : size;

    let selectedStyle = this.data.selectedProperties.style;
    if( selectedStyle ){
      // 计算所有尺寸和当前样式合并后的库存
      for(let s in this.data.size){
        this.data.size[s].stock = this.getRealStock( { storage: this.data.storage, id: this.data.id, style: selectedStyle, size: s } )
      }
    }
    // 计算所有样式和当前尺寸合并后的库存
    for(let s in this.data.style){
      if( size ){
        this.data.style[s].stock = this.getRealStock( { storage: this.data.storage, id: this.data.id, style: s, size: size } );
      }else{
        this.data.style[s].stock = this.data.style[s].maxNum;
      }
    }

    let newSelectedProperties = this.data.selectedProperties;
    newSelectedProperties.size = size;
    this.setData({
      selectedProperties: newSelectedProperties,
      style: this.data.style,
      size: this.data.size
    })
  },
  minusNum(){
    // if( !this.data.selectedProperties.style ){
    //   wx.showToast({title: '请先选择颜色', icon: 'none', mask: true});
    //   return;
    // }
    // if( !this.data.selectedProperties.size ){
    //   wx.showToast({title: '请先选择尺寸', icon: 'none', mask: true});
    //   return;
    // }
    if( this.data.selectedProperties.num <= 1 ){
      return;
    }
    this.data.selectedProperties.num--;
    this.setData({
      selectedProperties: this.data.selectedProperties
    });
  },
  addNum(){
    if( !this.data.selectedProperties.style ){
      wx.showToast({title: '请先选择颜色', icon: 'none', mask: true});
      return;
    }
    if( !this.data.selectedProperties.size ){
      wx.showToast({title: '请先选择尺寸', icon: 'none', mask: true});
      return;
    }
    let currentStyleNum = this.data.style[ this.data.selectedProperties.style ].stock;
    let currentSizeNum = this.data.size[ this.data.selectedProperties.size ].stock;
    let currentNum = this.data.selectedProperties.num;
    if( currentNum >= currentStyleNum || currentNum >= currentSizeNum ){
      wx.showToast({title: '没有库存了', icon: 'none', mask: true});
      return;
    }
    this.data.selectedProperties.num++;
    this.setData({
      selectedProperties: this.data.selectedProperties
    });
  }
})

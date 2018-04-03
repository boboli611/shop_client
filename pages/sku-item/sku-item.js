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
    selectedProperties: {
      style: null,
      size: null,
      num: 1,
      stock: 999
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
          cover: info.cover,
          title: info.title,
          price: info.price,
          desc: info.desc,
          storage: info.storage,
          style,
          size,
          skuInfo: info.info,
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
  // 加入购物车
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
  // 切换商品细节是否显示
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
  setCurrentStock(style, size){

  },
  setStyle(event){
    let style = event.currentTarget.dataset.style;
    if( this.data.selectedProperties.num > this.data.style[style].stock ){
      return;
    }
    let selectedSize = this.data.selectedProperties.size;
    if( selectedSize ){
      // 计算所有样式和当前尺寸合并后的库存
      for(let s in this.data.style){
        let index = this.data.storage.findIndex( st => st.size === selectedSize && st.style === s );
        this.data.style[s].stock = index < 0? 0 : this.data.storage[ index ].num;
      }
    }
    // 计算所有尺寸和当前样式合并后的库存
    for(let s in this.data.size){
      let index = this.data.storage.findIndex( st => st.style === style && st.size === s );
      this.data.size[s].stock = index < 0? 0 : this.data.storage[ index ].num;
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
      return;
    }
    let selectedStyle = this.data.selectedProperties.style;
    if( selectedStyle ){
      // 计算所有尺寸和当前样式合并后的库存
      for(let s in this.data.size){
        let index = this.data.storage.findIndex( st => st.style === selectedStyle && st.size === s );
        this.data.size[s].stock = index < 0? 0 : this.data.storage[ index ].num;
      }
    }
    // 计算所有样式和当前尺寸合并后的库存
    for(let s in this.data.style){
      let index = this.data.storage.findIndex( st => st.size === size && st.style === s );
      this.data.style[s].stock = index < 0? 0 : this.data.storage[ index ].num;
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
    if( !this.data.selectedProperties.style ){
      wx.showToast({title: '请先选择颜色', icon: 'none', mask: true});
      return;
    }
    if( !this.data.selectedProperties.size ){
      wx.showToast({title: '请先选择尺寸', icon: 'none', mask: true});
      return;
    }
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
    console.log(currentStyleNum, currentSizeNum, currentNum);
    this.data.selectedProperties.num++;
    this.setData({
      selectedProperties: this.data.selectedProperties
    });
  }
})

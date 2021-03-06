// pages/cart/cart.js
const store = require('../../store/store.js');
const Watcher = require('../../watcher/watcher.js');
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
    cartLength: 0,
    // 管理状态的选中状态
    manageSelectMap: {},
    // 管理普通状态下的商品选中状态
    normalSelectMap: {},
    // 总数量
    skuCount: 0,
    // 总价
    sumPrice: 0,
    // 普通状态是否全选
    isSelectedAll: false,
    // 管理状态是否全选
    isManageSelectedAll: false,
    // 编辑详情的商品在购物车中的key
    editSkuInfoKey: null,
  },
  watch: {
    state( newState ){
      if( newState === 'normal' ){
        this.watch.normalSelectMap( this.data.normalSelectMap );
      }else{
        this.changeData({
          editMap: {}
        })
        this.watch.manageSelectMap( this.data.manageSelectMap );
      }
    },
    cart( newCart ){
      let normalSelectMap = {};
      if( Object.keys(newCart).length > 0 ){
        normalSelectMap = this.data.normalSelectMap;
        for( let key in newCart ){
          if( !normalSelectMap.hasOwnProperty(key) ){
            normalSelectMap[key] = true;
          }
        }
      }
      let cartLength = Object.keys(newCart).length;
      let { manageSelectMap } = this.data;
      this.changeData({ normalSelectMap, manageSelectMap, cartLength });
    },
    manageSelectMap( newManageSelectMap ){
      let selectedSkuLength = 0;
      for(let key in newManageSelectMap ){
        if( newManageSelectMap[key] ){
          selectedSkuLength++;
        }
      }
      let isManageSelectedAll = Object.keys(this.data.cart).length === selectedSkuLength;
      if( this.data.isManageSelectedAll !== isManageSelectedAll ){
        this.changeData({
          isManageSelectedAll
        })
      }
    },
    normalSelectMap( newNormalSelectMap ){
      // 计算商品数量
      let skuCount = 0;
      let selectedSkuLength = 0;
      let cart = this.data.cart;
      if( Object.keys(cart).length > 0 ){
        for(let key in newNormalSelectMap ){
          if( newNormalSelectMap[key] ){
            let sku = cart[key];
            if(sku){
              selectedSkuLength++;
              skuCount += sku.selectedProperties.num;
            }
          }
        }
      }
      this.changeData({
        skuCount
      });
      let len = Object.keys(this.data.cart).length;
      let isSelectedAll = len === 0? false : len === selectedSkuLength;
      if( this.data.isSelectedAll !== isSelectedAll ){
        // 计算全选状态
        this.changeData({
          isSelectedAll
        })
      }
    }
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
    store.delWatcher('cart', this);
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
  // 打开商品详情（尺寸，颜色）编辑界面
  openSkuInfoEditModal(event){
    let key = event.currentTarget.dataset.key;
    this.changeData({
      editSkuInfoKey: key
    });
  },
  // 关闭商品详情（尺寸，颜色）编辑界面
  closeSkuInfoEditModal(){
    this.changeData({
      editSkuInfoKey: null
    });
  },
  // 全选 | 全不选
  selectAll(){
    let value;
    if( this.data.state === 'normal' ){
      value = !this.data.isSelectedAll;
      for( let key in this.data.cart ){
        this.data.normalSelectMap[key] = value;
      }
      this.changeData({
        normalSelectMap: this.data.normalSelectMap,
        isSelectedAll: value
      })
    }else{
      value = !this.data.isManageSelectedAll;
      for( let key in this.data.cart ){
        this.data.manageSelectMap[key] = value;
      }

      this.changeData({
        manageSelectMap: this.data.manageSelectMap,
        isManageSelectedAll: value
      })
    }
  },
  // 切换单个商品的选中状态
  switchSkuSelectedState(event){
    let key = event.currentTarget.dataset.cartskuKey;

    if( this.data.state === 'normal' ){
      this.data.normalSelectMap[key] = !this.data.normalSelectMap[key];
      this.changeData({
        normalSelectMap: this.data.normalSelectMap
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
    if( Object.keys(this.data.manageSelectMap).length === 0 ){
      return  wx.showToast({
        icon: 'none',
        title: '请选择需要删除的商品'
      })
    }
    for( let skuKey in this.data.manageSelectMap ){
      if( this.data.manageSelectMap[skuKey] === true ){
        store.dispatchEvent('deleteCartSkuByKey', skuKey);
      }
    }
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
    editMap[key] = false;
    this.setData({
      editMap
    })
  },
  // 减少数量
  minusNum(event){
    let baseSku = event.currentTarget.dataset.baseSku;
    if( baseSku.selectedProperties.num <= 1 ){
      return;
    }
    baseSku.selectedProperties.num--;
    store.dispatchEvent('updateCartSku', baseSku);
  },
  // 付款按钮
  pay(){
    wx.navigateTo({
      url: '../order-confirm/order-confirm'
    })
  }
})

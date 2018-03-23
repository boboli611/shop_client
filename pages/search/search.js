const storage = require('../../utils/storage.js');
const utils = require('../../utils/util.js');
const SEACH_HISTORY_KEY = 'search_history';

const searchHistory = {
  get(){
    // return storage
    //   .get(SEACH_HISTORY_KEY)
    return new Promise((res)=>{
      storage
        .get(SEACH_HISTORY_KEY)
        .then((d)=>{
          res(d);
        })
        .catch((err)=>{
          // 如果报错或者没有查到历史记录，返回空数组
          res([]);
        })
    })
  },
  set(value){
    // return storage.set(SEACH_HISTORY_KEY)
    searchHistory
      .get()
      .then((d)=>{
        utils.array.uniquePush(d, value);
        return d;
      })
      .then((newList)=>{
        storage.set(SEACH_HISTORY_KEY, newList)
      })
      .catch((err)=>{

      })
  }
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchHistory: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    searchHistory
      .get()
      .then((d)=>{
        this.setData({
          searchHistory: d
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  // 自定义方法
  searchSku(event){
    let value = utils.trimString( event.detail.value );
    if( !value ){
      return;
    }
    // search
    searchHistory.set(value);

  }
})
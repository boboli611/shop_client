const storage = require('../../utils/storage.js');
const utils = require('../../utils/util.js');
const service = require('../../service/service.js');


const SEACH_HISTORY_KEY = 'search_history';
// 搜索历史
const searchHistory = {
  get(){
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
    searchHistory
      .get()
      .then((d)=>{
        if( d.indexOf(value) < 0 ){
          d.unshift(value);
        }
        // 只保留10个历史记录
        return d.splice(0, 10);
      })
      .then((newList)=>{
        storage.set(SEACH_HISTORY_KEY, newList)
      })
      .catch((err)=>{

      })
  },
  clear(){
    storage.set(SEACH_HISTORY_KEY, []);
  }
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: '',
    pageState: 'wait', // wait: 等待输入（显示推荐、历史记录）, input:正在输入, result: 搜索结果
    searchHistory: [],
    searchResult: []
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
  // 点击搜索框确认按钮
  confirmSearchInput( event ){
    let value = utils.trimString(event.detail.value);
    if (!value) {
      return;
    }
    searchHistory.set(value);
    this.searchSku( value );
  },
  // 搜索sku
  searchSku( keyword ){
    service
      .searchService(keyword)
      .then((data)=>{

        if (this.data.searchHistory.indexOf(keyword) < 0) {
          this.data.searchHistory.unshift(keyword);
        }


        this.setData({
          searchResult: data,
          pageState: 'result',
          searchHistory: this.data.searchHistory
        })
      })
  },
  // 点击关键字搜索
  tapKeyword( event ){
    let keyword = event.currentTarget.dataset.keyword;
    this.setData({
      keyword
    })
    this.searchSku(keyword);
  },
  // 搜索框获取焦点
  onInputFocus(){
    this.setData({
      searchResult: [],
      pageState: 'wait'
    })
  },
  // 清空搜索历史
  clearSearchHistory(){
    searchHistory.clear();
    this.setData({
      searchHistory: []
    })
  }
})
const utils = require('../../utils/util.js');
const service = require('../../service/service.js');
const store = require('../../store/store.js');

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
    store.addWatcher('searchHistory', this);
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
    store.delWatcher('searchHistory', this);
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
    // searchHistory.set(value);
    this.searchSku( value );
  },
  // 搜索sku
  searchSku( keyword ){
    service
      .searchService(keyword)
      .then((data)=>{
        let searchHistoryList = store.getData('searchHistory');
        if ( searchHistoryList.indexOf(keyword) < 0) {
          searchHistoryList.unshift(keyword);
          store.setData('searchHistory', searchHistoryList);
        }

        setTimeout(()=>{
          this.setData({
            searchResult: data,
            pageState: 'result',
          })
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

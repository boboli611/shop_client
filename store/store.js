// 公用数据源
class Store{
  constructor(){
    this.data = {};
    this.shadow = {};
    this.createWatchers();
  }
  // 添加新的数据
  addData(key, value){
    this.shadow[key] = {
      value: value,
      watchers: new Set()
    };
    this.createWatcherByKey(key);
    return this;
  }
  // 设置数据
  setData(key, value){
    this.data[key] = value;
    return this;
  }
  // 获取数据
  getData(key){
    return this.data[key];
  }
  // 批量生成watcher队列
  createWatchers(){
    for(let key in this.data){
      this.shadow[ key ] = {
        value: this.data[key],
        watchers: new Set()
      };
      this.createWatcherByKey(key);
    }
  }
  // 根据key生成watcher队列
  createWatcherByKey(key){
    Object.defineProperty(this.data, key, {
      get: () => {
        return this.shadow[key].value
      },
      set: (newValue) => {
        this.shadow[key].value = newValue;
        for( let watcher of this.shadow[key].watchers.values() ){
          if( typeof watcher  === 'function'){
            watcher(newValue);
          }else{
            watcher.setData({
              [key]: newValue
            })
          }
        }
      }
    })
  }
  // 给一个key 添加一个 watcher
  addWatcher(dataKey, watcher){
    if( this.shadow.hasOwnProperty(dataKey) ){
      this.shadow[ dataKey ].watchers.add( watcher );
      if( watcher.setData ){
        watcher.setData({
          [dataKey]: this.shadow[ dataKey ].value
        })
      }
    }else{
      console.warn(`store do not has this key: '${dataKey}'`);
    }
    return this;
  }
  // 删除已有的watcher 防止内存泄漏
  delWatcher(dataKey, watcher){
    if( this.shadow.hasOwnProperty(dataKey) ){
      this.shadow[ dataKey ].watchers.delete( watcher );
    }else{
      console.warn(`store do not has this key: '${dataKey}'`);
    }
    return this;
  }
}

// 实例
const searchHistory = require('./search-history.js');


let store = new Store();
// 搜索历史(将内存与本地持久化的数据进行同步)
store.addData('searchHistory', searchHistory.getSync());
store.addWatcher('searchHistory', (newValue)=>{
  // 去重
  let newSearchHistoryUnique = [ ...new Set(newValue) ];
  if( newSearchHistoryUnique.length > 10 || newSearchHistoryUnique.length !== newValue.length ){
    setTimeout(()=>{
      store.setData('searchHistory', newSearchHistoryUnique);
    })
  }else{
    searchHistory.set(newSearchHistoryUnique);
  }
})
module.exports = store;

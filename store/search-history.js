const storage = require('../utils/storage.js');
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
    storage.set(SEACH_HISTORY_KEY, value)
  },
  clear(){
    storage.set(SEACH_HISTORY_KEY, []);
  },
  getSync(){
    try{
     return storage.getSync(SEACH_HISTORY_KEY);
    }catch(e){
      return [];
    }
  },
  setSync(value){
    let oldValue = searchHistory.getSync();
    try{
      storage.set(SEACH_HISTORY_KEY, newValue);
    }catch(e){}
  }
}
module.exports = searchHistory;

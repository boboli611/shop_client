// 公用数据源
class Store{
  constructor(){
    this.data = {};
    this.shadow = {};
    this.createWatchers();
    this.eventMap = {};
  }
  // 添加新的数据
  addData(key, value){
    if( this.data.hasOwnProperty(key) ){
      return;
    }
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
  registerEvent(eventName, eventAction){
    this.eventMap[ eventName ] = eventAction;
  }
  dispatchEvent(eventName, ...argvs){
    return this.eventMap[eventName](...argvs);
  }
  // 批量生成watcher队列
  createWatchers(){
    for(let key in this.data){
      this.shadow[ key ] = {
        value: this.data[key],
        watchers: new Set(),
        watchersRunning: false
      };
      this.createWatcherByKey(key);
    }
  }
  runWatcherByKey(key){
    if( this.shadow[key].watchersRunning ){
      return;
    }
    this.shadow[key].watchersRunning = true;
    setTimeout(()=>{
      for( let watcher of this.shadow[key].watchers.values() ){
        if( typeof watcher  === 'function'){
            watcher(this.data[key]);
          }else{
            watcher.setData({
              [key]: this.data[key]
            })
          }
      }
      this.shadow[key].watchersRunning = false;
    }, 50);
  }
  // 根据key生成watcher队列
  createWatcherByKey(key){
    Object.defineProperty(this.data, key, {
      get: () => {
        return this.shadow[key].value
      },
      set: (newValue) => {
        let oldValue = this.shadow[key].value;
        this.shadow[key].value = newValue;
        this.runWatcherByKey(key, newValue, oldValue);
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
      }else{
        watcher(this.shadow[ dataKey ].value)
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

/* -----------------------------------    实例   -------------------------------------------------------*/
const searchHistory = require('./search-history.js');
const storage = require('../utils/storage.js');
const service = require('../service/service.js');

let store = new Store();
/* -----------------------------------    搜索历史   -------------------------------------------------------*/
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
/* -----------------------------------    购物车  -------------------------------------------------------*/
const CART_KEY = 'LIPEZ_CART';
let cartData = {}
try{
    cartData = storage.getSync(CART_KEY) || {};
}catch(e){}


store.addData('cart', cartData);
store.addWatcher('cart', (newCartData)=>{
  storage.set(CART_KEY, newCartData);
})
store.registerEvent('addSkuToCart', (baseSku)=>{
  // interface baseSku{
  //   id: number,
  //   title: string,
  //   selectedProperties: { style: string, size: string, num: number }
  // }
  if(
    !baseSku.hasOwnProperty('id') ||
    !baseSku.hasOwnProperty('title') ||
    !baseSku.hasOwnProperty('selectedProperties')
  ){
    consle.error(baseSku);
    throw new Error('加入购物车数据格式不对');
    return;
  }
  let cart = store.getData('cart');
  let key = `${baseSku.id}_${encodeURI(baseSku.selectedProperties.size)}_${encodeURI(baseSku.selectedProperties.style)}`;
  let cartSku = cart[key];
  if( cartSku ){
    cart[ key ].selectedProperties.num += baseSku.selectedProperties.num;
  }else{
    cart[ key ] = {
      id: baseSku.id,
      title: baseSku.title,
      selectedProperties: {
        style: baseSku.selectedProperties.style,
        size: baseSku.selectedProperties.size,
        num: baseSku.selectedProperties.num,
      }
    }
  }
  store.setData('cart', cart);
});
store.registerEvent('updateCartSku', (baseSku)=>{
  if(
    !baseSku.hasOwnProperty('id') ||
    !baseSku.hasOwnProperty('title') ||
    !baseSku.hasOwnProperty('selectedProperties')
  ){
    consle.error(baseSku);
    throw new Error('加入购物车数据格式不对');
    return;
  }
  let cart = store.getData('cart');
  let key = `${baseSku.id}_${encodeURI(baseSku.selectedProperties.size)}_${encodeURI(baseSku.selectedProperties.style)}`;
  cart[ key ] = {
    id: baseSku.id,
    title: baseSku.title,
    selectedProperties: {
      style: baseSku.selectedProperties.style,
      size: baseSku.selectedProperties.size,
      num: baseSku.selectedProperties.num,
    }
  }
  store.setData('cart', cart);
})
// 获取购物车中的商品
store.registerEvent('getCartSku', (baseSku)=>{
  // interface baseSku{
  //   id: number,
  //   style: string,
  //   size: string,
  // }
  let cart = store.getData('cart');
  let sku = cart[ `${baseSku.id}_${encodeURI(baseSku.size)}_${encodeURI(baseSku.style)}` ] || null;
  return JSON.parse( JSON.stringify( sku ) );
})
// 根据 id, size, style 删除购物车中的 商品
store.registerEvent('deleteCartSkuByIdSizeStyle', ({id, size, style})=>{
  let cart = store.getData('cart');
  let key = `${id}_${encodeURI(size)}_${encodeURI(style)}`;
  let sku = cart[ key ];
  if( sku ){
    delete cart[key];
    store.setData('cart', cart);
  }
})
// 根据购物车中的key 来删除商品
store.registerEvent('deleteCartSkuByKey', (key)=>{
  let cart = store.getData('cart');
  let sku = cart[ key ];
  if( sku ){
    delete cart[key];
    store.setData('cart', cart);
  }
})
// 晴空购物车
store.registerEvent('clearCart', ()=>{
  let cart = store.getData('cart');
  if( Object.keys(cart).length > 0 ){
    store.setData('cart', {});
  }
})
/* -----------------------------------   地址  -------------------------------------------------------*/

store.addData('addressList', []);
store.registerEvent('addAddress', (addressObj)=>{

});
store.registerEvent('updateAddress', (addressObj)=>{
  console.log('updateAddress', addressObj)
  let promise = service
    .addressService()
    .update(addressObj)
    console.log(promise)
    return promise;
});

module.exports = store;

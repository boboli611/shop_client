class Watcher{
  constructor( pageInstance ){
    this.pageInstance = pageInstance;
    this.pageInstance.changeData = this.changeData.bind(this);
    this.shadowData = {};
    this.createWatchers();
    this.changeQueue = [];
    this.ticking = false;
  }
  createWatchers(){
    let { data, watch } = this.pageInstance;
    for( let key in watch ){
      if( data.hasOwnProperty(key) ){
        watch[key] = watch[key].bind(this.pageInstance);
        let value = data[key];
        this.shadowData[key] = value;
        Object.defineProperty(data, key, {
          get: () => {
            return this.shadowData[key];
          },
          set: ( newValue ) => {
            this.shadowData[key] = newValue;
            watch[key](newValue);
          }
        })
      }
    }
  }
  changeData(data, callback){
    if( this.ticking ){
      this.changeQueue.push({
        data,
        callback
      })
    }else{
      this.ticking = true;
      this.changeData(data, callback);
      setTimeout(()=>{
        let mergedData = {};
        let callbackList = [];
        this.changeQueue.forEach((queueObj)=>{
          for(let key in queueObj.data){
            mergedData[key] = JSON.parse(JSON.stringify(queueObj.data[key]));
          }
          typeof queueObj.callback === 'function' ? callbackList.push(queueObj.callback) : '';
        })
        this.changeQueue = [];
        this.ticking = false;
        // // 去重 防止死循环
        // for( let key in mergedData ){
        //   if( this.pageInstance.data[key] === mergedData[key] ){
        //     delete mergedData[key];
        //   }
        // }
        // setData可能会导致新的watch执行,所以放在最后
        this.pageInstance.setData(mergedData, ()=>{
          callbackList.forEach((cb)=>{
            cb();
          })
        })

      }, 50);
    }
    // this.pageInstance.setData(data, callback);
  }
  startTick(){
    this.ticking = true;
  }
}

module.exports = Watcher;

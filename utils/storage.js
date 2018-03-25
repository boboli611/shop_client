const storage = {
  set(key, value){
    return new Promise((resolve, reject)=>{
      wx.setStorage({
        key: key,
        data: value,
        success: () => {
          resolve();
        },
        fail: (err) => {
          reject(err);
        }
      })
    })
  },
  get(key){
    return new Promise((resolve, reject)=>{
      wx.getStorage({
        key: key,
        success: (res) => {
          resolve(res.data);
        },
        fail: (err) => {
          reject(err);
        }
      })
    });
  },
  getSync(key){
    return wx.getStorageSync(key)
  },
  setSync(key, value){
    return wx.setStorageSync(key, value);
  }
}

module.exports = storage;

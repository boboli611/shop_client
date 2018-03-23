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
          console.log(111)
          
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
  }
}

module.exports = storage;
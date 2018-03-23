const array = {
  uniquePush(arr, value){
    if( arr.indexOf( value ) < 0 ){
      arr.push(value);
    }
  }
};

module.exports = array;
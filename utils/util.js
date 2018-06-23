const array = require('./array.js');

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const showError = message =>{
  wx.showToast({
    title: message,
    icon: 'none',
    duration: 2000
  })
}

const showMessage = message => {
  wx.showToast({
    title: message,
    icon: 'none',
    duration: 2000
  })
}


const isMobile = (mobile) =>{
  var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
  if (!myreg.test(mobile)) {
    return false;
  } else {
    return true;
  }
}  
const rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
const trimString = str => (str + '').replace(rtrim, '');

module.exports = {
  formatTime,
  trimString,
  array,
  showError,
  isMobile,
  showMessage,
}

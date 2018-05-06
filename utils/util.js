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

const rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
const trimString = str => (str + '').replace(rtrim, '');

module.exports = {
  formatTime,
  trimString,
  array,
  showError,
}

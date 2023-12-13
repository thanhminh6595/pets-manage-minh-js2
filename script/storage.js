"use strict";

/////////////////////// - Lưu xuống LocalStorage.
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}
////////////////////// - lấy dữ liệu từ LocalStorage
/*
Việc thêm giá trị defaultVal sẽ giúp bạn xử lý được cho trường hợp 
nếu dữ liệu chưa được lưu vào localstorage thì sẽ bị các lỗi liên 
quan đến biến null, undefined.
*/
function getFromStorage(key, defaultVal) {
  return localStorage.getItem(key) ?? defaultVal; //Null or undefinded
}

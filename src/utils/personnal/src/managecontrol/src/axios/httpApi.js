const apiInterface = {};

/* 获取当前登陆人库区信息 */
apiInterface.getCurPointHouse = function() {
  var p = {
    url: "_data/gc/user/getCurPointHouse",
    method: "post"
  };
  return p;
};
/* 获取当前登陆人可查阅库区列表 */
apiInterface.getstorepointList = function() {
  var p = {
    url: "_data/bsi/storepoint/listByorgId",
    method: "post"
  };
  return p;
};
/* 获取当前库区下仓房列表 */
apiInterface.getStorePointWithHouses = function() {
  var p = {
    url: "_data/gc/storage/storePoint/getStorePointWithHouses",
    method: "post"
  };
  return p;
};
/* 获取当前库区/仓房下的设备列表 */
apiInterface.getStoreHouseDevice = function() {
  var p = {
    url: "_data/gc/device/display/storeHouseDevice/getStoreHouseDevice",
    method: "post"
  };
  return p;
};
/* 获取当前库区/仓房下的设备列表 */
apiInterface.doDeviceOperation = function(url) {
  var p = {
    url: "_data/gc/device/operation/" + url,
    method: "post"
  };
  return p;
};
/* 切换plc到柜控,程控,通风,气调*/
apiInterface.switchPlcOperation = function(type) {
    var p = {
        url: "_data/gc/device/operation/plc/" + type,
        method: "post"
    };
    return p;
};
/* socket主路径 */
apiInterface.socketMain = function() {
  var p = {
      url: process.env.NODE_ENV === "production" ? "/oh-scada/_wst" : "/admin/_wst"
  };
  return p;
};
/* socket注册 */
apiInterface.socketRegister = function(storePointId,storeHouseId) {
  var p = {
      url: `/_msg/house/monitor/${storePointId}/${storeHouseId}`
  };
  return p;
};
/* 定时获取仓房设备状态订阅 */
apiInterface.getDeviceState = function(storePointId,storeHouseId) {
  var p = {
    url: `/_topic/house/monitor/${storePointId}/${storeHouseId}`
  };
  return p;
};
/* 主动获取仓房设备状态 */
apiInterface.getHouseState = function(storePointId,storeHouseId) {
  var p = {
      url: `/_msg/house/monitor/getHouseState/${storePointId}/${storeHouseId}`
  };
  return p;
};
/* 根据角色定时获取仓房设备状态订阅 */
apiInterface.getUserDeviceState = function(userName,storePointId,storeHouseId) {
  var p = {
      url: `/_user/${userName}/house/monitor/${storePointId}/${storeHouseId}`
  };
  return p;
};
/* 实时获取仓房设备状态 */
apiInterface.getRealTimeDeviceState = function(storePointId,storeHouseId) {
  var p = {
      url: `/_topic/device/monitor/${storePointId}/${storeHouseId}`
  };
  return p;
};
/* 获取警告信息订阅 */
apiInterface.getWarnState = function(userId) {
  var p = {
      url: `/_topic/inform/${userId}`
  };
  return p;
};
/* 定时获取库区所有仓房状态的订阅 */
apiInterface.getStorePointState = function(storePointId) {
  var p = {
      url: `/_topic/point/monitor/${storePointId}`
  };
  return p;
};
/* 实时获取库区所有仓房状态的订阅 */
apiInterface.getStorePointRealTime = function(storePointId) {
  var p = {
      url: `/_topic/device/monitor/${storePointId}`
  };
  return p;
};
/* 实时获取仓房设备状态 */
apiInterface.getRealTimeDeviceState = function(storePointId,storeHouseId) {
  var p = {
      url: `/_topic/device/monitor/${storePointId}/${storeHouseId}`
  };
  return p;
};
/* 数量检测的订阅 */
apiInterface.postAmountsData = function(storePointId,storeHouseId) {
  var p = {
      url: `/_msg/house/monitor/amounts/${storePointId}/${storeHouseId}`
  };
  return p;
};
/* 获取仓房下所有监控设备 */
apiInterface.getHouseMonitor = function(){
  var p = {
    url: `/_data/security/storehouse/getStoreHouseDeviceList`
  };
  return p;
}
//const Apisetting = {...apiInterface };

export default apiInterface;

const apiInterface = {
  /* 获取token */
  // getToken: "_data/testConfig/config/connectController",
  /* 建立控制器 */
  connectController: "_data/testConfig/config/connectController",
  /* 更新控制值 */
  setProperty: "_data/testConfig/config/setProperty",
  /* 读取状态值 */
  getProperty: "_data/testConfig/config/getProperty",
  /* 存储控制器（分机）配置 */
  saveControllerConfig: "_data/testConfig/config/saveControllerConfig",
  /* 读取控制器（分机）配置 */
  getControllerConfig: "_data/testConfig/config/getControllerConfig",
  /* 存储设备配置 */
  saveDeviceConfig: "_data/testConfig/config/saveDeviceConfig",
  /* 读取设备配置 */
  getDeviceConfig: "_data/testConfig/config/getDeviceConfig",
  /* 存储测试结果 */
  configsaveHistory: "_data/testConfig/configsaveHistory",
  /* 读取测试结果 */
  getHistory: "_data/testConfig/config/getHistory",
  /* 读取分机列表 */
  getControllerList: "_data/testConfig/config/getControllerList",
  /* 读取设备列表 */
  getDeviceList: "_data/testConfig/config/getDeviceList",
  /* 关闭控制器 */
  closeController: "_data/testConfig/config/closeController"
};

/* socket主路径 */
// apiInterface.socketMain = function() {
//   var p = {
//     url: process.env.NODE_ENV === "production" ? "/_wst" : "/admin/_wst"
//   };
//   return p;
// };
/* socket注册 */
// apiInterface.socketRegister = function(storePointId, storeHouseId) {
//   var p = {
//     url: `/_msg/house/monitor/${storePointId}/${storeHouseId}`
//   };
//   return p;
// };
//const Apisetting = {...apiInterface };

export default apiInterface;

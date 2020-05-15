const apiInterface = {
  /* 读取分机列表 */
  getControllerList: "_data/testConfig/config/getControllerList",
  /* 读取控制器（分机）配置 */
  getControllerConfig: "_data/testConfig/config/getControllerConfig",
  /* 存储控制器（分机）配置 */
  saveControllerConfig: "_data/testConfig/config/saveControllerConfig",
  /* 更新控制器（分机）配置 */
  updateControllerConfig: "_data/testConfig/config/updateControllerConfig",
  /* 读取设备列表 */
  getDeviceList: "_data/testConfig/config/getDeviceList",
  /* 读取设备配置 */
  getDeviceConfig: "_data/testConfig/config/getDeviceConfig",
  /* 存储设备配置 */
  saveDeviceConfig: "_data/testConfig/config/saveDeviceConfig",
  /* 更新设备配置 */
  updateDeviceConfig: "_data/testConfig/config/updateDeviceConfig",
  /* 获取库区网关信息 */
  getStoreGateWayInfo: "_data/gc/gateway/list",
  /* 建立控制器 */
  connectController: "_data/testConfig/config/connectController",
  /* 更新控制值 */
  setProperty: "_data/testConfig/config/setProperty",
  /* 读取状态值 */
  getProperty: "_data/testConfig/config/getProperty",
  /* 关闭控制器 */
  closeController: "_data/testConfig/config/closeController",
  /* 存储测试结果 */
  saveHistory: "_data/testConfig/config/saveHistory",
  /* 读取测试结果 */
  getHistory: "_data/testConfig/config/getHistory",
  /* socket主路径 */
  socketMain:
    process.env.NODE_ENV === "production"
      ? "/oh-scada/_wst"
      : // : "http://10.10.7.22:8080/oh-scada/_wst",
        "http://localhost:8080/oh-scada/_wst",

  /* socket注册 */
  // socketRegister: "/_topic/test/Controller/sysid"
  socketRegister: "/_user/crk/test/Controller/"
};

/* socket主路径 */
// apiInterface.socketMain = function() {
//   var p = {
//     url: process.env.NODE_ENV === "production" ? "/_wst" : "/admin/_wst"
//   };
//   return p;
// };
// /* socket注册 */
// apiInterface.socketRegister = function() {
//   var p = {
//     url: `/test/Controller/sysid`
//   };
//   return p;
// };
// const Apisetting = {...apiInterface };

export default apiInterface;

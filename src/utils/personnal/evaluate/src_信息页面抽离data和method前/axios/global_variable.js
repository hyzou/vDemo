const mainPrefix = "/oh-shlztb";
export default {
  // 项目基础前缀
  mainPrefix: mainPrefix,
  // 全局接口名前缀
  baseURL: process.env.NODE_ENV === "production" ? mainPrefix + "/" : "/admin",
  // 全局socket地址
  baseSocketUrl:
    process.env.NODE_ENV === "production"
      ? mainPrefix + "/_wst"
      : "http://192.168.21.152:8280" + mainPrefix + "/_wst",
  //登出
  logout: mainPrefix + "/logout",
  //百度富文本编辑器项目地址
  ueEditorUrl: "./UEditor/",
  // process.env.NODE_ENV === "production"
  //   ? mainPrefix + "/socialtender/oh-production/UEditor/"
  //   : "/UEditor/",
  //富文本编辑器上传地址
  ueEditorServerUrl: "",
  // process.env.NODE_ENV === "production"
  //   ? mainPrefix + "/_data/ueditor/ueditorConfig"
  //   : "/admin/_data/ueditor/ueditorConfig",
  //每页显示的列表数量
  numberPerpage: 10,
  //全局socket对象
  globalSocketObj: null,
  websocketObj: null,
  stompClient: null,
  commonObjects: {}
};

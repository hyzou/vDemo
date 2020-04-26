const mainPrefix = "/oh-shlztb";
export default {
  mainPrefix: mainPrefix,
  //全局socket地址
  baseSocketUrl:
    process.env.NODE_ENV === "production"
      ? mainPrefix + "/_wst"
      : // : "http://192.168.21.13:8280" + mainPrefix + "/_wst",
        // "http://192.168.21.13:8280" + mainPrefix + "/_wst",
        // "http://demo.onhonest.cn:3000" + mainPrefix + "/_wst",
        // "http://192.168.21.132:8080" + mainPrefix + "/_wst",
        "http://192.168.2.243:8080" + mainPrefix + "/_wst",
  //登出
  logout: mainPrefix + "/logout",
  //流程图
  flowPicUrl:
    process.env.NODE_ENV === "production"
      ? mainPrefix + "/_data/web/webPortalNews/flowDiagram"
      : "/admin/_data/web/webPortalNews/flowDiagram",
  //资料上传地址
  uploadUrl:
    process.env.NODE_ENV === "production"
      ? mainPrefix + "/_data/web/information/addAtt"
      : "/admin/_data/web/information/addAtt",
  //百度富文本编辑器项目地址
  ueEditorUrl:
    process.env.NODE_ENV === "production"
      ? mainPrefix + "/socialtender/oh-production/UEditor/"
      : "/UEditor/",
  //富文本编辑器上传地址
  ueEditorServerUrl:
    process.env.NODE_ENV === "production"
      ? mainPrefix + "/_data/ueditor/ueditorConfig"
      : "/admin/_data/ueditor/ueditorConfig",
  //文件下载地址
  downloadUrl:
    process.env.NODE_ENV === "production"
      ? mainPrefix + "/_data/noUser/web/information/downloadAtt"
      : "/admin/_data/noUser/web/information/downloadAtt",
  //新闻类图片查看地址
  imgViewUrl: mainPrefix + "/_data/noUser/web/webPortalNews/download?fileId=",
  //新闻类附件下载地址
  newsFileDownloadUrl:
    mainPrefix + "/_data/noUser/web/webPortalNews/downloadAppendix?fileId=",
  //广告、轮播图图片查看地址
  imgPhotoViewUrl: mainPrefix + "/_data/noUser/web/photo/download?fileId=",
  //通用在线查看地址
  officeViewUrl: mainPrefix + "/_view/common/util/officeView?src=",
  //通用下载地址，供在线查看用
  commonDownloadUrl:
    window.document.location.origin +
    mainPrefix +
    "/_data/frame/fbfile/download?fbFileId=",
  //每页显示的列表数量
  numberPerpage: 10,
  //成交确认书查看地址
  confirmUrl:
    mainPrefix + "/ReportServer?reportlet=shlztb/bid/confirmNotice.cpt&",
  //报表服务器地址---http://demo.onhonest.cn:3001/WebReport2/ReportServer?reportlet=shlztb/pay/Account.cpt
  excelPost: "",
  //成交情况统计报表查看地址
  BidWinUrl: mainPrefix + "/ReportServer?reportlet=shlztb/bid/BidWin.cpt&",
  //公开竞价交易报表查看地址
  ProjectRegUrl:
    mainPrefix + "/ReportServer?reportlet=shlztb/bid/ProjectReg.cpt&",
  //注册会员报表查看地址
  MemberListUrl:
    mainPrefix + "/ReportServer?reportlet=shlztb/member/MemberList.cpt&",
  //交易记录报表查看地址
  VoucherUrl: mainPrefix + "/ReportServer?reportlet=shlztb/pay/Voucher.cpt&",
  //会员账户余额报表查看地址
  AccountUrl: mainPrefix + "/ReportServer?reportlet=shlztb/pay/Account.cpt&",
  //全局socket对象
  globalSocketObj: null,
  websocketObj: null,
  stompClient: null,
  commonObjects: {}
};

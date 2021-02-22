import globalVariable from "../../global_variable";

const common = {
  // 获取用户认证信息接口
  getUserSession_common: "/_data/base/operator/getUserSession",
  // 获取用户可查看菜单
  getMenuTreeByUser_common: "_data/base/menu/getMenuTreeByUser",
  // 字典表
  dictList_common: "_data/frame/ref/list",
  // 根据仓房获取逻辑货位列表 *?shId=3AAFABEA2BB042F1B589E7933C22FBB8
  storestackList_common: "_data/bsi/storestack/textValueByshId",
  // 根据组织机构获取库点列表
  getStorePointList_common: "_data/bsi/storepoint/listByOrg",
  // 获取可选供应商列表
  getEnableSupplierList_common: "_data/base/supplier/listData",
  // 获取指定库点物资列表明细及所处货位等信息
  getStackStock_common: "_data/main/stock/getStackStock",
  // 获取报表服务器地址
  // getBasicReportServer_common: "_data/basic/property/report",
  // 获取在线查看文件服务器地址
  // getBasicFileViewerServer_common: "_data/basic/property/fileViewServer",
  // 获取用户里面的城市
  // userCity_common: "_data/basic/district/list",
  // 通用在线查看地址
  officeViewUrl_common:
    globalVariable.mainPrefix + "/_view/common/util/officeView?src="
  //通用下载地址
  // commonDownloadUrl_common:
  //   window.document.location.origin +
  //   globalVariable.mainPrefix +
  //   "/_data/frame/fbfile/download?",
  //通用下载文件地址
  // downloadFile_common: "/_data/frame/fbfile/download?fbFileId=",
  //通用线上查看文件地址
  // showOnlineFile_common: "/_data/frame/fbfile/show"
};
export default common;

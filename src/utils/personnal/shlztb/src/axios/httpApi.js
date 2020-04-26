const apiInterface = {};

/* ********params:{}********
 ** ********params.url:接口地址********
 ** ********params.method:接口请求方式********
 */

/* ********登录接口******** */
apiInterface.login = function() {
  var p = {
    url: "login",
    method: "post"
  };
  return p;
};
/* ********用户信息接口******** */
apiInterface.userInfo = function() {
  var p = {
    url: "_data/base/operator/getUserInfo",
    method: "get"
  };
  return p;
};
/* ********获取sessionId接口******** */
apiInterface.getSessionId = function() {
  var p = {
    url: "_data/base/operator/getSessionId",
    method: "get"
  };
  return p;
};
/* ********消息列表获取******** */
apiInterface.getAllMsgList = function() {
  var p = {
    url: "_data/message/getMsgByUserPage",
    method: "get"
  };
  return p;
};
/* ********未读消息消息列表获取******** */
apiInterface.getUnreadMsgList = function() {
  var p = {
    url: "_data/message/getUnreadMsgByUserList",
    method: "get"
  };
  return p;
};
/* ********单条消息已读******** */
apiInterface.singleMsgRead = function() {
  var p = {
    url: "_data/message/readMsg",
    method: "get"
  };
  return p;
};

/* ********获取动态路由接口，根据登录人信息获取菜单树******** */
apiInterface.getRouter = function() {
  var p = {
    url: "_data/base/menu/getMenuTreeByUser",
    method: "get"
  };
  return p;
};

/* ********↓↓↓↓↓↓↓首页展示中心↓↓↓↓↓↓↓******** */
/* ********首页-会员注册******** */
apiInterface.addRegisterMember = function() {
  var p = {
    url: "_data/noUser/member/basMember/startFlow",
    method: "post"
  };
  return p;
};
/* ********首页-交易信息列表-筛选条件下拉列表******** */
apiInterface.PortalDropdownlist = function() {
  var p = {
    url: "_data/frame/ref/list",
    method: "get"
  };
  return p;
};
/* ********首页-交易信息列表******** */
apiInterface.pagePortalNews = function() {
  var p = {
    url: "_data/noUser/web/webPortalNews/page",
    method: "get"
  };
  return p;
};
/* ********首页-交易信息详情******** */
apiInterface.pagePortalDetailNews = function() {
  var p = {
    url: "_data/noUser/web/webPortalNews/loadByExample",
    method: "get"
  };
  return p;
};
/* ********首页-分页获取交易资料列表******** */
apiInterface.portalFiles = function() {
  var p = {
    url: "_data/noUser/web/information/pageAtt",
    method: "get"
  };
  return p;
};
/* ********首页-获取图片列表(轮播图)******** */
apiInterface.carouselPictures = function() {
  var p = {
    url: "_data/noUser/web/photo/pageAtt",
    method: "get"
  };
  return p;
};
/* ********首页-获取广告列表******** */
apiInterface.advertisementList = function() {
  var p = {
    url: "_data/noUser/web/advert/pageAdvert",
    method: "get"
  };
  return p;
};
/* ********首页-获取友情链接列表******** */
apiInterface.friendLinkList = function() {
  var p = {
    url: "_data/noUser/web/blogroll/pageLink",
    method: "get"
  };
  return p;
};
/* ********首页-文件下载******** */
apiInterface.fileDownload = function() {
  var p = {
    url: "_data/noUser/web/information/downloadAtt",
    method: "get"
  };
  return p;
};
/* ********↑↑↑↑↑↑↑首页展示中心↑↑↑↑↑↑↑******** */

/* ********↓↓↓↓↓↓↓管理员端↓↓↓↓↓↓↓******** */

/* ********信用系统-获取会员综合评分列表******** */
apiInterface.getMemberCreditlist = function(muti) {
  var p = {
    url: "_data/bid/tsAuctionEvaluate/page",
    method: "get",
    isMuti: muti
  };
  return p;
};
/* ********信用系统-获取会员被评分列表******** */
apiInterface.getMemberCreditlistByMemberId = function(muti) {
  var p = {
    url: "_data/bid/tsAuctionEvaluate/pageDtlCon",
    method: "get",
    isMuti: muti
  };
  return p;
};
/* ********资料下载-新增资料******** */
apiInterface.addDownFile = function(muti) {
  var p = {
    url: "_data/web/information/addAtt",
    method: "post",
    isMuti: muti
  };
  return p;
};
/* ********资料下载-删除资料******** */
apiInterface.removeDownFile = function() {
  var p = {
    url: "_data/web/information/remove",
    method: "post"
  };
  return p;
};
/* ********广告管理-新增广告信息******** */
apiInterface.addAd = function() {
  var p = {
    url: "_data/web/advert/add",
    method: "post"
  };
  return p;
};
/* ********广告管理-修改广告信息******** */
apiInterface.updateAd = function() {
  var p = {
    url: "_data/web/advert/updateAdvert",
    method: "post"
  };
  return p;
};
/* ********广告管理-删除广告信息******** */
apiInterface.removeAd = function() {
  var p = {
    url: "_data/web/advert/remove",
    method: "post"
  };
  return p;
};
/* ********广告管理-查询广告列表******** */
apiInterface.getAdList = function() {
  var p = {
    url: "_data/web/advert/pageAdvert",
    method: "get"
  };
  return p;
};
/* ********图片信息-上传图片******** */
apiInterface.addBanner = function(muti) {
  var p = {
    url: "_data/web/photo/addAtt",
    method: "post",
    isMuti: muti
  };
  return p;
};
/* ********图片信息-刪除图片******** */
apiInterface.removeBanner = function() {
  var p = {
    url: "_data/web/photo/remove",
    method: "post"
  };
  return p;
};
/* ********图片信息-修改图片******** */
apiInterface.updateBannerSrc = function(muti) {
  var p = {
    url: "_data/web/photo/updateAtt",
    method: "post",
    isMuti: muti
  };
  return p;
};
/* ********图片信息-修改图片状态******** */
apiInterface.updateBannerStatus = function() {
  var p = {
    url: "_data/web/photo/updateStatus",
    method: "post"
  };
  return p;
};
/* ********图片信息-图片列表******** */
apiInterface.getBannerlist = function() {
  var p = {
    url: "_data/web/photo/pageAtt",
    method: "get"
  };
  return p;
};
/* ********友情链接-新增友情链接******** */
apiInterface.addFriendLink = function(muti) {
  var p = {
    url: "_data/web/blogroll/addLink",
    method: "post",
    isMuti: muti
  };
  return p;
};
/* ********友情链接-修改友情链接******** */
apiInterface.updateFriendLink = function(muti) {
  var p = {
    url: "_data/web/blogroll/updateLink",
    method: "post",
    isMuti: muti
  };
  return p;
};
/* ********友情链接-删除友情链接******** */
apiInterface.removeFriendLink = function() {
  var p = {
    url: "_data/web/blogroll/delete",
    method: "post"
  };
  return p;
};
/* ********友情链接-友情链接列表******** */
apiInterface.getFriendLinklist = function() {
  var p = {
    url: "_data/web/blogroll/pageLink",
    method: "get"
  };
  return p;
};
/* ********短信管理-获取会员或委托方联系方式列表******** */
apiInterface.getUsersContractlist = function() {
  var p = {
    url: "_data/web/msg/page",
    method: "get"
  };
  return p;
};
/* ********短信管理-导出会员或委托方联系方式excel******** */
apiInterface.exportMsgExcel = function() {
  var p = {
    url: "_data/web/msg/download",
    method: "get"
  };
  return p;
};
/* ********合同追踪-获取合同追踪列表******** */
apiInterface.getContractAttractList = function() {
  var p = {
    url: "_data/bid/tsAuctionContract/page",
    method: "get"
  };
  return p;
};
/* ********单位组织机构-单位组织机构树******** */
apiInterface.getOrganizationTree = function() {
  var p = {
    url: "_data/base/organization/tree",
    method: "get"
  };
  return p;
};
/* ********单位组织机构-获取机构详情******** */
apiInterface.getOrganizationDetail = function() {
  var p = {
    url: "_data/base/organization/loadByExample",
    method: "get"
  };
  return p;
};
/* ********单位组织机构-获取机构列表******** */
apiInterface.getOrganizationList = function() {
  var p = {
    url: "_data/base/organization/page",
    method: "get"
  };
  return p;
};
/* ********单位组织机构-获取机构下属机构列表******** */
apiInterface.getOrganizationOrgList = function() {
  var p = {
    url: "_data/base/organization/getSubOrgById",
    method: "get"
  };
  return p;
};
/* ********单位组织机构-新增机构信息******** */
apiInterface.addOrganization = function() {
  var p = {
    url: "_data/base/organization/addOrg",
    method: "post"
  };
  return p;
};
/* ********单位组织机构-修改机构信息******** */
apiInterface.updateOrganization = function() {
  var p = {
    url: "_data/base/organization/update",
    method: "post"
  };
  return p;
};
/* ********单位组织机构-删除机构信息******** */
apiInterface.deleteOrganization = function() {
  var p = {
    url: "_data/base/organization/delete",
    method: "post"
  };
  return p;
};
/* ********单位组织机构-获取机构人员列表******** */
apiInterface.getOrganizationPeopleList = function() {
  var p = {
    url: "_data/base/orgEmployee/query",
    method: "get"
  };
  return p;
};
/* ********单位组织机构-获取机构人员详情******** */
apiInterface.getOrganizationPeopleDetail = function() {
  var p = {
    url: "_data/base/orgEmployee/loadEmp",
    method: "get"
  };
  return p;
};
/* ********单位组织机构-新增机构人员信息******** */
apiInterface.addOrganizationPeople = function(muti) {
  var p = {
    url: "_data/base/orgEmployee/addEmp",
    method: "post",
    isMuti: muti
  };
  return p;
};
/* ********单位组织机构-修改机构人员信息******** */
apiInterface.updateOrganizationPeople = function(muti) {
  var p = {
    url: "_data/base/orgEmployee/updateEmp",
    method: "post",
    isMuti: muti
  };
  return p;
};
/* ********单位组织机构-删除机构人员信息******** */
apiInterface.deleteOrganizationPeople = function() {
  var p = {
    url: "_data/base/orgEmployee/deleteEmp",
    method: "post"
  };
  return p;
};
/* ********菜单管理-获取菜单树******** */
apiInterface.getAllMenuTree = function() {
  var p = {
    url: "_data/base/menu/getAllMenuTree",
    method: "get"
  };
  return p;
};
/* ********菜单管理-获取已勾选的菜单树******** */
apiInterface.getAllCheckedMenuTree = function() {
  var p = {
    url: "_data/base/menu/tree",
    method: "get"
  };
  return p;
};
/* ********菜单管理-菜单列表******** */
apiInterface.getMenuList = function() {
  var p = {
    url: "_data/base/menu/page",
    method: "get"
  };
  return p;
};
/* ********菜单管理-菜单详情******** */
apiInterface.getMenuDetail = function() {
  var p = {
    url: "_data/base/menu/loadByExample",
    method: "get"
  };
  return p;
};
/* ********菜单管理-新增菜单******** */
apiInterface.addmenu = function() {
  var p = {
    url: "_data/base/menu/addmenu",
    method: "post"
  };
  return p;
};
/* ********菜单管理-删除菜单******** */
apiInterface.deletemenu = function() {
  var p = {
    url: "_data/base/menu/remove",
    method: "post"
  };
  return p;
};
/* ********菜单管理-修改菜单******** */
apiInterface.editmenu = function() {
  var p = {
    url: "_data/base/menu/update",
    method: "post"
  };
  return p;
};
/* ********菜单管理-批量修改菜单状态******** */
apiInterface.updateMenuStatusMuti = function() {
  var p = {
    url: "_data/base/menu/updateMenuStatus",
    method: "post"
  };
  return p;
};
/* ********角色权限管理-新增角色信息******** */
apiInterface.addRole = function() {
  var p = {
    url: "_data/base/role/insert",
    method: "post"
  };
  return p;
};
/* ********角色权限管理-分页获取角色信息******** */
apiInterface.getRoleList = function() {
  var p = {
    url: "_data/base/role/page",
    method: "get"
  };
  return p;
};
/* ********角色权限管理-不分页获取角色信息******** */
apiInterface.getRoleListNopage = function() {
  var p = {
    url: "_data/base/role/list",
    method: "get"
  };
  return p;
};
/* ********角色权限管理-根据ID获取角色分组信息详情******** */
apiInterface.getRoleDetail = function() {
  var p = {
    url: "_data/base/role/loadByExample",
    method: "get"
  };
  return p;
};
/* ********角色权限管理-修改角色状态******** */
apiInterface.updateRoleStatus = function() {
  var p = {
    url: "_data/base/role/updateStatus",
    method: "post"
  };
  return p;
};
/* ********角色权限管理-删除角色信息******** */
apiInterface.deleteRoleList = function() {
  var p = {
    url: "_data/base/role/deleteList",
    method: "post"
  };
  return p;
};
/* ********角色权限管理-修改角色信息******** */
apiInterface.updateRole = function() {
  var p = {
    url: "_data/base/role/update",
    method: "post"
  };
  return p;
};
/* ********角色权限管理-根据角色ID查找用户列表******** */
apiInterface.getUserOfRole = function() {
  var p = {
    url: "_data/base/operatorrole/findOperatorsByRoleid",
    method: "get"
  };
  return p;
};
/* ********角色权限管理-根据角色Id删除指定用户******** */
apiInterface.deleteUserOfRole = function() {
  var p = {
    url: "_data/base/operatorrole/deleteOperatorRole",
    method: "post"
  };
  return p;
};
/* ********角色权限管理-查询角色可分配用户******** */
apiInterface.getUserlistForRole = function() {
  var p = {
    url: "_data/base/orgEmployee/getDistributable",
    method: "get"
  };
  return p;
};

/* ********角色权限管理-将角色分配给多个用户******** */
apiInterface.assignUserOfRole = function(muti) {
  var p = {
    url: "_data/base/operatorrole/distributeRoleToOperators",
    method: "post",
    isMuti: muti
  };
  return p;
};
/* ********角色权限管理-为角色分配菜单******** */
apiInterface.assignMenuOfRole = function(muti) {
  var p = {
    url: "_data/base/roleMenu/distributeRoleMenu",
    method: "post",
    isMuti: muti
  };
  return p;
};

/* ********角色分组信息-新增角色分组信息******** */
apiInterface.addRoleGroup = function() {
  var p = {
    url: "_data/base/roleGroup/insert",
    method: "post"
  };
  return p;
};
/* ********角色分组信息-获取所有角色分组信息******** */
apiInterface.getRoleGroupList = function() {
  var p = {
    url: "_data/base/roleGroup/list",
    method: "get"
  };
  return p;
};
/* ********角色分组信息-根据ID获取角色分组信息详情******** */
apiInterface.getRoleGroupDetail = function() {
  var p = {
    url: "_data/base/roleGroup/loadByExample",
    method: "get"
  };
  return p;
};
/* ********系统管理-系统基础数据-字典类别列表******** */
apiInterface.busintypeList = function() {
  var p = {
    url: "_data/base/busintype/page",
    method: "get"
  };
  return p;
};
/* ********系统管理-系统基础数据-新增字典类别******** */
apiInterface.addBusintype = function() {
  var p = {
    url: "_data/base/busintype/insert",
    method: "POST"
  };
  return p;
};
/* ********系统管理-系统基础数据-修改字典类别******** */
apiInterface.editBusintype = function() {
  var p = {
    url: "_data/base/busintype/update",
    method: "POST"
  };
  return p;
};
/* ********系统管理-系统基础数据-删除字典类别******** */
apiInterface.removeBusintype = function() {
  var p = {
    url: "_data/base/busintype/remove",
    method: "POST"
  };
  return p;
};
/* ********系统管理-系统基础数据-字典业务列表******** */
apiInterface.dictionaryList = function() {
  var p = {
    url: "_data/base/dictionary/list",
    method: "get"
  };
  return p;
};
/* ********系统管理-系统基础数据-新增字典业务******** */
apiInterface.addDictionary = function() {
  var p = {
    url: "_data/base/dictionary/insert",
    method: "POST"
  };
  return p;
};
/* ********系统管理-系统基础数据-修改字典业务******** */
apiInterface.editDictionary = function() {
  var p = {
    url: "_data/base/dictionary/update",
    method: "POST"
  };
  return p;
};
/* ********系统管理-系统基础数据-删除字典业务******** */
apiInterface.removeDictionary = function() {
  var p = {
    url: "_data/base/dictionary/deleteDictionary",
    method: "POST"
  };
  return p;
};
/* ********系统管理-系统基础数据-计量单位列表******** */
apiInterface.unitList = function() {
  var p = {
    url: "_data/base/unit/page",
    method: "get"
  };
  return p;
};
/* ********系统管理-系统基础数据-新增计量单位******** */
apiInterface.addUnit = function() {
  var p = {
    url: "_data/base/unit/insert",
    method: "POST"
  };
  return p;
};
/* ********系统管理-系统基础数据-修改计量单位******** */
apiInterface.editUnit = function() {
  var p = {
    url: "_data/base/unit/update",
    method: "POST"
  };
  return p;
};
/* ********系统管理-系统基础数据-删除计量单位******** */
apiInterface.removeUnit = function() {
  var p = {
    url: "_data/base/unit/remove",
    method: "POST"
  };
  return p;
};
/* ********系统管理-系统基础数据-品种信息树******** */
apiInterface.breedInfoList = function() {
  var p = {
    url: "_data/base/breed/tree",
    method: "get"
  };
  return p;
};
/* ********系统管理-系统基础数据-品种信息详情******** */
apiInterface.breedInfoDetail = function() {
  var p = {
    url: "_data/base/breed/loadByExample",
    method: "get"
  };
  return p;
};
/* ********系统管理-系统基础数据-新增品种信息******** */
apiInterface.addBreedInfo = function() {
  var p = {
    url: "_data/base/breed/insert",
    method: "POST"
  };
  return p;
};
/* ********系统管理-系统基础数据-修改品种信息列表******** */
apiInterface.editBreedInfo = function() {
  var p = {
    url: "_data/base/breed/update",
    method: "POST"
  };
  return p;
};
/* ********系统管理-系统基础数据-删除品种信息******** */
apiInterface.removeBreedInfo = function() {
  var p = {
    url: "_data/base/breed/remove",
    method: "POST"
  };
  return p;
};
/* ********系统管理-编码规则列表******** */
apiInterface.codeRuleList = function() {
  var p = {
    url: "_data/base/codeRule/page",
    method: "get"
  };
  return p;
};
/* ********系统管理-新增编码规则******** */
apiInterface.addCodeRule = function() {
  var p = {
    url: "_data/base/codeRule/insert",
    method: "POST"
  };
  return p;
};
/* ********系统管理-编辑编码规则******** */
apiInterface.editCodeRule = function() {
  var p = {
    url: "_data/base/codeRule/update",
    method: "POST"
  };
  return p;
};
/* ********系统管理-删除编码规则******** */
apiInterface.removeCodeRule = function() {
  var p = {
    url: "_data/base/codeRule/remove",
    method: "POST"
  };
  return p;
};
/* ********系统管理-系统参数列表******** */
apiInterface.systemParamsList = function() {
  var p = {
    url: "_data/base/sysConfig/page",
    method: "get"
  };
  return p;
};
/* ********系统管理-系统参数详情******** */
apiInterface.systemParamsDetail = function() {
  var p = {
    url: "_data/base/sysConfig/loadByExample",
    method: "get"
  };
  return p;
};
/* ********系统管理-新增系统参数******** */
apiInterface.addSystemParams = function() {
  var p = {
    url: "_data/base/sysConfig/insert",
    method: "POST"
  };
  return p;
};
/* ********系统管理-修改系统参数******** */
apiInterface.editSystemParams = function() {
  var p = {
    url: "_data/base/sysConfig/update",
    method: "POST"
  };
  return p;
};
/* ********系统管理-删除系统参数******** */
apiInterface.removeSystemParams = function() {
  var p = {
    url: "_data/base/sysConfig/remove",
    method: "POST"
  };
  return p;
};
/* ********系统管理-业务参数列表******** */
apiInterface.businessParamsList = function() {
  var p = {
    url: "_data/base/config/fbBasConfig/page",
    method: "get"
  };
  return p;
};
/* ********系统管理-新增业务参数******** */
apiInterface.addBusinessParams = function() {
  var p = {
    url: "_data/base/config/fbBasConfig/insert",
    method: "POST"
  };
  return p;
};
/* ********系统管理-修改业务参数******** */
apiInterface.editBusinessParams = function() {
  var p = {
    url: "_data/base/config/fbBasConfig/update",
    method: "POST"
  };
  return p;
};
/* ********系统管理-删除业务参数******** */
apiInterface.removeBusinessParams = function() {
  var p = {
    url: "_data/base/config/fbBasConfig/remove",
    method: "POST"
  };
  return p;
};
/* ********系统管理-系统任务列表******** */
apiInterface.systemTaskList = function() {
  var p = {
    url: "_data/frame/task/query",
    method: "get"
  };
  return p;
};
/* ********系统管理-新增系统任务******** */
apiInterface.addSystemTask = function() {
  var p = {
    url: "_data/frame/task/add",
    method: "POST"
  };
  return p;
};
/* ********系统管理-编辑修改系统任务******** */
apiInterface.editSystemTask = function() {
  var p = {
    url: "_data/frame/task/update",
    method: "POST"
  };
  return p;
};
/* ********系统管理-运行系统任务******** */
apiInterface.runSystemTask = function() {
  var p = {
    url: "_data/frame/task/run",
    method: "POST"
  };
  return p;
};
/* ********系统管理-删除系统任务******** */
apiInterface.removeSystemTask = function() {
  var p = {
    url: "_data/frame/task/remove",
    method: "POST"
  };
  return p;
};
/* ********系统管理-系统日志查看******** */
apiInterface.systemLog = function() {
  var p = {
    url: "_data/base/log/page",
    method: "get"
  };
  return p;
};
/* ********交易中心-控制管理-项目交易设置（标的属性设置）******** */
apiInterface.getBidTargetSettingList = function() {
  var p = {
    url: "_data/config/fbBasBidprop/page",
    method: "get"
  };
  return p;
};
/* ********交易中心-控制管理-添加项目交易设置（标的属性设置）******** */
apiInterface.addBidTargetSetting = function() {
  var p = {
    url: "_data/config/fbBasBidpropDetail/insert",
    method: "post"
  };
  return p;
};
/* ********交易中心-控制管理-添加项目交易设置（标的属性设置）******** */
apiInterface.saveBidTargetSetting = function() {
  var p = {
    url: "_data/config/fbBasBidprop/save",
    method: "post"
  };
  return p;
};
/* ********交易中心-控制管理-修改项目交易设置（标的属性设置）******** */
apiInterface.editBidTargetSetting = function() {
  var p = {
    url: "_data/config/fbBasBidpropDetail/update",
    method: "post"
  };
  return p;
};
/* ********交易中心-控制管理-删除项目交易设置（标的属性设置）******** */
apiInterface.removeBidTargetSetting = function() {
  var p = {
    url: "_data/config/fbBasBidprop/remove",
    method: "post"
  };
  return p;
};
/* ********交易中心-新增交易信息保存/更新（有没有id来判断是新增还是更新）******** */
apiInterface.addTradeInformation = function(muti) {
  var p = {
    // url: "_data/web/webPortalNews/save",
    url: "_data/web/webPortalNews/saveNews",
    method: "post",
    isMuti: muti
  };
  return p;
};
/* ********交易中心-新增交易信息送审/审批******** */
apiInterface.flowTradeInformation = function(muti) {
  var p = {
    // url: "_data/web/webPortalNews/flow",
    url: "_data/web/webPortalNews/flowNews",
    method: "post",
    isMuti: muti
  };
  return p;
};
/* ********交易中心-交易公告列表获取流程图******** */
apiInterface.getTradeProcessImg = function() {
  var p = {
    url: "_data/web/webPortalNews/flowDiagram",
    method: "get"
  };
  return p;
};
/* ********交易中心-删除交易信息******** */
apiInterface.removeTradeInformation = function() {
  var p = {
    url: "_data/web/webPortalNews/remove",
    method: "post"
  };
  return p;
};
/* ********交易中心-交易信息列表******** */
apiInterface.tradeInformationList = function() {
  var p = {
    url: "_data/web/webPortalNews/page",
    method: "get"
  };
  return p;
};
/* ********交易中心-交易信息详情******** */
apiInterface.tradeInformationDetail = function() {
  var p = {
    url: "_data/web/webPortalNews/loadByExample",
    method: "get"
  };
  return p;
};

/* ********专场标的管理-专场信息列表******** */
apiInterface.specialInfomationList = function() {
  var p = {
    url: "_data/bid/tsAuctionProject/query",
    method: "get"
  };
  return p;
};
/* ********专场标的管理-专场信息列表******** */
apiInterface.updateSingleProject = function() {
  var p = {
    url: "_data/bid/tsAuctionProject/update",
    method: "post"
  };
  return p;
};
/* ********专场标的管理-单条专场信息详情******** */
apiInterface.getSpecialItemInfomation = function() {
  var p = {
    url: "_data/bid/tsAuctionProject/loadByExample",
    method: "get"
  };
  return p;
};
/* ********专场标的管理-删除单个专场信息******** */
apiInterface.removeSpecialItem = function() {
  var p = {
    url: "_data/bid/tsAuctionProject/remove",
    method: "post"
  };
  return p;
};
/* ********专场标的管理-添加(保存)专场信息******** */
apiInterface.saveSpecialItem = function() {
  var p = {
    url: "_data/bid/tsAuctionProject/saveProject",
    method: "post"
  };
  return p;
};
/* ********专场标的管理-确认完成，驱动流程走到下一步******** */
apiInterface.completeflowSpecialItem = function() {
  var p = {
    url: "_data/bid/tsAuctionProject/flow",
    method: "post"
  };
  return p;
};
/* ********专场标的管理-提交专场信息到下一步******** */
apiInterface.flowSpecialItem = function() {
  var p = {
    url: "_data/bid/tsAuctionProject/flowProject",
    method: "post"
  };
  return p;
};
/* ********专场标的管理-招投标标的列表******** */
apiInterface.getBidTargetList = function() {
  var p = {
    url: "_data/bid/tsAuctionBid/page",
    method: "get"
  };
  return p;
};
/* ********专场标的管理-单条招投标标的详情******** */
apiInterface.getBidTargetItemInfo = function() {
  var p = {
    url: "_data/bid/tsAuctionBid/loadByExample",
    method: "get"
  };
  return p;
};
/* ********专场标的管理-新建招投标标的******** */
apiInterface.createBidTarget = function() {
  var p = {
    url: "_data/bid/tsAuctionBid/insertWithProp", //insert
    method: "post"
  };
  return p;
};
/* ********专场标的管理-编辑保存已有招投标标的******** */
apiInterface.udateBidTarget = function() {
  var p = {
    url: "_data/bid/tsAuctionBid/updateWithProp", //update
    method: "post"
  };
  return p;
};
/* ********专场标的管理-删除已有招投标标的******** */
apiInterface.deleteBidTarget = function() {
  var p = {
    url: "_data/bid/tsAuctionBid/remove",
    method: "post"
  };
  return p;
};
/* ********招投标报名管理-专场报名审批******** */
apiInterface.approveMemberSignUp = function() {
  var p = {
    url: "_data/bid/tsBidEnroll/flow",
    method: "post"
  };
  return p;
};
/* ********招投标控制管理-控制台专场列表******** */
apiInterface.specialInfomationProjectList = function() {
  var p = {
    // url: "_data/bid/tsAuctionProject/query",
    url: "/_data/bid/tsAuctionProject/pageTradableProject",
    method: "get"
  };
  return p;
};
/* ********招投标控制管理-招投标控制台在线会员******** */
apiInterface.getOnlineMemberList = function() {
  var p = {
    url: "_data/bid/tsAuctionProject/getOnlineMember",
    // url: "_data/member/basMember/getOnlineMember",
    method: "get"
  };
  return p;
};
/* ********招投标控制管理-招投标控制台流标项目重启******** */
apiInterface.restartProject = function() {
  var p = {
    url: "_data/bid/tsAuctionProject/reProject",
    method: "post"
  };
  return p;
};
/* ********招投标控制管理-招投标控制台流标项目复制重启******** */
apiInterface.copyProject = function() {
  var p = {
    url: "_data/bid/tsAuctionProject/copyProject",
    method: "post"
  };
  return p;
};
/* ********招投标控制管理-发送临时通知******** */
apiInterface.pushConsoleMsg = function() {
  var p = {
    url: "_data/bid/tsBidConsole/pushConsoleMsg",
    method: "get"
  };
  return p;
};
/* ********招投标控制管理-招投标控制台******** */
apiInterface.getBidConsoleList = function(type) {
  let urlstr = type == "10" ? "tsBidListConsole" : "tsBidConsole";
  var p = {
    url: "_data/bid/" + urlstr + "/list",
    method: "get"
  };
  return p;
};
/* ********招投标控制管理-招投标控制台单条标的详细数据******** */
apiInterface.getBidConsoleItem = function(type) {
  let urlstr = type == "10" ? "tsBidListConsole" : "tsBidConsole";
  var p = {
    url: "_data/bid/" + urlstr + "/loadByExample",
    method: "get"
  };
  return p;
};
/* ********招投标控制管理-招投标控制台按指令驱动流程******** */
apiInterface.flowBidConsoleItem = function(type) {
  let urlstr = type == "10" ? "tsBidListConsole" : "tsBidConsole";
  var p = {
    url: "_data/bid/" + urlstr + "/flow",
    method: "post"
  };
  return p;
};
/* ********招投标控制管理-招投标控制台按开始指令驱动流程******** */
apiInterface.startflowBidConsoleItem = function() {
  var p = {
    url: "_data/bid/tsBidConsole/startConsoleFlow",
    method: "post"
  };
  return p;
};
/* ********招投标控制管理-暂停定时流程******** */
apiInterface.pauseConsoleFlow = function() {
  var p = {
    url: "_data/bid/tsBidConsole/pause",
    method: "post"
  };
  return p;
};
/* ********招投标控制管理-重启定时流程******** */
apiInterface.restartConsoleFlow = function() {
  var p = {
    url: "_data/bid/tsBidConsole/restart",
    method: "post"
  };
  return p;
};
/* ********招投标控制管理-评标******** */
apiInterface.scoreTarget = function() {
  var p = {
    url: "_data/bid/tsBidScore/evaluate",
    method: "post"
  };
  return p;
};
/* ********招投标控制管理-定标******** */
apiInterface.sureTarget = function() {
  var p = {
    url: "_data/bid/tsAuctionBidquote/decide",
    method: "post"
  };
  return p;
};
/* ********资金管理-账户管理-会员账户查询列表******** */
apiInterface.getMemberAccountQueryList = function() {
  var p = {
    url: "_data/pay/tsPayAccount/page",
    method: "get"
  };
  return p;
};
/* ********资金管理-账户管理-账户资金总额******** */
apiInterface.getAccountTotalfunds = function() {
  var p = {
    url: "_data/pay/tsPayAccount/queryAccount",
    method: "get"
  };
  return p;
};
/* ********资金管理-交易申请管理-会员可用金退回申请列表******** */
apiInterface.getMemberMoneyBackList = function() {
  var p = {
    url: "_data/pay/tsPayPerform/page",
    method: "get"
  };
  return p;
};
/* ********资金管理-交易申请管理-审核会员可用金退回申请******** */
apiInterface.flowMemberMoneyBack = function() {
  var p = {
    url: "_data/pay/tsPayPerform/flow",
    method: "post"
  };
  return p;
};

/* ********资金管理-账户管理-新建会员账户信息******** */
apiInterface.addMemberAccount = function() {
  var p = {
    url: "_data/pay/tsPayAccount/insert",
    method: "post"
  };
  return p;
};
/* ********资金管理-账户管理-更新会员账户信息******** */
apiInterface.updateMemberAccount = function() {
  var p = {
    url: "_data/pay/tsPayAccount/update",
    method: "post"
  };
  return p;
};
/* ********资金管理-账户管理-删除会员账户信息******** */
apiInterface.removeMemberAccount = function() {
  var p = {
    url: "_data/pay/tsPayAccount/remove",
    method: "post"
  };
  return p;
};
/* ********资金管理-账户管理-账户交易记录列表******** */
apiInterface.getAccountTradeRecordList = function() {
  var p = {
    url: "_data/pay/tsPayVoucher/page",
    method: "get"
  };
  return p;
};
/* ********资金管理-账户管理-新建交易记录信息******** */
apiInterface.addTradeRecord = function() {
  var p = {
    url: "_data/pay/tsPayVoucher/insert",
    method: "post"
  };
  return p;
};
/* ********资金管理-账户管理-更新交易记录信息******** */
apiInterface.updateTradeRecord = function() {
  var p = {
    url: "_data/pay/tsPayVoucher/update",
    method: "post"
  };
  return p;
};
/* ********资金管理-账户管理-删除交易记录信息******** */
apiInterface.removeTradeRecord = function() {
  var p = {
    url: "_data/pay/tsPayVoucher/remove",
    method: "post"
  };
  return p;
};
/* ********会员管理-会员注册******** */
apiInterface.addMember = function() {
  var p = {
    url: "_data/member/basMember/startFlow",
    method: "post"
  };
  return p;
};
/* ********会员管理-会员修改******** */
apiInterface.updateMember = function() {
  var p = {
    url: "_data/member/basMember/update",
    method: "post"
  };
  return p;
};
/* ********会员管理-删除会员******** */
apiInterface.removeMember = function() {
  var p = {
    url: "_data/member/basMember/remove",
    method: "post"
  };
  return p;
};
/* ********会员管理-审核会员******** */
apiInterface.flowMember = function() {
  var p = {
    url: "_data/member/basMember/flow",
    method: "post"
  };
  return p;
};
/* ********会员管理-重置会员密码******** */
apiInterface.resetMemberPsd = function() {
  var p = {
    url: "_data/member/basMember/resetPwd",
    method: "post"
  };
  return p;
};
/* ********会员管理-获取会员列表******** */
apiInterface.getMemberList = function() {
  var p = {
    url: "_data/member/basMember/page",
    method: "get"
  };
  return p;
};
/* ********会员管理-开启会员年审流程******** */
apiInterface.startMemberYearCheckFlow = function() {
  var p = {
    url: "_data/member/tsBasMembercheck/startFlow",
    method: "post"
  };
  return p;
};
/* ********会员管理-获取会员年审列表******** */
apiInterface.getMemberYearCheckList = function() {
  var p = {
    url: "_data/member/tsBasMembercheck/page",
    method: "get"
  };
  return p;
};
/* ********会员管理-保存会员年审信息******** */
apiInterface.saveMemberYearCheckInfo = function(muti) {
  var p = {
    url: "_data/member/tsBasMembercheck/saveMemberInfo",
    method: "post",
    isMuti: muti
  };
  return p;
};
/* ********会员管理-提交会员年审信息******** */
apiInterface.submitMemberYearCheckInfo = function(muti) {
  var p = {
    url: "_data/member/tsBasMembercheck/flowMemberInfo",
    method: "post",
    isMuti: muti
  };
  return p;
};
/* ********会员管理-提交会员年审意见******** */
apiInterface.submitMemberYearCheckInfoComment = function(muti) {
  var p = {
    url: "_data/member/tsBasMembercheck/flow",
    method: "post",
    isMuti: muti
  };
  return p;
};
/* ********会员管理-临时通过会员年审******** */
apiInterface.submitMemberYearCheckInfoOnce = function(muti) {
  var p = {
    url: "_data/member/tsBasMembercheck/passTemporaryCheck",
    method: "post",
    isMuti: muti
  };
  return p;
};
/* ********会员管理-取消临时通过会员年审******** */
apiInterface.cancleMemberYearCheckInfoOnce = function(muti) {
  var p = {
    url: "_data/member/tsBasMembercheck/cancelTemporaryCheck",
    method: "post",
    isMuti: muti
  };
  return p;
};
/* ********个人中心-管理员修改密码******** */
apiInterface.updatePswManager = function() {
  var p = {
    url: "_data/base/operator/updatePwd",
    method: "post"
  };
  return p;
};
/* ********个人中心-会员修改密码******** */
apiInterface.updatePswMember = function() {
  var p = {
    url: "_data/member/basMember/updatePwd",
    method: "post"
  };
  return p;
};
/* ********个人中心-管理员信息******** */
apiInterface.getManagerInfo = function() {
  var p = {
    url: "_data/base/orgEmployee/loadByExample",
    method: "get"
  };
  return p;
};
/* ********个人中心-管理员修改个人信息******** */
apiInterface.updateUsenInfoManager = function() {
  var p = {
    url: "_data/base/operator/updateOpt",
    method: "post"
  };
  return p;
};

/* ********↑↑↑↑↑↑↑管理员端↑↑↑↑↑↑↑******** */

/* ********↓↓↓↓↓↓↓会员端↓↓↓↓↓↓↓******** */

/* ********会员合同追踪-获取合同追踪列表******** */
apiInterface.getMemberContractAttractList = function() {
  var p = {
    url: "_data/bid/tsAuctionContract/pageH",
    method: "get"
  };
  return p;
};
/* ********委托方合同追踪-获取合同追踪列表******** */
apiInterface.getPrincipalContractAttractList = function() {
  var p = {
    url: "_data/bid/tsAuctionContract/pageW",
    method: "get"
  };
  return p;
};
/* ********会员/委托方合同追踪-交付合同******** */
apiInterface.addContractAttract = function() {
  var p = {
    url: "_data/bid/tsAuctionContract/add",
    method: "post"
  };
  return p;
};
/* ********会员/委托方合同追踪-终止合同******** */
apiInterface.endContractAttract = function() {
  var p = {
    url: "_data/bid/tsAuctionContract/end",
    method: "post"
  };
  return p;
};
/* ********会员/委托方合同追踪-待确认合同******** */
apiInterface.confirmContractAttract = function() {
  var p = {
    url: "_data/bid/tsAuctionContract/pageCon",
    method: "get"
  };
  return p;
};
/* ********会员/委托方合同追踪-确认合同******** */
apiInterface.sureContractAttract = function() {
  var p = {
    url: "_data/bid/tsAuctionContract/update",
    method: "post"
  };
  return p;
};
/* ********会员/委托方合同追踪-终止合同后提交评价******** */
apiInterface.addContractComment = function() {
  var p = {
    url: "_data/bid/tsAuctionEvaluate/add",
    method: "post"
  };
  return p;
};
/* ********会员/委托方资料管理-会员/委托方信息管理******** */
apiInterface.getMemberInfo = function() {
  var p = {
    url: "_data/member/basMember/loadByExample",
    method: "get"
  };
  return p;
};
/* ********会员/委托方资料管理-更新会员/委托方信息管理******** */
apiInterface.updateMemberInfo = function() {
  var p = {
    url: "_data/member/basMember/update",
    method: "post"
  };
  return p;
};

/* ********资金管理-账户查询******** */
apiInterface.getMyAccontInfo = function() {
  var p = {
    url: "_data/pay/tsPayAccount/queryAccount",
    method: "get"
  };
  return p;
};
/* ********我的交易-我的应价列表******** */
apiInterface.mybidList = function() {
  var p = {
    url: "_data/bid/tsAuctionBid/qoutePage",
    method: "get"
  };
  return p;
};
/* ********我的交易-我的报名列表******** */
apiInterface.myApplyList = function() {
  var p = {
    url: "_data/bid/tsBidEnroll/query",
    method: "get"
  };
  return p;
};
/* ********交易中心-我要报名列表******** */
apiInterface.mySignupProjectList = function() {
  var p = {
    url: "_data/bid/tsBidEnroll/queryProject",
    method: "get"
  };
  return p;
};
/* ********我的交易-保存专场报名(仅保存)******** */
apiInterface.saveApplyList = function(muti) {
  var p = {
    url: "_data/bid/tsBidEnroll/saveEnroll",
    method: "post",
    isMuti: muti
  };
  return p;
};
/* ********我的交易-专场报名送审（送审、驱动到下一个流程）******** */
apiInterface.flowApplyList = function(muti) {
  var p = {
    url: "_data/bid/tsBidEnroll/flowEnroll",
    method: "post",
    isMuti: muti
  };
  return p;
};

/* ********我的交易-删除专场报名（送审、驱动到下一个流程）******** */
apiInterface.removeApplyList = function() {
  var p = {
    url: "_data/bid/tsBidEnroll/remove",
    method: "post"
  };
  return p;
};
/* ********我的交易-我的应价******** */
apiInterface.biddingPrice = function() {
  var p = {
    url: "_data/bid/tsAuctionBidquote/take",
    method: "post"
  };
  return p;
};
/* ********会员、委托方-招投标控制台******** */
apiInterface.getMemberConsoleList = function() {
  var p = {
    url: "_data/bid/tsAuctionBid/list",
    method: "get"
  };
  return p;
};
/* ********专场标的管理-招投标标的列表******** */
apiInterface.getConfirmNoticeList = function() {
  var p = {
    url: "_data/bid/tsAuctionBid/getConfirmNoticeList",
    method: "get"
  };
  return p;
};
/* ********会员、委托方、管理员获取成交确认书******** */
apiInterface.getDealConfirmInfo = function() {
  var p = {
    url: "_data/bid/tsAuctionBid/getConfirmNotice",
    method: "get"
  };
  return p;
};

/* ********↑↑↑↑↑↑↑会员端↑↑↑↑↑↑↑******** */

//const Apisetting = {...apiInterface };

export default apiInterface;

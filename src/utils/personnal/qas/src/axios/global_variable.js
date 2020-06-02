// http://10.10.7.22:8081/oh-qas/_data/base/operator/getUserSeesion

const mainPrefix = "/oh-qas";
const constants = {
  // 项目基础前缀
  mainPrefix: mainPrefix,
  // 全局接口名前缀
  baseURL:
    process.env.NODE_ENV === "production"
      ? mainPrefix
      : "http://10.10.7.22:8081/oh-qas",
  numberPerpage: 10,
  //每页显示的列表数量
  paginationlayout: "total, prev, pager, next, jumper",
  //登出
  logout: mainPrefix + "/logout",
  //弹框的宽度
  dialog_width: "85%",
  //弹框距离顶部的位置
  dialog_margin_top: "4%",
  // 项目原有参数
  ROUTEID_SAMPLEREAP: "samplereap", //计划管理--新粮收获 对应连接_后面的内容
  ROUTEID_SAMPLESTOCK: "samplestock", //计划管理-库存存储 对应连接_后面的内容
  ROUTEID_SAMPLEMARKET: "samplemarket", //计划管理--供销市场 对应连接_后面的内容
  LINK_REAP: "1", //代表监管环节是新粮收获
  LINK_STOCK: "2", //代表监管环节是库存存储
  LINK_MARKET: "3", //代表监管环节是供销市场
  EMIT_TRANSFPAGPARAM: "transfPagParam", //
  EMIT_TRANSFTOALNUM: "transfToalNum",
  PLAN_SAMPLER: "transfSampler",
  PLAN_CHECKER: "transfChecker",
  PLAN_TO_SAMPLER: "transfToSampler",
  PLAN_TO_CHECKER: "transfToChecker",
  TINY_EMIT_TRANSFPAGPARAM: "transfTinyPagParam", //
  TINY_EMIT_TRANSFTOALNUM: "transfTinyToalNum",
  COPY_EMIT_DISTRICT: "transfDistrict",
  TASKEDIT_CANCEL: "transfTaskEditCancel",
  EMIT_TRANSFRELOADDATA: "transfReloadData", //刷新页面命令
  EMIT_TRANSFENTRUSTORG: "transfEntrustOrg", //指定委托单位
  EMIT_TRANSFBREADCRUMB: "transfBreadcrumb", //面包屑
  EMIT_POINTLAYOUT_SHOWTAB: "pointLayOutShowTab", //计划管理-库点存储-定点布点
  EMIT_POINTLAYOUT_SUREDATA: "pointLayOutSureData", //计划管理-库点存储-定点布点--选中数据
  EMIT_POINTLAYOUT_TRANSSUREDATA: "pointLayOutTransSureData", //计划管理-库点存储-定点布点--传递选中数据
  EMIT_QUALITY_RESULT_ENTER_SAMPLE_SEARCH: "qualityResultEnterSampleSearch", //质量结果录入--查询样品
  EMIT_QUALITY_RESULT_ENTER_BATHTEST: "qualityResultEnterBathTest", //质量结果录入--批量设置检测人和检测时间
  //===========收样状态
  SAMPESTATUE_WAIT_SAMPLE: "0", //待收样
  SAMPESTATUE_WAIT_CHECK: "2", //待质检
  SAMPESTATUE_WAIT_APPROVAL: "4", //待审核
  SAMPESTATUE_END: "8", //结束
  SAMPESTATUE_CANCEL: "9", //作废
  //============

  //================ org type
  ORGTYPE_ID001: "001",
  ORGTYPE_NAME001: "粮食局",
  ORGTYPE_ID005: "005",
  ORGTYPE_NAME005: "质检站",

  //===========菜单--首页的index设置
  DEF_MENU_INDEX_INDEX: "index",
  //==========字典表菜单
  QAS_PLAN_REAP_STATISTICAL_CATALOG: "qas_plan_reap_statistical_catalog",
  QAS_PLAN_STOCK_STATISTICAL_CATALOG: "qas_plan_stock_statistical_catalog",
  QAS_PLAN_MARKET_STATISTICAL_CATALOG: "qas_plan_market_statistical_catalog",
  //=========等级字典type
  GRAINRANK: "qas_bas_grainrank",
  //====判定标准套装字典type
  STDSUITSTYPE: "qas_bas_std_type",
  //========统计汇总目录=====
  QAS_PLAN_REAP_STATISTICAL_CATALOG_4: "4qas_plan_reap_statistical_catalog",
  QAS_PLAN_REAP_STATISTICAL_CATALOG_5: "5qas_plan_reap_statistical_catalog",
  QAS_PLAN_REAP_STATISTICAL_CATALOG_6: "6qas_plan_reap_statistical_catalog",
  QAS_PLAN_REAP_STATISTICAL_CATALOG_8: "8qas_plan_reap_statistical_catalog",
  QAS_PLAN_REAP_STATISTICAL_CATALOG_9: "9qas_plan_reap_statistical_catalog",
  QAS_PLAN_STOCK_STATISTICAL_CATALOG_4: "4qas_plan_stock_statistical_catalog",
  QAS_PLAN_STOCK_STATISTICAL_CATALOG_5: "5qas_plan_stock_statistical_catalog",
  QAS_PLAN_STOCK_STATISTICAL_CATALOG_6: "6qas_plan_stock_statistical_catalog",
  QAS_PLAN_STOCK_STATISTICAL_CATALOG_7: "7qas_plan_stock_statistical_catalog",
  QAS_PLAN_STOCK_STATISTICAL_CATALOG_8: "8qas_plan_stock_statistical_catalog",
  QAS_PLAN_STOCK_STATISTICAL_CATALOG_10: "10qas_plan_stock_statistical_catalog",
  QAS_PLAN_STOCK_STATISTICAL_CATALOG_9: "9qas_plan_stock_statistical_catalog",
  QAS_PLAN_MARKET_STATISTICAL_CATALOG_4: "4qas_plan_market_statistical_catalog",
  QAS_PLAN_MARKET_STATISTICAL_CATALOG_5: "5qas_plan_market_statistical_catalog",
  QAS_PLAN_MARKET_STATISTICAL_CATALOG_6: "6qas_plan_market_statistical_catalog",
  QAS_PLAN_MARKET_STATISTICAL_CATALOG_7: "7qas_plan_market_statistical_catalog",
  QAS_PLAN_MARKET_STATISTICAL_CATALOG_8: "8qas_plan_market_statistical_catalog"
  //========统计汇总目录end====
};

export default constants;

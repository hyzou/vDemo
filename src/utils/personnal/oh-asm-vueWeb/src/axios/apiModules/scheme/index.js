const schemeApi = {
  /**
   * 考核方案
   */
  // 新增考核方案里面的接口
  addSchemeKpiTree: "_data/scheme/formulate/kpiTree",
  // 加载方案列表
  schemeTree: "_data/scheme/formulate/schemeTree",
  // 加载单条数据
  singleScheme: "_data/scheme/formulate/loadSimple",
  // 加载符合条件的所有数据
  muitScheme: "_data/scheme/formulate/listSchemeTree",
  // 加载分页数据
  pageScheme: "_data/scheme/formulate/pageSchemeTree",
  // 加载可引用的列表
  quoteSchemeList: "_data/scheme/formulate/pageQuotableSchme",
  // 删除方案
  deleteScheme: "_data/scheme/formulate/deleteScheme",
  // 方案流程详情
  schemePhases: "_data/scheme/formulate/schemePhases",
  // 单个指标数据
  singleKpi: "_data/scheme/kpi/load",
  // 单个指标数据项详情获取
  singleKpiDataDetail: "/_data/scheme/kpi/allotInfo",
  // 删除指标
  deleteKpi: "_data/scheme/formulate/deleteKpi",
  // 引用方案新增
  addQuoteScheme: "_data/scheme/formulate/quoteScheme",
  // 驱动方案流程
  flow: "_data/scheme/formulate/flow",
  // 指标数据项设定列表
  specialSettingList: "_data/scheme/formulate/getSchemeAllotTable",
  /**
   * 指标征询
   */
  // 指标征询列表
  kpiConsultList: "_data/scheme/kpiconsult/page",
  singleKpiConsultData: "_data/scheme/kpiconsult/load",
  // 获取当前登录用户需填写意见的指标征询列表
  kpiConsultListByUser: "_data/scheme/kpiconsult/pageFeedBackKpi",
  singleKpiConsultByUserData: "_data/scheme/kpiconsult/loadFeedBackInfo",
  // 结束考核
  flowEnd: "_data/scheme/formulate/indexFlowEnd",
  // kpi 指标编辑回显
  getSingleKpiData: "_data/scheme/kpi/load"
};
export default schemeApi;

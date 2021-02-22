const poolAnalysis = {
  /**
   * 抽查事项相关操作
   */
  // 获取历年各被考核机构的得分
  getScoreHistory_poolAnalysis: "_data/visual/schemeScore/yearScore",
  // 获取被考核单位历年年度考核得分排名
  // getRankHistory_poolAnalysis: "_data/visual/schemeScore/yearRank",
  // 获取考核机构下各区域历年年度考核得分排名
  getRankHistory_poolAnalysis: "_data/visual/schemeScore/yearRanks",
  // 获取指标数据项信息
  getAllotData_poolAnalysis: "_data/visual/schemeKpi/allotData",
  getAllotTableData_poolAnalysis: "_data/visual/schemeKpi/allotTableData",
  // 获取所有方案下拉框数据
  getAllScheme_poolAnalysis: "_data/scheme/formulate/finishedScheme",
  // 根据方案id获取该方案下数据项
  getSpotSchemeVars_poolAnalysis: "_data/scheme/kpi/vars",
  // 获取失分项信息
  getLostKpiInfo_poolAnalysis: "_data/visual/assess/getLostKpiInfo",
  // 获取得分汇总
  getSchemeAssessedSummary: "_data/scheme/assessed/getSchemeAssessedSummary",
  // 获取全部方案，包括完成的
  getAllScheme: "_data/scheme/formulate/schemedSelects"
};
export default poolAnalysis;

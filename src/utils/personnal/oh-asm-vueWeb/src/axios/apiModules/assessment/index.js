const assessmentApi = {
  // 指标分配 和 指标监管 接口
  distributeSuperviseList: "_data/schemeAssess/phase/pageAssess",
  // 指标监管
  superviseList: "_data/scheme/assessed/getSchemeAssessedSupervision",
  childrenFlow: "_data/scheme/assessed/flow",
  childrenFlowEnd: "_data/scheme/formulate/subFlowEnd",
  validateRamdomPhase: "_data/scheme/assessed/validateRamdomPhase",
  // 抽查方案
  singleRandomPlan: "_data/shemeAssess/schemePhase/loadAssessRandomPhase",
  // 指标分配
  startSelfBtn: "_data/scheme/assessed/loadAssessed",
  startSelfPhase: "_data/scheme/assessed/startSelfPhase",
  startRamdomPhase: "_data/scheme/assessed/startRamdomPhase",
  // 当前流程的方案
  listUnExpireScheme: "_data/schemeAssess/phase/listUnExpireScheme",
  // 考核列表
  distributeSuperviseList_assessment:
    "_data/schemeAssess/supervision/pageAssess",
  // 通过方案环节 查询每个环节的指标
  schemeKpiBySchemeId: "_data/schemeAssess/phase/schemeKpiBySchemeId",
  /**
   * 配合工作
   */
  // 列表
  cooperateList: "_data/schemeAssess/phase/pageSelfCooperate",
  // 获取处室意见列表
  listAssessComment: "_data/shemeAssess/comment/listAssessComment",
  // 配合详情
  loadAssessComment: "_data/shemeAssess/comment/loadAssessComment",
  /**
   * 自评工作
   */
  // 列表
  selfList: "_data/schemeAssess/phase/pageSelfManage",
  getFileList: "_data/supervise/schdl/getFileList",
  // 责任处室打分数据
  listAssessKpi: "_data/shemeAssess/kpi/listAssessKpi",
  // 打分列表的详情
  loadAssessKpi: "_data/shemeAssess/kpi/loadAssessKpi",
  submitEvaluation: "_data/shemeAssess/shemeAssess/reportShemeAssess",
  /**
   * 部门配合工作
   */
  //列表
  departmentCooperateList: "_data/schemeAssess/phase/pageHigherCooperate",
  departmentAssessDetail: "_data/base/organization/loadByExample",
  /**
   * 部门打分
   */
  //列表
  departmentEvaluationList: "_data/schemeAssess/phase/pageHigherManage",
  /**
   * 抽查
   */
  // 列表
  spotCheckEvaluationList: "_data/schemeAssess/phase/pageRandomAssess",
  // 被考核机构城市
  getAssessedOrgBySchemeId:
    "_data/shemeAssess/schemePhaseAcl/getAssessedOrgBySchemeId",
  // 获取 被抽查的机构
  getRandomAssessedOrgIdsBySchemeId:
    "_data/shemeAssess/schemePhaseAcl/getRandomAssessedOrgIdsBySchemeId",
  /**
   * 表彰项管理
   */
  // 表彰列表
  getRewardApplyList: "_data/schemeAssess/reward/pageInfo",
  // 表彰项下拉
  getRewardSelect: "_data/scheme/reward/selects",
  // 移除表彰申请
  removeRewardApply: "_data/schemeAssess/reward/remove",
  // 查看单条表彰申请数据
  loadRewardApplyData: "_data/schemeAssess/reward/load"
};
export default assessmentApi;

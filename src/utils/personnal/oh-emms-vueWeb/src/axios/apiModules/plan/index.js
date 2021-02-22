const planApi = {
  /**
   * 计划管理 储备计划
   */
  getReservePlanList: "_data/plan/reserve/pageData",
  // 物资列表
  getMaterialDetailList: "_data/base/material/forReserve",
  singleReservePlan: "_data/plan/reserve/load",
  // 流转储备计划
  reservePlanStatus: "_data/plan/reserve/audit",
  deleteReservePlan: "_data/plan/reserve/remove",
  /**
   * 计划管理 仓储规划建设
   */
  getPointBuildPlanList: "_data/plan/pointbuild/pageData",
  singlePointBuildPlan: "_data/plan/pointbuild/load",
  deletePointBuildPlan: "_data/plan/pointbuild/remove",
  pointBuildPlanStatus: "_data/plan/pointbuild/audit",
  /**
   * 计划管理 购置管理
   */
  getPurchaseList: "_data/plan/purchase/pageData",
  getPurchaseListNoPage: "_data/plan/purchase/listData",
  singlePurchaseData: "_data/plan/purchase/load",
  reservePlanDict: "_data/plan/reserve/listData",
  getReservePlanMaterial: "_data/plan/reserveDtl/getMaterial",
  deletePurchase: "_data/plan/purchase/remove",
  purchaseStatus: "_data/plan/purchase/audit",
  purchaseDtlList: "_data/plan/purchaseDtl/getMaterial"
};

export default planApi;

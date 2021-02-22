const requisitionCertify = {
  // 列表
  getRequisitionCertifyList: "_data/doc/requisition/page",
  // 状态下拉
  statusSelect: "_data/doc/requisition/listStatusSelect",

  // 运输工具
  transportList:
    "_data/frame/ref/list?_refKey=dict&busintypeid=fb_base_transporttype",
  removeRequisitionCertify: "_data/doc/requisition/delete",
  requisitionCertifyStatus: "_data/doc/requisition/flow",
  // 调拨申请单明细信息(单条)
  singleRequisitionCertifyData: "_data/doc/requisition/load",
  // 库点里面相同规格类别物资 汇总数
  getMaterialSummary: "_data/main/stock/getMaterialGroupBySpecs",
  // 获取调拨单列表,不分页
  getRequisitionNopage: "_data/doc/requisition/list",
  // 获取调拨单明细列表
  getRequisitionDetailList: "_data/doc/requisition/pageDtl"
};
export default requisitionCertify;

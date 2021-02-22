const supervisionApi = {
  // 获取方案下拉框接口
  getSchemDropdownlist_supervision: "_data/scheme/formulate/getRunningSelects",
  // 下级考核办新增考核进展汇报
  addProgress_supervision: "_data/supervise/report/insertInfo",
  // 获取考核进展汇报列表
  getProgressList_supervision: "_data/supervise/report/getInfo",
  // 获取考核进展汇报列表
  updateProgress_supervision: "_data/supervise/report/updateInfo",
  // 删除考核进展汇报列表
  removeProgress_supervision: "_data/supervise/report/removeInfo",
  // 获取考核进展汇报文件列表
  getSingleProgressFileList_supervision: "_data/supervise/report/getFilePage",
  // 删除考核进展汇报文件列表中的某一条文件
  removeSingleProgressFile_supervision: "_data/supervise/report/removeFile",
  // 获取(专项)年度考核落实进展台账列表
  getAllStandList_supervision: "/_data/supervise/schdl/getInfo",
  // 获取(专项)年度考核落实进展台账列表
  getFinishedCondition_supervision:
    "/_data/supervise/schdl/getFinishedCondition",
  // 实时进度台账创建
  insertProgressInfo_supervision: "/_data/supervise/schdl/insertInfo",
  // 实时进度台账修改
  updateProgressInfo_supervision: "/_data/supervise/schdl/updateInfo",
  //台账文件删除
  removeFile_supervision: "/_data/supervise/schdl/removeFile",
  //台账文件新增
  uploadFile_supervision: "/_data/supervise/schdl/insertFileInfo",
  //台账填写分配创建
  kpiDistribution_supervision: "/_data/supervise/schdl/kpiDistribution",
  //台账填写分配修改
  updateKpiDistribution_supervision:
    "/_data/supervise/schdl/updateKpiDistribution",
  //台账分配接口（原接口只能分配牵头，现在可分配牵头和配合部门
  dispatchKpiDistribution_supervision: "/_data/scheme/formulate/updateKpiAssign"
};
export default supervisionApi;

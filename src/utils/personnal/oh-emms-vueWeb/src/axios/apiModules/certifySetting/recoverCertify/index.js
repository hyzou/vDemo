const recoverCertify = {
  // 列表
  getRecoverCertifyList: "_data/impl/recover/pageByParams",
  // 获取出入库单号
  getSourceInout: "_data/doc/inout/getSourceInout",
  removeRecoverCertify: "_data/impl/recover/removeImplRecover",
  recoverCertifyStatus: "_data/impl/recover/updateRecoverStatus",
  singleRecoverCertifyData: "_data/impl/recover/loadById",
  //3.1获取出回收单号，调用接口：
  getRecoverListNopage: "/_data/impl/recover/getSourceRecover",
  //3.2获取出回收明细，调用接口：
  getRecoverDetaillist: "/_data/impl/recoverDtl/pageByParams",
  recoverCertifyEnd: "_data/impl/recover/recoverFinish"
};
export default recoverCertify;

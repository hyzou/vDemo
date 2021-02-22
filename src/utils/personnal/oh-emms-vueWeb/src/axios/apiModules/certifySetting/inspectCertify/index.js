/**
 * 执行单,用type区分单据类型
 * type[Sting] IN-入库;OUT-出库;RC-回收入库单;RI-退货入库单（出库退货）;RO-退货出库单（入库退货）;CI-盘盈入库单;CO-盘亏出库单
 */
const inspectCertify = {
  // 列表
  getInspectCertifyList: "_data/impl/inspect/pageData",
  // 编辑回显的单条数据
  singleInspectCertifyData: "_data/impl/inspect/load",
  removeInspectCertify: "_data/impl/inspect/remove",
  inspectCertifyStatus: "_data/impl/inspect/confirm"
};
export default inspectCertify;

/**
 * 执行单,用type区分单据类型
 * type[Sting] IN-入库;OUT-出库;RC-回收入库单;RI-退货入库单（出库退货）;RO-退货出库单（入库退货）;CI-盘盈入库单;CO-盘亏出库单
 */
const incomeCertify = {
  // 出入库执行单总表,分页查询主表信息
  list_incomeCertify: "/_data/doc/inout/pageByParams",
  // 出入库执行单总表,根据ID获取单条详细信息
  single_incomeCertify: "/_data/doc/inout/loadById",
  // 出入库执行单明细,分页查询明细表信息
  detailList_incomeCertify: "/_data/doc/inoutDtl/pageByParams",
  // 新增
  add_incomeCertify: "/_data/doc/inout/add",
  // 修改
  update_incomeCertify: "/_data/doc/inout/updateDocInout",
  // 删除
  remove_incomeCertify: "/_data/doc/inout/removeDocInout",
  // 执行出入库
  inOut_incomeCertify: "/_data/doc/inout/inoutFinish"
};
export default incomeCertify;

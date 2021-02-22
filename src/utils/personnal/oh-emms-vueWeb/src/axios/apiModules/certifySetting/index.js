/**
 * 单证管理
 */
import incomeCertify from "./incomeCertify";
import moveCertify from "./moveCertify";
import handOutCertify from "./handOutCertify";
import patrolRecordCertify from "./patrolRecordCertify";
import maintenanceCertify from "./maintenanceCertify";
import inspectCertify from "./inspectCertify";
import qualityCertify from "./qualityCertify";
import recoverCertify from "./recoverCertify";
import requisitionCertify from "./requisitionCertify";
import scrapCertify from "./scrapCertify";
import checkCertify from "./checkCertify";
const certifySettingApi = {
  // 库存明细
  getStockMaterialList: "_data/stock/dtl/pageByParams",
  // 出入库执行单，出入库退货单，出入库退货，盘盈盘亏，回收入库等
  ...incomeCertify,
  // 移库执行单
  ...moveCertify,
  // 发放登记单
  ...handOutCertify,
  // 巡查记录单
  ...patrolRecordCertify,
  // 维修保养单
  ...maintenanceCertify,
  // 巡查记录单
  ...inspectCertify,
  // 质量检测单
  ...qualityCertify,
  // 调拨单
  ...requisitionCertify,
  // 回收单
  ...recoverCertify,
  // 报废申请单
  ...scrapCertify,
  // 盘点单
  ...checkCertify
};
export default certifySettingApi;

/**
 * 移库执行单
 */
const moveCertify = {
  // 分页查询主表信息
  list_moveCertify: "/_data/doc/moveDtl/pageByParams",
  // 单条获取明细
  single_moveCertify: "/_data/doc/move/loadById",
  // 新增
  add_moveCertify: "/_data/doc/move/add",
  // 修改
  update_moveCertify: "/_data/doc/move/updateDocMove",
  // 删除
  remove_moveCertify: "/_data/doc/move/removeDocMove",
  // 移库操作（生成记账凭证）
  move_moveCertify: "/_data/doc/move/moveFinish"
};
export default moveCertify;

/**
 * 发放登记单
 */
const patrolRecordCertify = {
  // 总表,分页查询主表信息
  list_patrolRecordCertify: "/_data/impl/inspect/pageData",
  // 总表,根据ID获取单条详细信息
  single_patrolRecordCertify: "/_data/impl/inspect/load",
  // 新增
  add_patrolRecordCertify: "/_data/impl/inspect/insertData",
  // 修改
  update_patrolRecordCertify: "/_data/impl/inspect/updateData",
  // 删除
  remove_patrolRecordCertify: "/_data/impl/inspect/remove",
  // 批量删除
  removeBatch_patrolRecordCertify: "/_data/impl/inspect/removeBatch"
};
export default patrolRecordCertify;

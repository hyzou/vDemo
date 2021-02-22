/**
 * 发放登记单
 */
const maintenanceCertify = {
  // 总表,分页查询主表信息
  list_maintenanceCertify: "/_data/impl/service/pageByParams",
  // 总表,根据ID获取单条详细信息
  single_maintenanceCertify: "/_data/impl/service/loadById",
  // 新增
  add_maintenanceCertify: "/_data/impl/service/add",
  // 修改
  update_maintenanceCertify: "/_data/impl/service/updateImplService",
  // 删除
  remove_maintenanceCertify: "/_data/impl/service/removeImplService",
  // 结束
  end_maintenanceCertify: "_data/impl/service/serviceFinish"
};
export default maintenanceCertify;

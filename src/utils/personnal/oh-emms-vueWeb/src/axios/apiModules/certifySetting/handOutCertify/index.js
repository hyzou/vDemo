/**
 * 发放登记单
 */
const handOutCertify = {
  // 总表,分页查询主表信息
  list_handOutCertify: "/_data/impl/handout/pageData",
  // 总表,根据ID获取单条详细信息
  single_handOutCertify: "/_data/impl/handout/load",
  // 新增
  add_handOutCertify: "/_data/impl/handout/insertData",
  // 修改
  update_handOutCertify: "/_data/impl/handout/updateData",
  // 删除
  remove_handOutCertify: "/_data/impl/handout/removeData",
  // 批量删除
  removeBatch_handOutCertify: "/_data/impl/handout/removeBatch",
  // 明细,分页查询明细表信息
  detail_list_handOutCertify: "/_data/main/implHandoutDtl/pageData",
  // 明细,根据ID获取单条详细信息
  detail_single_handOutCertify: "/_data/main/implHandoutDtl/load",
  // 新增明细
  detail_add_handOutCertify: "/_data/main/implHandoutDtl/insert",
  // 修改明细
  detail_update_handOutCertify: "/_data/main/implHandoutDtl/update",
  // 删除明细
  detail_remove_handOutCertify: "/_data/main/implHandoutDtl/remove",
  handOutCertifyStatus: "_data/impl/handout/confirm"
};
export default handOutCertify;

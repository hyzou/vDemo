const baseApi = {
  /**
   * 基础数据 组织机构管理
   */
  // 获取组织机构树
  getOrgList: "_data/base/org/tree",
  // 禁用
  disableOrg: "_data/base/organization/disableOrg",
  // 启用
  enableOrg: "_data/base/organization/enableList",
  // 行政区划
  areaDict: "_data/basic/district2/tree",
  // 新增下级机构
  addOrg: "_data/base/organization/add",
  //编辑 下级机构
  editOrg: "_data/base/organization/updateOrg",
  // 通过id 获取选中数据
  getOrgSelectList: "/_data/base/organization/loadByExample",
  /**
   * 基础数据 组织人员管理
   */
  getAllUserList: "_data/base/orgemployee/queryEmpNative",
  // 角色授权
  getRoles: "_data/base/orgemployee/twoRoles",
  // 分级角色授权
  getTwoSpeciltys: "_data/base/orgemployee/twoSpeciltys",
  // 启用禁用
  changeUserStatus: "_data/base/orgemployee/deleteList",
  // 删除
  destroyList: "_data/base/orgemployee/destroyList",
  /**
   * 基础数据 菜单管理
   */
  // 获取菜单
  getMenuList: "_data/base/menu/tree",
  // 启用禁用`
  updateMenuStatus: "_data/base/menu/updateMenuStatus",
  // 通过id 获取选中数据
  getMenuDataById: "_data/base/menu/loadByExample",
  // 删除菜单
  deleteMenu: "_data/base/menu/deleteMenu",
  /**
   * 基础数据 角色权限管理
   */
  getRoleList: "_data/base/role/page",
  getRoleDataById: "_data/base/role/loadByExample",
  // 启用禁用
  updateRoleStatus: "_data/base/role/updateStatus",
  // 删除
  deleteRole: "_data/base/role/deleteList",
  // 获取菜单树
  getMenuTree: "_data/base/menu/treeDto",
  // 给角色设置菜单权限
  setRoleMenu: "_data/base/menu/updateRoleMenu",
  // 已分配用户列表
  getAllocatedUserList: "_data/base/operatorrole/query",
  // 未分配用户列表
  getUserList: "_data/base/orgemployee/query",
  // 分配用户
  updateOptRole: "_data/base/operatorrole/updateOptRoleBody",
  deleteAllocatedUser: "_data/base/operatorrole/deleteOptRoleBody",
  /**
   * 基础数据 行政区划管理
   */
  getAreaList: "_data/basic/district/tree",
  updateAreaStatus: "_data/basic/district/updateStatus",
  // 通过id 获取 areaData
  getAreaDataById: "_data/basic/district/loadByExample",
  /**
   * 基础数据 字典管理
   */
  getDictList: "_data/basic/busintype/pageRef",
  deleteDict: "_data/basic/busintype/remove",
  getDictContentList: "_data/basic/dictionary/pageRef",
  deleteDictContent: "_data/basic/dictionary/remove",
  // 上级字典树
  getHigherLevelTree: "_data/basic/dictionary/tree",
  /**
   * 基础数据 计划任务
   */
  getTaskList: "_data/frame/task/query",
  updateTask: "_data/frame/task/update",
  deleteTask: "_data/frame/task/remove",
  pauseTask: "_data/frame/task/pause",
  resumeTask: "_data/frame/task/resume",
  runTask: "_data/frame/task/run",
  /**
   * 基础数据 表彰管理
   */
  getRewardList: "_data/scheme/reward/page",
  deleteReward: "_data/scheme/reward/delete",
  singleReward: "_data/scheme/reward/loadInfo",
  /**
   * 基础数据 计量单位
   */
  getUnitSelect: "_data/base/unit/listAll",
  getUnitList: "_data/base/unit/pageData",
  updateUnitStatus: "_data/base/unit/updateStatus",
  removeUnit: "_data/base/unit/removeBatch",
  /**
   * 基础数据 物资类别
   */
  getMaterialTypeTree: "_data/base/materialType/getTree",
  getMaterialTypeList: "_data/base/materialType/getByParentId",
  removeMaterialType: "_data/base/materialType/removeBatch",
  updateMaterialTypeStatus: "_data/base/materialType/updateStatus",
  /**
   * 基础数据 物资
   */
  getMaterialList: "_data/base/material/getByTypeid",
  removeMaterial: "_data/base/material/removeBatch",
  updateMaterialStatus: "_data/base/material/updateStatus",
  singleMaterialData: "_data/base/material/load",
  /**
   * 基础数据 供应商
   */
  getSupplierList: "_data/base/supplier/pageData",
  removeSupplier: "_data/base/supplier/removeBatch",
  updateSupplierStatus: "_data/base/supplier/updateStatus",
  /**
   * 基础数据 月结
   */
  monthBalanceList: "_data/main/storeAccount/pageData",
  monthBalanceOperation: "_data/main/storeAccount/monthBalanceManual"
};
export default baseApi;

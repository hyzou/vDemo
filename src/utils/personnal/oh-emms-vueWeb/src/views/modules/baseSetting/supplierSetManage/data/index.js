// 搜索
import {
  searchFormBtns,
  searchFormItems
} from "@/utils/formSettingsJson/search/baseSetting/supplierSetManage";
// 表头
import { tableHeader } from "@/utils/formSettingsJson/table/baseSetting/supplierSetManage";
// 表格上方按钮
import { operateButtons } from "@/utils/formSettingsJson/operateButton/baseSetting/supplierSetManage";

// 业务代码
import {
  addSupplierButton,
  editSupplierButton,
  supplierContentItems
} from "@/utils/formSettingsJson/dialog/baseSetting/supplierSetManage";

// 必填验证
import supplierSetRule from "@/utils/formRulesJson/baseSetting/supplierSetManage";

const data = function(vm) {
  let obj = {
    // 搜索栏
    searchFormSettings: {
      fullScreen: false,
      formGroupList: searchFormItems,
      formGroupValues: {},
      formButtonList: searchFormBtns
    },
    showSearchForm: true,
    // 表格选中的供应商数据
    chosedSupplierData: [],
    // table表格配置
    tableSettings: {
      tableDatas: [],
      tableSettingOptions: {
        isShowIndex: true,
        showIndexHeader: "序号",
        isMultipleTable: true,
        ref: "supplierTable",
        rowKey: "code",
        tooltipEffect: "dark",
        border: true,
        defaultExpandAll: true,
        headerOptions: tableHeader
      }
    },
    // 分页配置
    paginationSettings: {
      currentPage: 1,
      totalNumbers: 0
    },
    // 表格上方头部设置
    operateButtonsSettings: {
      moduleName: "tableList",
      buttonListData: operateButtons
    },
    // 新增列表
    addSupplierButton: addSupplierButton,
    editSupplierButton: editSupplierButton,
    supplierContentItems: supplierContentItems,
    //新增修改弹窗
    dialogFormSettings: {
      fullScreen: false,
      dialogFormVisible: false,
      dialogFormTitle: "菜单",
      dialogFormItems: {
        formGroupValues: {},
        formGroupList: supplierContentItems,
        formButtonList: [],
        rules: supplierSetRule
      }
    }
  };
  return obj;
};
export default data;

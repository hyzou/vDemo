// 搜索
import {
  searchFormBtns,
  searchFormItems
} from "@/utils/formSettingsJson/search/baseSetting/materialTypeSetManage";
// 表头
import { tableHeader } from "@/utils/formSettingsJson/table/baseSetting/materialTypeSetManage";
// 表格上方按钮
import { operateButtons } from "@/utils/formSettingsJson/operateButton/baseSetting/materialTypeSetManage";

// 业务代码
import {
  addMaterialTypeButton,
  editMaterialTypeButton,
  materialTypeContentItems
} from "@/utils/formSettingsJson/dialog/baseSetting/materialTypeSetManage";

// 必填验证
import materialTypeSetRule from "@/utils/formRulesJson/baseSetting/materialTypeSetManage";

const data = function(vm) {
  let obj = {
    // 选中的树节点
    chosedMaterialType: null,
    // 树配置
    treeSettings: {
      notSetFirstNodeHighlight: true,
      treeData: [],
      nodeKey: "id",
      defaultProps: {
        children: "children",
        label: "text",
        disabled: "control"
      }
    },
    // 搜索栏
    searchFormSettings: {
      fullScreen: false,
      formGroupList: searchFormItems,
      formGroupValues: {},
      formButtonList: searchFormBtns
    },
    showSearchForm: true,
    // 表格选中的物资类别数据
    chosedMaterialTypeData: [],
    // table表格配置
    tableSettings: {
      tableDatas: [],
      tableSettingOptions: {
        isShowIndex: true,
        showIndexHeader: "序号",
        isMultipleTable: true,
        ref: "materialTypeTable",
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
    operateButtons: operateButtons,
    operateButtonsSettings: {
      moduleName: "tableList",
      buttonListData: operateButtons
    },
    // 新增列表
    addMaterialTypeButton: addMaterialTypeButton,
    editMaterialTypeButton: editMaterialTypeButton,
    materialTypeContentItems: materialTypeContentItems,
    //新增修改弹窗
    dialogFormSettings: {
      width: "50%",
      fullScreen: false,
      dialogFormVisible: false,
      dialogFormTitle: "菜单",
      dialogFormItems: {
        formGroupValues: {},
        formGroupList: [],
        formButtonList: [],
        rules: materialTypeSetRule
      }
    }
  };
  return obj;
};
export default data;

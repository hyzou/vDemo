// 搜索
import {
  searchFormBtns,
  searchFormItems
} from "@/utils/formSettingsJson/search/baseSetting/materialSetManage";
// 表头
import { tableHeader } from "@/utils/formSettingsJson/table/baseSetting/materialSetManage";
// 表格上方按钮
import { operateButtons } from "@/utils/formSettingsJson/operateButton/baseSetting/materialTypeSetManage";

// 业务代码
import {
  addMaterialButton,
  editMaterialButton,
  materialContentItems
} from "@/utils/formSettingsJson/dialog/baseSetting/materialSetManage";

// 必填验证
import materialSetRule from "@/utils/formRulesJson/baseSetting/materialSetManage";

const data = function(vm) {
  let obj = {
    // 选中的树节点
    chosedMaterialType: null,
    // 树配置
    treeSettings: {
      treeData: [],
      nodeKey: "id",
      defaultProps: {
        children: "children",
        label: "text"
      }
    },
    // 搜索栏
    searchFormItems: searchFormItems,
    searchFormSettings: {
      fullScreen: false,
      formGroupList: searchFormItems,
      formGroupValues: {},
      formButtonList: searchFormBtns
    },
    showSearchForm: true,
    // 表格选中的物资数据
    chosedMaterialData: [],
    // table表格配置
    tableSettings: {
      tableDatas: [],
      tableSettingOptions: {
        isShowIndex: true,
        showIndexHeader: "序号",
        isMultipleTable: true,
        ref: "materialTable",
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
      buttonListData: []
    },
    // 新增列表
    addMaterialButton: addMaterialButton,
    editMaterialButton: editMaterialButton,
    materialContentItems: materialContentItems,
    //新增修改弹窗
    dialogFormSettings: {
      fullScreen: false,
      dialogFormVisible: false,
      dialogFormTitle: "",
      dialogFormItems: {
        formGroupValues: {},
        formGroupList: [],
        formButtonList: [],
        rules: materialSetRule
      }
    }
  };
  return obj;
};
export default data;

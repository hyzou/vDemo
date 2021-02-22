// table 上方按钮
import operateButtons from "@/utils/formSettingsJson/systemSetting/menuTreeSetManage/operateButtons";
// table表头信息设置
import tableHeader from "@/utils/formSettingsJson/systemSetting/menuTreeSetManage/table/tableHeader.json";

// 新增菜单
import menuContentItems from "@/utils/formSettingsJson/systemSetting/menuTreeSetManage/menuContentDialog/menuContentItems.json";
import addMenuContentButton from "@/utils/formSettingsJson/systemSetting/menuTreeSetManage/menuContentDialog/addButton.json";
import editMenuContentButton from "@/utils/formSettingsJson/systemSetting/menuTreeSetManage/menuContentDialog/editButton.json";
// 必填验证
import targetSetRule from "@/utils/formRulesJson/systemSetting/menuSetManage/menuSetRule";
const data = function(vm) {
  let obj = {
    // 下拉 菜单 业务功能
    menuPurpose: [],
    // table表格配置
    tableSettings: {
      tableDatas: [],
      tableSettingOptions: {
        ref: "demo",
        rowKey: "id",
        tooltipEffect: "dark",
        border: true,
        defaultExpandAll: true,
        headerOptions: tableHeader,
        treeProps: {
          children: "children",
          hasChildren: "hasChildren"
        }
      }
    },
    operateButtonsSettings: {
      moduleName: "tableList",
      buttonListData: operateButtons
    },
    menuContentItems: menuContentItems,
    addMenuContentButton: addMenuContentButton,
    editMenuContentButton: editMenuContentButton,
    //新增修改弹窗
    dialogFormSettings: {
      fullScreen: false,
      dialogFormVisible: false,
      dialogFormTitle: "菜单",
      dialogFormItems: {
        formGroupValues: {},
        formGroupList: [],
        formButtonList: [],
        rules: targetSetRule
      }
    }
  };
  return obj;
};
export default data;

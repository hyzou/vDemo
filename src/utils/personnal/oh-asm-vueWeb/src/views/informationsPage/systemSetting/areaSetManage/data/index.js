// 搜索
import searchFormItems from "@/utils/formSettingsJson/systemSetting/areaSetManage/search/searchFormItems.json";
import searchFormBtns from "@/utils/formSettingsJson/systemSetting/areaSetManage/search/searchButton.json";
// table 上方按钮
import operateButtons from "@/utils/formSettingsJson/systemSetting/areaSetManage/operateButtons";
// table表头信息设置
import tableHeader from "@/utils/formSettingsJson/systemSetting/areaSetManage/table/tableHeader.json";

// 新建地区
import areaItems from "@/utils/formSettingsJson/systemSetting/areaSetManage/areaDialog/formItems.json";
import addAreaButton from "@/utils/formSettingsJson/systemSetting/areaSetManage/areaDialog/addButton.json";
import editAreaButton from "@/utils/formSettingsJson/systemSetting/areaSetManage/areaDialog/editButton.json";
// 必填验证
import targetSetRule from "@/utils/formRulesJson/systemSetting/areaSetManage/areaSetRule";
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
    // 表格上方头部设置
    operateButtonsSettings: {
      moduleName: "tableList",
      buttonListData: operateButtons
    },
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
    //新增修改弹窗
    areaItems: areaItems,
    addAreaButton: addAreaButton,
    editAreaButton: editAreaButton,
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

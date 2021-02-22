// table上方操作按钮
import operateButtons from "@/utils/formSettingsJson/systemSetting/targetSetManage/operateButtons";
// table表头信息设置
import tableHeader from "@/utils/formSettingsJson/systemSetting/targetSetManage/table/tableHeader.json";
// 新增类目
import kpiIndexItems from "@/utils/formSettingsJson/systemSetting/targetSetManage/kpiIndexDialog/kpiIndexItems.json";
import addKpiIndexItemButton from "@/utils/formSettingsJson/systemSetting/targetSetManage/kpiIndexDialog/addButton.json";
import editKpiIndexItemButton from "@/utils/formSettingsJson/systemSetting/targetSetManage/kpiIndexDialog/editButton.json";
// 新增指标
import kpiItems from "@/utils/formSettingsJson/systemSetting/targetSetManage/kpiDialog/kpiItems.json";
import addKpiItemButton from "@/utils/formSettingsJson/systemSetting/targetSetManage/kpiDialog/addButton.json";
import editKpiItemButton from "@/utils/formSettingsJson/systemSetting/targetSetManage/kpiDialog/editButton.json";
// 新增数据项
import dataItems from "@/utils/formSettingsJson/systemSetting/targetSetManage/dataItem/dataItems.json";
import addDataItem from "@/utils/formSettingsJson/systemSetting/targetSetManage/dataItem/addButton.json";

// 搜索栏
import searchFormItems from "@/utils/formSettingsJson/systemSetting/targetSetManage/search/searchItems.json";
import searchFormBtns from "@/utils/formSettingsJson/systemSetting/targetSetManage/search/buttons.json";
// 校验规则
import targetSetRule from "@/utils/formRulesJson/targetSetManage/targetSetRule";
const data = function(vm) {
  let obj = {
    // 页面类型
    pageType: "",
    // table上方操作按钮
    operateButtons: operateButtons,
    // table表头信息设置
    tableHeader: tableHeader,
    // 增加kpi类目
    addKpiIndexItemButton: addKpiIndexItemButton,
    kpiIndexItems: kpiIndexItems,
    editKpiIndexItemButton: editKpiIndexItemButton,
    // 增加kpi
    addKpiItemButton: addKpiItemButton,
    kpiItems: kpiItems,
    editKpiItemButton: editKpiItemButton,
    // 搜索栏
    searchFormItemsData: searchFormItems,
    searchFormBtns: searchFormBtns,
    // 搜索栏
    searchFormItems: {
      fullScreen: false,
      formGroupList: searchFormItems,
      formGroupValues: {},
      formButtonList: searchFormBtns
    },
    showSearchForm: true,
    // operateButtons 按钮组配置
    operateButtonsSettings: {
      moduleName: "tableList",
      buttonListData: operateButtons
    },
    // 数据项
    dataItems: dataItems,
    addDataItem: addDataItem,
    //新增修改弹窗
    dialogFormSettings: {
      fullScreen: false,
      dialogFormVisible: false,
      dialogFormTitle: "",
      dialogFormItems: {
        formGroupValues: {},
        formGroupList: [],
        formButtonList: [],
        rules: targetSetRule
      }
    },
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
    // 指标编辑回显的数据
    editKpiData: {}
  };
  return obj;
};
export default data;

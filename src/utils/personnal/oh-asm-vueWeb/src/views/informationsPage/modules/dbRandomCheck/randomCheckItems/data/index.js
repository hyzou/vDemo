// 表格的头部
import { tableHeaderSettings } from "@/utils/formSettingsJson/table/randomCheckItems/tableSettings.js";
// 对话框配置
import {
  addRandomItemDialogBtns,
  addRandomItemDialogItems
} from "@/utils/formSettingsJson/dialog/randomCheckItems/add/dialogSettings.js";
import {
  updateRandomItemDialogBtns,
  updateRandomItemDialogItems
} from "@/utils/formSettingsJson/dialog/randomCheckItems/update/dialogSettings.js";
import {
  checkRandomItemDialogBtns,
  checkRandomItemDialogItems
} from "@/utils/formSettingsJson/dialog/randomCheckItems/check/dialogSettings.js";
// 搜索栏
import {
  searchFormBtns,
  searchFormItems
} from "@/utils/formSettingsJson/search/randomCheckItems/searchSettings.js";
// 按钮组
import { operateBtns } from "@/utils/formSettingsJson/operateButton/randomCheckItems/buttonSettings.js";
// 校验规则
import dialogSetRule from "@/utils/formRulesJson/dbRandomCheck/randomCheckItems/dialog";

const data = function(vm) {
  let obj = {
    dialogSetRule: dialogSetRule,
    addRandomItemDialogBtns: addRandomItemDialogBtns,
    addRandomItemDialogItems: addRandomItemDialogItems,
    updateRandomItemDialogBtns: updateRandomItemDialogBtns,
    updateRandomItemDialogItems: updateRandomItemDialogItems,
    checkRandomItemDialogBtns: checkRandomItemDialogBtns,
    checkRandomItemDialogItems: checkRandomItemDialogItems,
    dialogFormSettings: {
      width: "70%",
      dialogFormVisible: false, //弹窗是否可见（开或关）
      dialogFormTitle: "检查事项", //弹窗标题
      dialogType: "form", //弹窗类型
      dialogFormItems: {
        formGroupList: addRandomItemDialogItems,
        formGroupValues: {},
        formButtonList: addRandomItemDialogBtns,
        rules: dialogSetRule
      }
    },
    // 搜索栏
    searchFormGroupSettings: {
      fullScreen: false,
      formGroupList: searchFormItems,
      formGroupValues: {},
      formButtonList: searchFormBtns
    },
    showSearchForm: true,
    // operateButtons 按钮组配置
    operateButtonsSettings: {
      moduleName: "tableList",
      buttonListData: operateBtns
    },
    // 表格设置
    tableSettings: {
      tableDatas: [],
      tableSettingOptions: {
        ref: "reviewProgressTable",
        tooltipEffect: "dark",
        rowKey: "id",
        border: true,
        headerOptions: tableHeaderSettings
      }
    },
    // 分页
    paginationSettings: {
      currentPage: 1,
      totalNumbers: 0
    }
  };
  return obj;
};
export default data;

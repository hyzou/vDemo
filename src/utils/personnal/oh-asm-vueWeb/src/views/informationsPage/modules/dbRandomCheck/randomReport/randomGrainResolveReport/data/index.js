// 搜索栏
import {
  searchFormBtns,
  searchFormItems
} from "@/utils/formSettingsJson/search/randomReports/searchSettings.js";
// 按钮组
import { operateBtns } from "@/utils/formSettingsJson/operateButton/randomReports/buttonSettings.js";
// 对话框配置
import {
  randomReportsDialogBtns,
  randomReportsDialogItems
} from "@/utils/formSettingsJson/dialog/randomReports/dialogSettings.js";

const data = function(vm) {
  let obj = {
    showSearchForm: true,
    // 搜索栏
    searchFormGroupSettings: {
      fullScreen: false,
      formGroupList: searchFormItems,
      formGroupValues: {},
      formButtonList: searchFormBtns
    },
    // operateButtons 按钮组配置
    operateButtonsSettings: {
      moduleName: "tableList",
      buttonListData: operateBtns
    },
    // 弹框设置
    dialogFormSettings: {
      width: "650px",
      dialogFormVisible: false, //弹窗是否可见（开或关）
      dialogFormTitle: "报表上传", //弹窗标题
      dialogType: "form", //弹窗类型
      dialogFormItems: {
        formGroupTypeUpload: true,
        formGroupTypeUploadName: "fbFiles",
        formGroupList: randomReportsDialogItems,
        formGroupValues: {},
        formButtonList: randomReportsDialogBtns
        // rules: dialogSetRule
      }
    },
    url: ""
  };
  return obj;
};
export default data;

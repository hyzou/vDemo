// 搜索
import {
  searchFormBtns,
  searchFormItems
} from "@/utils/formSettingsJson/search/reportSetting/inventoryDetail";
import { operateButtons } from "@/utils/formSettingsJson/operateButton/reportSetting/inventoryDetail";
const data = function(vm) {
  let obj = {
    showSearchForm: true,
    searchFormItems: searchFormItems,
    searchFormSettings: {
      fullScreen: false,
      formGroupList: searchFormItems,
      formGroupValues: {},
      formButtonList: searchFormBtns
    },
    // 表格上方头部设置
    operateButtonsSettings: {
      moduleName: "tableList",
      buttonListData: operateButtons
    },
    url: ""
  };
  return obj;
};
export default data;

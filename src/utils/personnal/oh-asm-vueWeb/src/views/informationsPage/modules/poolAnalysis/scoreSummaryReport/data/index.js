// 搜索栏
import {
  searchFormBtns,
  searchFormItems
} from "@/utils/formSettingsJson/search/poolAnalysis/scoreSummaryReport/searchSettings";

const data = function(vm) {
  let obj = {
    showSearchForm: true,
    // 搜索栏
    searchFormItems: searchFormItems,
    searchFormGroupSettings: {
      fullScreen: false,
      formGroupList: searchFormItems,
      formGroupValues: {
        schemeId: "",
        assessedOrgId: ""
      },
      formButtonList: searchFormBtns
    },
    url: ""
  };
  return obj;
};
export default data;

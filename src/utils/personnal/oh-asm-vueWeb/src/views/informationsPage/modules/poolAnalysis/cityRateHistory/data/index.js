// 搜索栏
import {
  searchFormBtns,
  searchFormItems
} from "@/utils/formSettingsJson/search/poolAnalysis/cityRateHistory/searchSettings";

import getBar from "../echartSettings";

const data = function(vm) {
  let obj = {
    currentCityName: "杭州市",
    allOrgslist: [],
    dialogPreviewExportTitle: "评分表",
    dialogPreviewExportVisible: false,
    showChart: false,
    barOptions: getBar(vm),
    mainRankData: {},
    // 搜索栏
    searchFormItems: searchFormItems,
    searchFormItemSettings: {
      fullScreen: false,
      formGroupList: searchFormItems,
      formGroupValues: {
        assessOrgId: "",
        yearsNumber: 10
      },
      formButtonList: searchFormBtns
    },
    // table 表格配置
    tablelistSettings: {
      tableDatas: [],
      tableSettingOptions: {
        tooltipEffect: "dark",
        rowKey: "id",
        border: true,
        headerOptions: []
      }
    }
  };
  return obj;
};
export default data;

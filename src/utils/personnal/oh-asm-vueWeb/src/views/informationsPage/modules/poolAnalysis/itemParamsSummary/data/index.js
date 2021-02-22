// 搜索栏
import {
  searchFormBtns,
  searchFormItems
} from "@/utils/formSettingsJson/search/poolAnalysis/itemParamsSummary/searchSettings";

import getBar from "../echartSettings";

// import tableHeader from "@/utils/formSettingsJson/poolAnalysis/itemParamsSummary/table/tableHeader.json";

const data = function(vm) {
  let obj = {
    itemParamslist: [],
    itemParamsTitle: "耕地面积",
    itemParamsUnit: "",
    showChart: false,
    barOptions: getBar(),
    // 搜索栏
    searchFormItems: searchFormItems,
    searchFormItemSettings: {
      fullScreen: false,
      formGroupList: searchFormItems,
      formGroupValues: {
        schemeId: "",
        varId: ""
      },
      formButtonList: searchFormBtns
    },
    tablelistPlanSettings: {
      tableDatas: [],
      tableSettingOptions: {
        tooltipEffect: "dark",
        rowKey: "id",
        border: true,
        headerOptions: []
      }
    },
    // table 表格配置
    tablelistSettingsCurrent: {
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

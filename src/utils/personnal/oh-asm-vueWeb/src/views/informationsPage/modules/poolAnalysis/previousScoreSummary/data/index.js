// 表格的头部
import { tableHeaderSettings } from "@/utils/formSettingsJson/table/poolAnalysis/previousScoreSummary/tableSettings";
// 搜索栏
import {
  searchFormBtns,
  searchFormItems
} from "@/utils/formSettingsJson/search/poolAnalysis/previousScoreSummary/searchSettings";

import getBar from "../echartSettings";

const data = function(vm) {
  let obj = {
    searchFormItems: searchFormItems,
    dialogPreviewExportTitle:
      "杭州市2020年度落实粮食安全市县长责任制自查评分表",
    dialogPreviewExportVisible: false,
    barOptions: getBar(),
    showChart: false,
    // 搜索栏
    searchFormItemSettings: {
      fullScreen: false,
      formGroupList: searchFormItems,
      formGroupValues: {
        assessOrgId: vm.$store.getters["user/userInfos"].orgId,
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
    },
    previewTableSettings: {
      dialogFormClassName: "min",
      tableDatas: [],
      tableSettingOptions: {
        ref: "target",
        tooltipEffect: "dark",
        rowKey: "assessmentId",
        border: true,
        headerOptions: tableHeaderSettings,
        isShowIndex: false
      }
    }
  };
  return obj;
};
export default data;

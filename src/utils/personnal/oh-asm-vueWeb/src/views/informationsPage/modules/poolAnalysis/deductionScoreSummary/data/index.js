// 搜索栏
import {
  searchFormBtns,
  searchFormItems
} from "@/utils/formSettingsJson/search/poolAnalysis/deductionScoreSummary/searchSettings";

import getBar from "../echartSettings";

import { tableHeaderSettings } from "@/utils/formSettingsJson/table/poolAnalysis/deductionScoreSummary/tableSettings";

const data = function(vm) {
  let obj = {
    showChart: false,
    itemParamsTitle: "耕地面积",
    barOptions: getBar(),
    // 搜索栏
    searchFormItems: searchFormItems,
    searchFormItemSettings: {
      fullScreen: false,
      formGroupList: searchFormItems,
      formGroupValues: {
        schemeId: ""
      },
      formButtonList: searchFormBtns
    },
    // table 表格配置
    tablelistSettingsCurrent: {
      tableDatas: [],
      tableSettingOptions: {
        tooltipEffect: "dark",
        rowKey: "id",
        hasExpandContent: true,
        expandContent: "infolist",
        expandContentClass: "overflowXhYa",
        expandItemClass: "width100",
        expandContentLables: [
          {
            key: "criteria",
            value: "减分项评分标准："
          },
          {
            key: "initScore",
            value: "分值："
          },
          {
            key: "score",
            value: "评分："
          },
          {
            key: "phaseType__dsp",
            value: "失分环节："
          },
          {
            key: "deductionReason",
            value: "失分原因："
          },
          {
            key: "rectifyDesc",
            value: "整改措施："
          }
        ],
        border: true,
        headerOptions: tableHeaderSettings
      }
    }
  };
  return obj;
};
export default data;

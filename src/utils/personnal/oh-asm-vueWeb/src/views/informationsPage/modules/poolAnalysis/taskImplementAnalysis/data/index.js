// 搜索栏
import {
  searchFormBtns,
  searchFormItems
} from "@/utils/formSettingsJson/search/poolAnalysis/taskImplementAnalysis/searchSettings";

const data = function(vm) {
  let obj = {
    showChart: false,
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
    // 页签配置
    tabSettings: {
      editable: false,
      stretch: false,
      position: "top",
      newTabName: 2,
      tabCardType: "card",
      activeName: "1",
      tabCardData: [
        {
          label: "年度考核任务",
          id: "1"
        },
        {
          label: "专项考核/监督任务",
          id: "2"
        }
      ]
    },
    tableCellSettings: [
      {
        value: "100",
        text: "杭州市"
      }
    ],
    tableData: [
      {
        100: { plan: "500", complete: "200", percent: "40%" },
        targetName: "耕地面积(万亩)"
      }
    ]
  };
  return obj;
};
export default data;

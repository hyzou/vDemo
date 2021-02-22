// table表头信息设置
import { evaluationSummaryTableHeader } from "@/utils/formSettingsJson/table/evaluationSummary/tableSettings.js";

// 弹框设置
import {
  repeatCutScoreFormItems,
  repeatCutScoreFormBtns
} from "@/utils/formSettingsJson/dialog/evaluationSummary/dialogSettings.js";
// 搜索栏
import {
  searchFormBtns,
  searchFormItems
} from "@/utils/formSettingsJson/search/evaluationSummary/searchFormSettings.js";
// import operateButtons from "@/utils/formSettingsJson/operateButton/targetManage/suggestConsultation/operateButtonSettings.js";
let data = function(vm) {
  let obj = {
    pageType: "",
    tabSettings: {
      editable: false,
      stretch: false,
      position: "top",
      tabCardType: "card",
      activeName: "1",
      tabCardData: [
        {
          label: "年度评分汇总",
          id: "1"
        },
        {
          label: "专项评分汇总",
          id: "2"
        }
      ]
    },
    // 搜索栏
    searchFormItems: searchFormItems,
    searchSettings: {
      fullScreen: false,
      formGroupList: searchFormItems,
      formGroupValues: {},
      formButtonList: searchFormBtns
    },
    // 顶部搜索栏显示配置，默认显示
    showSearchForm: true,
    // operateButtons 按钮组配置
    // operateButtonsSettings: {
    //   moduleName: "tableList",
    //   buttonListData: operateButtons
    // },
    //表格
    tableSettings: {
      tableDatas: [],
      tableSettingOptions: {
        ref: "target",
        tooltipEffect: "dark",
        rowKey: "targetId",
        border: true,
        headerOptions: evaluationSummaryTableHeader
      }
    },
    // 分页
    // paginationSettings: {
    //   currentPage: 1,
    //   totalNumbers: 0
    // },
    // 弹框
    repeatCutScoreFormItems: repeatCutScoreFormItems,
    repeatCutScoreFormBtns: repeatCutScoreFormBtns,
    dialogFormSettings: {
      fullScreen: false,
      dialogFormVisible: false,
      dialogFormTitle: "修改重复分",
      dialogType: "form",
      dialogFormItems: {
        formGroupValues: {},
        formGroupList: [],
        formButtonList: []
      }
    }
  };
  return obj;
};

export default data;

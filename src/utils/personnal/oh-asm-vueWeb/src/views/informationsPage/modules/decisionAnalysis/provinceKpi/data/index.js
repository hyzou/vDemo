// table表头信息设置
import { tableHeaderSettings } from "@/utils/formSettingsJson/table/decisionAnalysis/provinceKpi/tableSettings.js";
// 弹框设置
import {
  checkProvinceKpiDialogBtns,
  checkProvinceKpiDialogItems
} from "@/utils/formSettingsJson/dialog/decisionAnalysis/provinceKpi/dialogSettings.js";
// 搜索栏
import {
  searchFormBtns,
  searchFormItems
} from "@/utils/formSettingsJson/search/decisionAnalysis/provinceKpi/searchSettings.js";
// 操作栏
import { operateButtons } from "@/utils/formSettingsJson/operateButton/decisionAnalysis/provinceKpi/buttonSettings.js";
let data = function(vm) {
  let obj = {
    operateButtons: operateButtons,
    defaultdatas: vm.$store.getters["assessment/assessmentBaseData"],
    // 页面类型
    pageType: "",
    // 搜索栏
    searchFormItems: searchFormItems,
    searchSettings: {
      fullScreen: false,
      formGroupList: searchFormItems,
      formGroupValues: {
        asmSchemeId: ""
      },
      formButtonList: searchFormBtns
    },
    // 顶部搜索栏显示配置，默认显示
    showSearchForm: true,
    // operateButtons 按钮组配置
    operateButtonsSettings: {
      moduleName: "tableList",
      buttonListData: operateButtons
    },
    //表格
    tableSettings: {
      tableDatas: [],
      tableSettingOptions: {
        ref: "target",
        tooltipEffect: "dark",
        rowKey: "targetId",
        border: true,
        headerOptions: tableHeaderSettings
      }
    },
    // 分页
    paginationSettings: {
      currentPage: 1,
      totalNumbers: 0
    },
    // 弹框
    dialogFormSettings: {
      fullScreen: false,
      dialogFormVisible: false,
      dialogFormTitle: "评分详情",
      dialogType: "form",
      dialogFormItems: {
        formGroupTypeUpload: false,
        formGroupValues: {},
        formGroupList: checkProvinceKpiDialogItems,
        formButtonList: checkProvinceKpiDialogBtns
      }
    }
  };
  return obj;
};

export default data;

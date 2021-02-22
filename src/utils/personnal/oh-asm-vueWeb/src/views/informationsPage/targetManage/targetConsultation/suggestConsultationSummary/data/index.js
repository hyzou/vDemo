// table表头信息设置
import { kpiConsultTableHeader } from "@/utils/formSettingsJson/table/targetManage/suggestConsultationSummary/tableHeaderSettings.js";
// 弹框设置
import {
  suggestConsultationDialogFormItems,
  suggestConsultationDialogFormBtns
} from "@/utils/formSettingsJson/dialog/targetManage/suggestConsultationSummary/dialogSettings.js";
// 搜索栏
import {
  searchFormBtns,
  searchFormItems
} from "@/utils/formSettingsJson/search/targetManage/suggestConsultationSummary/searchSettings.js";
import operateButtons from "@/utils/formSettingsJson/operateButton/targetManage/suggestConsultationSummary/operateButtonSettings.js";
const data = function(vm) {
  let obj = {
    pageType: "",
    /**
     * 指标征询汇总表格
     */
    tableSettings: {
      tableDatas: [],
      tableSettingOptions: {
        ref: "target",
        tooltipEffect: "dark",
        rowKey: "targetId",
        border: true,
        headerOptions: kpiConsultTableHeader,
        isShowIndex: false,
        showIndexHeader: "序号"
      }
    },
    // 分页
    paginationSettings: {
      currentPage: 1,
      totalNumbers: 0
    },
    /**
     * 搜索
     */
    searchFormItems: searchFormItems,
    searchSettings: {
      fullScreen: false,
      formGroupList: [],
      formGroupValues: {
        asmSchemeId: ""
      },
      formButtonList: searchFormBtns
    },
    showSearchForm: true,
    // operateButtons 按钮组配置
    operateButtonsSettings: {
      moduleName: "tableList",
      buttonListData: operateButtons
    },
    /**
     * 弹框
     */
    // 意见分析
    suggestConsultationDialogFormItems: suggestConsultationDialogFormItems,
    suggestConsultationDialogFormBtns: suggestConsultationDialogFormBtns,
    dialogFormSettings: {
      fullScreen: false,
      dialogFormVisible: false,
      dialogFormTitle: "意见征询",
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

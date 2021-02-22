// table表头信息设置
import { kpiConsultTableHeader } from "@/utils/formSettingsJson/table/targetManage/suggestConsultation/tableHeaderSettings.js";

// 弹框设置
import {
  suggestConsultationDialogFormItems,
  suggestConsultationDialogFormBtns
} from "@/utils/formSettingsJson/dialog/targetManage/suggestConsultation/dialogSettings.js";
// 搜索栏
import {
  searchFormBtns,
  searchFormItems
} from "@/utils/formSettingsJson/search/targetManage/suggestConsultation/searchSettings.js";
import operateButtons from "@/utils/formSettingsJson/operateButton/targetManage/suggestConsultation/operateButtonSettings.js";
let data = function(vm) {
  let obj = {
    pageType: "",
    // 搜索栏
    searchFormItems: searchFormItems,
    searchSettings: {
      fullScreen: false,
      formGroupList: [],
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
        headerOptions: kpiConsultTableHeader
      }
    },
    // 分页
    paginationSettings: {
      currentPage: 1,
      totalNumbers: 0
    },
    // 弹框
    suggestConsultationDialogFormItems: suggestConsultationDialogFormItems,
    suggestConsultationDialogFormBtns: suggestConsultationDialogFormBtns,
    dialogFormSettings: {
      fullScreen: false,
      dialogFormVisible: false,
      dialogFormTitle: "意见征询",
      dialogFormItems: {
        formGroupValues: {},
        formGroupList: suggestConsultationDialogFormItems,
        formButtonList: suggestConsultationDialogFormBtns
      }
    }
  };
  return obj;
};

export default data;

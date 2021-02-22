// table表头信息设置
import { departmentTableHeader } from "@/utils/formSettingsJson/table/assessment/department/tableSettings.js";

// 弹框设置
import { departmentAssessDetailItems } from "@/utils/formSettingsJson/dialog/assessment/departmentCooperate/dialogSettings.js";
import { schemeFormItem } from "@/utils/formSettingsJson/dialog/common/dialogSettings.js";
// 搜索栏
import {
  searchFormBtns,
  searchFormItems
} from "@/utils/formSettingsJson/search/assessment/departmentCooperate/searchFormSettings.js";
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
        asmSchemeId: "",
        assessedOrgId: ""
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
        headerOptions: departmentTableHeader
      }
    },
    // 分页
    paginationSettings: {
      currentPage: 1,
      totalNumbers: 0
    },
    // 方案内容
    schemeFormItem: schemeFormItem,
    // 部门评分
    departmentAssessDetailItems: departmentAssessDetailItems,
    // 弹框
    dialogFormSettings: {
      fullScreen: false,
      dialogFormVisible: false,
      dialogFormTitle: "",
      dialogType: "formBlocks",
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

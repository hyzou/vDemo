// table表头信息设置
import { spotCheckTableHeader } from "@/utils/formSettingsJson/table/assessment/spotCheck/tableSettings.js";

// 搜索栏
import {
  searchFormBtns,
  searchFormItems
} from "@/utils/formSettingsJson/search/assessment/spotCheck/searchFormSettings.js";

// 弹框设置
import {
  assessdDepartmentMessage,
  spotCheckAssessFormBtns,
  spotCheckAssessFormItems
} from "@/utils/formSettingsJson/dialog/assessment/spotCheck/dialogSettings.js";
import { schemeFormItem } from "@/utils/formSettingsJson/dialog/common/dialogSettings.js";
import operateButtons from "@/utils/formSettingsJson/operateButton/targetManage/suggestConsultation/operateButtonSettings.js";
// 校验规则
import departmentFormRules from "@/utils/formRulesJson/assessment/departmentFormRules";
let data = function(vm) {
  let obj = {
    pageType: "",
    // tab
    tabSettings: {
      editable: false,
      stretch: false,
      position: "top",
      newTabName: 2,
      tabCardType: "card",
      activeName: "",
      tabCardData: []
    },
    cityTabData: [],
    attention: "",
    focus: "",
    // 搜索栏
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
        headerOptions: spotCheckTableHeader
      }
    },
    // 分页
    paginationSettings: {
      currentPage: 1,
      totalNumbers: 0
    },
    // 弹框
    // 方案信息
    schemeFormItem: schemeFormItem,
    // 部门评分
    spotCheckAssessFormBtns: spotCheckAssessFormBtns,
    spotCheckAssessFormItems: spotCheckAssessFormItems,
    // 被考核牵头  配合部门
    assessdDepartmentMessage: assessdDepartmentMessage,
    dialogFormSettings: {
      fullScreen: false,
      dialogFormVisible: false,
      dialogFormTitle: "意见征询",
      dialogType: "formBlocks",
      dialogFormItems: {
        formGroupValues: {},
        formGroupList: [],
        formButtonList: [],
        rules: departmentFormRules
      }
    }
  };
  return obj;
};

export default data;

// table表头信息设置
import { departmentTableHeader } from "@/utils/formSettingsJson/table/assessment/department/tableSettings.js";

// 弹框设置
import {
  assessdDepartmentMessage,
  departmentAssessFormBtns,
  departmentAssessFormItems
} from "@/utils/formSettingsJson/dialog/assessment/department/dialogSettings.js";
import {
  schemeFormItem,
  assignKpiButton,
  assignDepartmentManage
} from "@/utils/formSettingsJson/dialog/common/dialogSettings.js";
// 搜索栏
import {
  searchFormBtns,
  searchFormItems
} from "@/utils/formSettingsJson/search/assessment/department/searchFormSettings.js";
import operateButtons from "@/utils/formSettingsJson/operateButton/targetManage/suggestConsultation/operateButtonSettings.js";
// 校验规则
import departmentFormRules from "@/utils/formRulesJson/assessment/departmentFormRules";
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
    // 弹框
    // 方案信息
    schemeFormItem: schemeFormItem,
    // 分配处室
    assignKpiButton: assignKpiButton,
    assignDepartmentManage: assignDepartmentManage,
    // 部门评分
    departmentAssessFormBtns: departmentAssessFormBtns,
    departmentAssessFormItems: departmentAssessFormItems,
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

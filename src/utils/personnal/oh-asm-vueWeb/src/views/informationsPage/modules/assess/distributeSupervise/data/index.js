import {
  distributeSuperviseFormItems,
  distributeSuperviseFormBtns
} from "@/utils/formSettingsJson/search/assessment/searchFormSetting";

import { previewTableHeader } from "@/utils/formSettingsJson/table/assessment/previewTableHeader";
// 表格
import { distributeSuperviseTableHeader } from "@/utils/formSettingsJson/table/assessment/tableHeaderSetting";
// 按钮组
import {
  operateButtonsObj,
  tableButtonObj,
  submitButtonObj
} from "@/utils/formSettingsJson/operateButton/assessment/distributeSupervise/buttonSettings";
// 分配
import {
  schemeFormItem,
  assignCityItem,
  assignKpiButton,
  selfEvaluationMessage,
  selfCooprateMessage,
  departmentEvaluationMessage,
  spotCheckEvaluationMessage
} from "@/utils/formSettingsJson/dialog/common/dialogSettings.js";
// 弹框
import {
  scoreCheckFormItems,
  scoreCheckFormBtns,
  evaluationSubmitBtn,
  submitConfirmItems,
  submitConfirmBtn,
  submitKpiFormItems,
  releaseKpiFormItems
} from "@/utils/formSettingsJson/dialog/assessment/distributeSupervise/dialogSettings";
// 表格
import {
  selfKpiTableHeader,
  departmentKpiTableHeader,
  spotCheckKpiTableHeader
} from "@/utils/formSettingsJson/table/assessment/distributeSupervise/tableSettings";
// 搜索
import {
  submitKpiSearchFormItems,
  releaseKpiSearchFormItems,
  kpiSearchFormBtns
} from "@/utils/formSettingsJson/search/assessment/distributeSupervise/searchFormSettings";
import distributeSuperviseRule from "@/utils/formRulesJson/distributeSupervise/distributeSuperviseRule";
const data = function(vm) {
  let obj = {
    // 页面类型
    pageType: "",
    // 页面操作类型
    pageOperateType: "",
    // operateButtons 按钮组配置
    operateButtonsObj: operateButtonsObj,
    operateButtonsSettings: {
      moduleName: "tableList",
      buttonListData: []
    },
    // 搜索栏
    distributeSuperviseFormItems: distributeSuperviseFormItems,
    searchSettings: {
      fullScreen: false,
      formGroupList: [],
      formGroupValues: {},
      formButtonList: distributeSuperviseFormBtns
    },
    showSearchForm: true,
    // 表格
    tableButtonObj: tableButtonObj,
    distributeSuperviseTableHeader: distributeSuperviseTableHeader,
    tableSettings: {
      tableDatas: [],
      tableSettingOptions: {
        ref: "demo",
        rowKey: "id",
        tooltipEffect: "dark",
        border: true,
        headerOptions: [],
        isShowIndex: false,
        showIndexHeader: "序号"
      }
    },
    paginationSettings: {
      currentPage: 1,
      totalNumbers: 0
    },
    //预览导出表单配置
    dialogPreviewExportSetting: {
      width: "70%",
      title: "预览",
      dialogFormVisible: false //弹窗是否可见（开或关）
    },
    dialogPreviewExportVisible: false,
    previewTableSettings: {
      dialogFormClassName: "min",
      tableDatas: [],
      tableSettingOptions: {
        ref: "target",
        tooltipEffect: "dark",
        rowKey: "assessmentId",
        border: true,
        headerOptions: previewTableHeader,
        isShowIndex: false
      }
    },
    /**
     * 弹框配置
     */
    // 分配
    schemeFormItem: schemeFormItem,
    assignCityItem: assignCityItem,
    assignKpiButton: assignKpiButton,
    //考核办确定指标分数
    scoreCheckFormItems: scoreCheckFormItems,
    scoreCheckFormBtns: scoreCheckFormBtns,
    // 自评信息
    selfCooprateMessage: selfCooprateMessage,
    selfEvaluationMessage: selfEvaluationMessage,
    departmentEvaluationMessage: departmentEvaluationMessage,
    spotCheckEvaluationMessage: spotCheckEvaluationMessage,
    // 提交确认
    submitConfirmItems: submitConfirmItems,
    submitConfirmBtn: submitConfirmBtn,
    // 公用弹框配置
    dialogFormSettings: {
      fullScreen: false,
      dialogFormVisible: false,
      dialogFormTitle: "",
      dialogType: "formBlocks",
      dialogFormItems: {
        formGroupValues: {},
        formGroupList: [],
        formButtonList: [],
        rules: distributeSuperviseRule
      }
    },
    dialogNormalFormSettings: {
      fullScreen: false,
      dialogFormVisible: false,
      dialogFormTitle: "",
      dialogFormItems: {
        formGroupValues: {},
        formGroupList: [],
        formButtonList: [],
        rules: distributeSuperviseRule
      }
    },
    // 流程节点
    assessPhase: "",
    // 结果上报弹框配置
    evaluationSubmitBtn: evaluationSubmitBtn,
    evaluationSubmitDialog: {
      dialogVisible: false,
      dialogName: "",
      formButtonList: []
    },
    // 搜索kpi
    submitKpiSearchFormItems: submitKpiSearchFormItems,
    releaseKpiSearchFormItems: releaseKpiSearchFormItems,
    kpiSearchFormSetting: {
      fullScreen: false,
      formGroupList: [],
      formGroupValues: {},
      formButtonList: kpiSearchFormBtns
    },
    // 提交按钮设置
    submitButtonObj: submitButtonObj,
    submitButtonsSettings: {
      moduleName: "tableList",
      buttonListData: []
    },
    // 提交的kpi form
    titleMessage: "",
    submitKpiFormItems: submitKpiFormItems,
    releaseKpiFormItems: releaseKpiFormItems,
    submitKpiFormSetting: {
      fullScreen: true,
      formGroupList: [],
      formGroupValues: {},
      formButtonList: [],
      rules: distributeSuperviseRule
    },
    selfKpiTableHeader: selfKpiTableHeader,
    departmentKpiTableHeader: departmentKpiTableHeader,
    spotCheckKpiTableHeader: spotCheckKpiTableHeader,
    // 指标表格设置
    kpiTableSettings: {
      tableDatas: [],
      tableSettingOptions: {
        rowKey: "id",
        tooltipEffect: "dark",
        border: true,
        headerOptions: []
      }
    },
    // 方案名称列表
    schemeList: [],
    // 被考核机构列表
    assessdOrgList: [],
    // 分页
    kpiPaginationSettings: {
      currentPage: 1,
      totalNumbers: 0
    }
  };
  return obj;
};
export default data;

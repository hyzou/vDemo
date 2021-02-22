import {
  superviseFormItems,
  superviseFormBtns,
  kpiSearchFormItems,
  kpiSearchFormBtns
} from "@/utils/formSettingsJson/search/assessment/supervise/searchFormSetting";

import { previewTableHeader } from "@/utils/formSettingsJson/table/assessment/previewTableHeader";
// 表格
import { distributeSuperviseTableHeader } from "@/utils/formSettingsJson/table/assessment/tableHeaderSetting";
// 按钮组
import {
  operateButtonsObj,
  tableButtonObj,
  submitButtonObj
} from "@/utils/formSettingsJson/operateButton/assessment/distribute/buttonSettings";
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
} from "@/utils/formSettingsJson/dialog/assessment/distribute/dialogSettings";
import {
  spotCheckContentItems,
  spotCheckContentButton,
  scoreCheckContentItems,
  scoreCheckContentBtn
} from "@/utils/formSettingsJson/dialog/assessment/supervise/dialogSettings";
// 表格
import {
  selfKpiTableHeader,
  departmentKpiTableHeader,
  spotCheckKpiTableHeader
} from "@/utils/formSettingsJson/table/assessment/distribute/tableSettings";
import {
  superviseTableHeader,
  kpiTableHeader
} from "@/utils/formSettingsJson/table/assessment/supervise/tableSettings";
// 搜索
import {
  submitKpiSearchFormItems,
  releaseKpiSearchFormItems,
} from "@/utils/formSettingsJson/search/assessment/distribute/searchFormSettings";
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
    superviseFormItems: superviseFormItems,
    searchSettings: {
      fullScreen: false,
      formGroupList: [],
      formGroupValues: {
        asmSchemeId: ""
      },
      formButtonList: superviseFormBtns
    },
    showSearchForm: true,
    // 表格
    tableButtonObj: tableButtonObj,
    distributeSuperviseTableHeader: distributeSuperviseTableHeader,
    // 督查首页列表
    superviseTableHeader: superviseTableHeader,
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
    dialogFormBlockSettings: {
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
    // 抽查组设定
    spotCheckContentItems: spotCheckContentItems,
    spotCheckContentButton: spotCheckContentButton,
    // 评分审核
    scoreCheckContentItems: scoreCheckContentItems,
    scoreCheckContentBtn:scoreCheckContentBtn,
    dialogFormSettings: {
      fullScreen: false,
      dialogFormVisible: false,
      dialogFormTitle: "",
      dialogType: "form",
      dialogFormItems: {
        formGroupValues: {
          asmKpiIds: []
        },
        formGroupList: [],
        formButtonList: [],
        rules: distributeSuperviseRule
      }
    },
    // 查看详情
    superviseDetailDialog: {
      dialogVisible: false,
      dialogName: "详情",
      formButtonList: []
    },
    // 保存单行数据
    singleData: {},
    // 搜索kpi
    kpiSearchFormItems: kpiSearchFormItems,
    kpiSearchFormSetting: {
      fullScreen: false,
      formGroupList: kpiSearchFormItems,
      formGroupValues: {
        assessPhase: "",
        kpiFilter: ""
      },
      formButtonList: kpiSearchFormBtns
    },
    // 指标表格设置
    kpiTableSettings: {
      tableDatas: [],
      tableSettingOptions: {
        rowKey: "id",
        tooltipEffect: "dark",
        border: true,
        headerOptions: kpiTableHeader
      }
    },
    // 分页
    kpiPaginationSettings: {
      currentPage: 1,
      totalNumbers: 0
    }
  };
  return obj;
};
export default data;

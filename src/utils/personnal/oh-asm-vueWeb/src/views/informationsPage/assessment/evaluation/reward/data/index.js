// table表头信息设置
import { rewardTableHeader } from "@/utils/formSettingsJson/table/assessment/reward/tableSettings.js";

// 弹框设置
import {
  rewardFormItems,
  rewardFormBtns,
  rewardFormApprovalBtns
} from "@/utils/formSettingsJson/dialog/assessment/reward/dialogSettings.js";
// 搜索栏
import {
  searchFormBtns,
  searchFormItems
} from "@/utils/formSettingsJson/search/assessment/reward/searchSettings.js";
import { operateButtons } from "@/utils/formSettingsJson/operateButton/assessment/reward/buttonSettings.js";
// 校验规则
import rewardFormRules from "@/utils/formRulesJson/assessment/rewardFormRules";
let data = function(vm) {
  let obj = {
    // 页面类型
    pageType: "",
    // 搜索栏
    searchFormItems: searchFormItems,
    searchSettings: {
      fullScreen: false,
      formGroupList: [],
      formGroupValues: {
        assessedOrgId: "",
        mainOrgId: "",
        asmSchemeRewardId: "",
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
        headerOptions: rewardTableHeader
      }
    },
    // 分页
    paginationSettings: {
      currentPage: 1,
      totalNumbers: 0
    },
    // 申请
    rewardFormItems: rewardFormItems,
    rewardFormBtns: rewardFormBtns,
    // 审批
    rewardFormApprovalBtns: rewardFormApprovalBtns,
    // 弹框
    // 删除的文件
    deleteFileList: [],
    // 被考核市县
    assessdOrgList: [],
    dialogFormSettings: {
      fullScreen: false,
      dialogFormVisible: false,
      dialogFormTitle: "",
      dialogType: "form",
      dialogFormItems: {
        //表明表单中有文件上传功能，点击按钮直接返回formdata
        formGroupTypeUpload: true,
        formGroupTypeUploadName: "fbFile",
        formGroupValues: {
          assessedOrgId: "",
          mainOrgId: "",
          asmSchemeRewardId: "",
          asmSchemeId: ""
        },
        formGroupList: [],
        formButtonList: [],
        rules: rewardFormRules
      }
    }
  };
  return obj;
};

export default data;

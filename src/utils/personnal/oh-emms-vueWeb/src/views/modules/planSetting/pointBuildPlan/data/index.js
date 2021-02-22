// 搜索
import {
  searchFormBtns,
  searchFormItems
} from "@/utils/formSettingsJson/search/planSetting/pointBuildPlan";
// table 上方按钮
import { operateButtons } from "@/utils/formSettingsJson/operateButton/planSetting/pointBuildPlan";
// table表头信息设置
import { tableHeader } from "@/utils/formSettingsJson/table/planSetting/pointBuildPlan";
// 储备计划表单
import {
  addPointBuildPlanButton,
  editPointBuildPlanButton,
  pointBuildPlanContentItem
} from "@/utils/formSettingsJson/dialog/planSetting/pointBuildPlan";
// 必填验证
import pointBuildPlanRule from "@/utils/formRulesJson/planSetting/pointBuildPlan";

const data = function(vm) {
  let obj = {
    // 搜索栏
    searchFormSettings: {
      fullScreen: false,
      formGroupList: searchFormItems,
      formGroupValues: {},
      formButtonList: searchFormBtns
    },
    showSearchForm: true,
    // table表格配置
    tableSettings: {
      tableDatas: [],
      tableSettingOptions: {
        ref: "demo",
        rowKey: "id",
        tooltipEffect: "dark",
        border: true,
        defaultExpandAll: true,
        headerOptions: tableHeader
      }
    },
    // 分页配置
    paginationSettings: {
      currentPage: 1,
      totalNumbers: 0
    },
    // 表格上方头部设置
    operateButtonsSettings: {
      moduleName: "tableList",
      buttonListData: operateButtons
    },
    addPointBuildPlanButton: addPointBuildPlanButton,
    editPointBuildPlanButton: editPointBuildPlanButton,
    pointBuildPlanContentItem: pointBuildPlanContentItem,
    //新增修改弹窗
    dialogFormSettings: {
      fullScreen: false,
      dialogFormVisible: false,
      dialogFormTitle: "",
      dialogFormItems: {
        formGroupValues: {
          planPointbuildDtls: [],
          created: new Date().getTime(),
          docNo: "系统自动生成",
          year: new Date().getFullYear() + ""
        },
        formGroupList: pointBuildPlanContentItem,
        formButtonList: [],
        rules: pointBuildPlanRule
      }
    }
  };
  return obj;
};
export default data;

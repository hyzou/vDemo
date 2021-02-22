// 表格的头部
import { tableHeaderSettings } from "@/utils/formSettingsJson/table/reviewProgress/tableSettings.js";
// 考核办新增任务进度汇报对话框配置
import {
  newProgressDialogBtns,
  newProgressDialogItems
} from "@/utils/formSettingsJson/dialog/supervision/taskProgress/newProgress/dialogSettings.js";
// 考核办编辑任务进度汇报对话框配置
import {
  updateProgressDialogBtns,
  updateProgressDialogItems
} from "@/utils/formSettingsJson/dialog/supervision/taskProgress/updateProgress/dialogSettings.js";
// 考核办查看任务进度汇报对话框配置
import {
  checkProgressDialogBtns,
  checkProgressDialogItems
} from "@/utils/formSettingsJson/dialog/supervision/taskProgress/checkProgress/dialogSettings.js";
// 搜索栏
import {
  searchFormBtns,
  searchFormItems
} from "@/utils/formSettingsJson/search/supervision/taskProgress/searchSettings.js";
// 按钮组
import { operateBtns } from "@/utils/formSettingsJson/operateButton/supervision/taskProgress/buttonSettings.js";
// 校验规则
import taskProgressRule from "@/utils/formRulesJson/supervision/taskProgress";
const data = function(vm) {
  let routeArr = vm.$route.fullPath.split("/"),
    pageType = routeArr[routeArr.length - 2],
    kpiType = routeArr[routeArr.length - 1],
    obj = {
      // 页面功能类型
      pageType: pageType,
      // 页面考核类型
      kpiType: kpiType,
      // 页面配置数据
      newProgressDialogItems: newProgressDialogItems,
      newProgressDialogBtns: newProgressDialogBtns,
      updateProgressDialogBtns: updateProgressDialogBtns,
      updateProgressDialogItems: updateProgressDialogItems,
      checkProgressDialogBtns: checkProgressDialogBtns,
      checkProgressDialogItems: checkProgressDialogItems,
      // operateButtons 按钮组配置
      operateButtonsSettings: {
        moduleName: "tableList",
        buttonListData: operateBtns[pageType][kpiType]
      },
      //考核办考核进展汇报
      standDialogFormSettings: {
        width: "70%",
        dialogFormVisible: false, //弹窗是否可见（开或关）
        dialogFormTitle: "考核办考核进展汇报", //弹窗标题
        dialogType: "formBlocks", //弹窗类型
        dialogFormItems: {
          formGroupTypeUpload: "true",
          formGroupTypeUploadName: "fbFile",
          formGroupList: newProgressDialogItems,
          formGroupValues: {},
          formButtonList: newProgressDialogBtns,
          rules: taskProgressRule
        }
      },
      // 搜索栏
      searchFormItems: searchFormItems[pageType],
      reviewProgressSearchFormGroupSettings: {
        fullScreen: false,
        formGroupList: searchFormItems[pageType],
        formGroupValues: {
          asmSchemeId: ""
        },
        formButtonList: searchFormBtns
      },
      showSearchForm: true,
      // 表格设置
      reviewProgressTableSettings: {
        tableDatas: [],
        tableSettingOptions: {
          ref: "reviewProgressTable",
          tooltipEffect: "dark",
          rowKey: "id",
          border: true,
          headerOptions: tableHeaderSettings
        }
      },
      // 表格选中的数据
      tableSelectedData: [],
      // 分页
      paginationSettings: {
        currentPage: 1,
        totalNumbers: 0
      }
    };
  return obj;
};
export default data;

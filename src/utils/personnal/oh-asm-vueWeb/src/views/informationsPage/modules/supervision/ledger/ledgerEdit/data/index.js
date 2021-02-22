import {
  fillStandDialogItems,
  fillStandDialogBtns
} from "@/utils/formSettingsJson/dialog/supervision/ledger/edit/fillStandDialogSetting";

import fillStandRules from "@/utils/formRulesJson/supervision/fillStandRules";

import {
  dispatchLeaderOfficeDialogItems,
  dispatchLeaderOfficeDialogBtns
} from "@/utils/formSettingsJson/dialog/supervision/ledger/edit/dispatchLeaderOfficeDialogSetting";
import {
  searchFormBtns,
  searchFormItems
} from "@/utils/formSettingsJson/search/supervision/ledger/searchSettings";

import { operateBtns } from "@/utils/formSettingsJson/operateButton/supervision/ledger/buttonSettings.js";

import {
  tableHeader,
  expandContent
} from "@/utils/formSettingsJson/table/supervision/ledger/check/tableSetting";
const data = function(vm) {
  let routeArr = vm.$route.fullPath.split("/"),
    pageType = routeArr[routeArr.length - 2],
    kpiType = routeArr[routeArr.length - 1];
  return {
    // 页面功能类型
    pageType: pageType,
    // 页面考核类型
    kpiType: kpiType,
    // 已分配的处室id
    assedLeaderDepId: "",
    // 当前已选方案id
    asmSchemeId: "",
    // 机构列表
    orglist: [],
    // 对话框配置
    fillStandDialogItems: fillStandDialogItems,
    fillStandDialogBtns: fillStandDialogBtns,
    dispatchLeaderOfficeDialogItems: dispatchLeaderOfficeDialogItems,
    dispatchLeaderOfficeDialogBtns: dispatchLeaderOfficeDialogBtns,
    //牵头部门落实进展台账
    standDialogFormSettings: {
      width: "70%",
      dialogFormVisible: false, //弹窗是否可见（开或关）
      dialogFormTitle: "落实进展填写", //弹窗标题
      dialogType: "formBlocks", //弹窗类型
      dialogFormItems: {
        formGroupTypeUpload: false,
        formGroupTypeUploadName: "fbFiles",
        formGroupList: fillStandDialogItems,
        formGroupValues: {},
        formButtonList: fillStandDialogBtns,
        rules: fillStandRules
      }
    },
    //牵头部门分配
    distributeDialogFormSettings: {
      width: "70%",
      dialogFormVisible: false, //弹窗是否可见（开或关）
      dialogFormTitle: "落实进展分配", //弹窗标题
      dialogType: "formBlocks", //弹窗类型
      dialogFormItems: {
        formGroupList: dispatchLeaderOfficeDialogItems,
        formGroupValues: {},
        formButtonList: dispatchLeaderOfficeDialogBtns
      }
    },
    // 搜索栏
    searchFormItems: searchFormItems[kpiType],
    searchFormGroupSettings: {
      fullScreen: false,
      formGroupList: vm.$globalFnc.deepCopy(searchFormItems[kpiType]),
      formGroupValues: {
        asmSchemeId: ""
      },
      formButtonList: searchFormBtns
    },
    showSearchForm: true,
    // operateButtons 按钮组配置
    operateButtonsSettings: {
      moduleName: "tableList",
      buttonListData: operateBtns[pageType]
    },
    // 表格设置
    tablelistSettings: {
      tableDatas: [],
      tableSettingOptions: {
        ref: "progressAccountTable",
        tooltipEffect: "dark",
        rowKey: "asmSchemeKpiId",
        hasExpandContent: true,
        expandContent: "implProgresses",
        expandContentClass: "overflowXhYa",
        expandItemClass: "width100",
        expandContentTypeSpecial: true,
        expandContentLables: expandContent,
        border: true,
        headerOptions: tableHeader
      }
    },
    // 分页
    paginationSettings: {
      currentPage: 1,
      totalNumbers: 0
    },
    page: 1,
    routeName: null,
    routeNameMap: {
      province: "省",
      city: "市",
      county: "县",
      department: "处室"
    },
    removeFileList: [],
    //判断当前台账填写提交是新增还是修改
    progressIsInsert: true,
    orgType: null
  };
};

export default data;

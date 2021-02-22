import {
  fillStandDialogItems,
  fillStandDialogBtns
} from "@/utils/formSettingsJson/dialog/supervision/ledger/check/fillStandDialogSetting";

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
        rowKey: "assessedOrgKpiId",
        hasExpandContent: true,
        expandContent: "implProgressesSubmit",
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
    //牵头部门落实进展台账对话框
    standDialogFormSettings: {
      width: "70%",
      dialogFormVisible: false, //弹窗是否可见（开或关）
      dialogFormTitle: "落实进展查看", //弹窗标题
      dialogType: "formBlocks", //弹窗类型
      dialogFormItems: {
        formGroupTypeUpload: false,
        formGroupTypeUploadName: "fbFiles",
        formGroupList: fillStandDialogItems,
        formGroupValues: {},
        formButtonList: fillStandDialogBtns
      }
    },
    page: 1
  };
};

export default data;

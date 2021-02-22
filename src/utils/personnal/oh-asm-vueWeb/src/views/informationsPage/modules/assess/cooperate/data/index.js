// table表头信息设置
import { cooperateTableHeader } from "@/utils/formSettingsJson/table/assessment/cooperate/tableSettings.js";

// 弹框设置
import {
  opinionFormItems,
  opinionFormBtns
} from "@/utils/formSettingsJson/dialog/assessment/cooperate/dialogSettings.js";
import {
  schemeFormItem,
  assignKpiButton,
  assignDepartmentCooprate
} from "@/utils/formSettingsJson/dialog/common/dialogSettings.js";
// 搜索栏
import {
  searchFormBtns,
  searchFormItems
} from "@/utils/formSettingsJson/search/assessment/cooperate/searchSettings.js";
import operateButtons from "@/utils/formSettingsJson/operateButton/targetManage/suggestConsultation/operateButtonSettings.js";
// 校验规则
import cooperateFormRules from "@/utils/formRulesJson/assessment/cooperateFormRules";
let data = function(vm) {
  let obj = {
    // 页面类型
    pageType: "",
    // 搜索栏
    searchFormItems: searchFormItems,
    searchSettings: {
      fullScreen: false,
      formGroupList: [],
      formGroupValues: {},
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
        headerOptions: cooperateTableHeader
      }
    },
    // 分页
    paginationSettings: {
      currentPage: 1,
      totalNumbers: 0
    },
    // 方案内容
    schemeFormItem: schemeFormItem,
    // 意见表单
    opinionFormBtns: opinionFormBtns,
    opinionFormItems: opinionFormItems,
    // 分配
    assignKpiButton: assignKpiButton,
    assignDepartmentCooprate: assignDepartmentCooprate,
    // 弹框
    // 删除的文件
    deleteFileList: [],
    dialogFormSettings: {
      fullScreen: false,
      dialogFormVisible: false,
      dialogFormTitle: "",
      dialogType: "formBlocks",
      dialogFormItems: {
        //表明表单中有文件上传功能，点击按钮直接返回formdata
        formGroupTypeUpload: true,
        formGroupTypeUploadName: "fbFile",
        formGroupValues: {},
        formGroupList: [],
        formButtonList: [],
        rules: cooperateFormRules
      }
    }
  };
  return obj;
};

export default data;

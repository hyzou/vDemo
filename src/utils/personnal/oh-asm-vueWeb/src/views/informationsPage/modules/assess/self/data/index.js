// table表头信息设置
import { selfTableHeader } from "@/utils/formSettingsJson/table/assessment/self/tableSettings.js";

// 弹框设置
import {
  selfAssessFormBtns,
  selfAssessFormItems
} from "@/utils/formSettingsJson/dialog/assessment/self/dialogSettings.js";
import {
  schemeFormItem,
  assignKpiButton,
  assignDepartmentManage
} from "@/utils/formSettingsJson/dialog/common/dialogSettings.js";
// 搜索栏
import {
  searchFormBtns,
  searchFormItems
} from "@/utils/formSettingsJson/search/assessment/self/searchSettings.js";
import operateButtons from "@/utils/formSettingsJson/operateButton/targetManage/suggestConsultation/operateButtonSettings.js";
// 校验规则
import selfFormRules from "@/utils/formRulesJson/assessment/selfFormRules";
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
        headerOptions: selfTableHeader
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
    // 自评
    selfAssessFormBtns: selfAssessFormBtns,
    selfAssessFormItems: selfAssessFormItems,
    // 删除的文件
    deleteFileList: [],
    dialogFormSettings: {
      fullScreen: false,
      dialogFormVisible: false,
      dialogFormTitle: "意见征询",
      dialogType: "formBlocks",
      dialogFormItems: {
        //表明表单中有文件上传功能，点击按钮直接返回formdata
        formGroupTypeUpload: true,
        formGroupTypeUploadName: "fbFile",
        formGroupValues: {},
        formGroupList: [],
        formButtonList: [],
        rules: selfFormRules
      }
    }
  };
  return obj;
};

export default data;

// 搜索
import searchFormItems from "@/utils/formSettingsJson/systemSetting/userSetManage/search/searchFormItems.json";
import searchFormBtns from "@/utils/formSettingsJson/systemSetting/userSetManage/search/searchButton.json";
// table 上方按钮
import operateButtons from "@/utils/formSettingsJson/systemSetting/userSetManage/operateButtons";
// table表头信息设置
import tableHeader from "@/utils/formSettingsJson/systemSetting/userSetManage/table/tableHeader.json";

// 新增  编辑用户信息
import addUserContentButton from "@/utils/formSettingsJson/systemSetting/userSetManage/uerContentDialog/addButton.json";
import userContentItems from "@/utils/formSettingsJson/systemSetting/userSetManage/uerContentDialog/userContentItems.json";
import editUserContentButton from "@/utils/formSettingsJson/systemSetting/userSetManage/uerContentDialog/editButton.json";
// 规则
import userSetRule from "@/utils/formRulesJson/systemSetting/userSetManage/userSetRule";
const data = function(vm) {
  let obj = {
    // 搜索栏
    searchFormItems: searchFormItems,
    searchFormSettings: {
      fullScreen: false,
      formGroupList: [],
      formGroupValues: {},
      formButtonList: searchFormBtns
    },
    showSearchForm: true,
    // 表格上方头部设置
    operateButtonsSettings: {
      moduleName: "tableList",
      buttonListData: operateButtons
    },
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
    //新增修改弹窗
    addUserContentButton: addUserContentButton,
    userContentItems: userContentItems,
    editUserContentButton: editUserContentButton,
    userSetRule: userSetRule,
    dialogFormSettings: {
      fullScreen: false,
      dialogFormVisible: false,
      dialogFormTitle: "",
      dialogFormItems: {
        formGroupValues: {},
        formGroupList: [],
        formButtonList: [],
        rules: {},
        ruleType: "",
        validatePWRule: true // 密码特殊验证
      }
    },
    orgList: [] //组织机构
  };
  return obj;
};
export default data;

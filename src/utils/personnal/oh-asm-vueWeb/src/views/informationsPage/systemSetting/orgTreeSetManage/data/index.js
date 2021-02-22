// 搜索
import searchFormItems from "@/utils/formSettingsJson/systemSetting/orgTreeSetManage/search/searchFormItems.json";
import searchFormBtns from "@/utils/formSettingsJson/systemSetting/orgTreeSetManage/search/searchButton.json";
// table表头信息设置
import tableHeader from "@/utils/formSettingsJson/systemSetting/orgTreeSetManage/table/tableHeader.json";

// 新增  编辑组织
import orgContentItems from "@/utils/formSettingsJson/systemSetting/orgTreeSetManage/orgContentDialog/orgContentItems.json";
import addOrgContentButton from "@/utils/formSettingsJson/systemSetting/orgTreeSetManage/orgContentDialog/addButton.json";
import editOrgContentButton from "@/utils/formSettingsJson/systemSetting/orgTreeSetManage/orgContentDialog/editButton.json";
// 规则
import addOrgContentRules from "@/utils/formRulesJson/systemSetting/orgSetManage/orgSetRule";
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
    // table表格配置
    tableSettings: {
      tableDatas: [],
      tableSettingOptions: {
        ref: "demo",
        rowKey: "id",
        tooltipEffect: "dark",
        border: true,
        defaultExpandAll: true,
        headerOptions: tableHeader,
        treeProps: {
          children: "children",
          hasChildren: "hasChildren"
        }
      }
    },
    //新增修改弹窗
    orgContentItems: orgContentItems,
    addOrgContentButton: addOrgContentButton,
    editOrgContentButton: editOrgContentButton,
    addOrgContentRules: addOrgContentRules,
    dialogFormSettings: {
      fullScreen: false,
      dialogFormVisible: false,
      dialogFormTitle: "",
      dialogFormItems: {
        formGroupValues: {},
        formGroupList: [],
        formButtonList: [],
        rules: {}
      }
    },
    // 字典表
    orgTypeList: [], // 机构类型
    districtLevelList: [], //行政级别
    addressDistrictList: [] //行政区划
  };
  return obj;
};
export default data;

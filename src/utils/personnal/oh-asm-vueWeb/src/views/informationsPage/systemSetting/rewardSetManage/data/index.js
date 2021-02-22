// 搜索
import searchFormItems from "@/utils/formSettingsJson/systemSetting/rewardSetManage/search/searchFormItems.json";
import searchFormBtns from "@/utils/formSettingsJson/systemSetting/rewardSetManage/search/searchButton.json";
// table 上方按钮
import operateButtons from "@/utils/formSettingsJson/systemSetting/rewardSetManage/operateButtons";
// table表头信息设置
import tableHeader from "@/utils/formSettingsJson/systemSetting/rewardSetManage/table/tableHeader.json";

// 新增  编辑用户信息
import addRewardContentButton from "@/utils/formSettingsJson/systemSetting/rewardSetManage/dialog/addButton.json";
import rewardContentItems from "@/utils/formSettingsJson/systemSetting/rewardSetManage/dialog/rewardContentItems.json";
import editRewardContentButton from "@/utils/formSettingsJson/systemSetting/rewardSetManage/dialog/editButton.json";
// 规则
import rewardSetRule from "@/utils/formRulesJson/systemSetting/rewardSetManage/rewardSetRule";
const data = function(vm) {
  let obj = {
    // 搜索栏
    searchFormItems: searchFormItems,
    searchFormSettings: {
      fullScreen: false,
      formGroupList: searchFormItems,
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
    addRewardContentButton: addRewardContentButton,
    editRewardContentButton: editRewardContentButton,
    rewardContentItems: rewardContentItems,
    deleteFileIds: [],
    dialogFormSettings: {
      fullScreen: false,
      dialogFormVisible: false,
      dialogFormTitle: "",
      dialogFormItems: {
        //表明表单中有文件上传功能，点击按钮直接返回formdata
        formGroupTypeUpload: true,
        formGroupTypeUploadName: "fbFile",
        fileChangeFlag: "fbFile",
        formGroupValues: {},
        formGroupList: [],
        formButtonList: [],
        rules: rewardSetRule
      }
    }
  };
  return obj;
};
export default data;

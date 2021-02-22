// 搜索
import searchFormItems from "@/utils/formSettingsJson/systemSetting/taskSetManage/search/searchFormItems.json";
import searchFormBtns from "@/utils/formSettingsJson/systemSetting/taskSetManage/search/searchButton.json";
// table 上方按钮
import operateButtons from "@/utils/formSettingsJson/systemSetting/taskSetManage/operateButtons";
// table表头信息设置
import tableHeader from "@/utils/formSettingsJson/systemSetting/taskSetManage/table/tableHeader.json";
// 新建字典表列表
import taskContentItems from "@/utils/formSettingsJson/systemSetting/taskSetManage/dialog/taskContentItems.json";
import addTaskButton from "@/utils/formSettingsJson/systemSetting/taskSetManage/dialog/addTaskButton.json";
import editTaskButton from "@/utils/formSettingsJson/systemSetting/taskSetManage/dialog/editTaskButton.json";
// 必填验证
import taskSetRule from "@/utils/formRulesJson/systemSetting/taskSetManage/taskSetRule";

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
    // 新增列表
    taskContentItems: taskContentItems,
    addTaskButton: addTaskButton,
    editTaskButton: editTaskButton,
    //新增修改弹窗
    dialogFormSettings: {
      fullScreen: false,
      dialogFormVisible: false,
      dialogFormTitle: "菜单",
      dialogFormItems: {
        formGroupValues: {},
        formGroupList: [],
        formButtonList: [],
        rules: taskSetRule
      }
    },
    cronDetailDialog: {
      dialogVisible: false,
      dialogName: "cron参考",
      formButtonList: [
        {
          flag: "cancel",
          size: "",
          icon: "",
          label: "关闭",
          styleType: "",
          postUrl: ""
        }
      ]
    }
  };
  return obj;
};
export default data;

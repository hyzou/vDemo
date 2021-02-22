// 搜索
import searchFormItems from "@/utils/formSettingsJson/systemSetting/dictSetManage/search/searchFormItems.json";
import searchFormBtns from "@/utils/formSettingsJson/systemSetting/dictSetManage/search/searchButton.json";
// table 上方按钮
import operateButtons from "@/utils/formSettingsJson/systemSetting/dictSetManage/operateButtons";
// table表头信息设置
import tableHeader from "@/utils/formSettingsJson/systemSetting/dictSetManage/table/tableHeader.json";
// 新建字典表列表
import addDictListItems from "@/utils/formSettingsJson/systemSetting/dictSetManage/dictListDialog/addFormItems.json";
import addDictListButton from "@/utils/formSettingsJson/systemSetting/dictSetManage/dictListDialog/addButton.json";

// t业务代码 able表头信息设置
import dictContentTableHeader from "@/utils/formSettingsJson/systemSetting/dictSetManage/table/dictContentTableHeader.json";
// 业务代码 表格上方按钮
import dictContentOperateButtons from "@/utils/formSettingsJson/systemSetting/dictSetManage/dictContentOperateButtons";
// 业务代码 新增编辑表单组
import dictContentItems from "@/utils/formSettingsJson/systemSetting/dictSetManage/dictContentDialog/formItems.json";
import addDictContentButton from "@/utils/formSettingsJson/systemSetting/dictSetManage/dictContentDialog/addButton.json";
import editDictContentButton from "@/utils/formSettingsJson/systemSetting/dictSetManage/dictContentDialog/editButton.json";
// 必填验证
import targetSetRule from "@/utils/formRulesJson/systemSetting/dictSetManage/dictSetRule";

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
    addDictListItems: addDictListItems,
    addDictListButton: addDictListButton,
    //新增修改弹窗
    dialogFormSettings: {
      fullScreen: false,
      dialogFormVisible: false,
      dialogFormTitle: "菜单",
      dialogFormItems: {
        formGroupValues: {},
        formGroupList: [],
        formButtonList: [],
        rules: targetSetRule
      }
    },
    // 业务代码弹框
    dictContentDialogSetting: {
      dialogVisible: false,
      dialogName: "字典表业务代码"
    },
    dictContentOperateButtonsSettings: {
      moduleName: "tableList",
      buttonListData: dictContentOperateButtons
    },
    // 字典表业务代码内容
    dictContentItems: dictContentItems,
    addDictContentButton: addDictContentButton,
    editDictContentButton: editDictContentButton,
    // 保存字典表列表选中行信息
    dictListRowData: null,
    // 字典表业务代码表格
    dictContentTableSettings: {
      tableDatas: [],
      tableSettingOptions: {
        ref: "demo",
        rowKey: "id",
        tooltipEffect: "dark",
        border: true,
        defaultExpandAll: true,
        headerOptions: dictContentTableHeader
      }
    },
    dictContentPaginationSettings: Object.assign(
      {},
      {
        currentPage: 1,
        totalNumbers: 0
      },
      vm.$global.paginationOption
    )
  };
  return obj;
};
export default data;

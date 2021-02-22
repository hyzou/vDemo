// table上方操作按钮
import operateButtons from "@/utils/formSettingsJson/informationsPage/specialTargetSetManage/operateButtons";
// table表头信息设置
import tableHeader from "@/utils/formSettingsJson/informationsPage/specialTargetSetManage/table/tableHeader.json";
// 新增引用考核内容
import addContentButton from "@/utils/formSettingsJson/informationsPage/specialTargetSetManage/addCheckContentDialog/addButton.json";
import addContentItems from "@/utils/formSettingsJson/informationsPage/specialTargetSetManage/addCheckContentDialog/addFormItems.json";
import editContentButton from "@/utils/formSettingsJson/informationsPage/specialTargetSetManage/addCheckContentDialog/editButton.json";
import editContentItems from "@/utils/formSettingsJson/informationsPage/specialTargetSetManage/addCheckContentDialog/editFormItems.json";
// 考核内容
import addCheckContentButton from "@/utils/formSettingsJson/informationsPage/specialTargetSetManage/checkContentDialog/addButton.json";
import addCheckContentItems from "@/utils/formSettingsJson/informationsPage/specialTargetSetManage/checkContentDialog/addFormItems.json";
import editCheckContentButton from "@/utils/formSettingsJson/informationsPage/specialTargetSetManage/checkContentDialog/editButton.json";
import editCheckContentItems from "@/utils/formSettingsJson/informationsPage/specialTargetSetManage/checkContentDialog/editFormItems.json";
// 重点考核事项
import addCheckMainItemButton from "@/utils/formSettingsJson/informationsPage/specialTargetSetManage/checkMainItemDialog/addButton.json";
import addCheckMainItemItems from "@/utils/formSettingsJson/informationsPage/specialTargetSetManage/checkMainItemDialog/addFormItems.json";
import editCheckMainItemButton from "@/utils/formSettingsJson/informationsPage/specialTargetSetManage/checkMainItemDialog/editButton.json";
import editCheckMainItemItems from "@/utils/formSettingsJson/informationsPage/specialTargetSetManage/checkMainItemDialog/editFormItems.json";
// 考核指标
import addCheckTargetButton from "@/utils/formSettingsJson/informationsPage/specialTargetSetManage/checkTargetDialog/addButton.json";
import addCheckTargetItems from "@/utils/formSettingsJson/informationsPage/specialTargetSetManage/checkTargetDialog/addFormItems.json";
import editCheckTargetButton from "@/utils/formSettingsJson/informationsPage/specialTargetSetManage/checkTargetDialog/editButton.json";
import editCheckTargetItems from "@/utils/formSettingsJson/informationsPage/specialTargetSetManage/checkTargetDialog/editFormItems.json";
// 年度考核任务
import addCheckTargetTaskButton from "@/utils/formSettingsJson/informationsPage/specialTargetSetManage/checkTargetTaskDialog/addButton.json";
import addCheckTargetTaskItems from "@/utils/formSettingsJson/informationsPage/specialTargetSetManage/checkTargetTaskDialog/addFormItems.json";
import editCheckTargetTaskButton from "@/utils/formSettingsJson/informationsPage/specialTargetSetManage/checkTargetTaskDialog/editButton.json";
import editCheckTargetTaskItems from "@/utils/formSettingsJson/informationsPage/specialTargetSetManage/checkTargetTaskDialog/editFormItems.json";
// 评分标准
import addCheckItemStandardButton from "@/utils/formSettingsJson/informationsPage/specialTargetSetManage/checkItemStandardDialog/addButton.json";
import addCheckItemStandardItems from "@/utils/formSettingsJson/informationsPage/specialTargetSetManage/checkItemStandardDialog/addFormItems.json";
import editCheckItemStandardButton from "@/utils/formSettingsJson/informationsPage/specialTargetSetManage/checkItemStandardDialog/editButton.json";
import editCheckItemStandardItems from "@/utils/formSettingsJson/informationsPage/specialTargetSetManage/checkItemStandardDialog/editFormItems.json";
// 搜索栏
import searchFormItems from "@/utils/formSettingsJson/informationsPage/specialTargetSetManage/search/searchItems.json";
import searchFormBtns from "@/utils/formSettingsJson/informationsPage/specialTargetSetManage/search/buttons.json";
// 校验规则
import targetSetRule from "@/utils/formRulesJson/targetSetManage/targetSetRule";
const data = function(vm) {
  let obj = {
    // table上方操作按钮
    operateButtons: operateButtons,
    // table表头信息设置
    tableHeader: tableHeader,
    // 考核内容
    addContentButton: addContentButton,
    addContentItems: addContentItems,
    editContentButton: editContentButton,
    editContentItems: editContentItems,
    // 考核内容
    addCheckContentButton: addCheckContentButton,
    addCheckContentItems: addCheckContentItems,
    editCheckContentButton: editCheckContentButton,
    editCheckContentItems: editCheckContentItems,
    // 重点考核事项
    addCheckMainItemButton: addCheckMainItemButton,
    addCheckMainItemItems: addCheckMainItemItems,
    editCheckMainItemButton: editCheckMainItemButton,
    editCheckMainItemItems: editCheckMainItemItems,
    // 考核指标
    addCheckTargetButton: addCheckTargetButton,
    addCheckTargetItems: addCheckTargetItems,
    editCheckTargetButton: editCheckTargetButton,
    editCheckTargetItems: editCheckTargetItems,
    // 年度考核任务
    addCheckTargetTaskButton: addCheckTargetTaskButton,
    addCheckTargetTaskItems: addCheckTargetTaskItems,
    editCheckTargetTaskButton: editCheckTargetTaskButton,
    editCheckTargetTaskItems: editCheckTargetTaskItems,
    // 评分标准
    addCheckItemStandardButton: addCheckItemStandardButton,
    addCheckItemStandardItems: addCheckItemStandardItems,
    editCheckItemStandardButton: editCheckItemStandardButton,
    editCheckItemStandardItems: editCheckItemStandardItems,
    // 搜索栏
    searchFormItemsData: searchFormItems,
    searchFormBtns: searchFormBtns,
    // 搜索栏
    searchFormItems: {
      fullScreen: false,
      formGroupList: searchFormItems,
      formGroupValues: {},
      formButtonList: searchFormBtns
    },
    showSearchForm: true,
    // operateButtons 按钮组配置
    operateButtonsSettings: {
      moduleName: "tableList",
      buttonListData: operateButtons
    },
    //新增修改弹窗
    dialogFormSettings: {
      fullScreen: false,
      dialogFormVisible: false,
      dialogFormTitle: "考核内容",
      width: "750px",
      dialogFormItems: {
        formGroupValues: {},
        formGroupList: addCheckContentItems,
        formButtonList: addCheckContentButton,
        rules: targetSetRule
      }
    },
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
    }
  };
  return obj;
};
export default data;
